"use server";

import User from "@/models/User";
import connectMongodb from "@/utils/dbConnection";
import { verifySession } from "@/utils/session";


interface UserType {
  _id: string;
  name: string;
  email: string;
  phone: string;
  userType: string;
  profileUrl: string;
}

export async function getCurrentUser() {
  await connectMongodb();

  // Verify the session and get the user ID from the session
  const session = await verifySession();

  if (!session?.userId) {
    throw new Error("Unauthenticated"); // Handle unauthenticated users
  }

  // Fetch the user from the database
  const user = await User.findById(session.userId).lean<UserType>();

  if (!user) {
    throw new Error("User not found");
  }

  // Return the user data
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    userType: user.userType,
    profileUrl: user.profileUrl,
  };
}


