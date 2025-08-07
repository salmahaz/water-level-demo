"use server";
import TankMembership from "@/models/TankMembership";
import connectMongodb from "@/utils/dbConnection";
import mongoose from "mongoose";

// Get all tanks
export async function getUserTanks(userId: string) {
  await connectMongodb();
  try {
    if (!userId)
      return { success: false, message: "User ID is required", data: [] };

    const userObjectId = new mongoose.Types.ObjectId(userId);
    // Step 1: Find all tanks where the user is an owner in one efficient query
    const tankIds = await TankMembership.distinct("waterTankId", { userId });

    // If no tanks are found, return an empty array
    if (!tankIds.length) {
      return { success: true, message: "No Tank found", data: [] };
    }

    // Step 2: Fetch all tanks in a single query
    const tanks = await TankMembership.aggregate([
      {
        $match: { userId: userObjectId }, // Ensure `userId` is ObjectId
      },
      {
        $lookup: {
          from: "watertanks", // Ensure correct collection name
          localField: "waterTankId",
          foreignField: "_id",
          as: "tankData",
        },
      },
      {
        $unwind: "$tankData", // Flatten array
      },
      {
        $project: {
          _id: "$tankData._id",
          name: "$tankData.name",
          serialNumber: "$tankData.serialNumber",
          size: "$tankData.size",
          height: "$tankData.height",
          x: "$tankData.x",
          z: "$tankData.z",
          location: "$tankData.location",
          connectionType: "$tankData.connectionType",
          tankType: "$tankData.tankType",
          threshold: "$tankData.threshold",
          sensorState: "$tankData.sensorState",
          createdAt: "$tankData.createdAt",
          updatedAt: "$tankData.updatedAt",
          userType: "$userType", // Include userType from TankMembership
        },
      },
    ]);
    const data = JSON.parse(JSON.stringify(tanks));
    return {
      success: true,
      message: "Tanks retrieved successfully",
      data,
    };
  } catch (error) {
    console.error("Error fetching owned tanks:", error);
    throw new Error("Error fetching tanks");
  }
}
