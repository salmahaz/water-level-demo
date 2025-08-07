"use server";

import WaterTank from "@/models/Tank";
import connectMongodb from "@/utils/dbConnection";

export async function getTankBySerialNumber(serialNumber: string) {
  await connectMongodb();
  const tank = await WaterTank.findOne({ serialNumber });
  const data = JSON.parse(JSON.stringify(tank));
  return data;
}
