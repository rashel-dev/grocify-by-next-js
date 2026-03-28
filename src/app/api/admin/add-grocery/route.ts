import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const session = await auth();

        if(session?.user?.role !== "admin") {
            return NextResponse.json({message: "You are not authorized to perform this action"}, {status: 401});
        }

        const formData = await req.formData();

        const name = formData.get("name") as string;
        const unit = formData.get("unit") as string;
        const price = formData.get("price") as string;
        const category = formData.get("category") as string;
        const image = formData.get("image") as File;

        if(!name || !unit || !price || !category || !image){
            return NextResponse.json({message: "All fields are required"}, {status: 400});
        }

        let imageUrl

        if(image){
            imageUrl = await uploadOnCloudinary(image);
        }

        const grocery = await Product.create({
            name,
            unit,
            price,
            category,
            image: imageUrl
        });

        return NextResponse.json({message: "Grocery added successfully", grocery}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Internal server error", error}, {status: 500});
    }
}