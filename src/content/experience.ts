export type Lane = "ICUBE" | "SIRCLO" | "_upsounds" | "Upscalix" | "Freelance";

export type Role = {
  company: Lane;
  title: string;
  from: string;
  to: string | null;
  /** Runs alongside a full-time role: shown as its own lane, but the scroll playhead skips it. */
  side?: boolean;
  highlights: string[];
  achievements: string[];
};

export const roles: Role[] = [
  {
    company: "ICUBE",
    title: "Backend Developer",
    from: "2014-12",
    to: "2017-05",
    highlights: [
      "Built Magento to ERP order and product integrations with XSL templates, so ops could change mappings without a deploy.",
      "Shipped B2C, B2B and marketplace stores.",
      "Trained 20+ new developers on Magento module development.",
    ],
    achievements: [
      "Developed integration feature of orders and products between Magento and ERP systems by using a module that utilizes XSL template for easier modifications at any time and auto-export and import, which improves the operational process.",
      "Developed B2C commerce, B2B commerce, and marketplace websites.",
      "Provided training of basic Magento modules and creating integration modules for Magento for 20+ newly joined developer.",
    ],
  },
  {
    company: "ICUBE",
    title: "Assistant Engineering Manager",
    from: "2017-06",
    to: "2020-05",
    highlights: [
      "Ran the full lifecycle of 7+ projects for clients in the US, Germany, Hong Kong, India and Indonesia.",
      "Led small teams of 3 to 5 engineers per project.",
    ],
    achievements: [
      "Administered the full lifecycle of development for 7+ projects (clients from various countries like US, Germany, Hong Kong, India, and Indonesia) and led small technical teams usually consisting around 3-5 people per project.",
    ],
  },
  {
    company: "SIRCLO",
    title: "Assistant Engineering Manager",
    from: "2020-05",
    to: "2022-02",
    highlights: [
      "Ran a national B2B project for a state-owned enterprise, worth about USD 1.3 million.",
      "Took a client's Google PageSpeed score from 27 to 92.",
      "Found and fixed a race condition in reward-point redemption before it cost revenue.",
    ],
    achievements: [
      "Led a Strategic Project: Orchestrated a national B2B project (State-Owned Enterprise), valued at IDR 20 billion (approx. USD 1.3 million), ensuring quality and alignment with strategic goals.",
      "Collaborated with project managers to bridge the gap between the clients' requirements and the technical team to ensure the projects met the expectations and timelines",
      "Led the development team to increase client's e-commerce site Google PageSpeed from 27 up to 92.",
      "Detected and resolved a race condition in sales orders involving full reward point redemption, preventing potential revenue loss and ensuring transaction integrity",
    ],
  },
  {
    company: "SIRCLO",
    title: "Engineering Manager",
    from: "2022-02",
    to: "2025-04",
    highlights: [
      "Led the team behind a SaaS product with 2,500+ monthly active users.",
      "Cut QA time by 8 hours per cycle with automated testing.",
      "Caught a critical price-tampering vulnerability and led the fix.",
    ],
    achievements: [
      "Lead a team developing and maintaining a SaaS product and related microservices, serving 2,500+ monthly active users; improved documentation (manuals, user guides, APIs), boosted user engagement, and increased project delivery efficiency.",
      "Implemented and refined automated testing processes, reducing QA hours by 8 per development cycle and increasing release confidence.",
      "Discovered and resolved a critical price data tampering vulnerability, leading the team to deliver a fix that protected both client and company from significant financial risk.",
      "Streamlined onboarding by consolidating fragmented documentation and creating a unified workflow channel, reducing colleague (user) setup time from one day to under one hour.",
      "Proactively identified and addressed issues by establishing a real-time monitoring dashboard and alerting system, enabling the team to resolve problems before they affected users or clients.",
      "Technical Architect (side role): Collaborated with the Business Development (BD) team, who often bring in prospective clients along with their specific challenges. Analyzed the client’s needs, design possible technical solutions, and provide effort estimations, following a similar process as internal feature planning.",
      "Delivery Tribe Lead (previous role): Launched new projects and led a team of 50, enhancing operational efficiency with the implementation of OKRs and SOPs. Maintained high standards in a team-centric, results-driven environment. Responsible for team member performance review.",
    ],
  },
  {
    company: "_upsounds",
    title: "Founder & Developer (Independent)",
    from: "2024-06",
    to: null,
    side: true,
    highlights: [
      "Build and sell tools for playback engineers: a C++/JUCE timecode plugin, a MIDI click player and Max for Live devices.",
      "750+ downloads and sales across the catalog, 37 of them paid licenses.",
      "Publish demos on YouTube and Instagram, and let engineers' comments pick the next tool.",
    ],
    achievements: [
      "Built and sell a catalog of tools for playback engineers, drawn from problems I hit running playback at live shows: UP LTC Display (a C++/JUCE AU/VST timecode plugin), UP MIDI Click Player, and Max for Live devices including UP Loopers, UP Locator Makers, and UP Quantization Changer.",
      "Reached 750+ downloads and sales across the catalog (37 paid licenses and 718 free downloads) from 3,000+ product page views.",
      "Own the full product cycle on my own: finding the problem on stage, building the device, testing it in real shows, setting the price, and releasing and supporting it through a Lynk storefront.",
      "Publish demos and tutorials on YouTube and Instagram (@_upsounds), and use comments from other engineers to decide which tool to build next.",
    ],
  },
  {
    company: "Upscalix",
    title: "Technical Lead",
    from: "2025-08",
    to: null,
    highlights: [
      "Moved the team to agent-first development, with unit test coverage going from 0% to 86% as the guardrail.",
      "Built a self-healing pipeline: Claude Code routines triage Sentry issues, write fixes and open pull requests.",
      "Led Pulse, an internal product that cut operating costs by about USD 500 a month.",
    ],
    achievements: [
      "Led Pulse, an internal product used by Upscalix's other departments, which reduced company operating costs by about USD 500 a month.",
      "Moved the Pulse team to agent-first development before coding agents were standard practice at Upscalix, and made unit tests mandatory as the guardrail, taking line coverage from 0% to 86%. Lint and tests now gate every merge in CI.",
      "Switched to trunk-based development with continuous delivery, taking production deploys from once per sprint to 3 to 8 per sprint.",
      "Added a review agent to CI, tuned for useful feedback at reasonable cost, so faster code output didn't stall in review.",
      "Moved CI to self-hosted runners, keeping CI within the GitHub budget while cutting time to merge.",
      "Built a self-healing pipeline that uses Claude Code routines to automatically triage Sentry production issues, generate fixes, and open pull requests, reducing developer toil and cutting time-to-resolution for previously unseen production incidents.",
      "Designed and implemented automated data collection to measure developer KPIs, replacing manual tracking with a reliable, real-time pipeline and giving leadership objective visibility into team performance.",
    ],
  },
  {
    company: "Freelance",
    title: "Full-stack Developer (Freelance)",
    from: "2025-10",
    to: null,
    side: true,
    highlights: [
      "Build LLM features for a multi-tenant KPI management SaaS (Go API, Next.js web).",
      "An LLM converter that turns clients' free-form KPI spreadsheets into an importable format.",
      "A dashboard assistant that builds KPI dashboards from plain-language requests.",
    ],
    achievements: [
      "Built an LLM-assisted converter that turns clients' free-form Indonesian KPI workbooks into the product's import format. Code does every calculation and the model only classifies, so a wrong target can never come from the model; an admin reviews each row before import.",
      "Built a dashboard assistant that answers plain-language requests with a widget spec from a fixed catalog. The model never sees tenant data, and invalid widgets are dropped one by one instead of failing the whole turn.",
      "Added an eval harness for the dashboard assistant and used its failures to harden how the API parses model output.",
      "Work directly with the product owner, turning evolving requirements into small, reviewable releases.",
    ],
  },
];
