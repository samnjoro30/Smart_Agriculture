
import { NextResponse } from 'next/server';
import type { NextRequest } from "next/server";
import { jwtVerify } from 'jose';

export async function ProtectRoute (req: NextResponse){
    const token = req.cookies.get('access_token')?.value;

    if (!token){
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"], 
  };
