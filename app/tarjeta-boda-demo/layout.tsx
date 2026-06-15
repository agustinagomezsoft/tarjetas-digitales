import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script, Cormorant_Garamond } from "next/font/google";
import "./boda.css";

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    style: ["normal", "italic"],
});

const dancing = Dancing_Script({
    variable: "--font-dancing",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

const cormorant = Cormorant_Garamond({
    variable: "--font-cormorant",
    subsets: ["latin"],
    weight: ["300", "400", "500"],
    style: ["normal", "italic"],
});

export const metadata: Metadata = {
    title: "Agustina & Matias | Casamiento 💍",
    description: "¡Nos casamos! Te invitamos a celebrar el casamiento de Agustina y Matias. 15 de Noviembre de 2025, Tucumán.",
    keywords: ["casamiento", "boda", "Agustina", "Matias", "invitación", "Tucumán"],
    authors: [{ name: "Agustina Tarjetas Digitales" }],

    // Open Graph — para WhatsApp, Facebook, LinkedIn, etc.
    openGraph: {
        title: "💍 Agustina & Matias | ¡Nos casamos!",
        description: "Agustina y Matias te invitan a celebrar su boda. 15 de Noviembre de 2025 · Tucumán 🌹",
        type: "website",
        locale: "es_AR",
        siteName: "Casamiento Agustina & Matias",
    },

    // Twitter Card — para Twitter/X
    twitter: {
        card: "summary_large_image",
        title: "💍 Agustina & Matias | ¡Nos casamos!",
        description: "Agustina y Matias te invitan a celebrar su boda. 15 de Noviembre de 2025 · Tucumán 🌹",
    },

    // Color de tema en móviles
    themeColor: "#1F0A14",
};

export default function BodaDemoLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`${playfair.variable} ${dancing.variable} ${cormorant.variable}`}>
            {children}
        </div>
    );
}
