"use server";

import connectMongodb from "@/utils/dbConnection";

import TankMembership from "@/models/TankMembership";
import User from "@/models/User";
import { TankSchema } from "@/zod/tank";
import { revalidatePath } from "next/cache";
import WaterTank from "@/models/Tank";

export async function createTank(_: any, formData: FormData) {
  const serialNumber = formData.get("serialNumber") as string;
  const userId = formData.get("userId") as string;
  const long = formData.get("long") || "0";
  const lat = formData.get("lat") || "0";
  const connectionType = formData.get("connectionType") || "ethernet";
  const name = formData.get("name")?.toString().trim();
  const size = Number(formData.get("size"));
  const height = Number(formData.get("height"));
  const x = Number(formData.get("x"));
  const z = Number(formData.get("z"));

  if (!serialNumber || !userId) {
    return { success: false, message: "Missing serial number or user ID" };
  }

  await connectMongodb();

  // 1. Validate tank fields
  const validationResult = TankSchema.safeParse({ name, size, height, x, z });
  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // 2. Check if tank already exists
  let tank = await WaterTank.findOne({ serialNumber });

  // 3. Fetch user info (to know if agent or owner)
  const user = await User.findById(userId).select("userRole");
  if (!user) {
    return { success: false, message: "User not found." };
  }

  const isAgent = user.userRole?.includes("agent");

  if (!tank) {
    // No tank yet => create a new tank
    tank = await WaterTank.create({
      name,
      size,
      height,
      x,
      z,
      serialNumber,
      userId,
      location: { lat, long },
      connectionType,
      threshold: 50,
      sensorState: true,
    });

    // Always create membership based on role
    await TankMembership.create({
      userId,
      waterTankId: tank._id,
      userType: isAgent ? "agent" : "owner",
    });

    revalidatePath("/");

    return {
      success: true,
      message: `New tank created and user assigned as ${isAgent ? "agent" : "owner"}`,
    };
  }

  revalidatePath("/");

  return {
    success: true,
    message: "Tank info updated successfully.",
  };
}
