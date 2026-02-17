"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, X, Check, ImagePlus, Sparkles, Heart, Loader2, AlertCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const staggerContainer = {
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const staggerItem = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

interface UploadedFile {
    id: string;
    name: string;
    preview: string;
    status: "uploading" | "success" | "error";
    error?: string;
    url?: string;
}

export default function AlbumPage() {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [uploaderName, setUploaderName] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [showNameModal, setShowNameModal] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Limpiar previews al desmontar
    useEffect(() => {
        return () => {
            files.forEach(f => URL.revokeObjectURL(f.preview));
        };
    }, []);

    const uploadFile = async (file: File, id: string) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("name", uploaderName || "Anónimo");

            const res = await fetch("/api/album/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                setFiles(prev => prev.map(f =>
                    f.id === id ? { ...f, status: "success", url: data.photo.url } : f
                ));
            } else {
                setFiles(prev => prev.map(f =>
                    f.id === id ? { ...f, status: "error", error: data.error } : f
                ));
            }
        } catch (err) {
            setFiles(prev => prev.map(f =>
                f.id === id ? { ...f, status: "error", error: "Error de conexión" } : f
            ));
        }
    };

    const handleFiles = useCallback(async (selectedFiles: FileList | null) => {
        if (!selectedFiles || selectedFiles.length === 0) return;

        const newFiles: UploadedFile[] = [];
        const filesToUpload: { file: File; id: string }[] = [];

        for (let i = 0; i < Math.min(selectedFiles.length, 10); i++) {
            const file = selectedFiles[i];

            if (!file.type.startsWith("image/")) continue;

            const id = `${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`;
            const preview = URL.createObjectURL(file);

            newFiles.push({
                id,
                name: file.name,
                preview,
                status: "uploading",
            });

            filesToUpload.push({ file, id });
        }

        setFiles(prev => [...prev, ...newFiles]);

        // Subir cada archivo
        for (const { file, id } of filesToUpload) {
            await uploadFile(file, id);
        }
    }, [uploaderName]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    }, [handleFiles]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const removeFile = (id: string) => {
        setFiles(prev => {
            const file = prev.find(f => f.id === id);
            if (file) URL.revokeObjectURL(file.preview);
            return prev.filter(f => f.id !== id);
        });
    };

    const successCount = files.filter(f => f.status === "success").length;
    const uploadingCount = files.filter(f => f.status === "uploading").length;

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0a1628] via-[#1a3a5c] to-[#2d5a7b]">
            <StarsBackground />
            <Snowflakes />

            {/* Header */}
            <header className="relative z-10 px-4 pt-6 pb-4">
                <Link href="/tarjeta-naza" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
                    <ChevronLeft className="w-4 h-4" />
                    Volver a la invitación
                </Link>
            </header>

            {/* Modal para nombre */}
            <AnimatePresence>
                {showNameModal && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-gradient-to-br from-[#1a3a5c] to-[#0a1628] rounded-3xl p-6 max-w-sm w-full border border-white/20 shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 flex items-center justify-center mx-auto mb-4 border border-white/20">
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-xl text-white font-semibold mb-2">¡Hola! 📸</h2>
                                <p className="text-white/70 text-sm">¿Cómo te llamás? Así sabemos quién subió las fotos</p>
                            </div>
                            <input
                                type="text"
                                placeholder="Tu nombre..."
                                value={uploaderName}
                                onChange={(e) => setUploaderName(e.target.value)}
                                className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-center text-lg focus:outline-none focus:border-white/40 mb-4"
                                autoFocus
                                onKeyDown={(e) => e.key === "Enter" && setShowNameModal(false)}
                            />
                            <motion.button
                                onClick={() => setShowNameModal(false)}
                                className="w-full py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {uploaderName ? "¡Listo, subir fotos!" : "Continuar como anónimo"}
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Contenido principal */}
            <motion.main
                className="relative z-10 px-4 pb-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {/* Título */}
                <motion.div className="text-center mb-8" variants={staggerItem}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <SnowflakeIcon className="w-5 h-5 text-[#87CEEB]" />
                        <span className="text-[#87CEEB] text-xs tracking-[0.3em] uppercase">Álbum de fotos</span>
                        <SnowflakeIcon className="w-5 h-5 text-[#87CEEB]" />
                    </div>
                    <h1 className="text-3xl md:text-4xl text-white frozen-title mb-2">
                        XV DE <span className="text-[#87CEEB]">NAZARENA</span>
                    </h1>
                    <p className="text-white/60 text-sm">
                        Subí tus fotos y compartilas con todos 💫
                    </p>
                    {uploaderName && (
                        <p className="text-[#87CEEB] text-sm mt-2">
                            Subiendo como: <span className="font-semibold">{uploaderName}</span>
                            <button onClick={() => setShowNameModal(true)} className="ml-2 underline text-white/60 hover:text-white">cambiar</button>
                        </p>
                    )}
                </motion.div>

                {/* Dropzone */}
                <motion.div variants={staggerItem}>
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => fileInputRef.current?.click()}
                        className={clsx(
                            "relative rounded-3xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300",
                            isDragging
                                ? "border-[#87CEEB] bg-[#87CEEB]/10 scale-[1.02]"
                                : "border-white/30 bg-white/5 hover:border-white/50 hover:bg-white/10"
                        )}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleFiles(e.target.files)}
                            className="hidden"
                        />

                        <motion.div
                            animate={isDragging ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                            className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center mx-auto mb-4 border border-white/20"
                        >
                            <ImagePlus className="w-10 h-10 text-white" />
                        </motion.div>

                        <p className="text-white text-lg font-medium mb-2">
                            {isDragging ? "¡Soltá las fotos aquí!" : "Tocá para subir fotos"}
                        </p>
                        <p className="text-white/50 text-sm">
                            O arrastrá y soltá tus imágenes
                        </p>
                        <p className="text-white/40 text-xs mt-2">
                            JPG, PNG, WebP, HEIC • Máx 10MB por foto
                        </p>

                        <div className="absolute top-4 right-4">
                            <Sparkles className="w-5 h-5 text-yellow-300/40" />
                        </div>
                        <div className="absolute bottom-4 left-4">
                            <Sparkles className="w-4 h-4 text-[#87CEEB]/40" />
                        </div>
                    </div>
                </motion.div>

                {/* Contador de progreso */}
                {files.length > 0 && (
                    <motion.div
                        className="mt-6 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                            {uploadingCount > 0 && (
                                <span className="flex items-center gap-2 text-white/80 text-sm">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Subiendo {uploadingCount}...
                                </span>
                            )}
                            {successCount > 0 && (
                                <span className="flex items-center gap-2 text-green-400 text-sm">
                                    <Check className="w-4 h-4" />
                                    {successCount} subida{successCount !== 1 ? "s" : ""}
                                </span>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Grid de fotos */}
                {files.length > 0 && (
                    <motion.div
                        className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        <AnimatePresence>
                            {files.map((file) => (
                                <motion.div
                                    key={file.id}
                                    className="relative aspect-square rounded-2xl overflow-hidden bg-white/10"
                                    variants={staggerItem}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                >
                                    <img
                                        src={file.preview}
                                        alt={file.name}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Overlay de estado */}
                                    <div className={clsx(
                                        "absolute inset-0 flex items-center justify-center transition-all",
                                        file.status === "uploading" && "bg-black/50",
                                        file.status === "error" && "bg-red-900/50"
                                    )}>
                                        {file.status === "uploading" && (
                                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                <Loader2 className="w-6 h-6 text-white animate-spin" />
                                            </div>
                                        )}
                                        {file.status === "success" && (
                                            <motion.div
                                                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", damping: 15 }}
                                            >
                                                <Check className="w-5 h-5 text-white" />
                                            </motion.div>
                                        )}
                                        {file.status === "error" && (
                                            <div className="text-center p-2">
                                                <AlertCircle className="w-8 h-8 text-red-300 mx-auto mb-1" />
                                                <p className="text-red-200 text-xs">{file.error}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Botón eliminar */}
                                    {file.status !== "uploading" && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                                            className="absolute top-2 left-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                                        >
                                            <X className="w-4 h-4 text-white" />
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Mensaje final */}
                {successCount > 0 && uploadingCount === 0 && (
                    <motion.div
                        className="mt-8 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 text-[#87CEEB]">
                            <Heart className="w-5 h-5 text-pink-400" />
                            <span>¡Gracias por compartir tus fotos!</span>
                            <Heart className="w-5 h-5 text-pink-400" />
                        </div>
                    </motion.div>
                )}

                {/* Botón para subir más */}
                {files.length > 0 && (
                    <motion.div
                        className="mt-6 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <motion.button
                            onClick={() => fileInputRef.current?.click()}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Upload className="w-5 h-5" />
                            Subir más fotos
                        </motion.button>
                    </motion.div>
                )}
            </motion.main>

            {/* Footer */}
            <footer className="relative z-10 py-6 text-center border-t border-white/10">
                <p className="text-[#87CEEB]/60 text-xs">
                    Las fotos aparecen en la pantalla de la fiesta 💫
                </p>
            </footer>
        </div>
    );
}

// Componentes decorativos
function Snowflakes() {
    const [flakes, setFlakes] = useState<Array<{ id: number; left: number; delay: number; dur: number; size: number }>>([]);
    useEffect(() => { setFlakes(Array.from({ length: 25 }, (_, i) => ({ id: i, left: Math.random() * 100, delay: Math.random() * 10, dur: 10 + Math.random() * 10, size: 2 + Math.random() * 4 }))); }, []);
    if (!flakes.length) return null;
    return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">{flakes.map(f => <div key={f.id} className="absolute animate-snowfall" style={{ left: `${f.left}%`, top: '-10px', animationDelay: `${f.delay}s`, animationDuration: `${f.dur}s` }}><div className="bg-white/40 rounded-full" style={{ width: `${f.size}px`, height: `${f.size}px` }} /></div>)}</div>;
}

function StarsBackground() {
    const [stars, setStars] = useState<Array<{ id: number; left: number; top: number; size: number; delay: number }>>([]);
    useEffect(() => { setStars(Array.from({ length: 40 }, (_, i) => ({ id: i, left: Math.random() * 100, top: Math.random() * 100, size: 1 + Math.random() * 2, delay: Math.random() * 3 }))); }, []);
    if (!stars.length) return null;
    return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">{stars.map(s => <div key={s.id} className="absolute rounded-full bg-white animate-twinkle" style={{ left: `${s.left}%`, top: `${s.top}%`, width: `${s.size}px`, height: `${s.size}px`, animationDelay: `${s.delay}s` }} />)}</div>;
}

function SnowflakeIcon({ className }: { className?: string }) {
    return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2v20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M2 12h20M2 12l3-3M2 12l3 3M22 12l-3-3M22 12l-3 3M4.93 4.93l14.14 14.14M4.93 4.93l0 4M4.93 4.93l4 0M19.07 19.07l0-4M19.07 19.07l-4 0M19.07 4.93L4.93 19.07M19.07 4.93l-4 0M19.07 4.93l0 4M4.93 19.07l4 0M4.93 19.07l0-4" /></svg>;
}