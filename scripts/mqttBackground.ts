import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

import mongoose from "mongoose";
import mqtt from "mqtt";
import Tank from "@/models/Tank";
import NotificationSetting from "@/models/NotificationSetting";
import FCMToken from "@/models/FCMToken";
import { adminMessaging } from "@/utils/firebaseAdmin";

// Connect to MongoDB
async function connectMongodb() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("❌ MONGO_URI not defined in .env.local");

    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

// Notify if water level below threshold
async function checkAndNotifyWaterLevel(tank: any) {
  const { height, distance, threshold, name, userId, lastNotifiedLevel } = tank;

  console.log(`⚙️  checkAndNotifyWaterLevel() called for: ${name}`);
  console.log(`🔎 height: ${height} | distance: ${distance} | threshold: ${threshold}`);
  const level = ((height - distance) / height) * 100;
  console.log(`📊 Calculated level: ${level.toFixed(1)}%`);
  console.log(`📉 Last notified level: ${lastNotifiedLevel}`);

  if (
    typeof height !== "number" ||
    typeof distance !== "number" ||
    typeof threshold !== "number"
  ) {
    console.warn("⚠️ Invalid tank data");
    return;
  }

  const shouldNotify =
    level < threshold &&
    (lastNotifiedLevel === null || level < lastNotifiedLevel - 5);

  if (!shouldNotify) {
    console.log("ℹ️ Level above threshold or not significantly changed → no notification.");
    return;
  }

  const notifySetting = await NotificationSetting.findOne({
    userId,
    tankId: tank._id,
  });
  if (!notifySetting?.isLevelNotifyOn) {
    console.log("🔕 Notification disabled for this tank");
    return;
  }

  const tokenDoc = await FCMToken.findOne({ userId });
  if (!tokenDoc?.token) {
    console.warn(`🚫 No token found for userId: ${userId}`);
    return;
  }

  const token = tokenDoc.token;

  await adminMessaging.send({
    token,
    notification: {
      title: "🚨 Low Water Level",
      body: `Your tank "${name}" is below the threshold: ${level.toFixed(1)}%`,
    },
  });

  console.log(`🔔 Notification sent for tank "${name}"`);

  tank.lastNotifiedLevel = level;
  await tank.save();
  console.log(`✅ Updated lastNotifiedLevel to: ${level.toFixed(1)}%`);
}

// Start MQTT connection and subscribe to tank topics
async function startMqttListener() {
  await connectMongodb();

  const tanks = await Tank.find({});
  if (!tanks.length) {
    console.warn("⚠️ No tanks found in database");
    return;
  }

  const brokerUrl = process.env.NEXT_PUBLIC_MQTT_BROKER_URL!;
  const username = process.env.NEXT_PUBLIC_MQTT_USERNAME!;
  const password = process.env.NEXT_PUBLIC_MQTT_PASSWORD!;

  const client = mqtt.connect(brokerUrl, {
    port: 8883,
    protocol: "mqtts",
    protocolId: "MQTT",
    protocolVersion: 5,
    username,
    password,
    clean: false,
    clientId: `mqtt_bg_${Math.random().toString(16).slice(2)}`,
  });

  client.on("connect", () => {
    console.log("📡 MQTT connected");

    tanks.forEach((tank) => {
      const topic = `${tank.serialNumber}/distance`;

      client.subscribe(topic, (err) => {
        if (err) {
          console.error(`❌ Failed to subscribe to ${topic}:`, err);
        } else {
          console.log(`✅ Subscribed to ${topic}`);
        }
      });
    });
  });

  client.on("error", (err) => {
    console.error("❌ MQTT client error:", err);
  });

  client.on("message", async (topic, message) => {
    try {
      const [serial] = topic.split("/");
      const data = JSON.parse(message.toString());
      const rawDistance = Number(data?.distance);

      if (isNaN(rawDistance)) {
        console.warn(`⚠️ Received invalid distance: ${data?.distance}`);
        return;
      }

      const tank = await Tank.findOne({ serialNumber: serial });
      if (!tank) {
        console.warn(`🚫 No tank found for serial: ${serial}`);
        return;
      }

      const offset = Number(tank.x ?? 0);
      if (isNaN(offset)) {
        console.warn(`⚠️ Invalid offset for tank "${tank.name}"`);
        return;
      }

      const distance = Math.round(rawDistance / 10 - offset);
      if (isNaN(distance)) {
        console.warn(`⚠️ Invalid calculated distance → raw: ${rawDistance}, offset: ${offset}`);
        return;
      }

      tank.distance = distance;
      await tank.save();

      console.log(`📦 Updated "${tank.name}" → distance: ${distance}`);
      await checkAndNotifyWaterLevel(tank);
    } catch (err) {
      console.error("❌ Error in MQTT message:", err);
    }
  });
}

startMqttListener();
