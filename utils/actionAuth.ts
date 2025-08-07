"use server";

import { cookies } from "next/headers";
import { decrypt } from "./session";

export default async function actionAuth(role: string[]) {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  const userRole = session?.userRole;

  if (role !== userRole) return;
}
