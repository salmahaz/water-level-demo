import { model, models, Schema, Document } from "mongoose";

export interface TankScanLog extends Document {
  userId: Schema.Types.ObjectId;
  serialNumber: string;
  scannedAt: Date;
}

const TankScanLogSchema = new Schema<TankScanLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    serialNumber: { type: String, required: true },
    scannedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const TankScanLog = models.TankScanLog || model("TankScanLog", TankScanLogSchema);
export default TankScanLog;
