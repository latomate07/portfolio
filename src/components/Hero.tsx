import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import avatar from "../assets/avatar.webp";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { GithubMark } from "./icons/GithubMark";

export function Hero() {
  const { t } = useTranslation();
  const tags = t("hero.tags", { returnObjects: true }) as string[];

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col overflow-hidden bg-panel lg:flex-row"
    >
      {/* Left panel */}
      <div className="relative flex min-h-[55vh] flex-1 flex-col justify-between overflow-hidden bg-linear-to-br from-panel via-panel to-panel-soft px-8 pt-10 pb-0 text-cream sm:px-12 lg:min-h-screen lg:pb-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative z-10 max-w-sm">
          <p className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            {t("hero.brand")}
          </p>
          <ul className="mt-4 space-y-1.5 text-sm font-medium text-cream/70 sm:text-base">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 mx-auto mt-10 w-full max-w-xs sm:max-w-sm lg:mt-0">
          <div className="absolute inset-x-6 bottom-0 h-16 rounded-full bg-black/30 blur-2xl" />
          <img
            src={avatar}
            alt="Tahirou LAOUAN MAGAGI"
            className="relative mx-auto w-full max-w-70 rounded-4xl object-cover shadow-2xl ring-4 ring-cream/10 sm:max-w-80"
            width={320}
            height={320}
          />
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

          <p className="mt-8 -rotate-2 font-display text-xl text-accent sm:text-2xl">
            {t("hero.signature")}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
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
