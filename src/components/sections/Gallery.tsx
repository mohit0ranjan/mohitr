"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";
import { ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
    id: string;
    title: string;
    imageUrl: string;
    date: Date;
}

export default function Gallery({ items }: { items: GalleryItem[] }) {
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    if (!items.length) return null;

    return (
        <section className="py-24 bg-[#030303] border-t border-white/5 relative overflow-hidden">

            {/* Ambient Gradients - Visuals */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
                <div className="flex items-end justify-between mb-16">
                    <FadeIn>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
                            Visual <span className="text-pink-500">Journal.</span>
                        </h2>
                        <p className="text-neutral-400 max-w-md">
                            Snapshots from hackathons, late-night deploys, and travel.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <Link href="/gallery" className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium text-white group">
                            View Full Archive <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </FadeIn>
                </div>

                {/* Horizontal Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    {items.slice(0, 3).map((item, i) => (
                        <FadeIn key={item.id} delay={i * 0.1} className={i === 1 ? "md:-mt-12" : ""}>
                            <div
                                onClick={() => setSelectedImage(item)}
                                className="group block relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900 cursor-zoom-in"
                            >
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-pink-500 text-xs font-mono mb-2 block">{new Date(item.date).getFullYear()}</span>
                                    <h3 className="text-xl font-bold text-white leading-tight">{item.title}</h3>
                                </div>
                            </div>
                        </FadeIn>
                    ))}

                    {/* "More" Card */}
                    <FadeIn delay={0.3} className="md:mt-12">
                        <Link href="/gallery" className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] flex flex-col items-center justify-center text-center p-8 hover:bg-white/[0.05] transition-colors">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <ArrowUpRight className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Visual Archive</h3>
                            <p className="text-neutral-500 text-sm">Explore the full collection of moments.</p>
                        </Link>
                    </FadeIn>
                </div>

                <div className="mt-12 md:hidden">
                    <Link href="/gallery" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium text-white w-full">
                        View Full Archive
                    </Link>
                </div>

            </div>

            {/* LIGHTBOX MODAL */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-6xl max-h-[90vh] rounded-xl overflow-hidden flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-[80vh]">
                                <Image
                                    src={selectedImage.imageUrl}
                                    alt={selectedImage.title}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 p-3 bg-black/50 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10 z-50"
                            >
                                <X size={24} />
                            </button>

                            <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none">
                                <h3 className="text-2xl font-bold text-white drop-shadow-md">{selectedImage.title}</h3>
                                <p className="text-neutral-400 drop-shadow-md mt-1">{new Date(selectedImage.date).getFullYear()}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
