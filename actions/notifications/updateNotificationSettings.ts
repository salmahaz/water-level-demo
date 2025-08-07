"use server";

import NotificationSetting from "@/models/NotificationSetting";
import connectMongodb from "@/utils/dbConnection";
import { verifySession } from "@/utils/session";
import { revalidatePath } from "next/cache";

// update shortageNotification
export async function updateShortageNotification(
  tankId: string,
  isShortageNotifyOn: boolean,
) {
  if (!tankId) {
    return { success: false, message: "Invalid tank ID." };
  }

  try {
    await connectMongodb();

    const session = await verifySession();
    if (!session?.userId) {
      return { success: false, message: "Unauthorized user." };
    }

    const notificationSetting = await NotificationSetting.findOneAndUpdate(
      { userId: session.userId, tankId },
      { isShortageNotifyOn, updatedAt: new Date() },
      { new: true, upsert: true },
    );

    if (!notificationSetting) {
      return {
        success: false,
        message: "Failed to update notification settings.",
      };
    }

    revalidatePath(`/tank-settings/${tankId}`);
    return { success: true, message: "Updated successfully!" };
  } catch (error) {
    console.error("Error updating Notification:", error);
    return { success: false, message: "Database update failed." };
  }
}

// update levelNotification
export async function updateLevelNotification(
  tankId: string,
  isLevelNotifyOn: boolean,
) {
  if (!tankId) {
    return { success: false, message: "Invalid tank ID." };
  }

  try {
    await connectMongodb();

    const session = await verifySession();
    if (!session?.userId) {
      return { success: false, message: "Unauthorized user." };
    }

    const notificationSetting = await NotificationSetting.findOneAndUpdate(
      { userId: session.userId, tankId },
      { isLevelNotifyOn, updatedAt: new Date() },
      { new: true, upsert: true },
    );

    if (!notificationSetting) {
      return {
        success: false,
        message: "Failed to update notification settings.",
      };
    }

    revalidatePath(`/tank-settings/${tankId}`);
    return { success: true, message: "Updated successfully!" };
  } catch (error) {
    console.error("Error updating Notification:", error);
    return { success: false, message: "Database update failed." };
  }
}

export async function updateLeakNotification(
  tankId: string,
  isLeakNotifyOn: boolean,
) {
  if (!tankId) {
    return { success: false, message: "Invalid tank ID." };
  }

  try {
    await connectMongodb();

    const session = await verifySession();
    if (!session?.userId) {
      return { success: false, message: "Unauthorized user." };
    }

    const notificationSetting = await NotificationSetting.findOneAndUpdate(
      { userId: session.userId, tankId },
      { isLeakNotifyOn, updatedAt: new Date() },
      { new: true, upsert: true },
    );

    if (!notificationSetting) {
      return {
        success: false,
        message: "Failed to update notification settings.",
      };
    }

    revalidatePath(`/tank-settings/${tankId}`);
    return { success: true, message: "Updated successfully!" };
  } catch (error) {
    console.error("Error updating Notification:", error);
    return { success: false, message: "Database update failed." };
  }
}
