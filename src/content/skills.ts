export type Device = { name: string; items: string[]; live?: boolean };

export const devices: Device[] = [
  { name: "AI Engineering", items: ["Claude Code", "Claude Routines", "Agentic AI", "n8n"] },
  { name: "Backend", items: ["PHP", "Laravel", "Node.js", "Go", "TypeScript"] },
  { name: "Frontend", items: ["Next.js", "Tailwind CSS", "Vue.js"] },
  { name: "Data", items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch"] },
  { name: "Commerce", items: ["Adobe Commerce", "Magento", "Shopify"] },
  {
    name: "Infra & Messaging",
    items: ["Docker", "GitHub Actions", "GCP", "AWS", "Vercel", "Firebase", "RabbitMQ", "Pub/Sub"],
  },
  { name: "Live Playback", items: ["Ableton Live", "Logic Pro", "LTC sync", "AU / VST"], live: true },
];
