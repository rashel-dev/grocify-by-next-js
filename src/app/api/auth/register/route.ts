import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        if(!name || !email || !password){
            return NextResponse.json({
                success: false,
                message: "All fields are required",
            }, {status: 400})
        }

        const normalizedEmail = email.trim().toLowerCase();

        await dbConnect();

        const existingUser = await User.findOne({email:normalizedEmail});

        if(existingUser) {
            return NextResponse.json({
                success: false,
                message: "User already exists",
            }, { status: 400})
        }
        
        if(password.length < 6) {
            return NextResponse.json({
                success: false,
                message: "Password must be at least 6 character long",
            }, { status: 400})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email:normalizedEmail,
            password:hashedPassword
        })

        return NextResponse.json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        }, {status: 201})
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Failed to register user",
        }, {status: 500})
    }
}