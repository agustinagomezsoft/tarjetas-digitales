import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "XV de Nazarena | Estás Invitado ❄️",
    description: "Quiero que seas parte de este momento tan mágico para mí. 11 de Abril de 2026 - ¡Te espero!",
    keywords: ["XV años", "quinceañera", "Nazarena", "invitación", "Frozen", "fiesta"],
    authors: [{ name: "Agustina Tarjetas Digitales" }],

    // Open Graph - Para WhatsApp, Facebook, LinkedIn, etc.
    openGraph: {
        title: "✨ Estás invitado a mis XV ✨",
        description: "Nazarena te invita a celebrar sus XV años. 11 de Abril de 2026 🏰❄️",
        type: "website",
        locale: "es_AR",
        siteName: "XV de Nazarena",
        images: [
            {
                url: "/og/tarjeta-naza.png", // Imagen 1200x630
                width: 1200,
                height: 630,
                alt: "Invitación XV años de Nazarena - Tema Frozen",
            },
        ],
    },

    // Twitter Card - Para Twitter/X
    twitter: {
        card: "summary_large_image",
        title: "✨ Estás invitado a mis XV ✨",
        description: "Nazarena te invita a celebrar sus XV años. 11 de Abril de 2026 🏰❄️",
        images: ["/og/tarjeta-naza.png"],
    },

    // Tema de color para móviles
    themeColor: "#0a1628",
};

export default function TarjetaNazaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}