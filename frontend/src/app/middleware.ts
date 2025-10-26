// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    // ✅ Token is valid, allow access
    return NextResponse.next();
  } catch (err) {
    console.error("Invalid or expired token:", err);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

// ✅ Protect specific routes (adjust as needed)
export const config = {
  matcher: ["/dashboard/:path*"],
};
