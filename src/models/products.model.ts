import IProduct from "@/types/products.type";
import { model, models, Schema } from "mongoose";

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Fruits & Vegetable", "Dairy & Eggs", "Rice, Atta & Grains", "Snacks & Biscuits", "Spices & Masalas", "Beverages & Drinks", "Home & Personal Care", "Household Essentials", "Baby Care", "Pet Care", "Instant Foods", "other"],
        required: true
    },
    unit: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const Product = models.Product || model<IProduct>("Product", productSchema);

export default Product