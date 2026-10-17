import { devices, home } from "@/content";
import { ArrangementSection } from "@/components/live/ArrangementSection";
import { DeviceChain } from "@/components/live/DeviceChain";
import { HomeHero } from "@/components/live/HomeHero";
import { buildMetadata, buildSchema, JsonLd } from "@/lib/seo";

const path = "/";

export function generateMetadata() {
  return buildMetadata({ title: home.title, description: home.description, path });
}

export default function Home() {
  return (
    <>
      <JsonLd
        schema={buildSchema({ as: "webPage", title: home.title, description: home.description, path })}
      />
      <HomeHero />
      <ArrangementSection />
      <section id="skills" className="live-wrap py-[72px] max-[920px]:py-12">
        <h2 className="mb-2.5 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.02] font-extrabold tracking-[-.015em] text-balance [font-variation-settings:'wdth'_125]">
          The signal chain
        </h2>
        <p className="mb-8 max-w-[58ch] text-base text-muted">
          What I reach for, from agent tooling to the rig I run at live shows. Each device can be
          bypassed, just like in Live.
        </p>
        <DeviceChain devices={devices} />
      </section>
    </>
  );
}
