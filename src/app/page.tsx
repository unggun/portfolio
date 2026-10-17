import { devices, home } from "@/content";
import { ArrangementSection } from "@/components/live/ArrangementSection";
import { DeviceChain } from "@/components/live/DeviceChain";
import { HomeHero } from "@/components/live/HomeHero";
import { SectionHeading } from "@/components/live/SectionHeading";
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
        <SectionHeading lede="What I reach for, from agent tooling to the rig I run at live shows. Each device can be bypassed, just like in Live.">
          The signal chain
        </SectionHeading>
        <DeviceChain devices={devices} />
      </section>
    </>
  );
}
