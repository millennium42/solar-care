import { NextRequest, NextResponse } from "next/server";

import { demoSessionCookie } from "@/modules/auth";

export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/", request.url));

  response.cookies.set(demoSessionCookie.name, "", {
    maxAge: 0,
    path: "/",
  });

  return response;
}
