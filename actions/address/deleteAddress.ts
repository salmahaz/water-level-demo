"use server";

import connectMongodb from "@/utils/dbConnection";
import User from "@/models/User";
import { getUserIdFromSession } from "@/utils/session";
import { revalidatePath } from "next/cache";

export async function deleteAddress(addressId: string) {
  try {
    await connectMongodb();
    const userId = await getUserIdFromSession();
    if (!userId) throw new Error("Unauthorized");

    const result = await User.findByIdAndUpdate(
      userId,
      { $pull: { addresses: { _id: addressId } } },
      { new: true }
    );

    if (!result) {
      return { success: false, message: "User not found" };
    }

    revalidatePath("/addresses");
    return { success: true, message: "Address deleted" };
  } catch (error) {
    console.error("Delete address error:", error);
    return { success: false, message: "Something went wrong" };
  }
}
