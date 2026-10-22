import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, MapPin } from "lucide-react";

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

function SkillChip({ skill }: { skill: Skill }) {
  const icon = TECH_ICONS[skill.id];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-medium text-ink/70">
      {icon && <img src={icon} alt="" className="h-3.5 w-3.5" />}
      {skill.label}
    </span>
  );
}

function Timeline({
  logos,
  renderItem,
  count,
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

export function Experience() {
  const { t } = useTranslation();
  const jobs = t("experience.jobs", { returnObjects: true }) as Job[];
  const education = t("experience.education", { returnObjects: true }) as Education[];

  return (
    <section id="experience" className="bg-cream-soft py-20">
      <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16">
        <h2 className="font-display max-w-2xl text-4xl leading-[1.05] font-extrabold tracking-tight text-ink sm:text-5xl">
          {t("experience.heading")}
        </h2>

        <div className="mt-14 grid gap-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-ink/50 uppercase">
              {t("experience.workLabel")}
            </p>
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
            <p className="text-xs font-bold tracking-[0.15em] text-ink/50 uppercase">
              {t("experience.eduLabel")}
            </p>
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
    </section>
  );
}
