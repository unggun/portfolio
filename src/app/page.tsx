import { home } from "@/content";
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
    </>
  );
}
