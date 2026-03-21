import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/auth/login", "/auth/register"];
const PROTECTED_ROUTES = ["/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  console.log("Middleware check:", {
    path: pathname,
    token: token,
    hasToken: !!token,
  });

  const isPublicRoute = PUBLIC_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  // 🟢 1. If user is logged in and tries to access auth pages → redirect to dashboard
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const isValidToken =
  token && token !== "undefined" && token !== "null";

  // 🔐 2. Protect dashboard routes
  if (isProtectedRoute && !isValidToken) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 🟢 3. Allow everything else
  //return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/:path*",
  ],
};