"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart, Sparkles, RefreshCw } from "lucide-react";

interface Photo {
    id: number;
    timestamp: string;
    uploaderName: string;
    url: string;
}

export default function SlideshowPage() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

    // Fetch fotos del Sheet
    const fetchPhotos = useCallback(async () => {
        try {
            const res = await fetch("/api/album/fotos", { cache: "no-store" });
            const data = await res.json();
            if (data.success && data.photos) {
                setPhotos(data.photos);
                setLastUpdate(new Date());
            }
        } catch (err) {
            console.error("Error fetching photos:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Fetch inicial y polling cada 10 segundos para nuevas fotos
    useEffect(() => {
        fetchPhotos();
        const interval = setInterval(fetchPhotos, 10000);
        return () => clearInterval(interval);
    }, [fetchPhotos]);

    // Cambiar foto cada 6 segundos
    useEffect(() => {
        if (photos.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % photos.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [photos.length]);

    const currentPhoto = photos[currentIndex];

    // Pantalla de espera cuando no hay fotos
    if (isLoading || photos.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a3a5c] to-[#2d5a7b] flex items-center justify-center relative overflow-hidden">
                <StarsBackground />
                <Snowflakes />
                <motion.div
                    className="text-center relative z-10 px-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <motion.div
                        className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 flex items-center justify-center mx-auto mb-8 border-2 border-white/20"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Camera className="w-16 h-16 text-white" />
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl text-white frozen-title mb-4">
                        XV DE <span className="text-[#87CEEB]">NAZARENA</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[#87CEEB] mb-8">Álbum de Fotos</p>
                    <div className="flex items-center justify-center gap-3 text-white/60">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                            <RefreshCw className="w-5 h-5" />
                        </motion.div>
                        <span className="text-lg">Esperando fotos...</span>
                    </div>
                    <p className="text-white/40 text-sm mt-4">
                        Escaneá el código QR para subir tus fotos
                    </p>
                </motion.div>
                <FloatingHearts />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Fondo con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#1a3a5c] to-[#0a1628]" />

            {/* Decoración */}
            <StarsBackground />

            {/* Header con título */}
            <motion.header
                className="absolute top-0 left-0 right-0 z-20 p-6 bg-gradient-to-b from-black/60 to-transparent"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <SnowflakeIcon className="w-8 h-8 text-[#87CEEB]" />
                        <div>
                            <h1 className="text-2xl md:text-3xl text-white frozen-title">
                                XV DE <span className="text-[#87CEEB]">NAZARENA</span>
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Camera className="w-4 h-4" />
                        <span>{photos.length} fotos</span>
                    </div>
                </div>
            </motion.header>

            {/* Slideshow principal */}
            <div className="absolute inset-0 flex items-center justify-center p-8 pt-24 pb-32">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPhoto.id}
                        className="relative max-w-5xl max-h-full w-full h-full flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Marco de la foto */}
                        <div className="relative rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(135,206,235,0.3)] border-4 border-white/20">
                            <img
                                src={currentPhoto.url}
                                alt={`Foto de ${currentPhoto.uploaderName}`}
                                className="max-h-[70vh] max-w-full object-contain"
                            />

                            {/* Overlay con info */}
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">
                                                {currentPhoto.uploaderName.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-lg">{currentPhoto.uploaderName}</p>
                                            <p className="text-white/60 text-sm">{currentPhoto.timestamp}</p>
                                        </div>
                                    </div>
                                    <Heart className="w-8 h-8 text-pink-400" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Decoración alrededor */}
                        <motion.div
                            className="absolute -top-4 -left-4"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <SnowflakeIcon className="w-8 h-8 text-[#87CEEB]/40" />
                        </motion.div>
                        <motion.div
                            className="absolute -bottom-4 -right-4"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        >
                            <SnowflakeIcon className="w-10 h-10 text-[#87CEEB]/30" />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer con indicadores */}
            <motion.footer
                className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black/60 to-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="max-w-7xl mx-auto">
                    {/* Indicadores de foto */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                        {photos.slice(0, Math.min(photos.length, 20)).map((_, i) => (
                            <motion.div
                                key={i}
                                className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex % Math.min(photos.length, 20)
                                        ? "w-8 bg-[#87CEEB]"
                                        : "w-2 bg-white/30"
                                    }`}
                            />
                        ))}
                        {photos.length > 20 && (
                            <span className="text-white/40 text-xs ml-2">+{photos.length - 20}</span>
                        )}
                    </div>

                    {/* Texto inferior */}
                    <div className="text-center">
                        <p className="text-white/40 text-sm flex items-center justify-center gap-2">
                            <Sparkles className="w-4 h-4 text-yellow-400/60" />
                            <span>Escaneá el código QR para subir tus fotos</span>
                            <Sparkles className="w-4 h-4 text-yellow-400/60" />
                        </p>
                    </div>
                </div>
            </motion.footer>

            {/* Partículas flotantes */}
            <FloatingHearts />
        </div>
    );
}

// Corazones flotando
function FloatingHearts() {
    const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([]);

    useEffect(() => {
        setHearts(Array.from({ length: 8 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 10,
            duration: 15 + Math.random() * 10,
            size: 16 + Math.random() * 16,
        })));
    }, []);

    if (!hearts.length) return null;

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
            {hearts.map(h => (
                <motion.div
                    key={h.id}
                    className="absolute"
                    style={{ left: `${h.left}%`, bottom: '-50px' }}
                    animate={{ y: [0, -window.innerHeight - 100], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: "linear" }}
                >
                    <Heart
                        className="text-pink-400/30"
                        style={{ width: h.size, height: h.size }}
                        fill="currentColor"
                    />
                </motion.div>
            ))}
        </div>
    );
}

// Componentes decorativos
function Snowflakes() {
    const [flakes, setFlakes] = useState<Array<{ id: number; left: number; delay: number; dur: number; size: number }>>([]);
    useEffect(() => { setFlakes(Array.from({ length: 20 }, (_, i) => ({ id: i, left: Math.random() * 100, delay: Math.random() * 10, dur: 12 + Math.random() * 8, size: 2 + Math.random() * 3 }))); }, []);
    if (!flakes.length) return null;
    return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">{flakes.map(f => <div key={f.id} className="absolute animate-snowfall" style={{ left: `${f.left}%`, top: '-10px', animationDelay: `${f.delay}s`, animationDuration: `${f.dur}s` }}><div className="bg-white/30 rounded-full" style={{ width: `${f.size}px`, height: `${f.size}px` }} /></div>)}</div>;
}

function StarsBackground() {
    const [stars, setStars] = useState<Array<{ id: number; left: number; top: number; size: number; delay: number }>>([]);
    useEffect(() => { setStars(Array.from({ length: 50 }, (_, i) => ({ id: i, left: Math.random() * 100, top: Math.random() * 100, size: 1 + Math.random() * 2, delay: Math.random() * 3 }))); }, []);
    if (!stars.length) return null;
    return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">{stars.map(s => <div key={s.id} className="absolute rounded-full bg-white animate-twinkle" style={{ left: `${s.left}%`, top: `${s.top}%`, width: `${s.size}px`, height: `${s.size}px`, animationDelay: `${s.delay}s` }} />)}</div>;
}

function SnowflakeIcon({ className }: { className?: string }) {
    return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2v20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M2 12h20M2 12l3-3M2 12l3 3M22 12l-3-3M22 12l-3 3M4.93 4.93l14.14 14.14M4.93 4.93l0 4M4.93 4.93l4 0M19.07 19.07l0-4M19.07 19.07l-4 0M19.07 4.93L4.93 19.07M19.07 4.93l-4 0M19.07 4.93l0 4M4.93 19.07l4 0M4.93 19.07l0-4" /></svg>;
}