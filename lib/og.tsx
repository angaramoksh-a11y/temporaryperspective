// Shared card template for all opengraph-image.tsx files.
// Called as ogCard({...}) and passed directly to new ImageResponse(...).
// Satori (the ImageResponse renderer) only supports flexbox + a subset of CSS:
//   no grid, no background-clip:text, no oklch — hex/rgb only.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export type OGCardOptions = {
  headline: string;
  sub?: string;
  tag: string;
};

function headlineFontSize(s: string): number {
  const n = s.length;
  if (n <= 28) return 92;
  if (n <= 42) return 78;
  if (n <= 58) return 65;
  return 54;
}

// Returns a JSX element for ImageResponse — NOT a React component.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ogCard({ headline, sub, tag }: OGCardOptions): any {
  return (
    <div
      style={{
        background: "#04040A",
        width: "100%",
        height: "100%",
        display: "flex",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Key light — cool radial bloom behind the headline */}
      <div
        style={{
          position: "absolute",
          inset: "0",
          background:
            "radial-gradient(64% 72% at 22% 44%, rgba(185,200,238,0.07) 0%, transparent 68%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Headline + optional sub */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "16px",
            maxWidth: "840px",
          }}
        >
          <div
            style={{
              fontSize: headlineFontSize(headline),
              fontWeight: 700,
              color: "#EEEEF4",
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
            }}
          >
            {headline}
          </div>
          {sub && (
            <div
              style={{
                marginTop: "28px",
                fontSize: "22px",
                color: "#8080A6",
                lineHeight: 1.5,
                maxWidth: "680px",
                letterSpacing: "0.005em",
              }}
            >
              {sub}
            </div>
          )}
        </div>

        {/* Bottom strip: monogram + domain (left) | tag (right) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {/* TP monogram box */}
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "7px",
                border: "1px solid rgba(255,255,255,0.13)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#C8C8DC",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              TP
            </div>
            <span
              style={{
                color: "#40405A",
                fontSize: "15px",
                letterSpacing: "0.05em",
              }}
            >
              temporaryperspective.com
            </span>
          </div>

          {/* Category tag */}
          <span
            style={{
              color: "#52527A",
              fontSize: "13px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {tag}
          </span>
        </div>
      </div>
    </div>
  );
}
