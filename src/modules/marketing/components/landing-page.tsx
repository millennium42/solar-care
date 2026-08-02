import { siteConfig } from "@/modules/shared/config/site";

const metrics = [
  { label: "Clientes atendidos", value: "420+" },
  { label: "Economia projetada", value: "R$ 2,8 mi" },
  { label: "Usinas monitoradas", value: "118" },
];

const services = [
  {
    title: "Projetos residenciais",
    description:
      "Dimensionamento, proposta, homologacao e instalacao para casas e condominios.",
  },
  {
    title: "Energia para empresas",
    description:
      "Estudos de consumo, payback e implantacao para comercios, industrias e propriedades rurais.",
  },
  {
    title: "Operacao e pos-venda",
    description:
      "Monitoramento, manutencao preventiva e acompanhamento documental depois da entrega.",
  },
];

const processSteps = [
  "Analise da conta de luz",
  "Vistoria tecnica",
  "Projeto e homologacao",
  "Instalacao e monitoramento",
];

export function LandingPage() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-[color:var(--line)] bg-white/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-[color:var(--field)]">
              {siteConfig.companyName}
            </p>
            <p className="text-xs text-[color:var(--muted)]">
              Energia solar em {siteConfig.serviceRegion}
            </p>
          </div>
          <a
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[color:var(--foreground)] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--field)] focus:outline-none focus:ring-2 focus:ring-[color:var(--solar)] focus:ring-offset-2"
            href="#team-area"
          >
            Entrar no ERP
          </a>
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
            <a
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[color:var(--field)] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#176e4d] focus:outline-none focus:ring-2 focus:ring-[color:var(--solar)] focus:ring-offset-2"
              href="#services"
            >
              Conhecer servicos
            </a>
            <a
              className="inline-flex h-11 items-center justify-center rounded-lg border border-[color:var(--line)] bg-white px-5 text-sm font-semibold text-[color:var(--foreground)] transition hover:border-[color:var(--field)] focus:outline-none focus:ring-2 focus:ring-[color:var(--solar)] focus:ring-offset-2"
              href="#team-area"
            >
              Entrar no ERP
            </a>
          </div>
        </div>

        <div
          id="team-area"
          className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-sm"
        >
          <div className="mb-5 flex items-center justify-between border-b border-[color:var(--line)] pb-4">
            <div>
              <p className="text-sm font-semibold text-[color:var(--foreground)]">
                Operacao interna
              </p>
              <p className="text-xs text-[color:var(--muted)]">
                Equipe Solar Care Energia
              </p>
            </div>
            <span className="rounded-lg bg-[color:var(--solar)] px-3 py-1 text-xs font-semibold text-[#3b2b08]">
              ERP
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                className="rounded-lg border border-[color:var(--line)] p-4"
                key={metric.label}
              >
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
            {[
              ["Condominio Aurora", "Vistoria", "18,4"],
              ["Padaria Central", "Projeto", "9,8"],
              ["Agro Sol Noroeste", "Instal.", "48,2"],
            ].map(([client, status, capacity]) => (
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
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {services.map((service) => (
            <div
              className="rounded-lg border border-[color:var(--line)] p-5"
              key={service.title}
            >
              <p className="text-base font-semibold leading-6">
                {service.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[color:var(--line)] px-5 py-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-normal text-[color:var(--sky)]">
            Como trabalhamos
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <div
                className="rounded-lg border border-[color:var(--line)] bg-white p-4"
                key={step}
              >
                <span className="text-sm font-bold text-[color:var(--field)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-sm font-semibold leading-6">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
