"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, BadgeCheck, MapPin } from "lucide-react";
import Link from "next/link";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";

export default function Hero() {
    return (
        <section className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#030303] text-white">

            {/* 1. Dynamic Background - Atmospheric & Deep */}
            <div className="absolute inset-0 z-0">
                {/* Deep Indigo/Black Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-[#0a0a0a]" />

                {/* Moving Light Orbs - Slower & Deeper */}
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"
                />
                <motion.div
                    animate={{ x: [0, -40, 0], y: [0, 40, 0], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-purple-900/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none"
                />

                {/* Subtle Noise Texture */}
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.04]" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 max-w-7xl">

                <FadeInStagger className="w-full md:w-2/3">

                    {/* Top Top Context */}
                    <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-neutral-500 mb-8">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span>Online • Based in India</span>
                    </div>

                    {/* Central Statement - The "Hook" */}
                    <div className="flex flex-col items-start gap-4">

                        <FadeIn delay={0.2} className="relative z-10">
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-white">
                                <span className="block hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-white hover:to-neutral-500 transition-all duration-700 cursor-default">System</span>
                                <span className="block pl-4 md:pl-24 text-neutral-600">Architect</span>
                                <span className="block text-right pr-4 md:pr-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
                                    & Maker
                                </span>
                            </h1>
                        </FadeIn>

                        <FadeIn delay={0.4} className="max-w-xl md:ml-auto md:mr-12 mt-8 md:mt-12">
                            <p className="text-xl md:text-2xl font-light text-neutral-400 leading-relaxed text-right md:text-left">
                                I design <span className="text-white">autonomous agents</span> and engineer <span className="text-white">distributed systems</span>.
                                <br className="hidden md:block" />
                                Shaping digital experiences at <span className="border-b border-indigo-500/30 text-indigo-200">NIT Jalandhar</span>.
                            </p>
                        </FadeIn>

                    </div>

                </FadeInStagger>

                {/* THE ID CARD - Floating Glass Panel */}
                <motion.div
                    initial={{ opacity: 0, x: 50, rotateY: -15 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                    className="md:w-1/3 w-full relative group perspective-1000"
                >
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 transition-transform duration-500 group-hover:rotate-x-2 group-hover:rotate-y-2 transform-preserve-3d">

                        {/* Card Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-[50px] rounded-full mix-blend-screen" />

                        {/* Header */}
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neutral-800 to-black border border-white/10 flex items-center justify-center relative overflow-hidden">
                                <span className="text-2xl font-bold text-white">M</span>
                                {/* Optional: Real Image <Image src="/me.jpg" fill className="object-cover" /> */}
                            </div>
                            <div className="flex flex-col items-end">
                                <BadgeCheck className="text-blue-500 mb-1" size={20} />
                                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">Verified</span>
                            </div>
                        </div>

                        {/* Name & Identity */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-white mb-1">Mohit Ranjan</h2>
                            <p className="text-sm text-neutral-400 font-light flex items-center gap-2">
                                <MapPin size={12} /> NIT Jalandhar, IN
                            </p>
                        </div>

                        {/* Status/Signals */}
                        <div className="space-y-3 mb-8">
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-xs text-neutral-500 font-mono uppercase">Role</span>
                                <span className="text-sm text-white font-medium">Full Stack Engineer</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-xs text-neutral-500 font-mono uppercase">Focus</span>
                                <span className="text-sm text-white font-medium">AI Agents & Systems</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-xs text-neutral-500 font-mono uppercase">Status</span>
                                <span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">Open to Work</span>
                            </div>
                        </div>

                        {/* Social Footer */}
                        <div className="flex justify-between items-center pt-2">
                            <div className="flex gap-4">
                                <Link href="https://github.com" className="text-neutral-400 hover:text-white transition-colors"><Github size={18} /></Link>
                                <Link href="https://linkedin.com" className="text-neutral-400 hover:text-white transition-colors"><Linkedin size={18} /></Link>
                            </div>
                            <Link href="/resume.pdf" className="text-xs font-mono uppercase text-indigo-400 hover:text-white transition-colors">
                                View Resume &rarr;&rarr;
                            </Link>
                        </div>

                    </div>
                </motion.div>

                {/* Bottom Anchor - Scroll Prompt */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
                    onClick={() => {
                        const nextSection = document.getElementById('context');
                        nextSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 group-hover:text-white transition-colors">Start the Journey</span>
                    <ArrowDown size={16} className="text-neutral-500 animate-bounce group-hover:text-white transition-colors" />
                </motion.div>

            </div>
        </section>
    );
}
