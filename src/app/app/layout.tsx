import { requireDemoSession } from "@/modules/auth";

export default async function ErpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireDemoSession();

  return children;
}
