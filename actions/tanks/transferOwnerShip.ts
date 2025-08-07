"use server"

import TankMembership from "@/models/TankMembership";
import connectMongodb from "@/utils/dbConnection";

// transfer ownership => swap the roles of an owner and a viewer for a specific water tank
export async function transferOwnership(
    tankId: string,
    ownerId: string,
    viewerId: string,
  ) {
    try {
      await connectMongodb();
  
      // Find the existing owner and viewer memberships
      const ownerMembership = await TankMembership.findOne({
        waterTankId: tankId,
        userId: ownerId,
        userType: "owner",
      });
      const viewerMembership = await TankMembership.findOne({
        waterTankId: tankId,
        userId: viewerId,
        userType: "viewer",
      });
  
      if (!ownerMembership || !viewerMembership) {
        return { success: false, message: "Invalid owner or viewer ID" };
      }
  
      // Swap roles
      ownerMembership.userType = "viewer";
      viewerMembership.userType = "owner";
  
      await ownerMembership.save();
      await viewerMembership.save();
  
      return { success: true, message: "Ownership transferred successfully" };
    } catch (error) {
      console.error("Error transferring ownership:", error);
      return { success: false, message: "Failed to transfer ownership" };
    }
  }