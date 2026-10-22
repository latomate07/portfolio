import { useTranslation } from "react-i18next";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubMark } from "./icons/GithubMark";

const EMAIL = "lmtahirou@gmail.com";
const GITHUB_URL = "https://github.com/latomate07";
const CURRENT_YEAR = new Date().getFullYear();

function NameMark() {
  return (
    <div
      className="w-full overflow-hidden py-4 sm:py-6"
      style={{
        backgroundImage:
          "repeating-linear-gradient(100deg, color-mix(in oklab, var(--color-ink) 6%, transparent) 0 1px, transparent 1px 5px), linear-gradient(120deg, var(--color-sage) 0%, var(--color-accent-soft) 100%)",
      }}
    >
      <svg
        viewBox="0 0 1600 340"
        preserveAspectRatio="none"
        className="fill-ink block w-full h-auto"
        role="img"
        aria-label="Tahirou LAOUAN MAGAGI"
      >
        <text
          x="0"
          y="150"
          textLength="1600"
          lengthAdjust="spacingAndGlyphs"
          fontSize="170"
          className="font-display font-extrabold"
        >
          TAHIROU
        </text>
        <text
          x="0"
          y="320"
          textLength="1600"
          lengthAdjust="spacingAndGlyphs"
          fontSize="170"
          className="font-display font-extrabold"
        >
          LAOUAN MAGAGI
        </text>
      </svg>
    </div>
  );
}

export function Contact() {
  const { t } = useTranslation();

  return (
    <>
    <section
      id="contact"
      className="bg-panel px-8 py-20 text-cream sm:px-12 lg:px-16"
    >
      <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
        <div>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            {t("contact.heading")}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-cream/70 sm:text-lg">
            {t("contact.paragraph")}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center justify-between gap-6 rounded-full border border-cream/20 px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            <span className="inline-flex items-center gap-2">
              <Mail size={18} />
              {t("contact.email")}
            </span>
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center justify-between gap-6 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
          >
            <span className="inline-flex items-center gap-2">
              <GithubMark size={18} />
              {t("contact.github")}
            </span>
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>

      <div className="mt-16 border-t border-cream/10 pt-6 text-xs text-cream/50">
        © {CURRENT_YEAR} Tahirou LAOUAN MAGAGI — {t("footer.rights")}
      </div>
    </section>
    <NameMark />
    </>
  );
}
