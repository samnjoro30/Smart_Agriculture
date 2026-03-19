import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/auth/login", "/auth/register"];

// List of protected routes
const PROTECTED_ROUTES = ["/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  // Determine if this is a public route
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // Determine if this is a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(route + "/")
  );

  // ✅ 1. Block unauthenticated access to protected routes
  if (isProtectedRoute && !token) {
    // Avoid redirect loop: only redirect if not already on login
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ 2. Redirect logged-in users away from auth pages
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ✅ 3. Allow all other requests
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", // all dashboard routes
    "/auth/:path*",      // all auth routes
  ],
};