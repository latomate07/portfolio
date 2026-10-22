import { useTranslation } from "react-i18next";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubMark } from "./icons/GithubMark";

const EMAIL = "lmtahirou@gmail.com";
const GITHUB_URL = "https://github.com/latomate07";
const CURRENT_YEAR = new Date().getFullYear();

const HATCH_PATTERN =
  "repeating-linear-gradient(135deg, var(--color-sage-line) 0 2px, transparent 2px 7px)";

export function Contact() {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="relative overflow-hidden bg-sage">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: HATCH_PATTERN }} />

      <div className="relative z-10 px-8 py-20 sm:px-12 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              {t("contact.heading")}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink/60 sm:text-lg">
              {t("contact.paragraph")}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-center justify-between gap-6 rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
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
              className="group inline-flex items-center justify-between gap-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-accent hover:text-ink"
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

        <div className="mt-16 border-t border-ink/10 pt-6 text-xs text-ink/50">
          © {CURRENT_YEAR} Tahirou LAOUAN MAGAGI — {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
