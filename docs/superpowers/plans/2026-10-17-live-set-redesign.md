# Live Set Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Once UI with a Tailwind v4 + Motion site styled as an Ableton Live set, keeping every URL, all content and SEO output.

**Architecture:** Server Components render all content (session grid, arrangement clips, devices, articles) so the page is complete without JS. Small `"use client"` islands add launching, scroll-linked timecode and the arrangement follow. Pure logic (timecode, timeline geometry, session grid, metadata) lives in `src/lib/` with Vitest tests.

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind CSS v4 (`@tailwindcss/postcss`), `motion` (`motion/react`), `@phosphor-icons/react`, `next/font/google` (Archivo, IBM Plex Mono), `next-mdx-remote`, Vitest.

**Spec:** `docs/superpowers/specs/2026-10-17-live-set-redesign.md`. Visual reference: `docs/superpowers/specs/live-set-concept/index.html` (token values, sizes, and markup to port).

## Global Constraints

- Work on branch `redesign/live-set` in a worktree. Never commit to `main`.
- No em dash (U+2014) or en dash (U+2013) in any UI string or `src/content/*` string. MDX bodies are exempt.
- Radius is `2px` everywhere (`--r`). One accent token (`--accent`). Clip colors only on clips, track headers, lanes.
- Theme: `data-theme` attribute on `<html>`, values `light` | `dark`, persisted in `localStorage` key `data-theme`; absent key means follow `prefers-color-scheme`.
- No `window.addEventListener("scroll", ...)`. Scroll-linked work uses Motion `useScroll` + `useMotionValueEvent`, writing to refs, never React state per frame.
- Every animated component checks `useReducedMotion()` and renders static when true.
- Timecode: 25 fps, 3px of scroll = 1 frame, format `HH:MM:SS:FF`.
- Arrangement is pinned only when viewport width >= 700px and reduced motion is off.
- Icons only from `@phosphor-icons/react`.
- `npm run build` and `npm run lint` and `npx vitest run` pass at the end of every task.

## Review Focus

1. **Theme flash:** a visitor with `data-theme=light` saved must get light on first paint. The inline init script in `<head>` sets the attribute before hydration (Task 1 verification step checks this with a hard reload).
2. **Two clips in the same year and track, or a project with a missing `track`:** the grid must not drop or overwrite a clip; a missing track must fail the build with the file name. Covered by `buildSessionGrid` tests in Task 3 and `getPosts` validation in Task 2.
3. **Current role with no end date:** "Upscalix, Aug 2025 to now" must end at the build month, not at a hardcoded date. Covered by `timelineSpan` test in Task 3.
4. **Phone width and reduced motion:** arrangement must be unpinned, scroll horizontally inside its own box, and never make the page scroll sideways. Checked in Task 6 verification at 375px.
5. **SEO parity:** canonical URLs, OpenGraph and JSON-LD for `/work/[slug]` match the Once UI output. Covered by `buildMetadata` and `buildSchema` tests in Task 2.

---

### Task 1: Foundation (worktree, deps, tokens, fonts, root layout)

**Files:**
- Create: `postcss.config.mjs`, `src/app/globals.css`, `src/lib/fonts.ts`, `src/lib/theme-script.ts`, `vitest.config.ts`, `src/lib/theme-script.test.ts`
- Modify: `package.json`, `src/app/layout.tsx`

**Interfaces:**
- Produces: CSS tokens `--bg --panel --panel-2 --line --fg --muted --accent --on-accent --clip-lilac --clip-teal --clip-sand --clip-sage --on-clip --r --tp-h` (values from the concept `:root` and light blocks; rename `--t-ai`→`--clip-lilac`, `--t-com`→`--clip-teal`, `--t-aud`→`--clip-sand`, `--t-wri`→`--clip-sage`). Tailwind theme aliases in `@theme inline` so `bg-panel`, `text-muted`, `border-line`, `text-accent`, `font-display`, `font-mono` work.
- Produces: `fonts.display` (Archivo, `axes: ["wdth"]`, variable `--font-display`), `fonts.mono` (IBM_Plex_Mono 400/500/600, variable `--font-mono`).
- Produces: `themeInitScript: string` (IIFE that reads `localStorage["data-theme"]`, falls back to `prefers-color-scheme`, sets `document.documentElement.dataset.theme`, swallows storage errors).

- [ ] **Step 1:** Create the worktree (`superpowers:using-git-worktrees`), branch `redesign/live-set`.
- [ ] **Step 2:** Install: `npm i tailwindcss @tailwindcss/postcss motion @phosphor-icons/react` and `npm i -D vitest`. Add script `"test": "vitest run"`.
- [ ] **Step 3: Write the failing test** `src/lib/theme-script.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { themeInitScript } from "./theme-script";
const run = (stored: string | null, prefersDark: boolean) => {
  const root = { dataset: {} as Record<string, string> };
  const fn = new Function("document", "localStorage", "matchMedia", themeInitScript);
  fn({ documentElement: root }, { getItem: () => stored }, () => ({ matches: prefersDark }));
  return root.dataset.theme;
};
describe("themeInitScript", () => {
  it("uses the saved theme", () => expect(run("light", true)).toBe("light"));
  it("follows the system when nothing is saved", () => expect(run(null, true)).toBe("dark"));
  it("treats 'system' as unsaved", () => expect(run("system", false)).toBe("light"));
  it("falls back to dark when storage throws", () => {
    const root = { dataset: {} as Record<string, string> };
    new Function("document", "localStorage", "matchMedia", themeInitScript)(
      { documentElement: root }, { getItem: () => { throw new Error("blocked"); } }, () => ({ matches: false }));
    expect(root.dataset.theme).toBe("dark");
  });
});
```

- [ ] **Step 4:** `npx vitest run src/lib/theme-script.test.ts` → FAIL (module not found).
- [ ] **Step 5:** Implement `theme-script.ts`, `fonts.ts`, `globals.css` (tokens with the dark-first pattern from the concept: dark on `:root`, light under `@media (prefers-color-scheme: light) { :root:not([data-theme="dark"]) }` and `:root[data-theme="light"]`; `body` background `var(--bg)`; `@import "tailwindcss"`; reduced-motion block), `postcss.config.mjs` (`@tailwindcss/postcss`).
- [ ] **Step 6:** Rewrite `src/app/layout.tsx` without Once UI: plain `<html lang="en" suppressHydrationWarning className={display.variable + " " + mono.variable}>`, `<head><script dangerouslySetInnerHTML={{__html: themeInitScript}} /></head>`, `<body>` with `{children}`, `<Analytics/>`, `<SpeedInsights/>`. Keep `generateMetadata` calling Once UI `Meta.generate` for now (replaced in Task 2). Remove the Once UI CSS imports and `Background`. Header/Footer are added in Task 4.
- [ ] **Step 7:** `npx vitest run` → PASS. `npm run build` → succeeds (old pages render unstyled, expected).
- [ ] **Step 8:** Verify theme flash: `npm run dev`, set `localStorage["data-theme"]="light"`, hard reload, confirm `<html data-theme="light">` before hydration (view source of the response plus a screenshot of first paint).
- [ ] **Step 9: Commit** `feat: add Tailwind v4 tokens, fonts and theme init for Live set redesign`.

---

### Task 2: Content modules and SEO helpers

**Files:**
- Create: `src/content/profile.ts`, `src/content/experience.ts`, `src/content/skills.ts`, `src/content/index.ts`, `src/lib/seo.tsx`, `src/lib/seo.test.ts`, `src/utils/utils.test.ts`
- Modify: `src/utils/utils.ts`, the four `src/app/work/projects/*.mdx` frontmatters, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/layout.tsx`

**Interfaces:**
- Produces in `src/content/profile.ts`: `baseURL = "https://andreas-unggun.my.id"`, `person { name, firstName, role, avatar, email, location }`, `social: { name: "GitHub"|"LinkedIn"|"Email"; href: string }[]`, `home { title, description, roleLine, headline: string, subline: string }`, `about { title, description, intro: string, studies: {name, description}[], calendarHref }`, `routes` (same keys as today minus `/gallery`). Copy text from `src/resources/content.js`; hero copy from the concept (`roleLine: "Technical Lead at Upscalix"`, subline as in concept). Replace em dashes.
- Produces in `src/content/experience.ts`: `type Lane = "ICUBE" | "SIRCLO" | "Upscalix"`; `type Role = { company: Lane; title: string; from: string /* "YYYY-MM" */; to: string | null; highlights: string[]; achievements: string[] }`; `roles: Role[]` oldest first. `highlights` = the concept's 2 to 3 short lines; `achievements` = full list from `content.js`.
- Produces in `src/content/skills.ts`: `type Device = { name: string; items: string[]; live?: boolean }`; `devices: Device[]` exactly as the concept's 7 devices.
- Produces in `src/lib/seo.tsx`: `buildMetadata(input: { title: string; description: string; path: string; image?: string; type?: "website" | "article"; publishedTime?: string }): Metadata` (same output as Once UI `Meta.generate`, see `node_modules/@once-ui-system/core/dist/modules/seo/Meta.js`, plus `alternates.canonical`); `buildSchema(input: { as: "webPage" | "blogPosting"; title; description; path; image?; datePublished?; dateModified? }): Record<string, unknown>` (same as Once UI `Schema.js`, author always `person`); `JsonLd(props)` renders `<script type="application/ld+json">`.
- Produces in `src/utils/utils.ts`: `type Track = "ai" | "commerce" | "audio" | "writing"`; `Metadata.track?: Track`; `getPosts(path, opts?: { requireTrack?: boolean })` throws `Error("Missing or invalid track in <file>")` when `requireTrack` and the field is absent or not one of `ai|commerce|audio`.

- [ ] **Step 1: Write failing tests.** `src/lib/seo.test.ts`:
  - `buildMetadata({title:"Deputy", description:"d", path:"/work/deputy"})` has `openGraph.url === "https://andreas-unggun.my.id/work/deputy"`, `alternates.canonical` equal to the same, `openGraph.images[0].url === "/api/og/generate?title=Deputy"`, `twitter.card === "summary_large_image"`, `metadataBase.href === "https://andreas-unggun.my.id/"`.
  - `buildMetadata` with `image: "/images/x.jpg"` uses it unchanged in OG and Twitter.
  - `buildSchema({as:"blogPosting", title:"T", description:"d", path:"/blog/t", datePublished:"2026-09-17"})` has `"@type": "BlogPosting"`, `headline: "T"`, `dateModified: "2026-09-17"`, `author.name === "Andreas Unggun Parananda"`, `url === "https://andreas-unggun.my.id/blog/t"`.
  `src/utils/utils.test.ts`: write two temp `.mdx` files in `os.tmpdir()`; one with `track: ai` is returned with `metadata.track === "ai"`; one without `track` makes `getPosts(dir, { requireTrack: true })` throw `/Missing or invalid track in .*no-track\.mdx/`.
- [ ] **Step 2:** `npx vitest run` → FAIL.
- [ ] **Step 3:** Implement the modules above. Frontmatter: deputy `track: ai`, swift-checkout `track: commerce`, medbiz `track: commerce`, up-ltc `track: audio`. `getPosts` takes a directory path array as today; add the option.
- [ ] **Step 4:** Point `layout.tsx`, `sitemap.ts`, `robots.ts` at `@/content` and `buildMetadata`.
- [ ] **Step 5:** `npx vitest run` → PASS. `grep -rnP "[\x{2013}\x{2014}]" src/content` → no output. `npm run build` → succeeds.
- [ ] **Step 6: Commit** `feat: typed content modules and SEO helpers`.

---

### Task 3: Live logic (timecode, timeline, session grid)

**Files:**
- Create: `src/lib/timecode.ts`, `src/lib/timeline.ts`, `src/lib/session.ts`, and a `.test.ts` beside each.

**Interfaces:**
- Produces `timecode.ts`: `formatTimecode(frames: number, fps?: number /* 25 */): string`; `scrollToFrames(scrollY: number): number` (`Math.floor(max(0, scrollY) / 3)`).
- Produces `timeline.ts`: `type Month = number` (`year * 12 + monthIndex0`); `toMonth(ym: string): Month`; `formatMonth(m: Month): string` (`"Aug 2025"`); `timelineSpan(roles: Role[], now: Month): { start: Month; end: Month }` (start = earliest `from`; end = `now + 1`); `roleEnd(role: Role, now: Month): Month`; `roleAt(roles: Role[], m: Month, now: Month): Role` (role containing `m`; else most recent role started before `m`; else first role); `followOffset(p: number, trackW: number, viewW: number, lead?: number /* 0.45 */): { playheadX: number; translateX: number }` (algorithm below).
- Produces `session.ts`: `type SessionClip = { slug: string; kind: "work" | "blog"; track: Track; name: string; title: string; summary: string; image?: string; publishedAt: string; href: string }`; `TRACKS: { id: Track; name: string; color: string }[]` in order ai "AI Systems" `--clip-lilac`, commerce "Commerce" `--clip-teal`, audio "Audio Tools" `--clip-sand`, writing "Writing" `--clip-sage`; `type Scene = { label: string; slots: (SessionClip | null)[] }`; `buildSessionGrid(clips: SessionClip[]): Scene[]`; `toSessionClips(projects, posts): SessionClip[]` (name = title before the first `:`, blog posts get `track: "writing"`, `href` = `/work/<slug>` or `/blog/<slug>`).

`followOffset` algorithm (from the concept):
```ts
const playheadX = clamp01(p) * trackW;
const translateX = Math.min(Math.max(0, playheadX - viewW * lead), Math.max(0, trackW - viewW));
```

`buildSessionGrid` rules: scenes are years from `publishedAt`, newest first; each scene has one slot per `TRACKS` entry; when the slot for a clip's track is taken, put the clip in the next scene row with the same label (create it if needed); within a year, newer clips are placed first.

- [ ] **Step 1: Write failing tests:**
  - `formatTimecode(0) === "00:00:00:00"`, `formatTimecode(24) === "00:00:00:24"`, `formatTimecode(25) === "00:00:01:00"`, `formatTimecode(90000) === "01:00:00:00"`; `scrollToFrames(299) === 99`, `scrollToFrames(-40) === 0`.
  - `toMonth("2014-12") === 2014*12+11`; `formatMonth(toMonth("2025-08")) === "Aug 2025"`.
  - `timelineSpan(roles, toMonth("2026-10")).end === toMonth("2026-11")` with the real `roles`; `roleEnd(upscalix, now) === now + 1`.
  - `roleAt(roles, toMonth("2025-06"), now).company === "SIRCLO"` (gap between Apr and Aug 2025 keeps the last role); `roleAt(roles, toMonth("2010-01"), now)` is the first role.
  - `followOffset(0, 2000, 800)` → `{ playheadX: 0, translateX: 0 }`; `followOffset(1, 2000, 800)` → `{ playheadX: 2000, translateX: 1200 }`; `followOffset(0.5, 2000, 800)` → `{ playheadX: 1000, translateX: 640 }`; `followOffset(1, 500, 800).translateX === 0`.
  - `buildSessionGrid` with the real 4 projects + 1 post: scene labels `["2026","2025","2024","2023"]`, 2026 row has Deputy in slot 0 and the post in slot 3.
  - `buildSessionGrid` with two `commerce` clips in 2025: two scenes labelled `"2025"`, newer clip in the first, no clip lost (total non-null slots equals input length).
  - `buildSessionGrid([])` returns `[]`.
- [ ] **Step 2:** `npx vitest run` → FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** `npx vitest run` → PASS.
- [ ] **Step 5: Commit** `feat: timecode, timeline and session grid logic`.

---

### Task 4: Transport bar and footer

**Files:**
- Create: `src/components/live/Transport.tsx` (server), `src/components/live/Timecode.tsx` (client), `src/components/live/ThemeToggle.tsx` (client), `src/components/live/Metronome.tsx` (client), `src/components/live/NavLinks.tsx` (client), `src/components/live/Footer.tsx` (server), `src/components/live/CopyEmail.tsx` (client), `src/components/live/CtaButton.tsx` (server)
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `formatTimecode`, `scrollToFrames` (Task 3); `person`, `social`, `about.calendarHref` (Task 2).
- Produces: `<Transport />`, `<Footer />`, `<CtaButton href label />` (the record-dot "Book a call" button; label is always `"Book a call"` site-wide, the only contact CTA wording), `<Metronome countIn: boolean />`.

Behaviour and markup follow the concept's `.transport`, `.lcd`, `.foot` blocks.
- `Timecode`: `useScroll()` → `useMotionValueEvent(scrollY, "change", y => ref.current.textContent = formatTimecode(scrollToFrames(y)))`. Initial text `00:00:00:00`. `title` attribute: "Linear timecode, driven by how far you've scrolled".
- `NavLinks`: six links in this order: Work `/work`, Experience `/#experience`, Skills `/#skills`, Writing `/blog`, About `/about`, Contact `#contact`. `aria-current="page"` from `usePathname()` on Work, Writing and About. Must fit one line at 1024px; under 760px it moves to a second row and scrolls horizontally.
- `ThemeToggle`: toggles `data-theme` between `light` and `dark`, writes `localStorage["data-theme"]` in try/catch, label "Theme", `aria-label` "Toggle light and dark theme".
- `Metronome countIn`: when true and motion allowed, lights dots 1 to 4 at 500ms intervals once per session (`sessionStorage["countin"]`), then dispatches `window` event `"live:countin-done"`.
- `CopyEmail`: shows email as selectable mono text plus "Copy email" button; on failure selects the text.

- [ ] **Step 1:** Implement components; mount `<Transport/>` before and `<Footer/>` after `{children}` in `layout.tsx`.
- [ ] **Step 2:** `npm run build && npm run lint` → pass.
- [ ] **Step 3: Verify in browser** (`npm run dev`, preview tool): timecode changes while scrolling and reads `00:00:00:00` at top; theme toggle flips colors and survives reload; nav on one line at 1024px; second row at 375px with no horizontal page scroll (`document.documentElement.scrollWidth === innerWidth`); count-in plays once; with reduced motion emulated it does not.
- [ ] **Step 4: Commit** `feat: Live transport bar and footer`.

---

### Task 5: Session view hero

**Files:**
- Create: `src/components/live/SessionView.tsx` (client), `src/components/live/ClipView.tsx` (client), `src/components/live/HomeHero.tsx` (server)
- Modify: `src/app/page.tsx` (replace body; keep `generateMetadata` via `buildMetadata` and `JsonLd as="webPage"`)

**Interfaces:**
- Consumes: `buildSessionGrid`, `toSessionClips`, `TRACKS`, `Scene`, `SessionClip` (Task 3); `getPosts` (Task 2); `CtaButton` (Task 4).
- Produces: `<SessionView scenes: Scene[] initialSlug: string />` (used again by `/work` in Task 9); `<HomeHero />` (server; builds scenes from MDX and passes them down).

Port the concept's `.session`, `.slot`, `.scene`, `.stop`, `.clipview`. All clip buttons, names and the initial clip view are in server HTML. Launch = set playing slug in state (one state change per click is fine). Clip view image uses `next/image` with `sizes="(max-width: 920px) 100vw, 40vw"`, `priority` for the initial clip. Initial clip = newest work clip. After `"live:countin-done"`, re-trigger the playing animation on the initial clip. Scene button launches the first clip in its row. Link text is "Read case study" for work and "Read the post" for blog, with a Phosphor `ArrowUpRight`. Clip names truncate with ellipsis, full name in `aria-label`.

- [ ] **Step 1:** Implement; home renders `<HomeHero/>` only for now.
- [ ] **Step 2:** `npm run build && npm run lint` → pass.
- [ ] **Step 3: Verify in browser:** with JS disabled, grid and Deputy clip view are visible; clicking each clip swaps the clip view and moves the accent ring; keyboard Tab reaches every clip and Enter launches it; at 375px the grid scrolls inside `.session-scroll` only; hero (headline, subtext, CTA) fits in a 1280x720 viewport.
- [ ] **Step 4: Commit** `feat: Session view hero`.

---

### Task 6: Arrangement view

**Files:**
- Create: `src/components/live/Arrangement.tsx` (client), `src/components/live/ArrangementSection.tsx` (server)

**Interfaces:**
- Consumes: `roles` (Task 2); `toMonth`, `timelineSpan`, `roleEnd`, `roleAt`, `followOffset`, `formatMonth` (Task 3); project list for locators (`publishedAt` month + name from `toSessionClips`).
- Produces: `<ArrangementSection />` with `id="experience"`, heading "Twelve years on the timeline", lede from the concept.

`ArrangementSection` computes `now = toMonth(<build date YYYY-MM>)` on the server and passes `roles`, `locators`, `span` as props. `Arrangement` renders ruler (year labels, locator triangles), three lanes ICUBE (`--clip-sand`), SIRCLO (`--clip-teal`), Upscalix (`--clip-lilac`), clips positioned by month × month width (18px, 13px under 700px), playhead and detail panel (period, title, company, `highlights`). Pinned mode: wrapper `height: 260vh`, inner `position: sticky; top: calc(var(--tp-h) + 24px)`; `useScroll({ target: wrapperRef, offset: ["start start", "end end"] })` → `scrollYProgress` → `followOffset` → write `transform` on the track ref and `left` on the playhead ref; `roleAt` result goes to state only when the role changes. Clicking a clip in pinned mode scrolls the window to that role's start (`behavior: "smooth"`, `"auto"` under reduced motion); in unpinned mode it selects. Pin decision uses `matchMedia("(min-width: 700px)")` + `useReducedMotion()`, re-evaluated on change; server render is unpinned with the current role selected.

- [ ] **Step 1:** Implement and add to home below the hero.
- [ ] **Step 2:** `npm run build && npm run lint` → pass.
- [ ] **Step 3: Verify in browser:** at 1440x900 scrolling through the section moves the playhead from 2014 to 2026 and changes the detail panel in order ICUBE, ICUBE, SIRCLO, SIRCLO, Upscalix; the section does not cut off at viewport top (sticky offset right); at 375px and with reduced motion the section is not pinned, the track scrolls sideways inside its box, `document.documentElement.scrollWidth === innerWidth`, tapping a clip updates the panel.
- [ ] **Step 4: Commit** `feat: Arrangement view for experience`.

---

### Task 7: Device chain and home assembly

**Files:**
- Create: `src/components/live/DeviceChain.tsx` (client)
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `devices` (Task 2).
- Produces: `<DeviceChain devices />` inside `<section id="skills">`, heading "The signal chain", lede from the concept.

Port `.chain`, `.device`, `.dev-head`, `.pwr`, `.chip`. Power button has `aria-pressed`, `aria-label="Bypass <name>"`; bypass dims the device to 45% opacity. Live Playback device gets a `--clip-sand` top border. Chain scrolls horizontally with scroll-snap.

- [ ] **Step 1:** Implement. Home order: `HomeHero`, `ArrangementSection`, `DeviceChain`. Section headings use one style (Archivo `wdth 125`, weight 800). No eyebrows on these sections.
- [ ] **Step 2:** `npm run build && npm run lint` → pass.
- [ ] **Step 3: Verify in browser** in light and dark: bypass toggles; footer CTA label equals hero CTA label; no element shows an em or en dash (`document.body.innerText` has neither character).
- [ ] **Step 4: Commit** `feat: device chain and new home page`.

---

### Task 8: Article template and MDX components

**Files:**
- Create: `src/components/live/ArticleHeader.tsx` (server), `src/app/prose.css` (imported from `globals.css`)
- Modify: `src/components/mdx.tsx`, `src/app/work/[slug]/page.tsx`, `src/app/blog/[slug]/page.tsx`
- Test: `src/components/slugify.test.ts`

**Interfaces:**
- Consumes: `buildMetadata`, `JsonLd` (Task 2); `TRACKS` (Task 3); `CustomMDX` keeps its name and props.
- Produces: `slugify(str: string): string` exported from `src/components/mdx.tsx` (same behaviour as today); `<ArticleHeader title date track backHref backLabel image? />`.

MDX map uses plain elements with the `.prose-live` class on the article wrapper: headings get `id={slugify(text)}` and a hover `#` link; `img` → `next/image` (16:9, `sizes="(max-width: 960px) 100vw, 720px"`); external links open in a new tab; `pre`/`code` styled with `--font-mono` on `--panel`. Article column max 68ch. Header: 6px bar in the track color (blog = `--clip-sage`), back link ("All work" / "All writing"), title (Archivo `wdth 112`), date in mono, cover image. Keep `generateStaticParams`, `notFound`, `JsonLd as="blogPosting"` with the same fields as today.

- [ ] **Step 1: Failing test:** `slugify("Why It Works & Scales") === "why-it-works-and-scales"`, `slugify("Hello  World!") === "hello-world"`.
- [ ] **Step 2:** `npx vitest run src/components/slugify.test.ts` → FAIL (not exported). Implement. → PASS.
- [ ] **Step 3:** Implement header, prose, both slug pages.
- [ ] **Step 4:** `npm run build && npm run lint` → pass.
- [ ] **Step 5: Verify in browser:** all four work pages and the blog post render with images and headings; heading anchors work; view-source shows `<link rel="canonical" href="https://andreas-unggun.my.id/work/<slug>">` and a `BlogPosting` JSON-LD script.
- [ ] **Step 6: Commit** `feat: article template and MDX prose`.

---

### Task 9: Work, Blog, About and 404 pages

**Files:**
- Modify: `src/app/work/page.tsx`, `src/app/blog/page.tsx`, `src/app/about/page.tsx`, `src/app/not-found.tsx`
- Create: `src/components/live/BrowserList.tsx` (server), `src/components/live/AboutToc.tsx` (client)

**Interfaces:**
- Consumes: `SessionView` (Task 5); `roles`, `about`, `devices` (Task 2); `formatMonth`, `toMonth` (Task 3).
- Produces: `<BrowserList items: { href; title; date; tag? }[] />`.

- `/work`: heading "Work", `<SessionView>` with every project and post, then `BrowserList` of projects (newest first).
- `/blog`: heading "Writing", `BrowserList` of posts (mono date, title, tag chip).
- `/about`: avatar, name, intro; Experience (every role with every `achievements` line, period in mono); Studies; Skills (devices as chip groups, not interactive); "Book a call" `CtaButton`. Desktop: sticky left `AboutToc` styled as Live's browser panel, highlighting the section in view via IntersectionObserver; mobile: hidden.
- 404: heading "Clip not found", text "This page isn't in the set.", link "Back to the session" → `/`.
- Each page keeps `buildMetadata` with the same title/description/path as today.

- [ ] **Step 1:** Implement.
- [ ] **Step 2:** `npm run build && npm run lint` → pass.
- [ ] **Step 3: Verify in browser** at 1440 and 375, light and dark, for `/work`, `/blog`, `/about`, `/nope`.
- [ ] **Step 4: Commit** `feat: work, writing, about and 404 pages`.

---

### Task 10: Remove Once UI and final verification

**Files:**
- Delete: `src/resources/` (after moving anything still used), `src/components/{Header,Footer,HeadingLink,Mailchimp,ProjectCard,Providers,RouteGuard,ScrollToHash,ThemeToggle}.tsx`, all `*.module.scss`, `breakpoints.scss`, `src/components/{about,blog,gallery,work}/`, `src/app/gallery/`, `src/app/api/authenticate/`, `src/app/api/check-auth/`, `public/images/gallery/`
- Modify: `src/components/index.ts`, `src/app/api/og/generate/route.tsx`, `package.json`, `README.md`

**Interfaces:**
- Consumes: everything above.

- [ ] **Step 1:** Delete the files above. Keep a `ScrollToHash` equivalent only if heading anchors fail without it (check in Step 5).
- [ ] **Step 2:** `npm uninstall @once-ui-system/core sass react-icons react-masonry-css classnames cookie @types/cookie`.
- [ ] **Step 3:** Restyle the OG route: `--bg` dark background, Archivo 800 title (load via the existing `loadGoogleFont` helper with `Archivo:wght@800`), amber timecode-style footer line `andreas-unggun.my.id`; import `baseURL`, `person` from `@/content`.
- [ ] **Step 4:** `grep -rn "once-ui\|@/resources\|react-icons" src` → no output. `npx vitest run`, `npm run lint`, `npm run build` → all pass.
- [ ] **Step 5: Final browser pass** with `npm run build && npm start`: every route at 1440 and 375 in light and dark; `/sitemap.xml` lists exactly `/`, `/about`, `/work`, `/blog`, the four `/work/<slug>` and the one `/blog/<slug>` URLs (same set `main` produces); `/api/og/generate?title=Deputy` returns a PNG; console has no errors; Lighthouse on `/` (desktop) Performance ≥ 90, Accessibility ≥ 95, CLS < 0.1.
- [ ] **Step 6:** Update `README.md`: stack, how to add a project (`track` frontmatter), how to run tests.
- [ ] **Step 7: Commit** `chore: remove Once UI and unused features`. Then follow `superpowers:finishing-a-development-branch`.
