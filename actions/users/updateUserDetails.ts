"use server";

import User from "@/models/User";
import connectMongodb from "@/utils/dbConnection";

export async function updateUserDetails(
  userId: string,
  field: string,
  value: string
) {
  try {
    await connectMongodb();

    // Build dynamic update object
    const updateData = { [field]: value };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return { success: true, data: JSON.parse(JSON.stringify(updatedUser)) };
  } catch (error) {
    return { success: false, message: error };
  }
}
