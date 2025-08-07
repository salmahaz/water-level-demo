// actions/notifications/checkAndNotifyWaterLevel.ts
import Tank from "@/models/Tank";
import User from "@/models/User";
import { adminMessaging } from "@/utils/firebaseAdmin";


export async function checkAndNotifyWaterLevel(tankId: string) {
  const tank = await Tank.findById(tankId);
  if (
    !tank ||
    typeof tank.height !== "number" ||
    typeof tank.distance !== "number" ||
    typeof tank.threshold !== "number"
  ) {
    throw new Error("Tank data incomplete.");
  }

  const waterLevelPercent = ((tank.height - tank.distance) / tank.height) * 100;

  if (waterLevelPercent < tank.threshold) {
    const user = await User.findById(tank.userId);
    if (!user?.fcmToken) return;

    const payload = {
      token: user.fcmToken,
      notification: {
        title: "🚨 Water Level Low",
        body: `Your tank "${tank.name}" is below the threshold.`,
      },
    };

    try {
      await adminMessaging.send(payload);
      console.log(`✅ Notification sent for tank ${tank.name}`);
    } catch (err) {
      console.error("❌ Failed to send FCM:", err);
    }

    tank.lastNotifiedLevel = waterLevelPercent;
    await tank.save();
  }
}
