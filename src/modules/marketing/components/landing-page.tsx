import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ClipboardCheck,
  Home,
  LineChart,
  MapPin,
  PanelTop,
  ShieldCheck,
  SunMedium,
  Wrench,
} from "lucide-react";

import { LeadCaptureForm } from "@/modules/marketing/components/lead-capture-form";
import { siteConfig } from "@/modules/shared/config/site";
import { Button } from "@/modules/shared/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/ui/card";

const metrics = [
  { label: "Clientes atendidos", value: "420+", Icon: Home },
  { label: "Economia projetada", value: "R$ 2,8 mi", Icon: LineChart },
  { label: "Usinas monitoradas", value: "118", Icon: SunMedium },
];

const services = [
  {
    title: "Projetos residenciais",
    description:
      "Dimensionamento, proposta, homologacao e instalacao para casas e condominios.",
    Icon: Home,
  },
  {
    title: "Energia para empresas",
    description:
      "Estudos de consumo, payback e implantacao para comercios, industrias e propriedades rurais.",
    Icon: Building2,
  },
  {
    title: "Operacao e pos-venda",
    description:
      "Monitoramento, manutencao preventiva e acompanhamento documental depois da entrega.",
    Icon: ShieldCheck,
  },
];

const serviceSignals = [
  {
    title: "Homologacao completa",
    description:
      "Documentacao e concessionaria acompanhadas pela equipe tecnica.",
  },
  {
    title: "Instalacao propria",
    description:
      "Equipe local com agenda, seguranca e checklist de entrega controlados.",
  },
  {
    title: "Pos-venda ativo",
    description:
      "Monitoramento de producao, manutencao preventiva e garantia organizada.",
  },
];

const processSteps = [
  { title: "Analise da conta de luz", Icon: LineChart },
  { title: "Vistoria tecnica", Icon: MapPin },
  { title: "Projeto e homologacao", Icon: BadgeCheck },
  { title: "Instalacao e monitoramento", Icon: Wrench },
];

const operations = [
  ["Condominio Aurora", "Vistoria", "18,4"],
  ["Padaria Central", "Projeto", "9,8"],
  ["Agro Sol Noroeste", "Instal.", "48,2"],
];

export function LandingPage() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-[color:var(--line)] bg-white/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-normal text-[color:var(--field)]">
              {siteConfig.companyName}
            </p>
            <p className="truncate text-xs text-[color:var(--muted)]">
              Energia solar em {siteConfig.serviceRegion}
            </p>
          </div>
          <Button asChild size="sm">
            <a href="#team-area">
              Entrar no ERP
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1.05fr_0.95fr] md:py-16">
        <div className="flex flex-col justify-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-normal text-[color:var(--sky)]">
            Projeto, instalacao e cuidado solar
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-[color:var(--foreground)] md:text-6xl">
            Energia solar para reduzir custos sem perder previsibilidade.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[color:var(--muted)] md:text-lg">
            A Solar Care Energia projeta, instala e acompanha sistemas
            fotovoltaicos para residencias, empresas e produtores rurais, com
            atendimento local e operacao tecnica integrada.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="primary">
              <a href="#lead">
                Solicitar diagnostico
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#team-area">Entrar no ERP</a>
            </Button>
          </div>
        </div>

        <div
          id="team-area"
          className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-4 shadow-sm sm:p-5"
        >
          <div className="mb-5 flex items-center justify-between border-b border-[color:var(--line)] pb-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--sky-soft)] text-[color:var(--sky)]">
                <PanelTop aria-hidden="true" className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[color:var(--foreground)]">
                  Operacao interna
                </p>
                <p className="truncate text-xs text-[color:var(--muted)]">
                  Equipe Solar Care Energia
                </p>
              </div>
            </div>
            <span className="rounded-md bg-[color:var(--solar-soft)] px-3 py-1 text-xs font-semibold text-[#3b2b08]">
              ERP
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {metrics.map(({ Icon, ...metric }) => (
              <div
                className="min-h-28 rounded-lg border border-[color:var(--line)] p-4"
                key={metric.label}
              >
                <Icon
                  aria-hidden="true"
                  className="mb-3 size-5 text-[color:var(--field)]"
                />
                <p className="text-2xl font-bold text-[color:var(--foreground)]">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs text-[color:var(--muted)]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-lg border border-[color:var(--line)]">
            <div className="grid grid-cols-[minmax(0,1fr)_72px_64px] gap-2 border-b border-[color:var(--line)] px-3 py-3 text-xs font-semibold uppercase tracking-normal text-[color:var(--muted)] sm:grid-cols-[minmax(0,1fr)_96px_80px] sm:gap-3 sm:px-4">
              <span>Cliente</span>
              <span>Status</span>
              <span className="text-right">kWp</span>
            </div>
            {operations.map(([client, status, capacity]) => (
              <div
                className="grid grid-cols-[minmax(0,1fr)_72px_64px] gap-2 border-b border-[color:var(--line)] px-3 py-3 text-xs last:border-b-0 sm:grid-cols-[minmax(0,1fr)_96px_80px] sm:gap-3 sm:px-4 sm:text-sm"
                key={client}
              >
                <span className="truncate font-medium">{client}</span>
                <span className="truncate text-[color:var(--sky)]">{status}</span>
                <span className="text-right font-semibold">{capacity}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs leading-5 text-[color:var(--muted)]">
            Area restrita para consultores, engenharia e operacoes acompanharem
            propostas, vistorias, instalacoes e pos-venda.
          </p>
        </div>
      </section>

      <section
        className="border-t border-[color:var(--line)] bg-white px-5 py-10"
        id="services"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-normal text-[color:var(--sky)]">
              Servicos solares
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight">
              Projeto, instalacao e cuidado pos-entrega no mesmo fluxo.
            </h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {services.map(({ Icon, ...service }) => (
              <Card key={service.title}>
                <CardHeader>
                  <span className="mb-2 flex size-10 items-center justify-center rounded-lg bg-[color:var(--field-soft)] text-[color:var(--field)]">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--line)] bg-[color:var(--surface-muted)] px-5 py-10">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-[color:var(--sky)]">
              Entrega tecnica
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight">
              Cada proposta nasce com dados de campo e rotina de manutencao.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {serviceSignals.map((signal) => (
              <div
                className="rounded-lg border border-[color:var(--line)] bg-white p-4"
                key={signal.title}
              >
                <ClipboardCheck
                  aria-hidden="true"
                  className="mb-3 size-5 text-[color:var(--field)]"
                />
                <p className="text-sm font-semibold">{signal.title}</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  {signal.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--line)] px-5 py-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-normal text-[color:var(--sky)]">
            Como trabalhamos
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {processSteps.map(({ Icon, title }, index) => (
              <Card className="min-h-36" key={title}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-[color:var(--field)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      aria-hidden="true"
                      className="size-5 shrink-0 text-[color:var(--sky)]"
                    />
                  </div>
                  <CardTitle className="mt-3 text-sm">{title}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-t border-[color:var(--line)] bg-white px-5 py-10"
        id="lead"
      >
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-normal text-[color:var(--sky)]">
              Diagnostico solar
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight">
              Simule uma economia inicial e deixe a equipe retornar.
            </h2>
            <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
              A Solar Care Energia usa a triagem inicial para estimar economia,
              priorizar vistoria e preparar uma proposta com dados reais de
              consumo.
            </p>
          </div>
          <LeadCaptureForm />
        </div>
      </section>
    </main>
  );
}
