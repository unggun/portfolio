import Link from "next/link";
import { SectionHeading } from "@/components/live/SectionHeading";

export default function NotFound() {
  return (
    <main className="live-wrap py-24 max-md:py-14">
      <SectionHeading as="h1" lede="This page isn't in the set.">
        Clip not found
      </SectionHeading>
      <Link href="/" className="font-bold text-accent underline underline-offset-4">
        Back to the session
      </Link>
    </main>
  );
}
