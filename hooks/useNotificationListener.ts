"use client";

import { useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { firebaseApp } from "@/utils/firebase";
import { useRouter } from "next/navigation";

export function useNotificationListener() {
  const router = useRouter();

  const refreshOrders = (reason: string) => {
    // console.log(`[Notification] Refresh triggered due to: ${reason}`);
    router.refresh(); // best practice for server-side revalidation
  };

  useEffect(() => {
    // console.log("[Notification] Setting up foreground FCM listener...");
    const messaging = getMessaging(firebaseApp);

    const unsubscribe = onMessage(messaging, (payload) => {
      // console.log("[Notification] Foreground FCM message received:", payload);

      const { type, newStatus, orderId } = payload.data ?? {};

      if (type === "order-status-update") {
        // console.log(`[Notification] Order ${orderId} updated to: ${newStatus}`);
        refreshOrders("foreground order-status-update");
      }

      if (type === "new-order") {
        // console.log("[Notification] New order received.");
        refreshOrders("foreground new-order");
      }

      if (type === "order-cancelled") {
        // console.log("[Notification] Order cancelled.");
        refreshOrders("foreground order-cancelled");
      }

      // Optional: Show a system notification
      if (Notification.permission === "granted" && payload.notification) {
        new Notification(payload.notification.title || "Notification", {
          body: payload.notification.body || "",
          icon: "/icons/icon-192x192.png",
        });
      }
    });

    return () => {
      // console.log("[Notification] Cleaning up foreground listener.");
      unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    // console.log("[Notification] Setting up service worker message listener...");

    if (!("serviceWorker" in navigator)) {
      console.warn("[Notification] Service Worker not supported.");
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      // console.log("[Notification] Received message from Service Worker:", event.data);

      const { type, newStatus, orderId } = event.data ?? {};

      if (type === "order-status-update") {
        // console.log(`[Notification] SW - Order ${orderId} updated to: ${newStatus}`);
        refreshOrders("SW order-status-update");
      }

      if (type === "new-order") {
        // console.log("[Notification] SW - New order received.");
        refreshOrders("SW new-order");
      }

      if (type === "order-cancelled") {
        // console.log("[Notification] SW - Order cancelled.");
        refreshOrders("SW order-cancelled");
      }
    };

    navigator.serviceWorker.addEventListener("message", handleMessage);

    return () => {
      // console.log("[Notification] Removing service worker listener.");
      navigator.serviceWorker.removeEventListener("message", handleMessage);
    };
  }, [router]);
}
