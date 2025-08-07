"use server";

import User from "@/models/User";
import connectMongodb from "@/utils/dbConnection";
import { cookies } from "next/headers";
import { LogInFormSchema, SignUpFormSchema } from "@/zod/authDefs";
import { createSession } from "@/utils/session";
import { comparePassword, hashPassword } from "@/utils/hashPassword";


//login
export const login = async (_: any, formData: FormData) => {
  const email = formData.get("email")?.toString().toLowerCase();
  const password = formData.get("password");

  const validatedFields = LogInFormSchema.safeParse({ email, password });

  if (!validatedFields.success)
    return { message: validatedFields.error.flatten().fieldErrors };

  await connectMongodb();
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await comparePassword(password, user?.password)))
    return { message: "Invalid email or password" };

  await createSession({ userId: user.id, userRole: user.userRole || "" });

  // Return the user details
  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      // phoneNumber: user.phoneNumber,
    },
  };
};

//signup
export async function signup(_: any, formData: FormData) {
  const name = formData.get("fullname");
  const email = formData.get("email")?.toString().toLowerCase();
  const password = formData.get("password");
  const prefix = formData.get("prefix");
  const phoneNumber = formData.get("number");

  const validatedFields = SignUpFormSchema.safeParse({
    name,
    email,
    password,
    prefix,
    phoneNumber,
  });

  if (!validatedFields.success)
    return { message: validatedFields.error.flatten().fieldErrors };

  const hashedPassword = await hashPassword(password);

  await connectMongodb();
  let user = await User.findOne({ email });

  if (!!user) return { message: "User already existed!! login instead." };

  user = await User.create({
    name,
    email,
    password: hashedPassword,
    prefix,
    phoneNumber,
  });
  if (!user)
    return { message: "An error occurred while creating your account." };
  

  await createSession({ userId: user.id, userRole: "" });
  // Return the user details
  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    },
  };
}


//logout
export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { expires: new Date(0) }); // Clear the session cookie
  // redirect("/");
};
