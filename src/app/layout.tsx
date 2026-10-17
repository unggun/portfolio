import "./globals.css";

import { Transport } from "@/components/live/Transport";
import { Footer } from "@/components/live/Footer";
import { home } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { fonts } from "@/lib/fonts";
import { themeInitScript } from "@/lib/theme-script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export async function generateMetadata() {
  return buildMetadata({
    title: home.title,
    description: home.description,
    path: "/",
    image: "/images/og/home.jpg",
  });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={fonts.display.variable + " " + fonts.mono.variable}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <Transport />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
