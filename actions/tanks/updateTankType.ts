"use server";
import WaterTank from "@/models/Tank";
import connectMongodb from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";

// update tank type (water / diesel / fuel)
export async function updateTankType(tankId: string, tankType: string) {
  try {
    await connectMongodb();

    const updatedTank = await WaterTank.findByIdAndUpdate(
      tankId,
      { $set: { tankType: tankType } }, // Update tank type
      { new: true, runValidators: true },
    );

    if (!updatedTank) {
      return { success: false, message: "Tank not found" };
    }

    revalidatePath(`/tank-settings/${tankId}`);
    return { success: true, message: "Tank type updated" };
  } catch (error) {
    console.error("Error updating tank type:", error);
    return { success: false, message: "Failed to update tank type" };
  }
}
