import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#020617",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.35), transparent 55%), radial-gradient(circle at 15% 85%, rgba(14, 165, 233, 0.2), transparent 50%)",
          padding: "64px 72px",
          color: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "54px",
              height: "54px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            E
          </div>
          <div style={{ display: "flex", fontSize: "34px", fontWeight: 800 }}>
            <span>etikoppa&nbsp;</span>
            <span style={{ color: "#818cf8" }}>Inc.</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "58px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Digital Innovation. Intelligent Automation. Business Growth.
          </div>
          <div style={{ fontSize: "24px", color: "#cbd5e1", maxWidth: "920px" }}>
            Parent technology holding &amp; digital ecosystem hub • Hyderabad, India
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(148, 163, 184, 0.25)",
            paddingTop: "24px",
            fontSize: "20px",
            color: "#94a3b8",
          }}
        >
          <span>etikoppa.in</span>
          <span>reelsmith • suite • crm • commerce</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
