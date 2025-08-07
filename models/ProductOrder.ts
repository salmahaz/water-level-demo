import { model, models, Schema } from "mongoose";

export interface Item {
  _id: string;
  name: string;
  value: string;
  price: number;
  offeredPrice?: number;
  imageUrl?: string;
  quantity: number;
}

export interface ProductOrder {
  _id: string;
  number: string;
  totalAmount: number;
  offeredTotal?: number;
  status: string;
  address: string;
  items: Item[];
  userId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProductOrderSchema = new Schema<ProductOrder>({
  number: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  offeredTotal: { type: Number },
  status: { type: String, default: "new" },
  address: { type: String, default: "", required: false },
  items: [
    {
      name: { type: String, required: true },
      value: String,
      price: { type: Number, required: true },
      offeredPrice: { type: Number },
      imageUrl: String,
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: new Date(), required: true },
  updatedAt: { type: Date, default: new Date(), required: true },
});

const ProductOrder =
  models.ProductOrder || model("ProductOrder", ProductOrderSchema);
export default ProductOrder;
