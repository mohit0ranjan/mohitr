"use client";

import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Terminal, Cpu, Layers, Box, Code2, Github, Linkedin, Twitter, Globe, Cloud, Zap, CornerRightDown } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function HeroProp() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, 100]);
    const y2 = useTransform(scrollY, [0, 300], [0, -100]);

    // Typed variants
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: custom * 0.15, duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }
        })
    };

    const float: Variants = {
        animate: {
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const floatReverse: Variants = {
        animate: {
            y: [0, 20, 0],
            rotate: [0, -5, 5, 0],
            transition: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
            }
        }
    };

    return (
        <section ref={containerRef} className="min-h-[100dvh] w-full relative flex flex-col items-center justify-center overflow-hidden bg-[#030303] text-white pt-20 pb-20 perspective-1000">

            {/* 1. Background Atmosphere */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-[-20%] right-[10%] w-[800px] h-[800px] bg-emerald-900/10 blur-[150px] rounded-full mix-blend-screen opacity-40"
                />
                <motion.div
                    style={{ y: y2 }}
                    className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen opacity-40"
                />
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.04]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
            </div>

            {/* 2. Main Layout - Grid for Large Screens, Stack for Mobile */}
            <div className="relative z-10 w-full max-w-[1700px] grid grid-cols-1 xl:grid-cols-12 h-full gap-8 px-4 sm:px-6 md:px-12">

                {/* --- LEFT COLUMN: IDENTITY CARD (Floating) --- */}
                {/* Visible on XL screens, absolute positioned to not disturb center alignment */}
                <div className="hidden xl:flex xl:col-span-3 flex-col justify-center items-start pl-8 relative z-50">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="w-[320px] p-6 rounded-3xl bg-neutral-900/60 backdrop-blur-md border border-white/10 shadow-2xl relative group overflow-hidden"
                    >
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        {/* Header */}
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neutral-800 to-black border border-white/20 flex items-center justify-center overflow-hidden">
                                    {/* Initials */}
                                    <span className="font-bold text-white text-xl font-mono">MR</span>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#030303] flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white leading-tight">Mohit Ranjan</h3>
                                <p className="text-xs text-neutral-400 font-mono mt-1 uppercase tracking-wider">GatewayID: 2026.1</p>
                            </div>
                        </div>

                        {/* Stats/Info */}
                        <div className="space-y-4 mb-6 relative z-10">
                            <div className="flex items-center gap-3 text-sm text-neutral-300">
                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400"><Code2 size={16} /></div>
                                <span className="font-medium">Full Stack Architect</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-neutral-300">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400"><Globe size={16} /></div>
                                <span className="font-medium">Open for Remote</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-neutral-300">
                                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400"><Zap size={16} /></div>
                                <span className="font-medium">High Performance</span>
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="flex gap-2 pt-4 border-t border-white/5 relative z-10">
                            <Link href="#" className="p-3 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white text-neutral-400 transition-all"><Github size={18} /></Link>
                            <Link href="#" className="p-3 rounded-xl bg-white/5 hover:bg-white/10 hover:text-blue-400 text-neutral-400 transition-all"><Linkedin size={18} /></Link>
                            <Link href="#" className="p-3 rounded-xl bg-white/5 hover:bg-white/10 hover:text-sky-400 text-neutral-400 transition-all"><Twitter size={18} /></Link>
                        </div>
                    </motion.div>
                </div>


                {/* --- CENTER COLUMN: THE MAIN STACK (CODE / BUILD / SHIP) --- */}
                {/* Now using translate-x to alternate left/right and create a flow */}
                <div className="col-span-1 xl:col-span-6 flex flex-col items-center justify-center relative translate-y-[-20px] xl:translate-y-0">

                    {/* 1. CODE PILL - Shifted Left */}
                    <motion.div
                        className="relative z-30 translate-x-[-15%] xl:translate-x-[-20%]"
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        variants={fadeInUp}
                    >
                        {/* Floating Tag */}
                        <motion.div variants={floatReverse} animate="animate" className="absolute -left-16 -top-2 z-0 hidden sm:block">
                            <div className="bg-[#1e1e1e] border border-white/10 p-3 rounded-xl shadow-xl -rotate-12">
                                <span className="font-mono text-[10px] text-green-400 block">$ init project</span>
                            </div>
                        </motion.div>

                        {/* PILL */}
                        <div className="relative group">
                            <div className="relative flex items-center gap-6 bg-white rounded-full pl-12 pr-20 py-6 sm:py-8 shadow-[0_20px_60px_-15px_rgba(255,255,255,0.2)] transition-transform duration-500 hover:scale-[1.02]">
                                <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-neutral-900 leading-none select-none" style={{ fontFamily: 'var(--font-outfit)' }}>
                                    Code
                                </h1>
                                {/* Icon Badge */}
                                <div className="absolute right-4 top-4 sm:right-6 sm:top-6 w-12 h-12 sm:w-16 sm:h-16 bg-neutral-900 rounded-full flex items-center justify-center text-white shadow-xl">
                                    <Terminal size={24} className="sm:w-8 sm:h-8" />
                                </div>
                            </div>
                        </div>

                        {/* Process Arrow (Curved Line to Build) */}
                        <div className="absolute right-4 bottom-[-40px] z-0 opacity-40">
                            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="rotate-[15deg]">
                                <path d="M10,10 Q50,50 90,90" stroke="url(#gradient-arrow)" strokeWidth="3" strokeDasharray="6 4" />
                                <defs>
                                    <linearGradient id="gradient-arrow" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="white" stopOpacity="0.1" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </motion.div>


                    {/* 2. BUILD PILL - Shifted Right */}
                    <motion.div
                        className="relative z-20 mt-8 sm:mt-12 translate-x-[15%] xl:translate-x-[20%]"
                        initial="hidden"
                        animate="visible"
                        custom={2}
                        variants={fadeInUp}
                    >
                        {/* Floating Tag */}
                        <motion.div variants={float} animate="animate" className="absolute -right-12 -top-6 z-0 hidden sm:block">
                            <div className="bg-[#1e1e1e] border border-white/10 p-3 rounded-xl shadow-xl rotate-12">
                                <span className="font-mono text-[10px] text-blue-400 block">next build</span>
                            </div>
                        </motion.div>

                        {/* PILL - Gradient */}
                        <div className="relative group">
                            <div className="relative flex items-center gap-6 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-full pl-16 pr-16 py-6 sm:py-8 shadow-2xl transition-transform duration-500 hover:scale-[1.02] border border-white/10">
                                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay" />
                                <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-white leading-none select-none relative z-10" style={{ fontFamily: 'var(--font-outfit)' }}>
                                    Build
                                </h1>
                                {/* Icon Badge */}
                                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-xl z-20">
                                    <Cpu size={24} className="sm:w-8 sm:h-8" />
                                </div>
                            </div>
                        </div>

                        {/* Process Arrow (Curved Line to Ship) */}
                        <div className="absolute left-0 bottom-[-50px] z-0 opacity-40">
                            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="rotate-[-15deg] scale-x-[-1]">
                                <path d="M10,10 Q50,50 90,90" stroke="white" strokeWidth="3" strokeDasharray="6 4" opacity="0.3" />
                            </svg>
                        </div>
                    </motion.div>


                    {/* 3. SHIP PILL - Shifted Left */}
                    <motion.div
                        className="relative z-10 mt-8 sm:mt-12 translate-x-[-10%] xl:translate-x-[-15%]"
                        initial="hidden"
                        animate="visible"
                        custom={3}
                        variants={fadeInUp}
                    >
                        {/* PILL */}
                        <div className="relative group">
                            <div className="relative flex items-center gap-6 bg-white rounded-full pl-20 pr-12 py-6 sm:py-8 shadow-[0_20px_60px_-15px_rgba(255,255,255,0.2)] transition-transform duration-500 hover:scale-[1.02]">
                                <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-neutral-900 leading-none select-none" style={{ fontFamily: 'var(--font-outfit)' }}>
                                    Ship
                                </h1>
                                {/* CTA Button Attached */}
                                <Link href="/projects" className="absolute -right-6 top-1/2 -translate-y-1/2 w-20 h-20 sm:w-28 sm:h-28 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-neutral-900 transition-colors duration-300 group/btn">
                                    <ArrowUpRight size={32} className="sm:w-10 sm:h-10 group-hover/btn:rotate-45 transition-transform duration-500" />
                                </Link>

                                {/* Status Dot */}
                                <div className="absolute left-8 top-8 w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                        </div>
                    </motion.div>

                </div>


                {/* --- RIGHT COLUMN: VISUAL CONTEXT / DECORATION --- */}
                {/* Visible on XL screens, balances the left card */}
                <div className="hidden xl:flex xl:col-span-3 flex-col justify-center items-end pr-8 relative z-0">

                    {/* Floating Tech Elements */}
                    <motion.div
                        variants={floatReverse} // Changed to use valid variant
                        animate="animate"
                        className="relative flex flex-col gap-6"
                    >
                        <div className="flex items-center gap-4 text-right opacity-60 hover:opacity-100 transition-opacity">
                            <span className="text-xl font-bold tracking-tight text-white">Next.js 15</span>
                            <div className="w-12 h-12 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center">
                                <Layers className="text-white" size={24} />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-right opacity-60 hover:opacity-100 transition-opacity translate-x-4">
                            <span className="text-xl font-bold tracking-tight text-white">Rust</span>
                            <div className="w-12 h-12 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center">
                                <Box className="text-orange-500" size={24} />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-right opacity-60 hover:opacity-100 transition-opacity">
                            <span className="text-xl font-bold tracking-tight text-white">Cloud Native</span>
                            <div className="w-12 h-12 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center">
                                <Cloud className="text-blue-500" size={24} />
                            </div>
                        </div>
                    </motion.div>

                </div>

            </div>

            {/* Bottom Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
            >
                <div className="flex flex-col items-center gap-1 animate-bounce">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500">Scroll</span>
                    <CornerRightDown size={14} className="text-neutral-500" />
                </div>
                <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-500 to-transparent" />
            </motion.div>

        </section>
    );
}
