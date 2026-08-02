import { NextRequest, NextResponse } from "next/server";

import {
  demoSessionCookie,
  getDemoSessionCookieOptions,
} from "@/modules/auth";

export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/app", request.url));

  response.cookies.set(
    demoSessionCookie.name,
    demoSessionCookie.value,
    getDemoSessionCookieOptions(),
  );

  return response;
}
