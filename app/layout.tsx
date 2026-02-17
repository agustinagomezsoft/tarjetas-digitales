import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel, Great_Vibes } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const greatVibes = Great_Vibes({
  variable: '--font-great-vibes',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: "Agustina | Tarjetas Digitales",
  description: "Invitaciones y tarjetas digitales personalizadas para tus eventos especiales. XV años, bodas, cumpleaños y más. Diseños únicos y elegantes.",
  keywords: ["tarjetas digitales", "invitaciones digitales", "XV años", "quinceañera", "bodas", "cumpleaños", "invitaciones online", "Tucumán", "Argentina"],
  authors: [{ name: "Agustina Gomez" }],
  creator: "Agustina Gomez",
  openGraph: {
    title: "Agustina | Tarjetas Digitales",
    description: "Invitaciones y tarjetas digitales personalizadas para tus eventos especiales. Diseños únicos y elegantes.",
    type: "website",
    locale: "es_AR",
    siteName: "Agustina Tarjetas Digitales",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agustina | Tarjetas Digitales",
    description: "Invitaciones y tarjetas digitales personalizadas para tus eventos especiales.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${greatVibes.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}