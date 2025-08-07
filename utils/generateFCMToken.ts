"use client";

import { getMessaging, getToken, Messaging } from "firebase/messaging";
import { firebaseApp } from "@/utils/firebase";
import { requestNotificationPermission } from "@/utils/requestNotificationPermission";

// Flag to prevent multiple simultaneous token generations
let isGeneratingToken = false;

const fcmToken = async () => {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
      const messaging = getMessaging(firebaseApp);
      return { registration, messaging };
    } catch (error) {
      console.error("[FCM] Service worker registration failed:", error);
      return null;
    }
  }
  return null;
};

export const generateFCMToken = async (): Promise<string | null> => {
  if (isGeneratingToken) return null;
  isGeneratingToken = true;

  try {
    const permissionResult = await requestNotificationPermission();
    if (!permissionResult.granted) {
      console.warn("[FCM] Notification permission not granted:", permissionResult.error);
      return null;
    }

    const x = await fcmToken();
    if (!x?.messaging || !x?.registration) return null;

    const token = await getToken(x.messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: x.registration,
    });

    return token;
  } catch (error) {
    console.error("[FCM] Token generation failed:", error);
    return null;
  } finally {
    isGeneratingToken = false;
  }
};
