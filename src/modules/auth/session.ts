import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { demoUser } from "@/modules/auth/config/demo-user";

export const demoSessionCookie = {
  maxAge: 60 * 60 * 8,
  name: "solar-care-demo-session",
  value: "demo-user-v1",
} as const;

export function getDemoSessionCookieOptions() {
  return {
    httpOnly: true,
    maxAge: demoSessionCookie.maxAge,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

export async function getDemoSession() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(demoSessionCookie.name)?.value;

  if (sessionValue !== demoSessionCookie.value) {
    return null;
  }

  return demoUser;
}

export async function requireDemoSession() {
  const session = await getDemoSession();

  if (!session) {
    redirect("/");
  }

  return session;
}
