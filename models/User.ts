import { model, models, Schema, Document } from "mongoose";

export interface AddressDetails {
  _id?: string;
  label?: string;
  fullAddress: string;
  location: { lat: number; lng: number };
  instructions?: string;
}

export interface SelectedAddress {
  _id?: string;
  label?: string;
  fullAddress: string;
  location?: { lat: number; lng: number } | null;
  instructions?: string;
}

export interface User extends Document {
  _id: string;
  name: string;
  businessName?: string;
  prefix?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  verificationCode?: string;
  addresses?: AddressDetails[];
  userRole?: string[];
  orders?: Schema.Types.ObjectId[];
  selectedAddress?: SelectedAddress;
  profileUrl: string;
  language: string;
  isPartner: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  fcmTokens?: Schema.Types.ObjectId[];
}

const AddressDetailsSchema = new Schema<AddressDetails>({
  label: String,
  fullAddress: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  instructions: { type: String, default: "" },
});

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  businessName: { type: String },
  prefix: { type: String },
  phoneNumber: { type: String, required: true },
  isPartner: { type: Boolean },
  selectedAddress: AddressDetailsSchema,
  email: String,
  password: { type: String, select: false },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  addresses: [AddressDetailsSchema], // embedded field
  userRole: [String],
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  fcmTokens: [{ type: Schema.Types.ObjectId, ref: "FCMToken" }],
});

const User = models.User || model("User", UserSchema);
export default User;
