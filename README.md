# Portfolio

Personal portfolio of Andreas Unggun Parananda, styled as an Ableton Live set: pages are tracks, projects are clips, and the transport bar shows a running timecode.

Live at https://andreas-unggun.my.id

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Motion for animation and scroll-linked effects
- MDX content (`gray-matter`, `next-mdx-remote`)
- Phosphor icons
- Vitest for tests

## Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm start       # serve the production build
npm run lint    # lint
npx vitest run  # run tests (also: npm test)
```

## Content

Site copy, routes, experience and skills live in `src/content`.

### Add a project

Create an `.mdx` file in `src/app/work/projects/`. Frontmatter:

```mdx
---
title: "Project name"
publishedAt: "2026-10-15"
summary: "One or two sentences."
images:
  - "/images/projects/my-project/cover.jpg"
team:
  - name: "Your Name"
    role: "Your role"
    avatar: "/images/avatar.jpg"
    linkedIn: "https://www.linkedin.com/in/your-handle/"
link: ""
track: ai
clipName: "Short clip label"
---
```

- `track` is required and must be one of `ai`, `commerce` or `audio`. The build fails without it.
- `clipName` is optional. It sets the label of the project's clip in the Session view and of its locator in the Arrangement view. Without it, the title before the first colon is used.

### Add a blog post

Create an `.mdx` file in `src/app/blog/posts/` with `title`, `publishedAt`, `summary` and optional `tag`, `image` and `clipName` frontmatter. Blog posts go on the writing track automatically and need no `track`. The filename becomes the slug.

## Tests

```bash
npx vitest run
```

Tests live next to the code they cover, for example `src/lib/session.test.ts`.
