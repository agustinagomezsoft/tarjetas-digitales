import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Invitación XV años de Nazarena";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(180deg, #0a1628 0%, #1a3a5c 50%, #2d5a7b 100%)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Georgia, serif",
                    position: "relative",
                }}
            >
                {/* Estrellas decorativas */}
                <div
                    style={{
                        position: "absolute",
                        top: "40px",
                        left: "80px",
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#FFD700",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "120px",
                        right: "150px",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#87CEEB",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "100px",
                        left: "200px",
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "#fff",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "200px",
                        left: "100px",
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "#87CEEB",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "150px",
                        right: "100px",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#FFD700",
                    }}
                />

                {/* Castillo SVG simplificado */}
                <div
                    style={{
                        display: "flex",
                        marginBottom: "20px",
                    }}
                >
                    <svg width="120" height="120" viewBox="0 0 200 200">
                        <defs>
                            <linearGradient id="cg" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#E8F4FC" />
                                <stop offset="100%" stopColor="#87CEEB" />
                            </linearGradient>
                            <linearGradient id="tg" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#FFF" />
                                <stop offset="100%" stopColor="#D8ECF4" />
                            </linearGradient>
                        </defs>
                        <rect x="50" y="120" width="100" height="60" fill="url(#cg)" rx="2" />
                        <rect x="85" y="40" width="30" height="100" fill="url(#tg)" />
                        <polygon points="100,10 75,45 125,45" fill="url(#tg)" />
                        <circle cx="100" cy="25" r="3" fill="#FFD700" />
                        <rect x="55" y="70" width="20" height="70" fill="url(#tg)" />
                        <polygon points="65,45 50,70 80,70" fill="url(#tg)" />
                        <circle cx="65" cy="55" r="2" fill="#FFD700" />
                        <rect x="125" y="70" width="20" height="70" fill="url(#tg)" />
                        <polygon points="135,45 120,70 150,70" fill="url(#tg)" />
                        <circle cx="135" cy="55" r="2" fill="#FFD700" />
                        <rect x="35" y="100" width="15" height="50" fill="url(#tg)" />
                        <polygon points="42.5,80 30,100 55,100" fill="url(#tg)" />
                        <rect x="150" y="100" width="15" height="50" fill="url(#tg)" />
                        <polygon points="157.5,80 145,100 170,100" fill="url(#tg)" />
                        <path d="M90 180L90 150Q100 140 110 150L110 180Z" fill="#4169E1" />
                    </svg>
                </div>

                {/* Texto "Estás invitado a" */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "8px",
                    }}
                >
                    <span style={{ color: "#87CEEB", fontSize: "18px" }}>❄</span>
                    <span
                        style={{
                            color: "#87CEEB",
                            fontSize: "16px",
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                        }}
                    >
                        Estás invitado a
                    </span>
                    <span style={{ color: "#87CEEB", fontSize: "18px" }}>❄</span>
                </div>

                {/* MIS XV */}
                <div
                    style={{
                        display: "flex",
                        fontSize: "72px",
                        fontWeight: "300",
                        letterSpacing: "0.15em",
                        marginBottom: "8px",
                    }}
                >
                    <span style={{ color: "#fff" }}>MIS </span>
                    <span style={{ color: "#87CEEB" }}>XV</span>
                </div>

                {/* Nazarena */}
                <div
                    style={{
                        fontSize: "64px",
                        fontStyle: "italic",
                        color: "#E0F4FF",
                        marginBottom: "24px",
                    }}
                >
                    Nazarena
                </div>

                {/* Fecha */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: "12px 32px",
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: "50px",
                        border: "1px solid rgba(255,255,255,0.2)",
                    }}
                >
                    <span style={{ color: "#87CEEB", fontSize: "20px" }}>🗓️</span>
                    <span style={{ color: "#fff", fontSize: "22px", fontWeight: "500" }}>
                        11 de Abril de 2026
                    </span>
                </div>

                {/* Footer con copos */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "30px",
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        color: "rgba(135,206,235,0.6)",
                        fontSize: "24px",
                    }}
                >
                    <span>❄</span>
                    <span style={{ color: "rgba(255,182,193,0.8)" }}>♥</span>
                    <span>❄</span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}