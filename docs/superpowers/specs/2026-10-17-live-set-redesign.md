# Live Set Redesign: Design Spec

**Date:** 2026-10-17
**Status:** Approved direction (concept prototype accepted)
**Concept prototype:** [`live-set-concept/index.html`](live-set-concept/index.html) (open locally in a browser; images live beside it)

## Design read

Personal portfolio for hiring managers and collaborators, overhaul redesign. The site is styled as an Ableton Live set, because Andreas is a technical lead and also a playback engineer and musician. Dials: `DESIGN_VARIANCE 8`, `MOTION_INTENSITY 6`, `VISUAL_DENSITY 5`.

Mode: **Redesign, overhaul.** New visual language. Content, URLs and SEO are preserved.

## The metaphor

| Ableton element | Site element | What it shows |
|---|---|---|
| Transport bar | Sticky nav (every page) | Name with 4-dot metronome, nav, LTC timecode readout driven by scroll, theme toggle |
| Session view | Home hero, right column; `/work` index | Projects and blog posts as clips. Columns are tracks (AI Systems, Commerce, Audio Tools, Writing), rows are scenes (years) |
| Clip view | Panel under the session grid | The launched clip: cover image, title, summary, link |
| Arrangement view | Home "Experience" section | Career 2014 to now as clips on company lanes, a scroll-driven playhead, project locators on the ruler |
| Device chain | Home "Skills" section | Skill groups as devices that can be bypassed |
| Browser | `/blog` list, `/about` table of contents | Plain rows |

The timecode readout is the signature detail: it ties to Andreas's real UP LTC Display plugin.

## Visual system

- **Fonts:** Archivo (variable, `wdth` 62 to 125, display and UI) and IBM Plex Mono (timecode, dates, numbers). No Geist, no Inter.
- **Theme:** dark-first, light theme supported, system default, manual toggle persisted under the existing `localStorage` key `data-theme`.
- **Tokens:** copied from the concept's `:root` block (`--bg`, `--panel`, `--panel-2`, `--line`, `--fg`, `--muted`, `--accent`, `--on-accent`, four clip colors, `--on-clip`). One accent (amber). Clip colors are categorical, used only on clips, track headers and lanes.
- **Shape:** radius 2px everywhere. No soft cards, no shadows except the 2px accent ring on the active clip.
- **Icons:** `@phosphor-icons/react`, weight `regular`. Transport glyphs (play triangle, stop square, record circle) are CSS shapes, as in Live.

## Motion (each one has a reason)

1. **Count-in** on first load: the 4 metronome dots pulse at 120 bpm, then the newest clip is launched. Brand moment.
2. **Clip launch:** accent ring plus a progress bar on the playing clip, image cross-fade in the clip view. Feedback.
3. **Arrangement follow:** section pins, track pans horizontally, playhead moves, the role under the playhead fills the detail panel. Storytelling.
4. **Timecode:** updates with scroll. Signature detail.
5. **Device bypass:** dims a device. Feedback.

All motion collapses under `prefers-reduced-motion`. Under 700px wide, the arrangement is not pinned: the track scrolls horizontally on its own and clips are tapped to select.

## Stack decisions

- **Drop Once UI.** Do not adopt shadcn/ui either: the Live look is custom and needs few primitives, so Radix deps would be dead weight. Use Tailwind v4 plus CSS-variable tokens and our own small components.
- **Motion** (`motion/react`) for scroll-linked values (`useScroll`, `useMotionValueEvent`, `useTransform`). No GSAP. No `window.addEventListener("scroll")`.
- **Keep:** Next.js 15 App Router, `next-mdx-remote`, `gray-matter`, Vercel Analytics and Speed Insights, the OG image route.
- **Remove:** `@once-ui-system/core`, `sass`, `react-icons`, `react-masonry-css`, `classnames`, `cookie`, the gallery route, `RouteGuard`, `/api/authenticate`, `/api/check-auth`, Mailchimp. Gallery is disabled with placeholder images and no route is protected, so nothing live is lost.

## Content and SEO preservation

- URLs unchanged: `/`, `/about`, `/work`, `/work/[slug]`, `/blog`, `/blog/[slug]`, `/api/og/generate`, `/sitemap.xml`, `/robots.txt`.
- Metadata keeps the Once UI `Meta.generate` shape (title, description, `metadataBase`, OpenGraph, Twitter card, canonical URL) and JSON-LD keeps the `Schema` shape.
- MDX bodies are untouched. They use only standard markdown, no custom components.
- Each project MDX gets a `track` frontmatter field. Blog posts are always on the Writing track.
- UI copy contains no em or en dashes. Em dashes in `content.js` strings are rewritten with commas or periods when moving to the new content modules.

## Pages

- **Home:** Session hero, Arrangement, Device chain, then the global footer ("Count me in.", Book a call, email copy, GitHub, LinkedIn).
- **/work:** full Session grid and clip view for every project.
- **/work/[slug], /blog/[slug]:** article template with a clip-colored header bar, cover image, date, and styled MDX prose.
- **/blog:** Browser-style rows (date, title, tag).
- **/about:** intro, every role with every achievement, studies, skills, calendar link, and a sticky Browser-style table of contents on desktop.
- **404:** "Clip not found" with a link home.
