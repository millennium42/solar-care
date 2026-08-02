import { siteConfig } from "@/modules/shared/config/site";

export const demoUser = {
  company: siteConfig.companyName,
  email: siteConfig.demoEmail,
  id: "demo-user",
  name: "Demo Solar Care",
  role: "Gestor de operacoes",
} as const;

export type DemoUser = typeof demoUser;
