import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solar Care Energia",
  description: "CRM e ERP demo para instaladoras de energia solar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
