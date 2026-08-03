import { NextRequest, NextResponse } from "next/server";

import { demoSessionCookie, getPublicUrl } from "@/modules/auth";

export function GET(request: NextRequest) {
  const response = NextResponse.redirect(getPublicUrl(request, "/"));

  response.cookies.set(demoSessionCookie.name, "", {
    maxAge: 0,
    path: "/",
  });

  return response;
}
