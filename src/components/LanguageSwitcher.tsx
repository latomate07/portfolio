import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
] as const;

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage?.startsWith("fr") ? "fr" : "en";

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-ink/10 bg-white/70 p-1 text-xs font-semibold backdrop-blur ${className}`}
      role="group"
      aria-label="Language switcher"
    >
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => i18n.changeLanguage(code)}
          aria-pressed={current === code}
          className={`rounded-full px-3 py-1 transition-colors cursor-pointer ${
            current === code
              ? "bg-ink text-cream"
              : "text-ink/60 hover:text-ink"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
