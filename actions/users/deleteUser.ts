"use server";

import TankMembership from "@/models/TankMembership";
import User from "@/models/User";
import WaterTank from "@/models/Tank";
import connectMongodb from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Remove the user from all tank memberships (both as owner and viewer).
// Delete all tanks the user owns.
// Remove the user's viewer access from any tanks they are viewing.
// Finally, delete the user itself.
export async function deleteUser(userId: string) {
  try {
    await connectMongodb();

    if (!userId) {
      throw new Error("Invalid user ID");
    }

    // Remove user from all tank memberships (owner & viewer)
    await TankMembership.deleteMany({ userId });

    // Find all tanks the user owns
    const ownedTanks = await WaterTank.find({ userId }, "_id");

    // Extract owned tank IDs
    const ownedTankIds = ownedTanks.map((tank) => tank._id);

    if (ownedTankIds.length > 0) {
      // Delete all tanks owned by the user
      await WaterTank.deleteMany({ _id: { $in: ownedTankIds } });

      // Remove all memberships related to deleted tanks
      await TankMembership.deleteMany({ waterTankId: { $in: ownedTankIds } });
    }

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error("User not found");
    }
    const cookieStore = await cookies();
    cookieStore.set("session", ""); // Clear the session cookie
    revalidatePath("/");
    return {
      success: true,
      message: "User and related data deleted successfully.",
    };
  } catch (error) {
    return { success: false, message: error };
  }
}
