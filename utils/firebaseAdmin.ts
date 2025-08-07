// utils/firebaseAdmin.ts
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env.local") }); // ⬅️ force it to load from root

import admin from "firebase-admin";

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  console.log("🔥 initializing firebase-admin with:");
  console.log({
    projectId,
    clientEmail,
    privateKeyStartsWith: privateKey?.slice(0, 30),
  });

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

export const adminMessaging = admin.messaging();
