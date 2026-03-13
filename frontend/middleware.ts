import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/auth/login",
  "/auth/register",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const isApiRoute = pathname.startsWith("/api");

  console.log("Middleware running:", pathname);

  // 1️⃣ Protect API routes
  if (isApiRoute) {
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  // 2️⃣ Protect pages (dashboard etc.)
  if (!token && !isPublicRoute) {
    const loginUrl = new URL("/auth/login", request.url);

    // preserve the page user tried to visit
    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // 3️⃣ Prevent logged-in users from visiting login page
  if (token && pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/:path*",
    "/auth/login",
  ],
};