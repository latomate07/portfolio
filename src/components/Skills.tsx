import { useTranslation } from "react-i18next";
import {
  Code2,
  Cloud,
  Workflow,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";

type Card = { title: string; description: string };

const ICONS: LucideIcon[] = [Code2, Cloud, Workflow, BrainCircuit];

export function Skills() {
  const { t } = useTranslation();
  const cards = t("skills.cards", { returnObjects: true }) as Card[];

  return (
    <section id="skills" className="bg-cream px-8 py-20 sm:px-12 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <p className="font-display text-sm font-bold tracking-[0.2em] text-accent uppercase">
          {t("skills.eyebrow")}
        </p>
        <h2 className="font-display mt-3 max-w-2xl text-3xl font-bold text-ink sm:text-4xl">
          {t("skills.heading")}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">
          {t("skills.intro")}
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {cards.map((card, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={card.title}
                className="group rounded-3xl border border-ink/10 bg-white/60 p-7 transition-colors hover:border-accent/40 hover:bg-accent-soft/40"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-panel text-accent transition-colors group-hover:bg-accent group-hover:text-ink">
                  <Icon size={22} />
                </div>
                <h3 className="font-display mt-5 text-xl font-bold text-ink">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70 sm:text-base">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
