"use server"

import TankMembership from "@/models/TankMembership";
import connectMongodb from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";



// delete access for viewer
export async function removeViewerAccess(tankId: string, viewerId: string) {
    try {
      await connectMongodb();
  
      // Find and delete the viewer's membership
      const deletedMembership = await TankMembership.findOneAndDelete({
        waterTankId: tankId,
        userId: viewerId,
        userType: "viewer",
      });
  
      if (!deletedMembership) {
        return {
          success: false,
          message: "Viewer not found or does not have access",
        };
      }
  
      revalidatePath("/");
      return { success: true, message: "Viewer access removed successfully" };
    } catch (error) {
      console.error("Error removing viewer access:", error);
      return { success: false, message: "Failed to remove viewer access" };
    }
  }
  