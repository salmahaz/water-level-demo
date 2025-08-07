export interface NotificationPermissionResult {
  granted: boolean;
  permission: NotificationPermission;
  error?: string;
}

/**
 * Checks if the browser supports notifications and requests permission if needed
 * @returns Promise<NotificationPermissionResult>
 */
export async function requestNotificationPermission(): Promise<NotificationPermissionResult> {
  try {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
      return {
        granted: false,
        permission: "denied",
        error: "This browser does not support notifications",
      };
    }

    // Check current permission status
    const currentPermission = Notification.permission;

    // If already granted, return success
    if (currentPermission === "granted") {
      return {
        granted: true,
        permission: "granted",
      };
    }

    // If denied, return without requesting (user has explicitly denied)
    if (currentPermission === "denied") {
      return {
        granted: false,
        permission: "denied",
        error: "Notification permission has been denied by the user",
      };
    }

    // If default, request permission
    if (currentPermission === "default") {
      try {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
          return {
            granted: true,
            permission: "granted",
          };
        } else {
          return {
            granted: false,
            permission: "denied",
            error: "User denied notification permission",
          };
        }
      } catch {
        return {
          granted: false,
          permission: "denied",
          error: "Failed to request notification permission",
        };
      }
    }

    // Fallback for unexpected permission states
    return {
      granted: false,
      permission: "denied",
      error: "Unexpected permission state",
    };
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return {
      granted: false,
      permission: "denied",
      error: "An error occurred while requesting notification permission",
    };
  }
}

/**
 * Checks if notification permission is granted without requesting it
 * @returns boolean
 */
export function hasNotificationPermission(): boolean {
  if (!("Notification" in window)) {
    return false;
  }
  return Notification.permission === "granted";
}

/**
 * Gets the current notification permission status
 * @returns NotificationPermission | 'unsupported'
 */
export function getNotificationPermissionStatus():
  | NotificationPermission
  | "unsupported" {
  if (!("Notification" in window)) {
    return "unsupported";
  }
  return Notification.permission;
}
