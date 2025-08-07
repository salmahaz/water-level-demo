"use server";

import WaterTank from "@/models/Tank";
import connectMongodb from "@/utils/dbConnection";
import { TankSchema } from "@/zod/tank";
import { revalidatePath } from "next/cache";

// Update tank info
export async function updateTankInfo(_: any, formData: FormData) {
  const tankId = formData.get("tankId") as string;
  const name = formData.get("name")?.toString().trim();
  const size = parseInt(formData.get("size") as string);
  const height = parseInt(formData.get("height") as string);
  const x = parseInt(formData.get("x") as string);
  const z = parseInt(formData.get("z") as string);

  if (!tankId) {
    return { success: false, message: "Tank ID missing" };
  }

  try {
    await connectMongodb();

    // Validate fields
    const validationResult = TankSchema.safeParse({ name, size, height, x, z });
    if (!validationResult.success) {
      return {
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    // Fetch the existing tank
    const existingTank = await WaterTank.findById(tankId);

    if (!existingTank) {
      return { success: false, message: "Tank not found" };
    }

    // Check if fields are actually changed
    const isSame =
      existingTank.name.trim() === name &&
      existingTank.size === size &&
      existingTank.height === height &&
      existingTank.x === x &&
      existingTank.z === z;

    if (isSame) {
      // No changes detected, no need to update
      return { success: true, message: "No changes detected" };
    }

    // Update only if changed
    await WaterTank.findByIdAndUpdate(
      tankId,
      { name, size, height, x, z },
      { new: true },
    );

    // Revalidate cache after real update
    revalidatePath(`/tank-settings/${tankId}`);

    return { success: true, message: "Tank updated successfully" };
  } catch (error) {
    console.error("Error updating tank:", error);
    return { success: false, message: "Error processing request" };
  }
}
