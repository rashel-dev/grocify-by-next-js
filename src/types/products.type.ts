import mongoose from "mongoose";

interface IProduct {
    _id: mongoose.Types.ObjectId;
    name: string;
    price: string;
    image: string;
    category: string;
    unit: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default IProduct;