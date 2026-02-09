"use client";

import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Terminal, Cpu, Layers, Box, Github, Linkedin, Twitter, Cloud, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function HeroProp({ content, settings, ticker }: any) {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, 100]);
    const y2 = useTransform(scrollY, [0, 300], [0, -100]);

    // --- ULTRA-SMOOTH ANIMATION SYSTEM ---

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
                duration: 0.5
            }
        }
    };

    // Cinematic Entrance with custom ease
    const fadeInUp: Variants = {
        hidden: {
            opacity: 0,
            y: 40,
            scale: 0.96,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1], // Custom "Smooth Out" Bezier
                opacity: { duration: 0.8 }
            }
        }
    };

    const cardEntrance: Variants = {
        hidden: { opacity: 0, x: -40, scale: 0.95 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const float: Variants = {
        animate: {
            y: [0, -12, 0],
            rotate: [0, 1.5, -1.5, 0],
            transition: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const floatSmooth: Variants = {
        animate: {
            y: [0, -15, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section ref={containerRef} className="min-h-[100dvh] w-full relative flex flex-col items-center justify-center overflow-hidden bg-[#030303] text-white pt-24 pb-12 sm:pt-20 sm:pb-20 perspective-1000">

            {/* 1. Background Atmosphere - Immediate Entrance */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 2 }}
                    style={{ y: y1 }}
                    className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] sm:w-[900px] sm:h-[900px] bg-emerald-900/10 blur-[120px] rounded-full mix-blend-screen"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    style={{ y: y2 }}
                    className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] sm:w-[900px] sm:h-[900px] bg-blue-900/10 blur-[120px] rounded-full mix-blend-screen"
                />
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.04]" />

                {/* Decorative Elements */}
                <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-emerald-500/30" />
                <div className="absolute top-[60%] right-[10%] w-3 h-3 rounded-full bg-blue-500/30" />
                <div className="absolute bottom-[30%] left-[40%] w-2 h-2 rounded-full bg-orange-500/30" />
            </div>

            {/* 2. Main Layout Container */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 w-full max-w-6xl flex flex-col xl:flex-row items-center justify-between px-4 sm:px-8 gap-8 xl:gap-0 mt-4 sm:mt-8"
            >

                {/* --- LEFT: Identity Card --- */}
                <div className="xl:w-1/3 flex flex-col items-center xl:items-start relative z-50 order-1 xl:order-1 w-full sm:w-auto">
                    <motion.div
                        variants={cardEntrance}
                        className="w-full sm:w-[380px] p-6 sm:p-8 rounded-[2rem] bg-neutral-900/40 backdrop-blur-md border border-white/5 shadow-2xl flex flex-col items-center xl:items-start text-center xl:text-left gap-4 group hover:border-emerald-500/20 transition-all duration-500 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="flex flex-col items-center xl:items-start gap-3 w-full relative z-10">
                            <h2 className="text-[10px] sm:text-xs font-mono text-emerald-400 uppercase tracking-[0.2em] bg-emerald-500/5 px-4 py-1.5 rounded-full border border-emerald-500/10">Full Stack Architect</h2>
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mt-1">Mohit Ranjan</h1>
                        </div>

                        <div className="w-12 h-[2px] bg-emerald-500/50 rounded-full" />

                        <p className="text-neutral-400 font-medium leading-relaxed text-sm sm:text-base">
                            Crafting scalable digital ecosystems with precision engineering.
                            <br /><span className="text-neutral-500 text-xs mt-2 block font-mono">GatewayID: 2026.1 • India • Remote</span>
                        </p>

                        <div className="flex gap-4 w-full justify-center xl:justify-start pt-2">
                            <Link href="#" className="flex items-center justify-center w-10 h-10 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-all text-neutral-400 border border-white/5"><Github size={18} /></Link>
                            <Link href="#" className="flex items-center justify-center w-10 h-10 bg-white/5 rounded-full hover:bg-white/10 hover:text-blue-400 transition-all text-neutral-400 border border-white/5"><Linkedin size={18} /></Link>
                            <Link href="#" className="flex items-center justify-center w-10 h-10 bg-white/5 rounded-full hover:bg-white/10 hover:text-sky-400 transition-all text-neutral-400 border border-white/5"><Twitter size={18} /></Link>
                        </div>
                    </motion.div>
                </div>

                {/* --- RIGHT: The Cluster --- */}
                <div className="xl:w-2/3 flex flex-col items-center xl:items-end relative xl:pr-12 w-full order-2 xl:order-2 scale-[0.8] sm:scale-90 md:scale-100 origin-top xl:origin-right transform-gpu mt-6 sm:mt-0">

                    {/* ROW 1: CODE */}
                    <div className="relative flex items-center xl:items-end justify-center xl:justify-end w-full mb-[-15px] sm:mb-[-25px] z-30 mr-0 xl:mr-[15%]">
                        <motion.div
                            variants={fadeInUp}
                            className="relative group will-change-[transform,opacity]"
                        >
                            <div className="relative bg-white text-neutral-900 px-12 sm:px-14 py-6 sm:py-8 rounded-full shadow-[0_20px_50px_-10px_rgba(255,255,255,0.2)] flex items-center gap-4 ring-4 ring-[#030303]">
                                <h1 className="text-7xl sm:text-9xl font-bold tracking-tighter leading-none" style={{ fontFamily: 'var(--font-outfit)' }}>Code</h1>
                            </div>

                            <motion.div
                                variants={floatSmooth}
                                animate="animate"
                                className="absolute -right-4 -top-6 sm:-right-6 sm:-top-8 w-16 h-16 sm:w-20 sm:h-20 bg-[#111] rounded-full border-[6px] border-[#030303] flex items-center justify-center text-emerald-400 shadow-2xl"
                            >
                                <Terminal size={24} className="sm:w-8 sm:h-8" />
                            </motion.div>
                        </motion.div>
                    </div>


                    {/* ROW 2: BUILD */}
                    <div className="relative flex items-center justify-center w-full z-20 my-0">
                        <motion.svg
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.2 }}
                            transition={{ duration: 2, delay: 1 }}
                            className="absolute top-[-60px] left-[45%] w-40 h-40 z-0 pointer-events-none hidden xl:block"
                            viewBox="0 0 100 100" fill="none"
                        >
                            <path d="M80,0 Q80,60 10,90" stroke="white" strokeWidth="2" strokeDasharray="6 6" />
                        </motion.svg>

                        <motion.div
                            variants={fadeInUp}
                            className="relative ml-0 xl:ml-[-15%] group will-change-[transform,opacity]"
                        >
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 1.5, duration: 0.8, ease: "backOut" }}
                                className="absolute -left-8 -top-6 sm:-left-12 sm:-top-8 bg-[#1e1e1e] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl rounded-br-none border border-white/10 shadow-xl flex items-center gap-2 z-30 ring-4 ring-[#030303]"
                            >
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] sm:text-xs font-mono font-bold">Compiling...</span>
                            </motion.div>

                            <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-16 sm:px-20 py-7 sm:py-9 rounded-full shadow-2xl ring-4 ring-[#030303] flex items-center gap-4 z-20">
                                <h1 className="text-7xl sm:text-9xl font-bold tracking-tighter leading-none text-white" style={{ fontFamily: 'var(--font-outfit)' }}>Build</h1>
                            </div>

                            <div className="absolute -left-5 top-1/2 -translate-y-1/2 sm:-left-8 w-14 h-14 sm:w-18 sm:h-18 bg-white rounded-full border-[6px] border-[#030303] flex items-center justify-center text-blue-600 shadow-lg z-30">
                                <Cpu size={24} className="sm:w-8 sm:h-8" />
                            </div>
                        </motion.div>
                    </div>


                    {/* ROW 3: SHIP */}
                    <div className="relative flex items-center xl:items-start justify-center xl:justify-end w-full mt-[-15px] sm:mt-[-25px] z-10 mr-0 xl:mr-[5%]">
                        <motion.div
                            variants={fadeInUp}
                            className="relative flex items-center group will-change-[transform,opacity]"
                        >
                            <div className="relative bg-white text-neutral-900 px-14 sm:px-16 py-6 sm:py-8 rounded-full shadow-[0_20px_50px_-10px_rgba(255,255,255,0.15)] flex items-center gap-4 z-20 ring-4 ring-[#030303]">
                                <h1 className="text-7xl sm:text-9xl font-bold tracking-tighter leading-none" style={{ fontFamily: 'var(--font-outfit)' }}>Ship</h1>

                                <Link href="/projects" className="ml-2 sm:ml-4 w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white hover:bg-neutral-900 transition-colors shadow-lg">
                                    <ArrowUpRight size={24} className="sm:w-8 sm:h-8" />
                                </Link>
                            </div>

                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 1.8, duration: 0.8, ease: "backOut" }}
                                className="absolute -right-2 -bottom-6 sm:-right-4 sm:-bottom-8 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl rounded-tl-none border border-emerald-500/20 shadow-xl flex items-center gap-2 z-10 backdrop-blur-md ring-4 ring-[#030303]"
                            >
                                <CheckCircle2 size={12} className="sm:w-3.5 sm:h-3.5" />
                                <span className="text-[10px] sm:text-xs font-bold">Deployed</span>
                            </motion.div>

                            <div className="absolute -left-5 top-1/2 -translate-y-1/2 sm:-left-8 w-16 h-16 sm:w-20 sm:h-20 bg-[#111] rounded-full border-[6px] border-[#030303] flex items-center justify-center overflow-hidden z-10 shadow-lg">
                                <span className="text-white font-bold text-lg sm:text-xl">MR</span>
                            </div>

                        </motion.div>
                    </div>

                </div>

            </motion.div>

            {/* 3. Bottom Tech Context */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 2.2, duration: 1 }}
                className="absolute bottom-6 sm:bottom-12 w-full flex justify-center gap-6 sm:gap-10 pointer-events-none"
            >
                <div className="flex items-center gap-2 text-[10px] sm:text-sm font-bold text-neutral-500 uppercase tracking-wider"><Layers size={14} className="sm:w-4 sm:h-4" /> Next.js 15</div>
                <div className="flex items-center gap-2 text-[10px] sm:text-sm font-bold text-neutral-500 uppercase tracking-wider"><Box size={14} className="sm:w-4 sm:h-4" /> Rust</div>
                <div className="flex items-center gap-2 text-[10px] sm:text-sm font-bold text-neutral-500 uppercase tracking-wider"><Cloud size={14} className="sm:w-4 sm:h-4" /> AWS Native</div>
            </motion.div>

        </section>
    );
}
