import Image from "next/image";
import { AboutToc } from "@/components/live/AboutToc";
import { CtaButton } from "@/components/live/CtaButton";
import { SectionHeading } from "@/components/live/SectionHeading";
import { about, devices, person, roles } from "@/content";
import { buildMetadata, buildSchema, JsonLd } from "@/lib/seo";
import { formatMonth, toMonth } from "@/lib/timeline";

const path = "/about";

const toc = [
  { id: "introduction", label: "Introduction" },
  { id: "experience", label: "Experience" },
  { id: "studies", label: "Studies" },
  { id: "skills", label: "Skills" },
];

export function generateMetadata() {
  return buildMetadata({ title: about.title, description: about.description, path });
}

export default function About() {
  const newestFirst = [...roles].sort((a, b) => b.from.localeCompare(a.from));
  const period = (from: string, to: string | null) =>
    `${formatMonth(toMonth(from))} to ${to === null ? "now" : formatMonth(toMonth(to))}`;

  return (
    <>
      <JsonLd
        schema={buildSchema({
          as: "webPage",
          title: about.title,
          description: about.description,
          path,
        })}
      />
      <main
       
        className="live-wrap grid grid-cols-[180px_minmax(0,1fr)] items-start gap-12 py-14 max-lg:grid-cols-[minmax(0,1fr)] max-md:py-8"
      >
        <div className="max-lg:hidden">
          <AboutToc items={toc} />
        </div>
        <div className="max-w-[72ch]">
          <section id="introduction" className="mb-16 scroll-mt-24">
            <Image
              src={person.avatar}
              alt={person.name}
              width={96}
              height={96}
              priority
              className="mb-5 size-24 rounded-[var(--r)] object-cover"
            />
            <SectionHeading as="h1" lede={person.role}>
              {person.name}
            </SectionHeading>
            <p className="mb-8 text-base leading-relaxed">{about.intro}</p>
            <CtaButton href={about.calendarHref} label="Book a call" />
          </section>

          <section id="experience" className="mb-16 scroll-mt-24">
            <SectionHeading>Experience</SectionHeading>
            <ol className="m-0 flex list-none flex-col gap-10 p-0">
              {newestFirst.map((r) => (
                <li key={`${r.company}-${r.from}`}>
                  <h3 className="text-lg font-bold">{r.title}</h3>
                  <p className="mb-1 text-muted">{r.company}</p>
                  <p className="mb-3 font-mono text-[12.5px] text-muted">
                    {period(r.from, r.to)}
                  </p>
                  <ul className="m-0 flex list-disc flex-col gap-2 pl-5">
                    {r.achievements.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>

          <section id="studies" className="mb-16 scroll-mt-24">
            <SectionHeading>Studies</SectionHeading>
            <ul className="m-0 flex list-none flex-col gap-4 p-0">
              {about.studies.map((s) => (
                <li key={s.name}>
                  <h3 className="text-lg font-bold">{s.name}</h3>
                  <p className="text-muted">{s.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="skills" className="scroll-mt-24">
            <SectionHeading>Skills</SectionHeading>
            <div className="flex flex-col gap-6">
              {devices.map((d) => (
                <div key={d.name}>
                  <h3 className="mb-2 text-sm font-bold [font-variation-settings:'wdth'_88]">
                    {d.name}
                  </h3>
                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                    {d.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-[var(--r)] border border-line bg-panel px-2.5 py-1 text-[12.5px]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
