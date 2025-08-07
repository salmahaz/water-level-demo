"use server"
import User from "@/models/User";
import connectMongodb from "@/utils/dbConnection";

export async function getAddresses(userId: string) {
  await connectMongodb();

  const user = await User.findById(userId);
  if (!user || !user.addresses) return [];

  const data = user.addresses.map((addr: any) => ({
    id: addr._id.toString(), 
    label: addr.label,
    fullAddress: addr.fullAddress,
    location: addr.location,
    instructions: addr.instructions || "",
  }));

  const addresses = JSON.parse(JSON.stringify(data)) 
  return addresses;
}
