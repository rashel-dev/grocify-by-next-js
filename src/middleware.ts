import { auth } from "@/auth";
import { NextResponse } from "next/server";
export const middleware = auth((request) => {
    const { pathname } = request.nextUrl;
    const publicRoutes = ["/login", "/register", "/api/auth"];
    if (publicRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.next();
    }
    if (!request.auth) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", request.url);
        return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
});
export const config = {
    matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
