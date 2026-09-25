import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    const protectedRoutes = ["/products", "/dashboard"];
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname === "/login" && token) {
        return NextResponse.redirect(new URL("/products", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/products/:path*", "/dashboard/:path*", "/login"],
};