export type Lane = "ICUBE" | "SIRCLO" | "Upscalix";

export type Role = {
  company: Lane;
  title: string;
  from: string;
  to: string | null;
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
    company: "Upscalix",
    title: "Technical Lead",
    from: "2025-08",
    to: null,
    highlights: [
      "Built a self-healing pipeline: Claude Code routines triage Sentry issues, write fixes and open pull requests.",
      "Replaced manual developer-KPI tracking with a real-time pipeline.",
      "Helped build Pulse, which cut operating costs by about USD 500 a month.",
    ],
    achievements: [
      "Designed and implemented automated data collection to measure developer KPIs, replacing manual tracking with a reliable, real-time pipeline and giving leadership objective visibility into team performance.",
      "Contributed to the development of an internal product (Pulse) that reduced company operating costs by approximately USD 500 per month.",
      "Introduced a deploy-fast, fail-fast development lifecycle for internal product development, increasing developer velocity and shortening time to market.",
      "Built a self-healing pipeline that uses Claude Code routines to automatically triage Sentry production issues, generate fixes, and open pull requests, reducing developer toil and cutting time-to-resolution for previously unseen production incidents.",
    ],
  },
];
