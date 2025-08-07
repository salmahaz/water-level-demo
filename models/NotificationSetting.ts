import { model, models, Schema, Document } from "mongoose";

export interface NotificationSetting extends Document {
  userId: Schema.Types.ObjectId;
  tankId?: Schema.Types.ObjectId;
  isLeakNotifyOn?: boolean;
  isShortageNotifyOn?: boolean;
  isLevelNotifyOn?: boolean;
}

const NotificationSettingSchema = new Schema<NotificationSetting>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tankId: { type: Schema.Types.ObjectId, ref: "WaterTank" },
    isLeakNotifyOn: { type: Boolean, default: false },
    isShortageNotifyOn: { type: Boolean, default: false },
    isLevelNotifyOn: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const NotificationSetting =
  models.NotificationSetting ||
  model("NotificationSetting", NotificationSettingSchema);
export default NotificationSetting;
