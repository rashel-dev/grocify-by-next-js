import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const {role,mobile} = await req.json();
        const session = await auth();

        // check if user is logged in
        if(!session || !session.user?.email) {
            return NextResponse.json(
                {message: "Unauthorized"}, 
                {status: 401}
            )
        }

        // update user role and mobile
        const user = await User.findOneAndUpdate(
            {email: session.user.email}, 
            {role, mobile}
        )

        // check if user is updated
        if(!user) {
            return NextResponse.json(
                {message: "User not found"}, 
                {status: 404}
            )
        }

        return NextResponse.json(
            {message: "User updated successfully",
                data: {
                    id: user._id,
                    role: user.role,
                    mobile: user.mobile
                }
            },  
            {status: 200}
        )
        
    } catch (error) {
        return NextResponse.json(
            {message: "Internal server error", error}, 
            {status: 500}
        )
    }
}