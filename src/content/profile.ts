export const baseURL = "https://unggun.tech";

const firstName = "Andreas Unggun";
const lastName = "Parananda";

export const person = {
  name: `${firstName} ${lastName}`,
  firstName,
  role: "Technical Lead / AI Native Engineer / Full Stack Developer",
  avatar: "/images/avatar.jpg",
  email: "andreas.unggun@gmail.com",
  location: "Asia/Jakarta",
};

export const social: { name: "GitHub" | "LinkedIn" | "Email"; href: string }[] = [
  { name: "GitHub", href: "https://github.com/unggun" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/andreas-unggun-parananda-60279a13b/",
  },
  { name: "Email", href: `mailto:${person.email}` },
];

export const home = {
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  roleLine: "Technical Lead at Upscalix",
  headline: "Engineering Real-World Solutions from Business Needs",
  subline:
    "Technical lead and AI native engineer building delivery systems that run themselves. Off the clock, a playback engineer and musician.",
};

export const about = {
  title: `About: ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  intro:
    "Andreas is a Tangerang-based engineering leader, AI native engineer, and full-stack developer who turns complex business challenges into simple, actionable solutions. With over eight years of experience across backend (PHP, Laravel, Node.js, Go) and frontend (React, Next.js), he builds scalable SaaS and e-commerce products while leading and mentoring engineering teams. He bridges technical and business goals with equal fluency, and increasingly engineers AI into the development lifecycle itself, building toward a software factory where delivery is measured and automated end to end: developer-KPI pipelines that run themselves, and self-healing systems that triage and fix production issues autonomously. Always eager to learn, Andreas is committed to delivering efficient, user-centric solutions that drive real business value.",
  studies: [
    {
      name: "Duta Wacana Christian University",
      description: "Studied software engineering.",
    },
  ],
  calendarHref: "https://cal.com/andreas-unggun-parananda",
};

export const work = {
  title: `Projects: ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  path: "/work",
};

export const blog = {
  title: "Notes on building software with agents",
  description: `Notes from ${person.name} on agentic development, delivery systems, and what breaks along the way`,
  path: "/blog",
};

export const routes = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
};
