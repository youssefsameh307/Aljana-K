import { NextResponse } from "next/server";

export function middleware(req) {
    // const cookie = req.cookies.get('token');
    return NextResponse.next();
}
