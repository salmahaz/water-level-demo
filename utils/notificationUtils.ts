import { MessagePayload } from "firebase/messaging";

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: Record<string, string | number | boolean>;
  requireInteraction?: boolean;
  actions?: NotificationAction[];
  url?: string;
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export class PWANotificationManager {
  private static instance: PWANotificationManager;
  private isSupported: boolean = false;

  private constructor() {
    // Only check for browser APIs if we're on the client side
    if (typeof window !== "undefined") {
      this.isSupported =
        "Notification" in window && "serviceWorker" in navigator;
    }
  }

  public static getInstance(): PWANotificationManager {
    if (!PWANotificationManager.instance) {
      PWANotificationManager.instance = new PWANotificationManager();
    }
    return PWANotificationManager.instance;
  }

  public isNotificationSupported(): boolean {
    return this.isSupported;
  }

  public getPermissionStatus(): NotificationPermission | "unsupported" {
    if (!this.isSupported || typeof window === "undefined")
      return "unsupported";
    return Notification.permission;
  }

  public async requestPermission(): Promise<boolean> {
    if (!this.isSupported || typeof window === "undefined") return false;

    if (Notification.permission === "granted") return true;
    if (Notification.permission === "denied") return false;

    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  public showForegroundNotification(payload: MessagePayload): void {
    if (!this.isSupported || typeof window === "undefined") return;

    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-50 transform transition-all duration-300 translate-x-full";

    const title = payload.notification?.title || "Water Monster";
    const body = payload.notification?.body || "You have a new notification";
    const icon = payload.notification?.icon || "/icons/icon-192x192.png";

    notification.innerHTML = `
      <div class="flex items-start space-x-3">
        <img src="${icon}" alt="Water Monster" class="w-8 h-8 rounded">
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-medium text-gray-900">${title}</h4>
          <p class="text-sm text-gray-500 mt-1">${body}</p>
        </div>
        <button class="text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.classList.remove("translate-x-full");
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.classList.add("translate-x-full");
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 300);
    }, 5000);
  }

  public async showNativeNotification(
    options: NotificationOptions,
  ): Promise<Notification | null> {
    if (
      !this.isSupported ||
      typeof window === "undefined" ||
      Notification.permission !== "granted"
    ) {
      return null;
    }

    try {
      const notification = new Notification(options.title, {
        body: options.body,
        icon: options.icon || "/icons/icon-384x384.png",
        badge: options.badge || "/icons/icon-192x192.png",
        tag: options.tag || "default",
        data: options.data || {},
        requireInteraction: options.requireInteraction || false,
      });

      // Handle notification click
      notification.onclick = (event) => {
        event.preventDefault();
        notification.close();

        if (options.url) {
          // Focus existing window or open new one
          window.focus();
          window.location.href = options.url;
        }
      };

      return notification;
    } catch (error) {
      console.error("[PWA] Failed to show native notification:", error);
      return null;
    }
  }

  public async sendTestNotification(): Promise<boolean> {
    const hasPermission = await this.requestPermission();
    if (!hasPermission) return false;

    const notification = await this.showNativeNotification({
      title: "Water Monster",
      body: "Test notification - PWA notifications are working!",
      url: "/",
    });

    return notification !== null;
  }
}

// Export singleton instance - only create on client side
let notificationManager: PWANotificationManager | null = null;

if (typeof window !== "undefined") {
  notificationManager = PWANotificationManager.getInstance();
}

export { notificationManager };
