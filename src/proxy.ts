import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { pathname } = req.nextUrl;

    const publicRoutes = ["/login", "/register"];

    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

    // if Not logged in + trying to access private page
    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next|favicon.ico).*)"],
};