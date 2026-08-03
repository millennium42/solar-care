import type { NextRequest } from "next/server";

function firstHeaderValue(value: string | null) {
  return value?.split(",")[0]?.trim() || null;
}

export function getPublicUrl(request: NextRequest, pathname: string) {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (configuredUrl) {
    return new URL(pathname, configuredUrl);
  }

  const forwardedHost = firstHeaderValue(request.headers.get("x-forwarded-host"));
  const host = forwardedHost ?? firstHeaderValue(request.headers.get("host"));
  const protocol =
    firstHeaderValue(request.headers.get("x-forwarded-proto")) ??
    request.nextUrl.protocol.replace(":", "");

  if (host) {
    return new URL(pathname, `${protocol}://${host}`);
  }

  return new URL(pathname, request.nextUrl.origin);
}
