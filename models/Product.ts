import { model, models, Schema } from "mongoose";

export interface Variation {
  _id: string;
  coverImageUrl?: string;
  isAvailable?: boolean;
  stockQuantity?: number;
  price: number;
  offeredPrice?: number;
  percentageOff?: number;
  name: string;
  value: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  offeredPrice?: number;
  percentageOff?: number;
  description?: string;
  imageUrls?: string[];
  coverImageIndex?: number;
  isAvailable?: boolean;
  stockQuantity?: number;
  category?: Schema.Types.ObjectId;
  variations?: Variation[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<Product>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  offeredPrice: { type: Number },
  percentageOff: { type: Number },
  description: String,
  imageUrls: [String],
  coverImageIndex: Number,
  isAvailable: { type: Boolean, default: true },
  stockQuantity: Number,
  variations: [
    {
      coverImageUrl: String,
      isAvailable: { type: Boolean, default: true },
      stockQuantity: Number,
      price: { type: Number, required: true },
      offeredPrice: { type: Number },
      percentageOff: { type: Number },
      name: String,
      value: String,
    },
  ],
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  createdAt: { type: Date, default: new Date(), required: true },
  updatedAt: { type: Date, default: new Date(), required: true },
});
const Product = models.Product || model("Product", ProductSchema);
export default Product;
