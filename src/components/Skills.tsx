import { useRef, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";

type Card = { eyebrow: string; heading: string; description: string };

function WidgetShell({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(15,45,51,0.08)]">
      {children}
    </div>
  );
}

function FullStackWidget() {
  const lines = [
    "import { Hero } from './Hero'",
    "<Hero avatar={me} />",
    "<Skills stack={stack} />",
  ];
  return (
    <WidgetShell>
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 text-[11px] font-medium text-ink/40">App.tsx</span>
      </div>
      <div className="mt-3 space-y-1.5 font-mono text-[11px] text-ink/60">
        {lines.map((line) => (
          <p key={line} className="truncate">
            {line}
          </p>
        ))}
      </div>
    </WidgetShell>
  );
}

function CloudWidget() {
  return (
    <WidgetShell>
      <div className="flex items-center gap-4">
        <div
          className="relative h-16 w-16 shrink-0 rounded-full"
          style={{
            background:
              "conic-gradient(var(--color-accent) 0 92%, var(--color-cream-soft) 92% 100%)",
          }}
        >
          <div className="absolute inset-1.5 flex items-center justify-center rounded-full bg-white text-[11px] font-bold text-ink">
            99.9%
          </div>
        </div>
        <div className="space-y-1 text-[11px]">
          <p className="font-semibold text-ink">Uptime</p>
          <p className="text-ink/50">us-east-1 · eu-west-3</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
        <div className="rounded-lg bg-cream-soft px-2.5 py-2">
          <p className="text-ink/50">Latency</p>
          <p className="font-semibold text-ink">42ms</p>
        </div>
        <div className="rounded-lg bg-cream-soft px-2.5 py-2">
          <p className="text-ink/50">Regions</p>
          <p className="font-semibold text-ink">3 AZ</p>
        </div>
      </div>
    </WidgetShell>
  );
}

function DevOpsWidget() {
  const steps = [
    { label: "Build", done: true },
    { label: "Test", done: true },
    { label: "Plan", done: true },
    { label: "Deploy", done: false },
  ];
  return (
    <WidgetShell>
      <p className="text-[11px] font-semibold text-ink/50">$ terraform apply</p>
      <div className="mt-3 space-y-2">
        {steps.map((step) => (
          <div key={step.label} className="flex items-center gap-2 text-[11px]">
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                step.done ? "bg-panel text-cream" : "bg-accent text-ink"
              }`}
            >
              {step.done ? "✓" : "…"}
            </span>
            <span className="w-12 text-ink/70">{step.label}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream-soft">
              <span
                className="block h-full rounded-full bg-panel"
                style={{ width: step.done ? "100%" : "55%" }}
              />
            </span>
          </div>
        ))}
      </div>
    </WidgetShell>
  );
}

function MlOpsWidget() {
  const bars = [40, 55, 48, 70, 65, 88, 94];
  return (
    <WidgetShell>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold text-ink/50">Model accuracy</p>
        <p className="text-[11px] font-bold text-ink">94.2%</p>
      </div>
      <div className="mt-3 flex h-16 items-end gap-1.5">
        {bars.map((h, i) => (
          <span
            key={i}
            className={`flex-1 rounded-t-sm ${i === bars.length - 1 ? "bg-accent" : "bg-accent/50"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </WidgetShell>
  );
}

const WIDGETS = [FullStackWidget, CloudWidget, DevOpsWidget, MlOpsWidget];

export function Skills() {
  const { t } = useTranslation();
  const headingLines = t("skills.headingLines", { returnObjects: true }) as string[];
  const cards = t("skills.cards", { returnObjects: true }) as Card[];
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? 340) + 20;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <section id="skills" className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display max-w-3xl text-4xl leading-[1.05] font-extrabold tracking-tight text-ink uppercase sm:text-5xl lg:text-6xl">
            {headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream cursor-pointer"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="[scrollbar-width:none] mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-8 pb-4 sm:px-12 lg:px-16 [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, i) => {
          const Widget = WIDGETS[i % WIDGETS.length];
          return (
            <article
              key={card.eyebrow}
              data-card
              className="relative flex w-[82vw] max-w-sm shrink-0 snap-start flex-col overflow-hidden rounded-[2rem] bg-sage p-7 sm:w-90"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 -bottom-6 h-32 w-32 opacity-40"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, var(--color-sage-line) 0 2px, transparent 2px 7px)",
                }}
              />

              <div className="relative z-10 flex items-start justify-between gap-4">
                <p className="text-xs font-bold tracking-[0.15em] text-ink/60 uppercase">
                  {card.eyebrow}
                </p>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink">
                  <Plus size={16} />
                </span>
              </div>

              <h3 className="font-display relative z-10 mt-4 text-xl leading-snug font-bold text-ink sm:text-2xl">
                {card.heading}
              </h3>
              <p className="relative z-10 mt-2 text-sm text-ink/60">{card.description}</p>

              <div className="relative z-10 mt-6">
                <Widget />
              </div>
            </article>
          );
        })}
        <div aria-hidden className="w-2 shrink-0" />
      </div>
    </section>
  );
}
