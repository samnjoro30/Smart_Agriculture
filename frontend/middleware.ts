import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/auth/login", "/auth/register"];

// List of protected routes
const PROTECTED_ROUTES = ["/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  console.log("Middleware check:",{
    path: pathname,
    hasToken: !!token,
  })

  // Determine if this is a public route
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  // Determine if this is a protected route
  if (isPublicRoute) {
    // If logged in → redirect to dashboard
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }


  // ✅ Protect dashboard ONLY
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};