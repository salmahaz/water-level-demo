import { model, models, Schema } from "mongoose";

export interface Voucher extends Document {
  userId: Schema.Types.ObjectId;
  orderType: "refill" | "cleaning";
  currentCount: number;
//   goalCount: number;
  voucherCode: string;
  isUsed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
const VoucherSchema = new Schema<Voucher>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderType: { type: String, enum: ["refill", "cleaning"], required: true },
    currentCount: { type: Number, default: 0 },
    // goalCount: { type: Number, default: 3 },
    voucherCode: { type: String, required: true, unique: true },
    isUsed: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Voucher = models.Voucher || model("Voucher", VoucherSchema);
export default Voucher;
