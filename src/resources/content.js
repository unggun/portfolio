import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Andreas Unggun",
  lastName: "Parananda",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Technical Lead / AI Native Engineer / Full Stack Developer",
  avatar: "/images/avatar.jpg",
  email: "andreas.unggun@gmail.com",
  location: "Asia/Jakarta",
  languages: ["English", "Bahasa Indonesia"], 
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/unggun",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/andreas-unggun-parananda-60279a13b/",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Engineering Real-World Solutions from Business Needs</>,
  featured: {
    display: true,
    title: <>Recent project: <strong className="ml-4">Swift Checkout</strong></>,
    href: "/work/swift-checkout-customizable-saas-checkout-for-ecommerce-platforms",
  },
  subline: (
    <>
      I'm Andreas, an AI native engineer and full-stack developer who crafts intuitive
      <br /> web-apps, SaaS products, company profiles, and e-commerce solutions.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/andreas-unggun-parananda",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Andreas is a Tangerang-based engineering leader, AI native engineer, and full-stack developer who turns complex business challenges into simple, actionable solutions.
        With over eight years of experience across backend (PHP, Laravel, Node.js, Go) and frontend (React, Next.js),
        he builds scalable SaaS and e-commerce products while leading and mentoring engineering teams.
        He bridges technical and business goals with equal fluency — and increasingly engineers AI into the development lifecycle itself,
        building toward a software factory where delivery is measured and automated end to end: developer-KPI pipelines that run themselves,
        and self-healing systems that triage and fix production issues autonomously.
        Always eager to learn, Andreas is committed to delivering efficient, user-centric solutions that drive real business value.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Upscalix",
        timeframe: "Aug 2025 - Present",
        role: "Technical Lead",
        achievements: [
          <>
            Designed and implemented automated data collection to measure developer KPIs, replacing manual tracking with a reliable, real-time pipeline and giving leadership objective visibility into team performance.
          </>,
          <>
            Contributed to the development of an internal product (Pulse) that reduced company operating costs by approximately USD 500 per month.
          </>,
          <>
            Introduced a deploy-fast, fail-fast development lifecycle for internal product development, increasing developer velocity and shortening time to market.
          </>,
          <>
            Built a self-healing pipeline that uses Claude Code routines to automatically triage Sentry production issues, generate fixes, and open pull requests — reducing developer toil and cutting time-to-resolution for previously unseen production incidents.
          </>,
        ],
        images: [],
      },
      {
        company: "SIRCLO",
        timeframe: "Feb 2022 - Apr 2025",
        role: "Engineering Manager",
        achievements: [
          <>
            Lead a team developing and maintaining a SaaS product and related microservices, serving 2,500+ monthly active users; improved documentation (manuals, user guides, APIs), boosted user engagement, and increased project delivery efficiency.
          </>,
          <>
            Implemented and refined automated testing processes, reducing QA hours by 8 per development cycle and increasing release confidence.
          </>,
          <>
            Discovered and resolved a critical price data tampering vulnerability, leading the team to deliver a fix that protected both client and company from significant financial risk.
          </>,
          <>
            Streamlined onboarding by consolidating fragmented documentation and creating a unified workflow channel, reducing colleague (user) setup time from one day to under one hour.
          </>,
          <>
            Proactively identified and addressed issues by establishing a real-time monitoring dashboard and alerting system, enabling the team to resolve problems before they affected users or clients.
          </>,
          <>
            Technical Architect (side role): Collaborated with the Business Development (BD) team, who often bring in prospective clients along with their specific challenges. Analyzed the client’s needs, design possible technical solutions, and provide effort estimations, following a similar process as internal feature planning.
          </>,
          <>
            Delivery Tribe Lead (previous role): Launched new projects and led a team of 50, enhancing operational efficiency with the implementation of OKRs and SOPs. Maintained high standards in a team-centric, results-driven environment. Responsible for team member performance review.
          </>,
        ],
        images: [
          {
            src: "/images/projects/swift-checkout/swift-checkout.jpg",
            alt: "Swift Checkout Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "SIRCLO",
        timeframe: "May 2020 - Feb 2022",
        role: "Assistant Engineering Manager",
        achievements: [
          <>
            Led a Strategic Project: Orchestrated a national B2B project (State-Owned Enterprise), valued at IDR 20
            billion (approx. USD 1.3 million), ensuring quality and alignment with strategic goals.
          </>,
          <>
            Collaborated with project managers to bridge the gap between the clients' requirements and the technical team to ensure the projects met the expectations and timelines
          </>,
          <>
            Led the development team to increase client's e-commerce site Google PageSpeed from 27 up to 92.
          </>,
          <>
            Detected and resolved a race condition in sales orders involving full reward point redemption, preventing potential revenue loss and ensuring transaction integrity
          </>,
        ],
        images: [],
      },
      {
        company: "ICUBE",
        timeframe: "Jun 2017 - May 2020",
        role: "Assistant Engineering Manager",
        achievements: [
          <>
            Administered the full lifecycle of development for 7+ projects (clients from various countries like US,
            Germany, Hong Kong, India, and Indonesia) and led small technical teams usually consisting around 3-5
            people per project.
          </>,
        ],
        images: [],
      },
      {
        company: "ICUBE",
        timeframe: "Dec 2014 - May 2017",
        role: "BackEnd Developer",
        achievements: [
          <>
            Developed integration feature of orders and products between Magento and ERP systems by using a module
            that utilizes XSL template for easier modifications at any time and auto-export and import, which improves
            the operational process.
          </>,
          <>
            Developed B2C commerce, B2B commerce, and marketplace websites.
          </>,
          <>
            Provided training of basic Magento modules and creating integration modules for Magento for 20+ newly
            joined developer.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "Duta Wacana Christian University",
        description: <>Studied software engineering.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "AI Engineering",
        items: [
          {
            title: "Claude Code",
            description: <>Agentic development with Claude Code — building, reviewing, and shipping production code.</>,
          },
          {
            title: "Claude Routines",
            description: <>Scheduled autonomous agents that triage production issues, generate fixes, and open pull requests without human kickoff.</>,
          },
          {
            title: "Agentic AI",
            description: <>Designing autonomous agents into the development lifecycle — from self-healing production pipelines to automated delivery workflows.</>,
          },
        ],
        images: [],
      },
      {
        title: "Backend",
        items: [
          {
            title: "PHP",
            description: <>Able to code with PHP with unnatural speed.</>,
          },
          {
            title: "Laravel",
            description: <>Craft scalable web-apps with Laravel and Vue.js.</>,
          },
          {
            title: "Node.js",
            description: <>Building scalable backend services with Node.js, Express.js.Actively expanding my knowledge in this area.</>,
          },
          {
            title: "Go",
            description: <>Building scalable backend services with Go.Actively expanding my knowledge in this area.</>,
          },
          {
            title: "Typescript",
            description: <>Building scalable backend services with Typescript.Actively expanding my knowledge in this area.</>,
          },
        ],
        images: [],
      },
      {
        title: "Frontend",
        items: [
          {
            title: "Next.js",
            description: <>Building next gen apps with Next.js.</>,
          },
          {
            title: "Tailwind CSS",
            description: <></>,
          },
        ],
        images: [],
      },
      {
        title: "Database",
        items: [
          {
            title: "MySQL",
            description: <>Building scalable backend services with MySQL.</>,
          },
          {
            title: "PostgreSQL",
            description: <>Building scalable backend services with PostgreSQL.</>,
          },
          {
            title: "MongoDB",
            description: <>Building scalable backend services with MongoDB.</>,
          },
        ],
        images: [],
      },
      {
        title: "E-commerce",
        items: [
          {
            title: "Adobe Commerce / Magento",
            description: <>Deployed e-commerce solutions, custom modules, and integrations with Adobe Commerce / Magento.</>,
          },
          {
            title: "Shopify",
            description: <>Helped clients to build customized e-commerce sites, custom Shopify apps, and integrations with Shopify.</>,
          },
        ],
        images: [],
      },
      {
        title: "Tools",
        items: [
          {
            title: "Git",
            description: <>Version control with Git.</>,
          },
          {
            title: "Docker",
            description: <>Containerization with Docker.</>,
          },
          {
            title: "Postman",
            description: <>API testing with Postman.</>,
          },
          {
            title: "GitHub Actions",
            description: <>CI/CD pipelines and automated delivery workflows with GitHub Actions.</>,
          },
          {
            title: "Firebase",
            description: <>Building and shipping apps fast with Firebase.</>,
          },
          {
            title: "n8n",
            description: <>Workflow automation with n8n.</>,
          },
          {
            title: "Notion",
            description: <>Project management with Notion.</>,
          },
          {
            title: "Teamwork",
            description: <>Project management with Teamwork.</>,
          },
          {
            title: "RabbitMQ",
            description: <>Message broker with RabbitMQ.</>,
          },
          {
            title: "Elasticsearch",
            description: <>Search engine with Elasticsearch.</>,
          },
          {
            title: "Redis",
            description: <>Caching with Redis.</>,
          },
          {
            title: "Google Pub/Sub",
            description: <>Message broker with Google Pub/Sub.</>,
          },
          {
            title: "Google Cloud Platform",
            description: <>Cloud platform with Google Cloud Platform.</>,
          },
          {
            title: "AWS",
            description: <>Cloud platform with AWS.</>,
          },
          {
            title: "Vercel",
            description: <>Cloud platform with Vercel.</>,
          },
        ],
        images: [],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Notes on building software with agents",
  description: `Field notes from ${person.name} on agentic development, delivery systems, and what breaks along the way`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
