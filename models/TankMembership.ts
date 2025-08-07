import { model, models, Schema } from "mongoose";

export interface TankMembership extends Document {
    userId: Schema.Types.ObjectId;
    waterTankId: Schema.Types.ObjectId;
    userType: "owner" | "viewer" | "agent" ; 
    createdAt: Date;
}

const TankMembershipSchema = new Schema<TankMembership>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    waterTankId: { type: Schema.Types.ObjectId, ref: "WaterTank", required: true },
    userType: { type: String, enum: ["owner", "viewer" , "agent"], required: true },
  },
  { timestamps: true }
);

const TankMembership = models.TankMembership || model("TankMembership", TankMembershipSchema);
export default TankMembership;