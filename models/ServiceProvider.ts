import mongoose, { model, models, Schema, Document, Types } from "mongoose";

export interface TankPricing {
  size: number;
  price: number;
}

export interface SelectedAddress {
  label?: string;
  fullAddress: string;
  location: {
    lat: number;
    lng: number;
  };
  instructions?: string;
}

export interface CertificationItem {
  _id?: Types.ObjectId;
  title: string;
  fileUrl: string;
}

export interface ServiceProviderDoc extends Document {
  userId: Types.ObjectId;
  truckType: "small" | "large" | null;
  tankPricing: TankPricing[];
  truckUrl: string | null;
  businessName?: string;
  fillsRooftop: boolean;
  rooftopFloors: number | null;
  selfieUrl: string | null;
  profileUrl: string | null;
  idFront: string | null;
  idBack: string | null;
  selectedAddress?: SelectedAddress;
  employees: string[];
  companyFeatures?: string[];
  certifications?: CertificationItem[];
  workArea?: string[];
}

const TankPricingSchema = new Schema<TankPricing>({
  size: { type: Number, required: true },
  price: { type: Number, required: true },
});

const SelectedAddressSchema = new Schema<SelectedAddress>({
  label: String,
  fullAddress: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  instructions: { type: String, default: "" },
});

const CertificationSchema = new Schema<CertificationItem>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true, trim: true },
  fileUrl: { type: String, required: true },
});

const ServiceProviderSchema = new Schema<ServiceProviderDoc>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    truckType: { type: String, enum: ["small", "large"], default: null },
    tankPricing: [TankPricingSchema],
    businessName: { type: String },
    truckUrl: { type: String, default: null },
    fillsRooftop: { type: Boolean, default: false },
    rooftopFloors: { type: Number, default: null, min: 1 },
    selfieUrl: { type: String, default: null },
    profileUrl: { type: String, default: null },
    idFront: { type: String, default: null },
    idBack: { type: String, default: null },
    selectedAddress: SelectedAddressSchema,
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    companyFeatures: {
      type: [String],
      default: [],
      validate: {
        validator: (arr: string[]) => arr.length <= 10,
        message: "Too many features (max 10).",
      },
    },
    certifications: {
      type: [CertificationSchema],
      default: [],
    },
    workArea: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const ServiceProvider =
  models.ServiceProvider ||
  model<ServiceProviderDoc>("ServiceProvider", ServiceProviderSchema);

export default ServiceProvider;
