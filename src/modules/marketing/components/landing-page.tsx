import { siteConfig } from "@/modules/shared/config/site";

const metrics = [
  { label: "Projetos ativos", value: "42" },
  { label: "Receita prevista", value: "R$ 2,8 mi" },
  { label: "Pendencias criticas", value: "7" },
];

const services = [
  "CRM para contas, contatos e oportunidades",
  "ERP para propostas, vistorias e instalacoes",
  "Seeds demo para apresentacao consistente",
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
              Operacao solar comercial
            </p>
          </div>
          <a
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[color:var(--foreground)] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--field)] focus:outline-none focus:ring-2 focus:ring-[color:var(--solar)] focus:ring-offset-2"
            href="#erp-preview"
          >
            Entrar no ERP
          </a>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1.05fr_0.95fr] md:py-16">
        <div className="flex flex-col justify-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-normal text-[color:var(--sky)]">
            MVP demonstravel
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-[color:var(--foreground)] md:text-6xl">
            Energia solar com CRM e ERP em uma unica operacao.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[color:var(--muted)] md:text-lg">
            A Solar Care Energia usa este ambiente demo para acompanhar vendas,
            propostas, vistorias e instalacoes sem depender de servicos externos.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[color:var(--field)] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#176e4d] focus:outline-none focus:ring-2 focus:ring-[color:var(--solar)] focus:ring-offset-2"
              href="#erp-preview"
            >
              Entrar no ERP
            </a>
            <a
              className="inline-flex h-11 items-center justify-center rounded-lg border border-[color:var(--line)] bg-white px-5 text-sm font-semibold text-[color:var(--foreground)] transition hover:border-[color:var(--field)] focus:outline-none focus:ring-2 focus:ring-[color:var(--solar)] focus:ring-offset-2"
              href="#services"
            >
              Ver modulos
            </a>
          </div>
        </div>

        <div
          id="erp-preview"
          className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-sm"
        >
          <div className="mb-5 flex items-center justify-between border-b border-[color:var(--line)] pb-4">
            <div>
              <p className="text-sm font-semibold text-[color:var(--foreground)]">
                Painel demo
              </p>
              <p className="text-xs text-[color:var(--muted)]">
                {siteConfig.demoEmail}
              </p>
            </div>
            <span className="rounded-lg bg-[color:var(--solar)] px-3 py-1 text-xs font-semibold text-[#3b2b08]">
              Preview
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
              <span>Conta</span>
              <span>Etapa</span>
              <span className="text-right">Valor</span>
            </div>
            {[
              ["Condominio Aurora", "Vistoria", "R$ 148k"],
              ["Padaria Central", "Proposta", "R$ 82k"],
              ["Agro Sol Noroeste", "Instalacao", "R$ 390k"],
            ].map(([account, stage, value]) => (
              <div
                className="grid grid-cols-[minmax(0,1fr)_72px_64px] gap-2 border-b border-[color:var(--line)] px-3 py-3 text-xs last:border-b-0 sm:grid-cols-[minmax(0,1fr)_96px_80px] sm:gap-3 sm:px-4 sm:text-sm"
                key={account}
              >
                <span className="truncate font-medium">{account}</span>
                <span className="truncate text-[color:var(--sky)]">{stage}</span>
                <span className="text-right font-semibold">{value}</span>
              </div>
            ))}
          </div>
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
              key={service}
            >
              <p className="text-sm font-semibold leading-6">{service}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
