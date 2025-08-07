import { model, models, Schema, Document } from "mongoose";

export interface WaterTank extends Document {
  _id: string;
  userId: Schema.Types.ObjectId;
  serialNumber: string;
  distance: number;
  name: string;
  size: number;
  height: number;
  x: number;
  z: number;
  location: {
    long: string;
    lat: string;
  };
  threshold: number;
  sensorState: boolean;
  tankType: "water" | "diesel" | "fuel";
  connectionType: string;
  lastNotifiedLevel?: number | null;
  updatedAt: Date;
  createdAt: Date;
}

const WaterTankSchema = new Schema<WaterTank>(
  {
    name: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    serialNumber: { type: String, required: true },
    size: { type: Number },
    height: { type: Number },
    x: { type: Number },
    z: { type: Number },
    location: {
      long: { type: String },
      lat: { type: String },
    },
    connectionType: { type: String },
    distance: { type: Number },
    tankType: { type: String, default: "water" },
    threshold: { type: Number },
    sensorState: { type: Boolean },
    lastNotifiedLevel: { type: Number, default: null },
  },
  {
    timestamps: true,
  }
);

// ✅ force returning the updated doc
WaterTankSchema.post(
  "findOneAndUpdate",
  async function (doc: WaterTank | null) {
    if (!doc) return;
    try {
      // ✅ re-fetch the updated tank
      const updatedTank = await this.model.findById(doc._id);
      if (!updatedTank) return;

      const { checkAndNotifyWaterLevel } = await import(
        "@/actions/notifications/checkAndNotifyWaterLevel"
      );
      await checkAndNotifyWaterLevel(updatedTank);
    } catch (err) {
      console.error("[WaterTank Hook] checkAndNotifyWaterLevel failed:", err);
    }
  }
);

const WaterTank =
  models.WaterTank || model<WaterTank>("WaterTank", WaterTankSchema);
export default WaterTank;
export { WaterTank };
