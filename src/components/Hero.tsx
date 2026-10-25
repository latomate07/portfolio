import { useTranslation } from "react-i18next";
import { ArrowUpRight, CalendarRange, Package, Rocket } from "lucide-react";
import avatar from "../assets/avatar.webp";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { GithubMark } from "./icons/GithubMark";

const METRIC_ICONS = [CalendarRange, Rocket, Package];

export function Hero() {
  const { t } = useTranslation();
  const tags = t("hero.tags", { returnObjects: true }) as string[];
  const metrics = t("hero.metrics", { returnObjects: true }) as {
    value: string;
    label: string;
  }[];

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col overflow-hidden bg-panel lg:flex-row"
    >
      {/* Left panel */}
      <div className="relative min-h-[60vh] flex-1 overflow-hidden bg-panel text-cream lg:min-h-screen">
        <img
          src={avatar}
          alt="Tahirou LAOUAN MAGAGI"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-panel/90 via-panel/10 to-panel/95"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-panel/40 via-transparent to-transparent"
        />

        <div className="relative z-10 flex h-full min-h-[60vh] flex-col justify-between px-8 pt-10 pb-10 sm:px-12 lg:min-h-screen lg:px-16">
          <div className="max-w-sm">
            <p className="font-display text-xl font-bold tracking-tight drop-shadow-sm sm:text-2xl">
              {t("hero.brand")}
            </p>
            <ul className="mt-4 space-y-1.5 text-sm font-medium text-cream/80 drop-shadow-sm sm:text-base">
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>

          <div className="max-w-sm">
            <p className="font-display text-lg font-semibold drop-shadow-sm sm:text-xl">
              {t("hero.role")}
            </p>
            <p className="mt-1 text-sm text-cream/75 drop-shadow-sm sm:text-base">
              {t("hero.subrole")}
            </p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="relative flex flex-1 flex-col justify-between rounded-t-[2.5rem] bg-cream px-8 pt-12 pb-10 sm:px-12 lg:rounded-t-none lg:rounded-l-[3rem] lg:-ml-10 lg:px-16 lg:py-14">
        <div className="absolute top-6 right-6 sm:top-8 sm:right-10">
          <LanguageSwitcher />
        </div>

        <div>
          <p className="font-display text-5xl font-extrabold leading-none text-ink sm:text-6xl">
            {t("hero.greeting")} <span aria-hidden>👋</span>
          </p>

          <h1 className="font-display mt-6 text-3xl leading-[1.1] font-bold text-ink sm:text-4xl lg:text-[2.75rem]">
            {t("hero.headingLine1")}
            <br />
            {t("hero.headingLine2")}
            <br />
            {t("hero.headingLine3")}
          </h1>

          <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-ink/70 sm:text-lg">
            <p>{t("hero.paragraph1")}</p>
            <p>{t("hero.paragraph2")}</p>
          </div>

        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
          {metrics.map((metric, i) => {
            const Icon = METRIC_ICONS[i % METRIC_ICONS.length];
            return (
              <div
                key={metric.label}
                className="relative overflow-hidden rounded-3xl bg-sage p-4 sm:p-5"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -bottom-4 h-20 w-20 opacity-20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, var(--color-sage-line) 0 2px, transparent 2px 7px)",
                  }}
                />
                <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink">
                  <Icon size={16} />
                </span>
                <p className="font-display relative z-10 mt-3 text-2xl font-extrabold text-ink sm:text-3xl">
                  {metric.value}
                </p>
                <p className="relative z-10 mt-1 text-xs leading-snug text-ink/60 sm:text-sm">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#skills"
            className="group inline-flex items-center gap-2 font-display text-xl font-bold text-ink transition-colors hover:text-accent sm:text-2xl"
          >
            {t("hero.cta")}
            <ArrowUpRight
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              size={26}
            />
          </a>
          <a
            href="https://github.com/latomate07"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-accent hover:text-ink"
          >
            <GithubMark size={18} />
            {t("hero.ctaGithub")}
          </a>
        </div>
      </div>
    </section>
  );
}
