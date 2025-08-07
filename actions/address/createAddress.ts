"use server";

import User from "@/models/User";
import connectMongodb from "@/utils/dbConnection";

interface CreateAddressInput {
  userId: string;
  label: string;
  fullAddress: string;
  location: { lat: number; lng: number };
}

interface CreateAddressResponse {
  success: boolean;
  message?: string;
  address?: {
    id: string;
    label: string;
    fullAddress: string;
    location: { lat: number; lng: number };
    instructions: string;
  };
}

export async function createAddress({
  userId,
  label,
  fullAddress,
  location,
}: CreateAddressInput): Promise<CreateAddressResponse> {
  await connectMongodb();

  const user = await User.findById(userId);
  if (!user) {
    return { success: false, message: "User not found" };
  }

  // Push new address
  user.addresses = user.addresses || [];
  user.addresses.push({
    label,
    fullAddress,
    location,
    instructions: "",
  });

  await user.save();

  // Get the newly added address from the end
  const added = user.addresses[user.addresses.length - 1];

  if (!added._id) {
    return { success: false, message: "Failed to get address ID" };
  }
  const data = {
      id: added._id.toString(),
      label: added.label,
      fullAddress: added.fullAddress,
      location: added.location,
      instructions: added.instructions ?? "",
    }

   const address = JSON.parse(JSON.stringify(data)) 
  return {
    success: true,
    address: address,
  };
}
