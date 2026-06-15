"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Pause, Play, ChevronDown, Heart, Copy, Check, Gift, Church } from "lucide-react";
import clsx from "clsx";

const staggerContainer = {
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const staggerItem = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const modalBackdrop = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };
const modalPanel = { hidden: { opacity: 0, scale: 0.95, y: 20 }, visible: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 } };

const CONFIG = {
    novia: "Agustina",
    novio: "Matias",
    apellidoNovia: "Marchetti",
    apellidoNovio: "Herrera",
    fechaEvento: new Date("2025-11-15T20:00:00"),
    evento: { dia: "15", mes: "Noviembre", anio: "2025", hora: "20:00 hs" },
    ceremonia: {
        hora: "18:00 hs",
        lugar: "Convento San Francisco",
        direccion: "San Miguel de Tucumán",
        mapsUrl: "https://maps.app.goo.gl/m8NF68KXxsXbXuVf9",
    },
    recepcion: {
        hora: "20:00 hs",
        lugar: "Narcizo Eventos",
        direccion: "Lules, Tucumán",
        mapsUrl: "https://maps.app.goo.gl/LDVsX9DWKzA8JCU27",
    },
    dressCode: "Formal",
    dressCodeNota: "El blanco y sus tonos están reservados para la novia.",
    dressCodePaleta: [
        { color: "#E8D5B7", label: "Champagne" },
        { color: "#C4A882", label: "Beige" },
        { color: "#8E7B9E", label: "Lila" },
        { color: "#B8C9B8", label: "Salvia" },
        { color: "#C4867A", label: "Terracota" },
        { color: "#2D4A3E", label: "Verde" },
    ],
    fechaLimiteConfirmacion: "31 de Octubre de 2025",
    historia: [
        { fecha: "Enero 2020", icono: "☕", titulo: "Nos conocimos", descripcion: "Una noche de verano en una pequeña cafetería del centro. Matias le pidió prestado el cargador y nunca lo devolvió." },
        { fecha: "Agosto 2022", icono: "✈️", titulo: "Nuestro primer viaje", descripcion: "Recorrimos las quebradas del norte de la mano y supimos que éramos el hogar del otro." },
        { fecha: "Marzo 2025", icono: "💍", titulo: "El pedido", descripcion: "Bajo las estrellas de Cafayate, con una copa de vino y el corazón en la mano, Matias le propuso a Agustina." },
    ],
    mesa: {
        alias: "sofia.matias.boda",
        banco: "Galicia",
    },
    frase: "El amor no mira con los ojos, sino con el alma.",
    fraseAutor: "William Shakespeare",
};

export default function TarjetaBodaDemo() {
    const [showContent, setShowContent] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [countdown, setCountdown] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = CONFIG.fechaEvento.getTime() - now;
            if (distance > 0) {
                setCountdown({
                    dias: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    horas: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutos: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    segundos: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        audioRef.current = new Audio("/audio/teregalocarla.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
            // Si el navegador bloquea autoplay, se activará con la primera interacción
        });
        return () => { if (audioRef.current) { audioRef.current.pause(); } };
    }, []);

    const toggleMusic = () => {
        if (!audioRef.current) return;
        if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
        else { audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { }); }
    };

    const handleEnter = () => {
        setShowContent(true);
        if (audioRef.current && !isPlaying) {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
        }
    };

    if (!showContent) {
        return (
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0D0508] via-[#1F0A14] to-[#2D1020]">
                <PetalsFalling />
                <GoldStars />
                <motion.button
                    onClick={toggleMusic}
                    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#8B6030] shadow-xl flex items-center justify-center border border-[#C9A84C]/40"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
                </motion.button>
                <motion.div
                    className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10 py-20"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="mb-8 w-36 h-36 animate-ring-pulse" variants={staggerItem}>
                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                            <RingsSVG />
                        </motion.div>
                    </motion.div>

                    <motion.div className="text-center mb-8" variants={staggerItem}>
                        <p className="text-[#C9A84C]/80 text-xs tracking-[0.6em] uppercase mb-3 boda-subtitle">Con inmensa alegría</p>
                        <p className="text-[#F5E6C8]/60 text-sm tracking-[0.35em] uppercase mb-1 boda-subtitle">te invitamos a celebrar</p>
                        <p className="text-[#C9A84C] text-lg tracking-[0.4em] uppercase mb-8 boda-subtitle">nuestra boda</p>

                        <h1 className="boda-name text-[#F5E6C8] leading-none" style={{ fontSize: "clamp(3rem, 10vw, 5rem)" }}>
                            {CONFIG.novia}
                        </h1>
                        <div className="flex items-center justify-center gap-4 my-3">
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A84C]/60" />
                            <span className="text-[#C9A84C] text-2xl boda-subtitle">&amp;</span>
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9A84C]/60" />
                        </div>
                        <h1 className="boda-name text-[#F5E6C8] leading-none" style={{ fontSize: "clamp(3rem, 10vw, 5rem)" }}>
                            {CONFIG.novio}
                        </h1>
                    </motion.div>

                    <motion.div className="text-center mb-10" variants={staggerItem}>
                        <div className="flex items-center justify-center gap-3">
                            <PetalIcon className="w-4 h-4 text-[#E8B4B8]/60" />
                            <p className="text-[#E8B4B8]/90 boda-subtitle text-xl">
                                {CONFIG.evento.dia} · {CONFIG.evento.mes} · {CONFIG.evento.anio}
                            </p>
                            <PetalIcon className="w-4 h-4 text-[#E8B4B8]/60" />
                        </div>
                        <p className="text-[#C9A84C]/60 boda-subtitle text-sm mt-2">Tucumán, Argentina</p>
                    </motion.div>

                    <motion.button
                        onClick={handleEnter}
                        className="px-12 py-4 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#A07832] text-white font-medium tracking-widest uppercase text-sm shadow-[0_0_40px_rgba(201,168,76,0.35)] border border-[#C9A84C]/20 boda-subtitle"
                        variants={staggerItem}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(201,168,76,0.5)" }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="flex items-center gap-3">
                            <PetalIcon className="w-4 h-4" />
                            Abrir invitación
                            <PetalIcon className="w-4 h-4" />
                        </span>
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-x-hidden">
            <motion.button
                onClick={toggleMusic}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#8B6030] shadow-xl flex items-center justify-center border border-[#C9A84C]/40"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
            </motion.button>

            <Section1Portada countdown={countdown} />
            <Section2Ceremonia />
            <Section3Recepcion />
            <Section4DressCode />
            <Section5Fotos1 />
            <Section6Historia />
            <Section7Frase />
            <Section8Fotos2 />
            <Section9Mesa />
            <Section10Confirmacion />
            <Section11Despedida />
        </div>
    );
}

// ─── SECCIONES ────────────────────────────────────────────────────────────────

function Section1Portada({ countdown }: { countdown: { dias: number; horas: number; minutos: number; segundos: number } }) {
    const items = [
        { v: countdown.dias, l: "Días" },
        { v: countdown.horas, l: "Horas" },
        { v: countdown.minutos, l: "Min" },
        { v: countdown.segundos, l: "Seg" },
    ];
    return (
        <section className="boda-section min-h-screen relative overflow-hidden bg-gradient-to-b from-[#1F0A14] via-[#2D1020] to-[#5C1832]">
            <PetalsFalling />
            <GoldStars />
            <motion.div
                className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10 py-24"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                <motion.div variants={staggerItem} className="w-20 h-20 mb-6 animate-ring-pulse">
                    <RingsSVG />
                </motion.div>

                <motion.div className="text-center mb-10" variants={staggerItem}>
                    <p className="text-[#C9A84C]/70 text-xs tracking-[0.5em] uppercase mb-4 boda-subtitle">Celebremos juntos</p>
                    <h1 className="boda-name text-[#F5E6C8] leading-tight" style={{ fontSize: "clamp(3.5rem, 12vw, 6rem)" }}>
                        {CONFIG.novia}
                    </h1>
                    <div className="flex items-center justify-center gap-4 my-2">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A84C]/50" />
                        <span className="text-[#C9A84C] text-3xl boda-name animate-gold-glow">&amp;</span>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A84C]/50" />
                    </div>
                    <h1 className="boda-name text-[#F5E6C8] leading-tight" style={{ fontSize: "clamp(3.5rem, 12vw, 6rem)" }}>
                        {CONFIG.novio}
                    </h1>
                    <p className="text-[#E8B4B8]/70 boda-subtitle text-lg mt-4">
                        {CONFIG.evento.dia} · {CONFIG.evento.mes} · {CONFIG.evento.anio}
                    </p>
                </motion.div>

                <motion.div className="grid grid-cols-4 gap-3 md:gap-5 mb-10" variants={staggerContainer}>
                    {items.map((item, i) => (
                        <motion.div key={i} className="flex flex-col items-center" variants={staggerItem}>
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 backdrop-blur-sm border border-[#C9A84C]/30 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(201,168,76,0.1)]">
                                <span className="text-2xl md:text-3xl font-bold text-[#F5E6C8] boda-title">
                                    {item.v.toString().padStart(2, "0")}
                                </span>
                            </div>
                            <span className="text-[#C9A84C]/70 text-xs uppercase tracking-widest boda-subtitle">{item.l}</span>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-8">
                    <ChevronDown className="w-8 h-8 text-[#C9A84C]/50" />
                </motion.div>
            </motion.div>
        </section>
    );
}

function Section2Ceremonia() {
    return (
        <motion.section
            className="boda-section py-20 px-6 bg-gradient-to-b from-[#5C1832] to-[#8B4050]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
        >
            <motion.div className="max-w-md mx-auto" variants={staggerItem}>
                <div className="boda-divider">
                    <PetalIcon className="w-4 h-4 text-[#C9A84C]" />
                </div>
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-[#C9A84C]/30 shadow-[0_0_30px_rgba(201,168,76,0.15)]">
                    <Church className="w-10 h-10 text-[#F5E6C8]" />
                </div>
                <h3 className="text-center text-2xl text-[#F5E6C8] mb-6 boda-title tracking-widest uppercase">Ceremonia</h3>
                <motion.div
                    className="boda-card bg-white/10 rounded-3xl p-6 text-center border border-white/20"
                    whileHover={{ y: -3, boxShadow: "0 16px 48px rgba(201,168,76,0.2)" }}
                >
                    <p className="text-3xl text-[#C9A84C] boda-name mb-1">{CONFIG.evento.dia}</p>
                    <p className="text-lg text-[#F5E6C8]/80 boda-subtitle">de {CONFIG.evento.mes} de {CONFIG.evento.anio}</p>
                    <div className="my-4 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
                    <p className="text-[#F5E6C8] font-semibold text-lg boda-title">{CONFIG.ceremonia.lugar}</p>
                    <p className="text-[#E8B4B8]/80 text-sm boda-subtitle mt-1">{CONFIG.ceremonia.direccion}</p>
                    <div className="flex items-center justify-center gap-2 text-[#F5E6C8]/90 mt-3 boda-subtitle">
                        <Clock className="w-4 h-4 text-[#C9A84C]" />
                        {CONFIG.ceremonia.hora}
                    </div>
                    <a
                        href={CONFIG.ceremonia.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 w-full py-3 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#A07832] text-white flex items-center justify-center gap-2 text-sm boda-subtitle tracking-widest uppercase"
                    >
                        <MapPin className="w-4 h-4" /> Cómo llegar
                    </a>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

function Section3Recepcion() {
    return (
        <motion.section
            className="boda-section py-20 px-6 bg-gradient-to-b from-[#8B4050] to-[#C47B8A]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
        >
            <motion.div className="max-w-md mx-auto" variants={staggerItem}>
                <div className="boda-divider">
                    <PetalIcon className="w-4 h-4 text-[#F5E6C8]" />
                </div>
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.15)]">
                    <span className="text-3xl">🥂</span>
                </div>
                <h3 className="text-center text-2xl text-white mb-6 boda-title tracking-widest uppercase">Recepción</h3>
                <motion.div
                    className="boda-card bg-white/80 rounded-3xl p-6 text-center border border-white/60"
                    whileHover={{ y: -3, boxShadow: "0 16px 48px rgba(92,24,50,0.2)" }}
                >
                    <p className="text-3xl text-[#5C1832] boda-name mb-1">{CONFIG.evento.dia}</p>
                    <p className="text-lg text-[#8B4050]/80 boda-subtitle">de {CONFIG.evento.mes} de {CONFIG.evento.anio}</p>
                    <div className="my-4 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
                    <p className="text-[#5C1832] font-semibold text-lg boda-title">{CONFIG.recepcion.lugar}</p>
                    <p className="text-[#8B4050]/70 text-sm boda-subtitle mt-1">{CONFIG.recepcion.direccion}</p>
                    <div className="flex items-center justify-center gap-2 text-[#5C1832]/90 mt-3 boda-subtitle">
                        <Clock className="w-4 h-4 text-[#C9A84C]" />
                        {CONFIG.recepcion.hora}
                    </div>
                    <a
                        href={CONFIG.recepcion.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 w-full py-3 rounded-full bg-gradient-to-r from-[#5C1832] to-[#8B4050] text-white flex items-center justify-center gap-2 text-sm boda-subtitle tracking-widest uppercase"
                    >
                        <MapPin className="w-4 h-4" /> Cómo llegar
                    </a>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

function Section4DressCode() {
    return (
        <motion.section
            className="boda-section py-20 px-6 bg-[#2D4A3E]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
        >
            <motion.div className="max-w-md mx-auto text-center" variants={staggerItem}>
                <div className="boda-divider">
                    <PetalIcon className="w-4 h-4 text-[#C9A84C]" />
                </div>
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 border border-[#C9A84C]/30 shadow-[0_0_20px_rgba(201,168,76,0.15)]">
                    <span className="text-3xl">👗</span>
                </div>
                <h3 className="text-2xl text-[#F5E6C8] mb-2 boda-title tracking-widest uppercase">Dress Code</h3>
                <p className="text-4xl text-[#C9A84C] boda-name mb-6">{CONFIG.dressCode}</p>
                <p className="text-[#B8C9B8]/80 boda-subtitle text-sm mb-8">{CONFIG.dressCodeNota}</p>

                {/* Paleta de colores sugeridos */}
                <p className="text-[#C9A84C]/80 text-xs tracking-[0.4em] uppercase boda-subtitle mb-4">Paleta sugerida</p>
                <div className="flex justify-center gap-3 flex-wrap">
                    {CONFIG.dressCodePaleta.map((item, i) => (
                        <motion.div
                            key={i}
                            className="flex flex-col items-center gap-1"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ scale: 1.1 }}
                        >
                            <div
                                className="w-10 h-10 rounded-full border-2 border-white/30 shadow-lg"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-[#B8C9B8]/70 text-xs boda-subtitle">{item.label}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.section>
    );
}

function Section5Fotos1() {
    return (
        <motion.section
            className="boda-section py-20 px-6 bg-gradient-to-b from-[#FDF8F0] to-[#F5E6C8]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
        >
            <motion.div className="max-w-lg mx-auto grid grid-cols-2 gap-5" variants={staggerContainer}>
                {[1, 2].map((n) => (
                    <motion.div
                        key={n}
                        className="relative aspect-[3/4] rounded-3xl overflow-hidden border-4 border-white shadow-[0_8px_32px_rgba(92,24,50,0.15)]"
                        variants={staggerItem}
                        whileHover={{ scale: 1.03, boxShadow: "0 24px 48px rgba(92,24,50,0.25)" }}
                    >
                        <PhotoPlaceholder number={n} />
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}

function Section6Historia() {
    return (
        <motion.section
            className="boda-section py-20 px-6 bg-gradient-to-b from-[#1F0A14] to-[#2D1020]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
        >
            <motion.div className="max-w-lg mx-auto" variants={staggerItem}>
                <div className="boda-divider">
                    <Heart className="w-4 h-4 text-[#E8B4B8] fill-[#E8B4B8]" />
                </div>
                <h3 className="text-center text-2xl text-[#F5E6C8] mb-2 boda-title tracking-widest uppercase">Nuestra historia</h3>
                <p className="text-center text-[#C9A84C]/70 boda-subtitle text-sm mb-12">El camino que nos trajo hasta aquí</p>

                <div className="relative">
                    {/* Línea central */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A84C]/40 to-transparent" />

                    <div className="space-y-10">
                        {CONFIG.historia.map((item, i) => (
                            <motion.div
                                key={i}
                                className={clsx("flex gap-6 items-start", i % 2 === 0 ? "flex-row" : "flex-row-reverse")}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: i * 0.1 }}
                            >
                                <div className={clsx("flex-1 text-right", i % 2 !== 0 && "text-left")}>
                                    <div className={clsx("boda-card bg-white/5 rounded-2xl p-4 border border-[#C9A84C]/15", i % 2 !== 0 && "text-left")}>
                                        <p className="text-[#C9A84C] text-xs tracking-widest uppercase boda-subtitle mb-1">{item.fecha}</p>
                                        <p className="text-[#F5E6C8] font-medium boda-title mb-2">{item.titulo}</p>
                                        <p className="text-[#E8B4B8]/70 text-sm boda-subtitle leading-relaxed">{item.descripcion}</p>
                                    </div>
                                </div>
                                {/* Punto central */}
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#8B6030] flex items-center justify-center shadow-[0_0_20px_rgba(201,168,76,0.4)] text-lg z-10">
                                    {item.icono}
                                </div>
                                <div className="flex-1" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.section>
    );
}

function Section7Frase() {
    return (
        <motion.section
            className="boda-section py-20 px-6 bg-gradient-to-b from-[#F5E6C8] to-[#EDD8B0]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
        >
            <motion.div className="max-w-md mx-auto text-center" variants={staggerItem}>
                <div className="boda-divider boda-divider-light">
                    <Heart className="w-4 h-4 text-[#8B4050] fill-[#8B4050]" />
                </div>
                <span className="text-[#C9A84C]/50 text-6xl boda-name leading-none">&ldquo;</span>
                <p className="text-[#5C1832] text-xl md:text-2xl leading-relaxed boda-title -mt-4">
                    {CONFIG.frase}
                </p>
                <span className="text-[#C9A84C]/50 text-6xl boda-name leading-none">&rdquo;</span>
                <p className="text-[#8B4050]/70 boda-subtitle text-sm mt-2">— {CONFIG.fraseAutor}</p>
            </motion.div>
        </motion.section>
    );
}

function Section8Fotos2() {
    return (
        <motion.section
            className="boda-section py-20 px-6 bg-gradient-to-b from-[#EDD8B0] to-[#F5E6C8]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
        >
            <motion.div className="max-w-lg mx-auto" variants={staggerItem}>
                <div className="grid grid-cols-12 gap-5">
                    <motion.div
                        className="col-span-7 relative aspect-[4/5] rounded-3xl overflow-hidden border-4 border-white shadow-[0_8px_32px_rgba(92,24,50,0.15)]"
                        whileHover={{ scale: 1.03 }}
                    >
                        <PhotoPlaceholder number={3} />
                    </motion.div>
                    <div className="col-span-5 flex flex-col gap-5">
                        <motion.div
                            className="relative aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-[0_8px_32px_rgba(92,24,50,0.15)]"
                            whileHover={{ scale: 1.03 }}
                        >
                            <PhotoPlaceholder number={4} />
                        </motion.div>
                        <div className="rounded-2xl bg-gradient-to-br from-[#5C1832]/10 to-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center p-4 flex-1">
                            <div className="text-center">
                                <Heart className="w-6 h-6 text-[#8B4050] fill-[#E8B4B8] mx-auto mb-2 animate-pulse" />
                                <p className="text-[#5C1832] text-xs boda-subtitle">Para siempre</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.section>
    );
}

function Section9Mesa() {
    const [copied, setCopied] = useState(false);
    const [show, setShow] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(CONFIG.mesa.alias);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };
    return (
        <motion.section
            className="boda-section py-20 px-6 bg-gradient-to-b from-[#2D4A3E] to-[#1F3329]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
        >
            <motion.div className="max-w-md mx-auto" variants={staggerItem}>
                <div className="boda-divider">
                    <PetalIcon className="w-4 h-4 text-[#C9A84C]" />
                </div>
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 border border-[#C9A84C]/30 shadow-[0_0_20px_rgba(201,168,76,0.15)]">
                    <Gift className="w-10 h-10 text-[#F5E6C8]" />
                </div>
                <h3 className="text-center text-2xl text-[#F5E6C8] mb-6 boda-title tracking-widest uppercase">Mesa de regalos</h3>
                <div className="boda-card bg-white/8 backdrop-blur-md rounded-3xl p-6 text-center border border-white/10">
                    <p className="text-[#B8C9B8]/90 boda-subtitle mb-4 leading-relaxed">
                        Tu presencia es nuestro mejor regalo.<br />
                        Si deseás tenernos un detalle, podés hacerlo a través de:
                    </p>
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between bg-white/5 rounded-2xl px-4 py-3 border border-white/10">
                            <span className="text-[#C9A84C]/70 text-xs uppercase boda-subtitle">Banco</span>
                            <span className="text-[#F5E6C8] font-medium boda-title">{CONFIG.mesa.banco}</span>
                        </div>
                    </div>
                    {!show ? (
                        <motion.button
                            onClick={() => setShow(true)}
                            className="w-full py-3 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#A07832] text-white boda-subtitle tracking-widest uppercase text-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Ver alias
                        </motion.button>
                    ) : (
                        <motion.div
                            className="flex items-center justify-between bg-white/10 rounded-2xl p-4 border border-[#C9A84C]/20"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="text-left">
                                <p className="text-[#C9A84C]/70 text-xs uppercase boda-subtitle">Alias</p>
                                <p className="text-xl font-bold text-[#F5E6C8] boda-title">{CONFIG.mesa.alias}</p>
                            </div>
                            <button
                                onClick={copy}
                                className={clsx(
                                    "w-12 h-12 rounded-full flex items-center justify-center text-white transition-colors",
                                    copied ? "bg-green-600" : "bg-[#C9A84C]"
                                )}
                            >
                                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            </button>
                        </motion.div>
                    )}
                    {copied && <p className="text-green-400 text-sm mt-3 boda-subtitle">¡Alias copiado!</p>}
                    <p className="text-[#B8C9B8]/50 text-xs boda-subtitle mt-4">También habrá un buzón de sobres en el salón.</p>
                </div>
            </motion.div>
        </motion.section>
    );
}

function Section10Confirmacion() {
    const [form, setForm] = useState({ nombre: "", apellido: "", confirma: true, alim: "ninguno", mensaje: "" });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const change = (f: string, v: string | boolean) => {
        setForm({ ...form, [f]: v });
        if (f === "nombre" && error) setError(null);
    };

    const submit = async () => {
        if (!form.nombre.trim()) { setError("Por favor, ingresá tu nombre"); return; }
        setError(null);
        setSending(true);
        try {
            const res = await fetch("/api/confirmacion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cant: "1", inv: [{ ...form, cancion: form.mensaje }] }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Error al enviar");
            setSent(true);
        } catch (e) {
            setError(e instanceof Error ? e.message : "No se pudo enviar. Revisá tu conexión.");
        } finally {
            setSending(false);
        }
    };

    if (sent) return (
        <section className="boda-section py-20 px-6 bg-gradient-to-b from-[#5C1832] to-[#2D1020]">
            <motion.div
                className="max-w-md mx-auto text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20 }}
            >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#8B6030] mx-auto mb-6 flex items-center justify-center shadow-[0_0_40px_rgba(201,168,76,0.4)]">
                    <Heart className="w-12 h-12 text-white fill-white" />
                </div>
                <h3 className="text-2xl text-[#F5E6C8] boda-title mb-4">¡Gracias por confirmar!</h3>
                <p className="text-[#E8B4B8]/80 boda-subtitle">Tu confirmación fue registrada. ¡Te esperamos con alegría!</p>
            </motion.div>
        </section>
    );

    return (
        <motion.section
            className="boda-section py-20 px-6 bg-gradient-to-b from-[#5C1832] to-[#2D1020]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
        >
            <motion.div className="max-w-md mx-auto" variants={staggerItem}>
                <div className="boda-divider">
                    <PetalIcon className="w-4 h-4 text-[#C9A84C]" />
                </div>
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 border border-[#C9A84C]/30">
                    <span className="text-3xl">✉️</span>
                </div>
                <h3 className="text-center text-2xl text-[#F5E6C8] boda-title mb-2 tracking-widest uppercase">Confirmá tu asistencia</h3>
                <div className="text-center mb-8">
                    <p className="text-[#E8B4B8]/60 boda-subtitle text-sm mb-1">Tenés tiempo hasta el</p>
                    <p className="text-2xl text-[#F5E6C8] boda-title">{CONFIG.fechaLimiteConfirmacion}</p>
                </div>

                <div className="boda-card-dark bg-white/5 rounded-3xl p-6 border border-[#C9A84C]/15">
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Nombre *"
                                value={form.nombre}
                                onChange={(e) => change("nombre", e.target.value)}
                                className={clsx(
                                    "w-full p-3 rounded-xl bg-white/8 border text-[#F5E6C8] placeholder:text-[#F5E6C8]/40 boda-subtitle outline-none focus:ring-1 focus:ring-[#C9A84C]/50",
                                    error && !form.nombre.trim() ? "border-red-400/60 bg-red-900/10" : "border-white/15"
                                )}
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Apellido"
                            value={form.apellido}
                            onChange={(e) => change("apellido", e.target.value)}
                            className="w-full p-3 rounded-xl bg-white/8 border border-white/15 text-[#F5E6C8] placeholder:text-[#F5E6C8]/40 boda-subtitle outline-none focus:ring-1 focus:ring-[#C9A84C]/50"
                        />
                        <div>
                            <p className="text-[#E8B4B8]/80 text-sm mb-2 boda-subtitle">¿Confirmás tu asistencia?</p>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 text-[#F5E6C8] cursor-pointer boda-subtitle">
                                    <input type="radio" name="confirma" checked={form.confirma} onChange={() => change("confirma", true)} className="w-4 h-4" />
                                    ¡Confirmo!
                                </label>
                                <label className="flex items-center gap-2 text-[#F5E6C8] cursor-pointer boda-subtitle">
                                    <input type="radio" name="confirma" checked={!form.confirma} onChange={() => change("confirma", false)} className="w-4 h-4" />
                                    No podré
                                </label>
                            </div>
                        </div>
                        <select
                            value={form.alim}
                            onChange={(e) => change("alim", e.target.value)}
                            className="w-full p-3 rounded-xl bg-white/8 border border-white/15 text-[#F5E6C8] boda-subtitle outline-none"
                        >
                            <option value="ninguno" className="text-[#194569]">Sin requerimiento alimentario</option>
                            <option value="vegetariano" className="text-[#194569]">Vegetariano</option>
                            <option value="vegano" className="text-[#194569]">Vegano</option>
                            <option value="celiaco" className="text-[#194569]">Celíaco</option>
                        </select>
                        <input
                            type="text"
                            placeholder="¿Querés dejarnos un mensaje? 💌"
                            value={form.mensaje}
                            onChange={(e) => change("mensaje", e.target.value)}
                            className="w-full p-3 rounded-xl bg-white/8 border border-white/15 text-[#F5E6C8] placeholder:text-[#F5E6C8]/40 boda-subtitle outline-none focus:ring-1 focus:ring-[#C9A84C]/50"
                        />
                    </div>
                    {error && <p className="mt-3 text-red-300 text-sm boda-subtitle text-center">{error}</p>}
                    <motion.button
                        onClick={submit}
                        disabled={sending}
                        className="w-full py-4 mt-6 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#A07832] text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-60 boda-subtitle tracking-widest uppercase text-sm"
                        whileHover={!sending ? { scale: 1.02 } : {}}
                        whileTap={!sending ? { scale: 0.98 } : {}}
                    >
                        {sending
                            ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Enviando...</>
                            : <><PetalIcon className="w-4 h-4" />Confirmar asistencia</>
                        }
                    </motion.button>
                </div>
            </motion.div>
        </motion.section>
    );
}

function Section11Despedida() {
    return (
        <motion.section
            className="boda-section py-28 px-6 bg-gradient-to-b from-[#2D1020] to-[#0D0508] relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
        >
            <PetalsFalling />
            <GoldStars />
            <motion.div className="max-w-md mx-auto text-center relative z-10" variants={staggerItem}>
                <div className="w-28 h-28 mx-auto mb-10 animate-ring-pulse">
                    <RingsSVG />
                </div>
                <p className="text-[#C9A84C]/80 boda-subtitle text-lg mb-3">Con todo nuestro amor,</p>
                <h2 className="boda-name text-[#F5E6C8]" style={{ fontSize: "clamp(3rem, 10vw, 4.5rem)" }}>
                    {CONFIG.novia}
                </h2>
                <div className="flex items-center justify-center gap-4 my-2">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A84C]/50" />
                    <span className="text-[#C9A84C] text-2xl boda-name">&amp;</span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9A84C]/50" />
                </div>
                <h2 className="boda-name text-[#F5E6C8]" style={{ fontSize: "clamp(3rem, 10vw, 4.5rem)" }}>
                    {CONFIG.novio}
                </h2>
                <div className="mt-12 flex justify-center gap-5">
                    <PetalIcon className="w-5 h-5 text-[#E8B4B8]/50 animate-rotate-slow" />
                    <Heart className="w-7 h-7 text-[#E8B4B8] fill-[#E8B4B8]/60 animate-pulse" />
                    <PetalIcon className="w-5 h-5 text-[#E8B4B8]/50 animate-rotate-slow-reverse" />
                </div>
            </motion.div>
        </motion.section>
    );
}

// ─── COMPONENTES DECORATIVOS ──────────────────────────────────────────────────

function PhotoPlaceholder({ number }: { number: number }) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#E8B4B8]/25 via-[#C9A84C]/10 to-[#8B4050]/20">
            <div className="w-12 h-12 mb-3 opacity-40">
                <RingsSVG />
            </div>
            <p className="text-[#8B4050]/50 text-xs tracking-widest uppercase boda-subtitle">Foto {number}</p>
        </div>
    );
}

function PetalsFalling() {
    const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; dur: number; size: number; opacity: number }>>([]);
    useEffect(() => {
        setPetals(Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 12,
            dur: 10 + Math.random() * 8,
            size: 6 + Math.random() * 8,
            opacity: 0.3 + Math.random() * 0.4,
        })));
    }, []);
    if (!petals.length) return null;
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {petals.map((p) => (
                <div
                    key={p.id}
                    className="absolute animate-petal-fall"
                    style={{ left: `${p.left}%`, top: "-20px", animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, opacity: p.opacity }}
                >
                    <PetalIcon className="text-[#E8B4B8]" style={{ width: p.size, height: p.size }} />
                </div>
            ))}
        </div>
    );
}

function GoldStars() {
    const [stars, setStars] = useState<Array<{ id: number; left: number; top: number; size: number; delay: number }>>([]);
    useEffect(() => {
        setStars(Array.from({ length: 35 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: 1 + Math.random() * 2,
            delay: Math.random() * 4,
        })));
    }, []);
    if (!stars.length) return null;
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {stars.map((s) => (
                <div
                    key={s.id}
                    className="absolute rounded-full bg-[#C9A84C] animate-star-twinkle"
                    style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
                />
            ))}
        </div>
    );
}

function PetalIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
            <path d="M12 2C8 2 4 6 4 10c0 2.5 1.5 4.5 3.5 6C9 17.5 10 18.5 10 20a2 2 0 0 0 4 0c0-1.5 1-2.5 2.5-4C18.5 14.5 20 12.5 20 10c0-4-4-8-8-8z" />
        </svg>
    );
}

function RingsSVG() {
    return (
        <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
            <defs>
                <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5D98B" />
                    <stop offset="50%" stopColor="#C9A84C" />
                    <stop offset="100%" stopColor="#8B6030" />
                </linearGradient>
                <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E8C97A" />
                    <stop offset="50%" stopColor="#B8943C" />
                    <stop offset="100%" stopColor="#7A5020" />
                </linearGradient>
            </defs>
            {/* Anillo izquierdo */}
            <circle cx="42" cy="40" r="22" stroke="url(#goldGrad1)" strokeWidth="6" fill="none" />
            <circle cx="42" cy="40" r="22" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
            {/* Pequeña gema */}
            <circle cx="42" cy="18" r="4" fill="url(#goldGrad1)" />
            <circle cx="42" cy="18" r="2" fill="#FFF8DC" opacity="0.8" />
            {/* Anillo derecho */}
            <circle cx="78" cy="40" r="22" stroke="url(#goldGrad2)" strokeWidth="6" fill="none" />
            <circle cx="78" cy="40" r="22" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
            {/* Pequeña gema */}
            <circle cx="78" cy="18" r="4" fill="url(#goldGrad2)" />
            <circle cx="78" cy="18" r="2" fill="#FFF8DC" opacity="0.8" />
            {/* Destellos */}
            <circle cx="28" cy="28" r="1.5" fill="#F5D98B" opacity="0.8" />
            <circle cx="92" cy="28" r="1.5" fill="#F5D98B" opacity="0.8" />
            <circle cx="60" cy="15" r="1" fill="#F5D98B" opacity="0.6" />
        </svg>
    );
}
