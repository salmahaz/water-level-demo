"use server";

import FCMToken from "@/models/FCMToken";
import WaterTank from "@/models/Tank";
import connectMongodb from "@/utils/dbConnection";
import { adminMessaging } from "@/utils/firebaseAdmin";
import { getUserIdFromSession } from "@/utils/session";
import { revalidatePath } from "next/cache";

export async function updateThreshold(tankId: string, newThreshold: number) {
  if (!tankId || newThreshold < 0) {
    return { success: false, message: "Invalid tank ID or threshold value." };
  }

  try {
    await connectMongodb();

    const tank = await WaterTank.findByIdAndUpdate(
      tankId,
      { threshold: newThreshold, updatedAt: new Date() },
      { new: true },
    );

    if (!tank) {
      return { success: false, message: "Tank not found." };
    }
    //test
    const userId = await getUserIdFromSession();
    const fcmTokens = await FCMToken.find({ userId });
    const registrationToken = fcmTokens.map((item) => item.token);

    const messages = registrationToken.map((token) => ({
      notification: {
        title: `${newThreshold}% is your water level alert`,
        body: `Your water level alert has been changed to ${newThreshold}%, you will get notification for the new level alert.`,
      },
      token,
    }));

    await adminMessaging.sendEach(messages);

    revalidatePath(`/tank-settings/${tankId}`);
    return {
      success: true,
      message: "Updated successfully!",
    };
  } catch (error) {
    console.error("Error updating threshold:", error);
    return { success: false, message: "Database update failed." };
  }
}
