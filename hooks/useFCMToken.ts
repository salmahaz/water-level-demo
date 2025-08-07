"use client";

import { useEffect } from "react";
import { updateFCMToken } from "@/actions/fcmTokens/updateFCMToken";
import { useUserStore } from "@/store/userStore";
import { v4 as uuidv4 } from "uuid";
import { generateFCMToken } from "@/utils/generateFCMToken";

export function useFCMToken() {
  const userId = useUserStore((state : any) => state.id);

  useEffect(() => {
    if (!userId) {
      console.warn("[FCM] No user ID found.");
      return;
    }

    // console.log("[FCM] Initializing FCM token setup for user:", userId);

    const deviceKey = "device-id";
    let deviceId = localStorage.getItem(deviceKey);
    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem(deviceKey, deviceId);
      // console.log("[FCM] Generated new device ID:", deviceId);
    }

    const askPermissionAndSaveToken = async () => {
      // console.log("[FCM] Checking notification permission...");

      // Always check permission first
      let permission = Notification.permission;
      // console.log("[FCM] Current permission:", permission);

      if (permission === "default") {
        permission = await Notification.requestPermission();
        // console.log("[FCM] User selected permission:", permission);
      }

      if (permission !== "granted") {
        // console.warn("[FCM] Notification permission not granted. Skipping token generation.");
        return;
      }

      // console.log("[FCM] Permission granted. Generating token...");
      const token = await generateFCMToken();

      if (!token) {
        console.warn("[FCM] No token generated.");
        return;
      }

      // console.log("[FCM] FCM token generated:", token);

      try {
        await updateFCMToken({
          userId,
          deviceId,
          token,
          platform: "web",
        });
        // console.log("[FCM] FCM token saved successfully.");
      } catch (err) {
        console.error("[FCM] Failed to save token:", err);
      }
    };

    askPermissionAndSaveToken();
  }, [userId]);
}
