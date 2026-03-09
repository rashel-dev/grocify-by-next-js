import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const {pathname} = request.nextUrl;

    console.log(pathname);

    return NextResponse.next();
}