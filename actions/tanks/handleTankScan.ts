"use server";

import TankMembership from "@/models/TankMembership";
import TankScanLog from "@/models/TankScanLog";
import User from "@/models/User";
import WaterTank from "@/models/Tank";
import connectMongodb from "@/utils/dbConnection";

export async function handleTankScan(
  userId: string,
  serialNumber: string,
  latitude?: string,
  longitude?: string,
) {
  if (!serialNumber) {
    throw new Error("Missing serial number");
  }

  if (!userId) {
    throw new Error("Missing user ID");
  }

  await connectMongodb();

  try {
    // Step 1: Check if tank exists
    let existingTank = await WaterTank.findOne({ serialNumber });

    const user = await User.findById(userId).select("userRole");

    if (!user) {
      throw new Error("User not found");
    }

    const isAgent = user?.userRole?.includes("agent");

    if (isAgent) {
      // Always log scan
      await TankScanLog.create({ userId, serialNumber, latitude, longitude });

      if (existingTank) {
        // Tank exists: check if agent is already linked
        const agentMembership = await TankMembership.findOne({
          userId,
          waterTankId: existingTank._id,
          userType: "agent",
        });

        if (!agentMembership) {
          await TankMembership.create({
            userId,
            waterTankId: existingTank._id,
            userType: "agent",
          });
        }

        return {
          success: true,
          message: "Agent linked to existing tank",
          userType: "agent",
          tank: JSON.parse(JSON.stringify(existingTank)),
        };
      } else {
        // Tank does not exist
        return {
          success: true,
          message: "Tank does not exist, create new tank",
          userType: "agent",
        };
      }
    }

    if (existingTank) {
      // Not an agent: normal user

      const existingMemberships = await TankMembership.find({
        waterTankId: existingTank._id,
      });

      const ownerMembership = existingMemberships.find(
        (membership) => membership.userType === "owner",
      );

      if (
        existingTank &&
        ownerMembership &&
        ownerMembership.userId.toString() === userId
      ) {
        // Tank exists and user is owner
        return {
          success: true,
          message: "Tank already exists.",
          userType: "owner",
        };
      }

      if (ownerMembership && ownerMembership.userId.toString() !== userId) {
        // Owner already exists and is not the current user
        // Assign as viewer
        // Owner exists -> assign as viewer

        const existingViewer = await TankMembership.findOne({
          userId,
          waterTankId: existingTank._id,
          userType: "viewer",
        });

        if (!existingViewer) {
          await TankMembership.create({
            userId,
            waterTankId: existingTank._id,
            userType: "viewer",
          });
        }

        return {
          success: true,
          message: "User assigned as viewer",
          userType: "viewer",
          tank: JSON.parse(JSON.stringify(existingTank)),
        };
      } else {
        // No owner yet -> assign as owner

        await TankMembership.create({
          userId,
          waterTankId: existingTank._id,
          userType: "owner",
        });

        existingTank.userId = userId;
        existingTank.location = {
          lat: latitude || existingTank.location.lat,
          long: longitude || existingTank.location.long,
        };
        await existingTank.save();

        return {
          success: true,
          message: "User assigned as owner, tank updated",
          userType: "owner",
          tank: JSON.parse(JSON.stringify(existingTank)),
        };
      }
    } else {
      // No tank exists, and not an agent -> owner flow
      return {
        success: true,
        message: "Tank does not exist, redirecting to setup",
        userType: "owner",
        tank: null,
      };
    }
  } catch (error) {
    console.error("Error processing tank scan:", error);
    throw new Error("Error processing request");
  }
}
