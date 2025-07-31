import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: Number,
    image: String,
    affiliateLink: String,
    category: String,
  },
  { timestamps: true }
);

export const Product = mongoose.models?.Product || mongoose.model("Product", ProductSchema);