import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, MapPin, ArrowDown, Layers, List } from "lucide-react";

import awsIcon from "../assets/logos/tech/amazonwebservices.svg";
import typescriptIcon from "../assets/logos/tech/typescript.svg";
import nodeIcon from "../assets/logos/tech/nodedotjs.svg";
import reactIcon from "../assets/logos/tech/react.svg";
import datadogIcon from "../assets/logos/tech/datadog.svg";
import laravelIcon from "../assets/logos/tech/laravel.svg";
import dockerIcon from "../assets/logos/tech/docker.svg";
import wordpressIcon from "../assets/logos/tech/wordpress.svg";
import vueIcon from "../assets/logos/tech/vuedotjs.svg";
import sassIcon from "../assets/logos/tech/sass.svg";
import javascriptIcon from "../assets/logos/tech/javascript.svg";
import jqueryIcon from "../assets/logos/tech/jquery.svg";
import tailwindIcon from "../assets/logos/tech/tailwindcss.svg";
import pythonIcon from "../assets/logos/tech/python.svg";
import javaIcon from "../assets/logos/tech/openjdk.svg";

import fortuneoLogo from "../assets/logos/companies/fortuneo.png";
import shinLogo from "../assets/logos/companies/shin-agency.png";
import lynxLogo from "../assets/logos/companies/lynx-business.png";
import esilvLogo from "../assets/logos/companies/esilv.png";
import eceLogo from "../assets/logos/companies/ece.png";
import f2iLogo from "../assets/logos/companies/institut-f2i.svg";

const TECH_ICONS: Record<string, string> = {
  aws: awsIcon,
  typescript: typescriptIcon,
  nodejs: nodeIcon,
  react: reactIcon,
  datadog: datadogIcon,
  laravel: laravelIcon,
  docker: dockerIcon,
  wordpress: wordpressIcon,
  vuejs: vueIcon,
  sass: sassIcon,
  javascript: javascriptIcon,
  jquery: jqueryIcon,
  tailwind: tailwindIcon,
  python: pythonIcon,
  java: javaIcon,
};

const JOB_LOGOS = [fortuneoLogo, shinLogo, lynxLogo];
const EDU_LOGOS = [esilvLogo, eceLogo, f2iLogo];

type Skill = { id: string; label: string };

type Job = {
  role: string;
  company: string;
  type: string;
  start: string;
  end: string;
  duration: string;
  location: string;
  mode: string;
  skills: Skill[];
};

type Education = {
  school: string;
  degree: string;
  field: string;
  start: string;
  end: string;
  skills: Skill[];
};

type Entry = {
  kind: "work" | "edu";
  logo: string;
  title: string;
  org: string;
  meta: string;
  start: string;
  end: string;
  duration?: string;
  skills: Skill[];
};

function jobsToEntries(jobs: Job[]): Entry[] {
  return jobs.map((job, i) => ({
    kind: "work" as const,
    logo: JOB_LOGOS[i],
    title: job.role,
    org: job.company,
    meta: `${job.type} · ${job.location} · ${job.mode}`,
    start: job.start,
    end: job.end,
    duration: job.duration,
    skills: job.skills,
  }));
}

function eduToEntries(education: Education[]): Entry[] {
  return education.map((edu, i) => ({
    kind: "edu" as const,
    logo: EDU_LOGOS[i],
    title: edu.degree,
    org: edu.school,
    meta: edu.field,
    start: edu.start,
    end: edu.end,
    skills: edu.skills,
  }));
}

function SkillChip({ skill, large = false }: { skill: Skill; large?: boolean }) {
  const icon = TECH_ICONS[skill.id];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white font-medium text-ink/70 ${
        large ? "gap-2 px-4 py-2 text-sm" : "px-3 py-1 text-xs"
      }`}
    >
      {icon && <img src={icon} alt="" className={large ? "h-4 w-4" : "h-3.5 w-3.5"} />}
      {skill.label}
    </span>
  );
}

/* ---------------------------------------------------------------- */
/* View toggle (slider / roadmap)                                    */
/* ---------------------------------------------------------------- */

type ViewMode = "slider" | "roadmap";

function ViewToggle({ mode, onChange }: { mode: ViewMode; onChange: (m: ViewMode) => void }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-ink/10 bg-white/90 p-1 shadow-lg backdrop-blur">
      <button
        type="button"
        onClick={() => onChange("slider")}
        aria-label="Slider view"
        aria-pressed={mode === "slider"}
        className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors ${
          mode === "slider" ? "bg-ink text-cream" : "text-ink/50 hover:text-ink"
        }`}
      >
        <Layers size={16} />
      </button>
      <button
        type="button"
        onClick={() => onChange("roadmap")}
        aria-label="Roadmap view"
        aria-pressed={mode === "roadmap"}
        className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors ${
          mode === "roadmap" ? "bg-ink text-cream" : "text-ink/50 hover:text-ink"
        }`}
      >
        <List size={16} />
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Slider view — full-screen Hero-style stacked slides               */
/* ---------------------------------------------------------------- */

function EntrySlide({
  entry,
  label,
  index,
  total,
  active,
}: {
  entry: Entry;
  label: string;
  index: number;
  total: number;
  active: boolean;
}) {
  return (
    <section className="relative flex h-full flex-col overflow-hidden bg-panel lg:flex-row">
      <div className="relative flex min-h-[42vh] flex-1 flex-col overflow-hidden bg-panel px-8 pt-10 pb-8 text-cream sm:px-12 lg:min-h-screen lg:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative z-10 flex items-center justify-between">
          <p className="font-display text-sm font-bold tracking-[0.2em] text-cream/60 uppercase">
            {label}
          </p>
          <p className="font-display text-sm font-bold tracking-[0.2em] text-cream/40">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>

        <div className="relative z-10 m-auto flex w-full max-w-xs flex-col items-center gap-6 text-center">
          <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-4xl bg-white shadow-2xl ring-4 ring-cream/10 sm:h-40 sm:w-40">
            <img src={entry.logo} alt="" className="h-full w-full object-contain p-5" />
          </div>
          <p className="font-display text-2xl font-extrabold sm:text-3xl">{entry.org}</p>
          <div className="flex flex-col items-center gap-1">
            {entry.duration && (
              <p className="font-display text-3xl leading-none font-extrabold text-accent sm:text-4xl">
                {entry.duration}
              </p>
            )}
            <span className="inline-flex items-center gap-1.5 text-xs text-cream/50">
              <Calendar size={12} />
              {entry.start} – {entry.end}
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col justify-center rounded-t-[2.5rem] bg-cream-soft px-8 py-12 sm:px-12 lg:rounded-t-none lg:rounded-l-[3rem] lg:-ml-10 lg:px-16">
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <h3 className="font-display text-4xl leading-[1.05] font-extrabold text-ink sm:text-5xl lg:text-6xl">
            {entry.title}
          </h3>

          {entry.meta && (
            <p className="mt-5 flex items-start gap-2 text-lg text-ink/60 sm:text-xl">
              <MapPin size={20} className="mt-1 shrink-0" />
              {entry.meta}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-2.5">
            {entry.skills.map((skill) => (
              <SkillChip key={skill.id} skill={skill} large />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContinueSlide({
  heading,
  cta,
  onContinue,
}: {
  heading: string;
  cta: string;
  onContinue: () => void;
}) {
  return (
    <section className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-panel px-8 text-center text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-accent/10 blur-3xl"
      />

      <h3 className="font-display relative z-10 max-w-xl text-4xl leading-[1.1] font-extrabold sm:text-5xl">
        {heading}
      </h3>

      <button
        type="button"
        onClick={onContinue}
        className="group relative z-10 mt-10 inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-8 py-4 text-lg font-bold text-ink transition-transform hover:scale-105"
      >
        {cta}
        <ArrowDown size={20} className="transition-transform group-hover:translate-y-1" />
      </button>
    </section>
  );
}

type StackItem = { kind: "cta" } | Entry;

function SliderView({
  jobs,
  education,
  workLabel,
  eduLabel,
  continueHeading,
  continueCta,
  headerHeight,
}: {
  jobs: Job[];
  education: Education[];
  workLabel: string;
  eduLabel: string;
  continueHeading: string;
  continueCta: string;
  headerHeight: number;
}) {
  const [showEducation, setShowEducation] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intersectingRef = useRef<Set<number>>(new Set());

  const jobEntries = jobsToEntries(jobs);
  const eduEntries = eduToEntries(education);
  const stack: StackItem[] = [
    ...jobEntries,
    ...(showEducation ? [] : [{ kind: "cta" as const }]),
    ...(showEducation ? eduEntries : []),
  ];
  const totalRealEntries = jobEntries.length + (showEducation ? eduEntries.length : 0);

  // Extra scroll distance held "in reserve" below each slide: the slide
  // stays pinned/frozen while the user scrolls through it, instead of the
  // next one immediately sliding in.
  const RUNWAY_RATIO = 0.6;

  useEffect(() => {
    // Every sticky slide stays mounted "stuck" behind the ones that follow
    // it, so several can report isIntersecting at once (same on-screen
    // rect). The visually frontmost slide is always the highest index
    // (highest z-index), so track the whole intersecting set and pick its
    // max — this stays correct scrolling in either direction.
    const observer = new IntersectionObserver(
      (observed) => {
        observed.forEach((obs) => {
          const idx = Number((obs.target as HTMLElement).dataset.index);
          if (obs.isIntersecting) {
            intersectingRef.current.add(idx);
          } else {
            intersectingRef.current.delete(idx);
          }
        });
        if (intersectingRef.current.size > 0) {
          setActiveIndex(Math.max(...intersectingRef.current));
        }
      },
      // threshold 0: a slide's wrapper is now taller than the viewport
      // (it includes the freeze runway), so its visible ratio never gets
      // close to 1 — any overlap at all is enough to count as "on screen".
      { threshold: 0 },
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [stack.length]);

  let realCounter = -1;

  return (
    <div className="relative bg-panel">

      {stack.map((item, i) => {
        // The last slide has nothing after it to cover it, so it can't be
        // "sticky" (it would never get the scroll runway needed to release
        // and would stay pinned forever). Render it in normal flow instead.
        const isLast = i === stack.length - 1;
        const wrapperClassName = isLast ? "relative" : "sticky";
        const wrapperStyle = {
          top: headerHeight,
          height: isLast
            ? `calc(100vh - ${headerHeight}px)`
            : `calc((100vh - ${headerHeight}px) * ${1 + RUNWAY_RATIO})`,
          zIndex: i + 1,
        };
        const slideStyle = { height: `calc(100vh - ${headerHeight}px)` };

        if (item.kind === "cta") {
          return (
            <div
              key="cta"
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              data-index={i}
              className={wrapperClassName}
              style={wrapperStyle}
            >
              <div style={slideStyle}>
                <ContinueSlide
                  heading={continueHeading}
                  cta={continueCta}
                  onContinue={() => setShowEducation(true)}
                />
              </div>
            </div>
          );
        }

        realCounter += 1;
        const realIndex = realCounter;

        return (
          <div
            key={item.org + item.title}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            data-index={i}
            className={wrapperClassName}
            style={wrapperStyle}
          >
            <div style={slideStyle}>
              <EntrySlide
                entry={item}
                label={item.kind === "work" ? workLabel : eduLabel}
                index={realIndex}
                total={totalRealEntries}
                active={activeIndex === i}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Roadmap view — compact two-column timeline                        */
/* ---------------------------------------------------------------- */

function Timeline({
  logos,
  count,
  renderItem,
}: {
  logos: string[];
  count: number;
  renderItem: (index: number) => { title: string; children: ReactNode };
}) {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => {
        const { title, children } = renderItem(i);
        const isLast = i === count - 1;
        return (
          <div key={title + i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
                <img src={logos[i]} alt="" className="h-full w-full object-contain p-2" />
              </div>
              {!isLast && <div className="my-2 w-px flex-1 bg-ink/10" />}
            </div>
            <div className={isLast ? "flex-1" : "flex-1 pb-10"}>{children}</div>
          </div>
        );
      })}
    </div>
  );
}

function RoadmapView({
  jobs,
  education,
  workLabel,
  eduLabel,
}: {
  jobs: Job[];
  education: Education[];
  workLabel: string;
  eduLabel: string;
}) {
  return (
    <div className="bg-cream-soft px-8 pb-20 sm:px-12 lg:px-16">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="text-xs font-bold tracking-[0.15em] text-ink/50 uppercase">{workLabel}</p>
          <div className="mt-6">
            <Timeline
              logos={JOB_LOGOS}
              count={jobs.length}
              renderItem={(i) => {
                const job = jobs[i];
                return {
                  title: job.company,
                  children: (
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink">{job.role}</h3>
                      <p className="mt-0.5 text-sm font-medium text-ink/70">
                        {job.company} · {job.type}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink/50">
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={13} />
                          {job.start} – {job.end} · {job.duration}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={13} />
                          {job.location} · {job.mode}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <SkillChip key={skill.id} skill={skill} />
                        ))}
                      </div>
                    </div>
                  ),
                };
              }}
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.15em] text-ink/50 uppercase">{eduLabel}</p>
          <div className="mt-6">
            <Timeline
              logos={EDU_LOGOS}
              count={education.length}
              renderItem={(i) => {
                const edu = education[i];
                return {
                  title: edu.school,
                  children: (
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink">{edu.school}</h3>
                      <p className="mt-0.5 text-sm font-medium text-ink/70">{edu.degree}</p>
                      {edu.field && <p className="mt-0.5 text-xs text-ink/50">{edu.field}</p>}
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink/50">
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={13} />
                          {edu.start} – {edu.end}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {edu.skills.map((skill) => (
                          <SkillChip key={skill.id} skill={skill} />
                        ))}
                      </div>
                    </div>
                  ),
                };
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Main                                                               */
/* ---------------------------------------------------------------- */

export function Experience() {
  const { t } = useTranslation();
  const jobs = t("experience.jobs", { returnObjects: true }) as Job[];
  const education = t("experience.education", { returnObjects: true }) as Education[];
  const workLabel = t("experience.workLabel");
  const eduLabel = t("experience.eduLabel");
  const continueHeading = t("experience.continueHeading");
  const continueCta = t("experience.continueCta");

  const [view, setView] = useState<ViewMode>("slider");
  const [showHeader, setShowHeader] = useState(true);
  const [stuck, setStuck] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setShowHeader(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = topSentinelRef.current;
    if (!el) return;
    // A 0px-tall marker sitting right above the sticky header: once it
    // scrolls past the top of the viewport, the header has become "stuck".
    const observer = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    // Slides sit right below the sticky header (whatever its current
    // height) so its content is never hidden underneath it.
    const resizeObserver = new ResizeObserver(([entry]) => setHeaderHeight(entry.contentRect.height));
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div id="experience" className="relative">
      <div ref={topSentinelRef} aria-hidden />
      <div
        ref={headerRef}
        className={`sticky top-0 z-50 flex flex-wrap items-center justify-between gap-6 bg-cream-soft transition-all duration-300 ease-out ${
          showHeader ? "opacity-100" : "pointer-events-none opacity-0"
        } ${stuck ? "px-8 py-3 sm:px-12 lg:px-16" : "px-8 py-6 sm:px-12 sm:py-8 lg:px-16"}`}
      >
        <h2
          className={`font-display font-extrabold tracking-tight text-ink transition-all duration-300 ease-out ${
            stuck ? "text-base sm:text-lg" : "text-2xl sm:text-3xl"
          }`}
        >
          {t("experience.heading")}
        </h2>
        <ViewToggle mode={view} onChange={setView} />
      </div>

      {view === "slider" ? (
        <SliderView
          jobs={jobs}
          education={education}
          workLabel={workLabel}
          eduLabel={eduLabel}
          continueHeading={continueHeading}
          continueCta={continueCta}
          headerHeight={headerHeight}
        />
      ) : (
        <RoadmapView jobs={jobs} education={education} workLabel={workLabel} eduLabel={eduLabel} />
      )}

      <div ref={sentinelRef} aria-hidden className="h-px" />
    </div>
  );
}
