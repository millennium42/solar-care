import { NextRequest, NextResponse } from "next/server";

import {
  demoSessionCookie,
  getPublicUrl,
  getDemoSessionCookieOptions,
} from "@/modules/auth";

export function GET(request: NextRequest) {
  const response = NextResponse.redirect(getPublicUrl(request, "/app"));

  response.cookies.set(
    demoSessionCookie.name,
    demoSessionCookie.value,
    getDemoSessionCookieOptions(),
  );

  return response;
}
