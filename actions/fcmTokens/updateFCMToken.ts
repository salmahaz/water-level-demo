"use server";

import connectMongodb from "@/utils/dbConnection";
import FCMToken from "@/models/FCMToken";
import User from "@/models/User";

export async function updateFCMToken({
  userId,
  deviceId,
  token,
  platform,
}: {
  userId: string;
  deviceId: string;
  token: string;
  platform: "web" | "ios" | "android";
}) {
  try {
    await connectMongodb();

    await FCMToken.updateOne(
      { userId, deviceId },
      {
        $set: {
          token,
          platform,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          userId,
          deviceId,
          createdAt: new Date(),
        },
      },
      { upsert: true },
    );

    // Fetch the FCMToken document to get its _id
    const fcmTokenDoc = await FCMToken.findOne({ userId, deviceId });
    const tokenId = fcmTokenDoc?._id;

    // Step 2: Add the token ID to user's fcmTokens array if not already present
    if (tokenId) {
      await User.updateOne(
        { _id: userId, fcmTokens: { $ne: tokenId } },
        { $push: { fcmTokens: tokenId } }
      );
    }
    return { success: true };
  } catch (error) {
    console.error("[FCM] Failed to save token:", error);
    return { success: false, message: "Failed to save token" };
  }
}
