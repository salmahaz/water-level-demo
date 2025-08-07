import { model, models, Schema, Document } from "mongoose";

export interface FCMToken extends Document {
  userId: Schema.Types.ObjectId;
  deviceId: string;
  token: string;
  platform: "android" | "ios" | "web";
}

const FCMTokenSchema = new Schema<FCMToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    deviceId: { type: String, required: true },
    token: { type: String, required: true },
    platform: { type: String, enum: ["android", "ios", "web"], required: true },
  },
  { timestamps: true },
);

// Create compound unique index on userId and deviceId
// This ensures one token per device per user, but allows same token across different users/devices
FCMTokenSchema.index({ userId: 1, deviceId: 1 }, { unique: true });

// Create index on token for efficient lookups (not unique)
FCMTokenSchema.index({ token: 1 });

const FCMToken = models.FCMToken || model("FCMToken", FCMTokenSchema);
export default FCMToken;
