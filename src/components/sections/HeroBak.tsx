"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter, CheckCircle2, Copy, Globe, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface HeroProps {
    content?: Record<string, unknown>;
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

export default function Hero({ settings }: HeroProps) {
    const [copied, setCopied] = useState(false);

    // Mouse tilt effect for the card
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const copyEmail = () => {
        navigator.clipboard.writeText("hello@mohitranjan.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="min-h-[100dvh] w-full relative flex items-center justify-center overflow-hidden bg-[#030303] text-white pt-20 px-6 md:px-12 lg:px-24">

            {/* 1. Dynamic Background Gradients (Aurora) */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-pink-500/20 via-purple-600/20 to-indigo-500/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" />
                <div className="absolute bottom-[0%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-blue-500/10 blur-[100px] rounded-full mix-blend-screen opacity-50" />
                <div className="absolute top-[20%] right-[30%] w-[300px] h-[300px] bg-blue-500/10 blur-[80px] rounded-full mix-blend-overlay" />
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.02]" />
            </div>

            <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">

                {/* LEFT SIDE: Typography & Intro */}
                <div className="flex flex-col items-start gap-8 order-2 lg:order-1 lg:pt-0 pb-12 lg:pb-0">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2 pl-1 pr-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
                    >
                        <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
                        <span className="text-xs text-neutral-300 font-medium">Portfolio 2026.1</span>
                    </motion.div>

                    {/* Headline */}
                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
                            style={{ fontFamily: 'var(--font-outfit)' }}
                        >
                            Mohit <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500">Ranjan</span>
                            <span className="text-emerald-500">.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-lg md:text-xl text-neutral-400 max-w-lg leading-relaxed font-light"
                        >
                            Full Stack Architect & Developer creating
                            <span className="text-white font-medium"> efficient systems</span> and
                            <span className="text-white font-medium"> delightful interfaces</span>.
                        </motion.p>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <Link
                            href="#contact"
                            className="relative px-8 py-4 bg-white text-black rounded-full font-bold text-sm tracking-wide hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
                        >
                            Hire Me Now <ArrowRight size={16} />
                        </Link>
                        <button
                            onClick={copyEmail}
                            className="px-6 py-4 bg-white/5 border border-white/10 text-white rounded-full font-semibold text-sm tracking-wide hover:bg-white/10 transition-all flex items-center gap-2"
                        >
                            {copied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
                            {copied ? "Email Copied" : "Copy Email"}
                        </button>
                    </motion.div>

                    {/* Socials - Minimal */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="flex items-center gap-6 mt-4 opacity-60"
                    >
                        {settings?.github && (
                            <a href={settings.github} target="_blank" className="hover:text-white transition-colors"><Github size={20} /></a>
                        )}
                        {settings?.linkedin && (
                            <a href={settings.linkedin} target="_blank" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                        )}
                        <a href="https://twitter.com/mohitranjan" target="_blank" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                        <div className="h-px w-12 bg-white/20" />
                        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Based in India</span>
                    </motion.div>

                </div>

                {/* RIGHT SIDE: The "Name Card" Composition */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, type: "spring" }}
                    className="relative flex items-center justify-center order-1 lg:order-2 h-[500px] w-full perspective-2000"
                >
                    {/* Floating Orb Behind */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 blur-[80px] rounded-full opacity-40 animate-pulse-slow z-0" />

                    {/* Interactive 3D Card */}
                    <motion.div
                        style={{ rotateX, rotateY, x, y }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="relative z-20 w-[380px] h-[240px] md:w-[480px] md:h-[300px] rounded-[24px] bg-white/5 backdrop-blur-2xl border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden group cursor-default"
                    >
                        {/* Card Glow Texture */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.05]" />

                        {/* Card Content */}
                        <div className="relative z-10 p-8 h-full flex flex-col justify-between">

                            {/* Card Header */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-400 p-[2px]">
                                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                            {/* Initials Placeholder or Image */}
                                            <span className="font-bold text-white text-lg">MR</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg leading-none">Mohit Ranjan</h3>
                                        <p className="text-neutral-400 text-xs font-mono mt-1">Full Stack Developer</p>
                                    </div>
                                </div>
                                {/* Chip / Contactless Icon */}
                                <div className="flex flex-col items-end">
                                    <Globe size={24} className="text-white/40 mb-2" />
                                    <div className="w-8 h-6 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500 opacity-80" />
                                </div>
                            </div>

                            {/* Card Decoration */}
                            <div className="flex-1 flex items-center justify-start py-4">
                                <span className="font-mono text-xl md:text-2xl text-white/50 px-2 tracking-widest">**** **** **** 2026</span>
                            </div>

                            {/* Card Footer */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-1">Status</p>
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </span>
                                        <span className="text-white text-sm font-medium">Available</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-1">Exp Date</p>
                                    <p className="text-white text-sm font-medium">Lifetime</p>
                                </div>
                            </div>

                        </div>

                        {/* Shinyness */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                    </motion.div>

                    {/* Floating Widgets (Satellites) */}

                    {/* Widget 1: Tech Stack */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -right-4 top-10 md:right-[-20px] md:top-[-20px] z-30 p-4 bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl flex items-center gap-3"
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs border border-blue-500/30">
                            TS
                        </div>
                        <div>
                            <p className="text-xs text-neutral-400 font-mono">Main Stack</p>
                            <p className="text-sm font-bold text-white">TypeScript</p>
                        </div>
                    </motion.div>

                    {/* Widget 2: Projects */}
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -left-6 bottom-[-20px] md:left-[-40px] md:bottom-[40px] z-30 p-4 bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl hover:scale-105 transition-transform cursor-pointer"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Sparkles size={14} className="text-yellow-400" />
                            <span className="text-xs font-bold text-white">Projects</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-white">12+</span>
                            <span className="text-[10px] text-neutral-400">Shipped</span>
                        </div>
                    </motion.div>

                </motion.div>

            </div>

        </section>
    );
}
