"use server";

import connectMongodb from "@/utils/dbConnection";
import mongoose from "mongoose";
import TankMembership from "@/models/TankMembership";

export async function getWaterTankAndUserType({
  tankId,
  userId,
}: {
  tankId: string;
  userId: string;
}) {
  await connectMongodb();

  if (!tankId || !userId) {
    return {
      success: false,
      message: "Tank ID and User ID are required",
      data: null,
    };
  }

  try {
    const tankObjectId = new mongoose.Types.ObjectId(tankId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const tank = await TankMembership.aggregate([
      {
        $match: {
          userId: userObjectId,
          waterTankId: tankObjectId,
        },
      },
      {
        $lookup: {
          from: "watertanks",
          localField: "waterTankId",
          foreignField: "_id",
          as: "tankData",
        },
      },
      {
        $unwind: "$tankData",
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
          thresholdDistance: "$tankData.thresholdDistance",
          sensorState: "$tankData.sensorState",
          isLevelNotifyOn: "$tankData.isLevelNotifyOn",
          isShortageNotifyOn: "$tankData.isShortageNotifyOn",
          isLeakNotifyOn: "$tankData.isLeakNotifyOn",
          createdAt: "$tankData.createdAt",
          updatedAt: "$tankData.updatedAt",
          userType: "$userType", // Include from membership
          userId: "$userId",
        },
      },
    ]);

    if (!tank.length) {
      return {
        success: false,
        message: "Tank not found or user is not a member",
        data: null,
      };
    }

    return {
      success: true,
      message: "Tank retrieved successfully",
      data: tank[0],
    };
  } catch (error) {
    console.error("Error fetching tank by ID:", error);
    return {
      success: false,
      message: "Error fetching tank",
      data: null,
    };
  }
}
