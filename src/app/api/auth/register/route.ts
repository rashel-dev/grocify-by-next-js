import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { name, email, password } = await req.json();
        
        const newUser = await User.create({
            name,
            email,
            password
        })

        return NextResponse.json({
            success: true,
            message: "User registered successfully",
            user: newUser
        }, {status: 201})
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to register user",
            error: error
        }, {status: 500})
    }
}