"use server";

import connectMongodb from "@/utils/dbConnection";
import User from "@/models/User";
import { getUserIdFromSession } from "@/utils/session";
import { AddressType } from "@/types/addressType";

export async function updateSelectedAddress(address: AddressType) {
  try {
    await connectMongodb();
    const userId = await getUserIdFromSession();
    if (!userId) throw new Error("Unauthorized");

    await User.findByIdAndUpdate(userId, {
      selectedAddress: {
        _id: address.id,
        label: address.label,
        fullAddress: address.fullAddress,
        location: address.location,
        instructions: address.instructions ?? "",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating selected address:", error);
    return { success: false };
  }
}
