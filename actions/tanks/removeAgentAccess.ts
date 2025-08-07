"use server";

import TankMembership from "@/models/TankMembership";
import connectMongodb from "@/utils/dbConnection";


export async function removeAgentAccess(tankId: string, userId: string) {
  try {
    await connectMongodb();

    const membership = await TankMembership.findOneAndDelete({
      waterTankId: tankId,
      userId: userId,
      userType: "agent",
    });

    if (!membership) {
      return { success: false, message: "Membership not found" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error removing agent access:", error);
    return { success: false, message: "Failed to remove agent access" };
  }
}
