"use server";
import WaterTank from "@/models/Tank";
import connectMongodb from "@/utils/dbConnection";

// get water tank based on tank id
export const getWaterTankById = async ({ tankId }: { tankId: string }) => {
  await connectMongodb();

  if (!tankId) {
    return null;
  }
  try {
    const tank = await WaterTank.findById(tankId).lean();
    return tank ? JSON.parse(JSON.stringify(tank)) : null;
  } catch (error) {
    console.error("Error fetching tank:", error);
    return null;
  }
};
