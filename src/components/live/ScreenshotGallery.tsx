import Image from "next/image";

/** Extra project screenshots from frontmatter `images`, shown after the article body. */
export function ScreenshotGallery({ images, title }: { images: string[]; title: string }) {
  if (images.length === 0) return null;
  return (
    <section aria-label="More screenshots" className="mt-12 grid grid-cols-2 gap-4 max-md:grid-cols-1">
      {images.map((src, i) => (
        <div
          key={src}
          className="relative aspect-video overflow-hidden rounded-[var(--r)] border border-line bg-panel"
        >
          <Image
            src={src}
            alt={`${title}, screenshot ${i + 2}`}
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-contain"
          />
        </div>
      ))}
    </section>
  );
}
