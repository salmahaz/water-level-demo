import { model, models, Schema, Document } from "mongoose";

export type OrderType = "refill" | "cleaning";
export type OrderStatus = "pending" | "on-going";

export interface TankDetail {
  id: string;
  capacity: number;
  notes?: string;
}

export interface AddressDetails {
  label?: string;
  fullAddress: string;
  location: {
    lat: number;
    lng: number;
  };
  instructions?: string;
}

export interface Order extends Document {
  userId: Schema.Types.ObjectId;
  orderType: OrderType;
  pinCode: number;
  address: AddressDetails;
  deliveryTime: string;
  payment: string;
  cancelled: boolean;
  truckType?: string;
  capacity?: number;
  tanks?: TankDetail[];
  total: number;
  assignedTo?: Schema.Types.ObjectId;
  status: OrderStatus;
  voucherCode?: string | null;
  requiresRooftopRefill?: boolean;
  buildingFloors?: number | null;
  tankLocation?: string;
}

const TankSchema = new Schema<TankDetail>(
  {
    id: { type: String, required: true },
    capacity: { type: Number, required: true },
    notes: { type: String },
  },
  { _id: false },
);

const AddressDetailsSchema = new Schema<AddressDetails>(
  {
    label: String,
    fullAddress: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    instructions: { type: String, default: "" },
  },
  { _id: false },
);

const OrderSchema = new Schema<Order>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderType: {
      type: String,
      enum: ["refill", "cleaning"],
      required: true,
    },
    pinCode: { type: Number, required: true },
    address: { type: AddressDetailsSchema, required: true }, //  embedded address
    deliveryTime: { type: String, default: "" },
    payment: { type: String, required: true },
    truckType: String,
    tankLocation: { type: String, default: "" },
    capacity: Number,
    tanks: [TankSchema],
    cancelled: { type: Boolean, default: false },
    total: { type: Number, required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    requiresRooftopRefill: { type: Boolean, default: false },
    buildingFloors: { type: Number, default: null },
    status: {
      type: String,
      enum: ["pending", "on-going"],
      default: "pending",
    },
    voucherCode: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const Order = models.Order || model("Order", OrderSchema);
export default Order;
