import { ImageResponse } from "next/og";

import { socialImage } from "@/lib/metadata";

export const alt = socialImage.alt;
export const size = { width: socialImage.width, height: socialImage.height };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#0B1220",
        color: "#FFFFFF",
        padding: "64px 72px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          opacity: 0.16,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
          backgroundSize: "44px 44px"
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          right: -100,
          top: -120,
          border: "76px solid rgba(37,71,208,.75)",
          borderRadius: 999
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 66,
              height: 66,
              borderRadius: 17,
              background: "#C7F36B",
              color: "#0B1220",
              fontSize: 28,
              fontWeight: 900
            }}
          >
            DS
          </div>
          <div style={{ display: "flex", fontSize: 38, fontWeight: 900 }}>
            Dev<span style={{ color: "#C7F36B" }}>Sectors</span>
          </div>
        </div>
        <div style={{ display: "flex", maxWidth: 940, fontSize: 76, lineHeight: 0.95, fontWeight: 900, letterSpacing: -4 }}>
          Thoughtful software for real-world operations.
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 20, color: "rgba(255,255,255,.6)" }}>
          <span>Product strategy / engineering / automation / reliability</span>
          <span style={{ color: "#C7F36B" }}>devsectors.site ↗</span>
        </div>
      </div>
    </div>,
    size
  );
}
