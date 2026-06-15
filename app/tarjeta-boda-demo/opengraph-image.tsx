import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Invitación al casamiento de Agustina & Matias";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(160deg, #0D0508 0%, #1F0A14 40%, #3D1428 70%, #5C1832 100%)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Georgia, serif",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Estrellas doradas decorativas */}
                {[
                    { top: 45, left: 90, size: 7, color: "#C9A84C" },
                    { top: 130, right: 160, size: 5, color: "#F5D98B" },
                    { top: 70, right: 300, size: 4, color: "#C9A84C" },
                    { bottom: 110, left: 220, size: 6, color: "#F5D98B" },
                    { bottom: 160, right: 110, size: 5, color: "#C9A84C" },
                    { top: 210, left: 110, size: 4, color: "#E8B4B8" },
                    { bottom: 80, left: 500, size: 4, color: "#C9A84C" },
                    { top: 50, left: 600, size: 3, color: "#F5D98B" },
                    { top: 160, right: 80, size: 4, color: "#E8B4B8" },
                    { bottom: 200, right: 350, size: 5, color: "#C9A84C" },
                ].map((s, i) => (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            top: s.top,
                            left: (s as { left?: number }).left,
                            right: (s as { right?: number }).right,
                            bottom: s.bottom,
                            width: s.size,
                            height: s.size,
                            borderRadius: "50%",
                            background: s.color,
                            opacity: 0.8,
                        }}
                    />
                ))}

                {/* Líneas decorativas laterales */}
                <div
                    style={{
                        position: "absolute",
                        left: "60px",
                        top: "80px",
                        bottom: "80px",
                        width: "1px",
                        background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.4), transparent)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        right: "60px",
                        top: "80px",
                        bottom: "80px",
                        width: "1px",
                        background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.4), transparent)",
                    }}
                />

                {/* Anillos SVG */}
                <div style={{ display: "flex", marginBottom: "24px" }}>
                    <svg width="100" height="66" viewBox="0 0 120 80" fill="none">
                        <circle cx="42" cy="40" r="22" stroke="#C9A84C" strokeWidth="5" fill="none" />
                        <circle cx="42" cy="40" r="22" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
                        <circle cx="42" cy="18" r="4" fill="#C9A84C" />
                        <circle cx="42" cy="18" r="2" fill="#FFF8DC" opacity="0.8" />
                        <circle cx="78" cy="40" r="22" stroke="#F5D98B" strokeWidth="5" fill="none" />
                        <circle cx="78" cy="40" r="22" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
                        <circle cx="78" cy="18" r="4" fill="#F5D98B" />
                        <circle cx="78" cy="18" r="2" fill="#FFF8DC" opacity="0.8" />
                        <circle cx="28" cy="28" r="1.5" fill="#F5D98B" opacity="0.9" />
                        <circle cx="92" cy="28" r="1.5" fill="#F5D98B" opacity="0.9" />
                    </svg>
                </div>

                {/* Texto superior */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        marginBottom: "10px",
                    }}
                >
                    <span style={{ color: "#C9A84C", fontSize: "20px" }}>✦</span>
                    <span
                        style={{
                            color: "rgba(201,168,76,0.85)",
                            fontSize: "15px",
                            letterSpacing: "0.45em",
                            textTransform: "uppercase",
                        }}
                    >
                        Con inmensa alegría te invitamos a
                    </span>
                    <span style={{ color: "#C9A84C", fontSize: "20px" }}>✦</span>
                </div>

                {/* Nuestra Boda */}
                <div
                    style={{
                        color: "#C9A84C",
                        fontSize: "22px",
                        letterSpacing: "0.5em",
                        textTransform: "uppercase",
                        marginBottom: "18px",
                    }}
                >
                    nuestra boda
                </div>

                {/* Nombre Agustina */}
                <div
                    style={{
                        fontSize: "86px",
                        fontStyle: "italic",
                        color: "#F5E6C8",
                        lineHeight: 1,
                        marginBottom: "4px",
                    }}
                >
                    Agustina
                </div>

                {/* & separador */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        margin: "6px 0",
                    }}
                >
                    <div style={{ width: "60px", height: "1px", background: "rgba(201,168,76,0.5)" }} />
                    <span style={{ color: "#C9A84C", fontSize: "36px", fontStyle: "italic" }}>&amp;</span>
                    <div style={{ width: "60px", height: "1px", background: "rgba(201,168,76,0.5)" }} />
                </div>

                {/* Nombre Matias */}
                <div
                    style={{
                        fontSize: "86px",
                        fontStyle: "italic",
                        color: "#F5E6C8",
                        lineHeight: 1,
                        marginBottom: "28px",
                    }}
                >
                    Matias
                </div>

                {/* Fecha */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: "12px 36px",
                        background: "rgba(201,168,76,0.12)",
                        borderRadius: "50px",
                        border: "1px solid rgba(201,168,76,0.35)",
                    }}
                >
                    <span style={{ color: "#C9A84C", fontSize: "20px" }}>♥</span>
                    <span style={{ color: "#F5E6C8", fontSize: "22px", letterSpacing: "0.05em" }}>
                        15 de Noviembre de 2025
                    </span>
                    <span style={{ color: "#C9A84C", fontSize: "20px" }}>♥</span>
                </div>

                {/* Footer */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "28px",
                        display: "flex",
                        alignItems: "center",
                        gap: "18px",
                        color: "rgba(201,168,76,0.5)",
                        fontSize: "22px",
                    }}
                >
                    <span>✦</span>
                    <span style={{ color: "rgba(232,180,184,0.7)", fontSize: "26px" }}>♥</span>
                    <span>✦</span>
                </div>
            </div>
        ),
        { ...size }
    );
}
