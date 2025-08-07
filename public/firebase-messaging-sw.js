importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js"
);

console.log("[SW] Firebase service worker loaded.");

firebase.initializeApp({
  // apiKey: "AIzaSyALRY4jbJUHiPU9Zl7ktAe47fyYTNPlFi0",
  // authDomain: "water-monster-service-provider.firebaseapp.com",
  // projectId: "water-monster-service-provider",
  // storageBucket: "water-monster-service-provider.appspot.com",
  // messagingSenderId: "75486011595",
  // appId: "1:75486011595:web:174ce52daed782f18a3b4e",
  apiKey: "AIzaSyDCKoXoHG24JaGzeBZv1G-VYtIYr56GzJE",
  authDomain: "wm-test-services.firebaseapp.com",
  projectId: "wm-test-services",
  storageBucket: "wm-test-services.firebasestorage.app",
  messagingSenderId: "389373548663",
  appId: "1:389373548663:web:4fca180ad7df706f5bce72",
  // measurementId:"G-6PLJ7X6TQE"
});

console.log("[SW] Firebase initialized.");

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Background message received:", payload);

  const notificationTitle =
    payload.notification?.title || payload.data?.title || "Notification";
  const notificationBody =
    payload.notification?.body || payload.data?.body || "";
  const notificationOptions = {
    body: notificationBody,
    icon: "/icons/icon-192x192.png",
  };

  console.log("[SW] Showing notification:", notificationTitle);
  self.registration.showNotification(notificationTitle, notificationOptions);

  // Notify all open pages
  self.clients
    .matchAll({ type: "window", includeUncontrolled: true })
    .then((clients) => {
      console.log(`[SW] Broadcasting message to ${clients.length} clients.`);
      clients.forEach((client) => {
        client.postMessage({
          type: payload.data?.type,
          orderId: payload.data?.orderId,
          newStatus: payload.data?.newStatus,
        });
      });
    });
});

self.addEventListener("notificationclick", (event) => {
  console.log("[SW] Notification clicked.");
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
