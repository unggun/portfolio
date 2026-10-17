import { ImageResponse } from "next/og";
import { baseURL, person } from "@/content";

export const runtime = "nodejs";

const BG = "#1c1d1e";
const TEXT = "#d8d8d5";
const ACCENT = "#f2a23a";

async function loadGoogleFont(font: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Portfolio";
  const host = baseURL.replace(/^https?:\/\//, "");

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "80px",
        background: BG,
        color: TEXT,
        fontFamily: "Archivo",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 96,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          textAlign: "left",
          overflow: "hidden",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: "0.12em",
            color: ACCENT,
          }}
        >
          {`00:00:00:00  ${host}`}
        </div>
        <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
          {person.name}
        </div>
      </div>
    </div>,
    {
      width: 1280,
      height: 720,
      fonts: [
        {
          name: "Archivo",
          data: await loadGoogleFont("Archivo:wght@800"),
          weight: 800,
          style: "normal",
        },
      ],
    },
  );
}
