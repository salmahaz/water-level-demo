"use server";


import WaterTank from "@/models/Tank";
import connectMongodb from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";

// update threshold
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

// update shortageNotification
export async function updateShortageNotification(
  tankId: string,
  isShortageNotifyOn: boolean,
) {
  if (!tankId) {
    return { success: false, message: "Invalid tank ID or threshold value." };
  }

  try {
    await connectMongodb();

    const tank = await WaterTank.findByIdAndUpdate(
      tankId,
      { isShortageNotifyOn, updatedAt: new Date() },
      { new: true },
    );

    if (!tank) {
      return { success: false, message: "Tank not found." };
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
    return { success: false, message: "Invalid tank ID or threshold value." };
  }

  try {
    await connectMongodb();

    const tank = await WaterTank.findByIdAndUpdate(
      tankId,
      { isLevelNotifyOn, updatedAt: new Date() },
      { new: true },
    );

    if (!tank) {
      return { success: false, message: "Tank not found." };
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
    return { success: false, message: "Invalid tank ID or threshold value." };
  }

  try {
    await connectMongodb();

    const tank = await WaterTank.findByIdAndUpdate(
      tankId,
      { isLeakNotifyOn, updatedAt: new Date() },
      { new: true },
    );

    if (!tank) {
      return { success: false, message: "Tank not found." };
    }

    revalidatePath(`/tank-settings/${tankId}`);
    return { success: true, message: "Updated successfully!" };
  } catch (error) {
    console.error("Error updating Notification:", error);
    return { success: false, message: "Database update failed." };
  }
}
