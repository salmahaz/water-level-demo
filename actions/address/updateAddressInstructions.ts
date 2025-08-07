"use server";


import User from "@/models/User";
import connectMongodb from "@/utils/dbConnection";
export async function updateAddressInstructions(
  addressId: string,
  instructions: string,
  userId: string
): Promise<{ success: boolean; message?: string; address?: any }> {
  await connectMongodb();

  if (!userId || !addressId || typeof instructions !== "string") {
    return { success: false, message: "Missing or invalid fields" };
  }

  try {
    const user = await User.findById(userId);
    if (!user || !user.addresses) {
      return { success: false, message: "User or address not found" };
    }

    const address = user.addresses.find((a: any) => a._id?.toString() === addressId);
    if (!address) {
      return { success: false, message: "Invalid address ID" };
    }

    address.instructions = instructions;
    await user.save();

    const updatedAddress = JSON.parse(JSON.stringify(address));

    return {
      success: true,
      address: updatedAddress,
    };
  } catch (error) {
    console.error("Failed to update address instructions:", error);
    return { success: false, message: "Server error" };
  }
}