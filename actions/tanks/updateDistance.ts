"use server";

import connectMongodb from "@/utils/dbConnection";
import Tank from "@/models/Tank";
//import { revalidatePath } from "next/cache";
//import { getUserIdFromSession } from "@/utils/session";

export async function updateDistance(tankId: string, distance: number) {
  console.log("[updateDistance] Updating tank:", tankId, "with distance:", distance);

  await connectMongodb();

  await Tank.findByIdAndUpdate(tankId, {
    distance,
    updatedAt: new Date(),
  });

  console.log("[updateDistance] Update completed for tank:", tankId);
  // revalidatePath("/");
}
