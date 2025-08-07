"use server";

import NotificationSetting, {
  NotificationSetting as NotificationSettingType,
} from "@/models/NotificationSetting";
import connectMongodb from "@/utils/dbConnection";
import { verifySession } from "@/utils/session";

interface NotificationSettingsResponse {
  userId: string;
  tankId?: string;
  isLeakNotifyOn: boolean;
  isShortageNotifyOn: boolean;
  isLevelNotifyOn: boolean;
}

export async function getNotificationSettings(
  tankId?: string,
): Promise<NotificationSettingsResponse> {
  try {
    await connectMongodb();

    // Verify the session and get the user ID from the session
    const session = await verifySession();

    if (!session?.userId) throw Error("Unauthorized user");

    // Build query based on whether tankId is provided
    const query: { userId: string; tankId?: string } = {
      userId: session.userId.toString(),
    };
    if (tankId) {
      query.tankId = tankId;
    }

    // Fetch notification settings for the user and specific tank
    const notificationSettings = (await NotificationSetting.findOne(
      query,
    ).lean()) as NotificationSettingType | null;

    if (!notificationSettings) {
      return {
        userId: session.userId.toString(),
        tankId: tankId,
        isLeakNotifyOn: false,
        isShortageNotifyOn: false,
        isLevelNotifyOn: false,
      };
    }

    return {
      userId: notificationSettings.userId.toString(),
      tankId: notificationSettings.tankId?.toString(),
      isLeakNotifyOn: notificationSettings.isLeakNotifyOn ?? false,
      isShortageNotifyOn: notificationSettings.isShortageNotifyOn ?? false,
      isLevelNotifyOn: notificationSettings.isLevelNotifyOn ?? false,
    };
  } catch (error) {
    console.error("Error fetching notification settings:", error);
    throw error;
  }
}
