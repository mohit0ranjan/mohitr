"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowDown, Github, Linkedin, BadgeCheck, MapPin, Terminal } from "lucide-react";
import Link from "next/link";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";
import { useEffect, useRef, useState } from "react";

interface HeroProps {
    content?: {
        heading?: string;
        subheading?: string;
        status?: string;
    };
    settings?: {
        linkedin?: string;
        github?: string;
        resume?: string;
    };
    ticker?: {
        content: string;
        type: string;
    } | null;
}

export default function Hero({ content, settings, ticker }: HeroProps) {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollY } = useScroll();

    // 3D Parallax Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const width = currentTarget.clientWidth;
        const height = currentTarget.clientHeight;

        // Normalize coordinates to -1 to 1
        mouseX.set((clientX / width) * 2 - 1);
        mouseY.set((clientY / height) * 2 - 1);
    };

    // Springs for smooth movement
    const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
    const x = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), springConfig); // Foreground move
    const y = useSpring(useTransform(mouseY, [-1, 1], [-15, 15]), springConfig);

    // Background parallax (moves opposite slightly)
    const bgX = useSpring(useTransform(mouseX, [-1, 1], [10, -10]), springConfig);
    const bgY = useSpring(useTransform(mouseY, [-1, 1], [10, -10]), springConfig);

    // Card tilt
    const rotateX = useSpring(useTransform(mouseY, [-1, 1], [5, -5]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-5, 5]), springConfig);

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="min-h-screen w-full relative flex items-start md:items-center justify-center overflow-hidden bg-[#030303] text-white pt-32 md:pt-0 perspective-1000"
        >

            {/* 1. Dynamic Background - Atmospheric & Deep */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Deep Indigo/Black Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-[#0a0a0a]" />

                {/* Moving Light Orbs - Parallax Enhanced */}
                <motion.div
                    style={{ x: bgX, y: bgY }}
                    animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-indigo-900/10 blur-[100px] rounded-full mix-blend-screen"
                />
                <motion.div
                    style={{ x: useTransform(bgX, v => v * -1.5), y: useTransform(bgY, v => v * -1.5) }}
                    animate={{ opacity: [0.15, 0.3, 0.15], scale: [1.1, 1, 1.1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-10%] left-[-10%] w-[900px] h-[900px] bg-purple-900/5 blur-[120px] rounded-full mix-blend-screen"
                />

                {/* Optional Subtle Geometric Form (3D Cube-ish) */}
                <motion.div
                    style={{ x: bgX, y: bgY, rotate: 15 }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 border border-white/5 rounded-[4rem] opacity-20 blur-[2px] pointer-events-none"
                    animate={{ rotate: [15, 45, 15] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />

                {/* Scanlines / Noise Texture */}
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent h-32 bottom-0" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-16 lg:gap-24 max-w-7xl">

                <FadeInStagger className="w-full md:w-3/5 lg:w-1/2 relative z-20">

                    {/* Live Status Ticker */}
                    <FadeIn delay={0.1} className="flex items-center gap-3 mb-8">
                        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-sm group hover:border-white/20 transition-colors cursor-default">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-medium tracking-wide text-neutral-300 group-hover:text-white transition-colors">
                                {ticker?.content || content?.status || "Online • Based in India"}
                            </span>
                        </div>
                    </FadeIn>

                    {/* Central Statement */}
                    <div className="flex flex-col items-start gap-6">
                        <FadeIn delay={0.2} className="relative z-10 w-full">
                            <h1 className="text-5xl sm:text-7xl lg:text-[7rem] font-extrabold tracking-tight leading-[0.95] text-white flex flex-col items-start drop-shadow-2xl">
                                {content?.heading ? (
                                    <div
                                        dangerouslySetInnerHTML={{ __html: content.heading }}
                                        className="[&>span]:text-neutral-500 [&>span]:font-bold [&>br]:hidden md:[&>br]:block"
                                    />
                                ) : (
                                    <>
                                        <span className="block relative">
                                            System
                                            {/* Decorative element for depth */}
                                            <span className="absolute -z-10 top-1/2 left-10 w-24 h-24 bg-blue-500/20 blur-3xl rounded-full"></span>
                                        </span>
                                        <span className="block pl-2 md:pl-20 text-neutral-500 font-bold transition-colors duration-500 hover:text-neutral-300">
                                            Architect
                                        </span>
                                        <div className="flex items-center gap-4 w-full">
                                            <span className="w-12 h-[2px] bg-neutral-800 hidden md:block mt-8"></span>
                                            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-neutral-500">
                                                & Maker
                                            </span>
                                        </div>
                                    </>
                                )}
                            </h1>
                        </FadeIn>

                        <FadeIn delay={0.4} className="max-w-xl md:ml-auto mt-6 md:mt-8">
                            <p className="text-lg md:text-xl font-light text-neutral-400 leading-relaxed md:text-right">
                                {content?.subheading || (
                                    <>
                                        Designing <span className="text-white font-medium">autonomous agents</span> <br className="hidden md:block" />
                                        and engineering <span className="text-white font-medium">distributed systems</span>.
                                    </>
                                )}
                            </p>

                            {/* CTA / Quick Links Area - refined alignment */}
                            <div className="flex items-center justify-end gap-6 mt-8">
                                <Link
                                    href="#context"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('context')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="text-sm font-medium text-white/60 hover:text-white border-b border-white/10 hover:border-white/50 transition-all pb-0.5"
                                >
                                    Explore Context
                                </Link>
                                <Link
                                    href={settings?.linkedin || "#"}
                                    className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 hover:shadow-lg transition-transform"
                                >
                                    Let's Talk
                                </Link>
                            </div>
                        </FadeIn>
                    </div>

                </FadeInStagger>

                {/* THE ID CARD - 3D Floating Glass Panel */}
                <motion.div
                    className="w-full md:w-2/5 lg:w-1/3 relative perspective-1000"
                    style={{ perspective: 1000 }}
                    initial={{ opacity: 0, x: 100, rotateY: -20 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.div
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: "preserve-3d"
                        }}
                        className="relative w-full aspect-[4/5] md:aspect-[3/4] max-w-sm mx-auto"
                    >
                        {/* Card Backdrop (Glass) */}
                        <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl shadow-2xl transition-all duration-500"
                            style={{ transform: "translateZ(0px)" }}
                        />

                        {/* Glow Effect behind card */}
                        <div className="absolute -inset-10 bg-indigo-500/20 blur-[60px] rounded-full -z-10" />

                        {/* Card Content Container */}
                        <div className="relative h-full p-8 flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>

                            {/* Top Section */}
                            <div className="flex justify-between items-start">
                                <motion.div
                                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neutral-800 to-black border border-white/10 flex items-center justify-center shadow-lg relative overflow-hidden group"
                                    style={{ transform: "translateZ(30px)" }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <span className="text-3xl font-bold text-white relative z-10 group-hover:scale-110 transition-transform duration-300">M</span>
                                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                                <div className="flex flex-col items-end gap-1">
                                    <BadgeCheck className="text-blue-500" size={24} style={{ filter: "drop-shadow(0 0 8px rgba(59,130,246,0.5))" }} />
                                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Verified</span>
                                </div>
                            </div>

                            {/* Middle Section - Identity */}
                            <div className="space-y-6">
                                <div style={{ transform: "translateZ(10px)" }}>
                                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Mohit Ranjan</h2>
                                    <div className="flex items-center gap-2 text-neutral-400 text-sm font-medium">
                                        <MapPin size={14} className="text-indigo-400" />
                                        <span>NIT Jalandhar, IN</span>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-6 border-t border-white/5">
                                    <div className="flex justify-between items-center group">
                                        <span className="text-xs text-neutral-500 font-mono uppercase group-hover:text-neutral-300 transition-colors">Role</span>
                                        <span className="text-sm text-white font-medium flex items-center gap-2">
                                            <Terminal size={12} className="text-neutral-500" />
                                            Full Stack Engineer
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center group">
                                        <span className="text-xs text-neutral-500 font-mono uppercase group-hover:text-neutral-300 transition-colors">Focus</span>
                                        <span className="text-sm text-white font-medium">AI Agents & Systems</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-xs text-neutral-500 font-mono uppercase">Status</span>
                                        <span className="px-2.5 py-1 rounded-[4px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                                            {ticker?.type === 'Status' ? 'Open to Work' : 'Online'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Section - Socials */}
                            <div className="flex justify-between items-end pt-4" style={{ transform: "translateZ(10px)" }}>
                                <div className="flex gap-4">
                                    <Link href={settings?.github || "https://github.com/mohit0ranjan"} target="_blank" className="p-2 -ml-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-all">
                                        <Github size={20} />
                                    </Link>
                                    <Link href={settings?.linkedin || "https://www.linkedin.com/in/itsmohitr/"} target="_blank" className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-all">
                                        <Linkedin size={20} />
                                    </Link>
                                </div>
                                <Link
                                    href={settings?.resume || "/resume.pdf"}
                                    className="text-[10px] font-mono uppercase text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 group/link"
                                >
                                    Resume
                                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>

                            {/* Shine Effect on Tilt */}
                            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" style={{ transform: "translateZ(1px)" }} />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom Anchor - Refined */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none md:pointer-events-auto"
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-600">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowDown size={14} className="text-neutral-600" />
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
