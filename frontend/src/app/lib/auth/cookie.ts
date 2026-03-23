import { NextResponse } from "next/server";

export function setAuthCookies(
    response: NextResponse,
    accessToken: string,
    refreshToken: string
){
    response.cookies.set("access_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
    });
    if (refreshToken){
        response.cookies.set("refresh_token", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
        });
    }
}

export function clearAuthCookie(response: NextResponse){
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
}