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
    title: "Agustina & Matias | Casamiento",
    description: "Invitación digital al casamiento de Agustina Marchetti y Matias Herrera. 15 de Noviembre de 2025, Tucumán.",
    openGraph: {
        title: "Agustina & Matias | Casamiento",
        description: "¡Nos casamos! Te invitamos a celebrar este día tan especial.",
        type: "website",
        locale: "es_AR",
    },
};

export default function BodaDemoLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`${playfair.variable} ${dancing.variable} ${cormorant.variable}`}>
            {children}
        </div>
    );
}
