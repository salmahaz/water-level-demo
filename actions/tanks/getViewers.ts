"use server"
import TankMembership from "@/models/TankMembership";
import User from "@/models/User";
import connectMongodb from "@/utils/dbConnection";


// get viewers by tankId
export async function getViewers(tankId: string) {
    if (!tankId) {
      console.error("Invalid ObjectId format");
      return null;
    }
    try {
      await connectMongodb();
      // Step 1: Find all viewer user IDs for this tank
      const viewerIds = await TankMembership.distinct("userId", {
        waterTankId: tankId,
        userType: "viewer",
      });
  
      if (!viewerIds.length) {
        return {
          success: false,
          message: "No viewers found for this tank",
          viewers: [],
        };
      }
  
      // Step 2: Fetch user details for all viewers
      const data = await User.find({ _id: { $in: viewerIds } }).lean();
  
      const viewers = JSON.parse(JSON.stringify(data));
      return { success: true, viewers };
    } catch (error) {
      console.error("Error fetching viewers:", error);
      return { success: false, message: "Error fetching viewers", viewers: [] };
    }
  }
  