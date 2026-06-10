import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Temporary Perspective — B2B podcast studio, Mumbai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#04040A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* key light behind text */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(55% 55% at 50% 44%, rgba(190,205,235,0.08) 0%, transparent 70%)",
          }}
        />

        {/* eyebrow */}
        <p
          style={{
            color: "#7070A0",
            fontSize: 18,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            margin: 0,
            marginBottom: 28,
          }}
        >
          Mumbai · B2B Podcast Studio
        </p>

        {/* wordmark */}
        <h1
          style={{
            color: "#EEEEF4",
            fontSize: 82,
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1,
            margin: 0,
            textAlign: "center",
          }}
        >
          Temporary Perspective
        </h1>

        {/* rule */}
        <div
          style={{
            width: 64,
            height: 1,
            background: "rgba(255,255,255,0.15)",
            margin: "32px 0",
          }}
        />

        {/* tagline */}
        <p
          style={{
            color: "#8888A8",
            fontSize: 22,
            lineHeight: 1.45,
            textAlign: "center",
            margin: 0,
            maxWidth: 700,
          }}
        >
          Cinema-grade podcasts for the hardest-to-book guests.
        </p>

        {/* domain — bottom right */}
        <p
          style={{
            position: "absolute",
            bottom: 44,
            right: 64,
            color: "#44445A",
            fontSize: 16,
            letterSpacing: "0.06em",
            margin: 0,
          }}
        >
          temporaryperspective.com
        </p>
      </div>
    ),
    { ...size },
  );
}
