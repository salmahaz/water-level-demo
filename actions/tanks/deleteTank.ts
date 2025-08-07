"use server";
import TankMembership from "@/models/TankMembership";
import WaterTank from "@/models/Tank";
import connectMongodb from "@/utils/dbConnection";

// delete tank (remove it from all owners and from viewers)
export async function deleteTank(tankId: string) {
  try {
    //  Check if tankId is valid before conversion
    if (!tankId) {
      throw new Error("Invalid tank ID. Please try again.");
    }
    await connectMongodb();
    const deletedTank = await WaterTank.findByIdAndDelete(tankId);
    if (!deletedTank) {
      throw new Error("Tank not found or already deleted.");
    }

    // Remove all memberships related to this tank (both owners & viewers)
    await TankMembership.deleteMany({ waterTankId: tankId });

    return {
      success: true,
      message: "Tank and its memberships successfully deleted.",
    };
  } catch (error) {
    return { success: false, message: error };
  }
}
