import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "XV de Nazarena | Estás Invitado ❄️🏰 Celebrá con nosotros",
    description: "Un sueño que guardé en mi corazón está por hacerse realidad. El 11 de abril será una noche llena de magia y emoción. ¡Quiero que formes parte de este cuento tan especial! ❄️✨",
    keywords: ["XV años", "quinceañera", "Nazarena", "invitación", "Frozen", "fiesta", "11 de abril 2026"],
    authors: [{ name: "Agustina Tarjetas Digitales" }],

    openGraph: {
        title: "✨ Estás invitado a mis XV ✨ - Nazarena",
        description: "Un sueño que guardé en mi corazón está por hacerse realidad. El 11 de abril será una noche llena de magia. ¡Quiero que formes parte de este cuento especial! 🏰❄️",
        type: "website",
        locale: "es_AR",
        siteName: "XV de Nazarena",
        images: [
            {
                url: "/tarjeta-naza/invitacion/opengraph-image",
                width: 1200,
                height: 630,
                alt: "Invitación XV años de Nazarena - Tema Frozen",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "✨ Estás invitado a mis XV ✨ - Nazarena",
        description: "Un sueño que guardé en mi corazón está por hacerse realidad. El 11 de abril será una noche llena de magia. 🏰❄️",
        images: ["/tarjeta-naza/invitacion/opengraph-image"],
    },

    themeColor: "#0a1628",
};

export default function InvitacionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}