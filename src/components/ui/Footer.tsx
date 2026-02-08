
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <footer className="relative bg-[#020202] border-t border-white/5 pt-32 pb-12 overflow-hidden">

            {/* Massive Ambient Glows */}
            <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-900/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

                {/* 1. Header & Call to Action */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 pb-24 border-b border-white/5">
                    <div className="max-w-2xl">
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
                            Let’s build <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">the future.</span>
                        </h2>
                        <p className="text-xl text-neutral-400 max-w-lg leading-relaxed">
                            Open to new opportunities, collaborations, and technical challenges.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <a
                            href="mailto:hello@mohitranjan.com"
                            className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
                        >
                            Say Hello
                        </a>
                    </div>
                </div>

                {/* 2. Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24 mb-24">

                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest opacity-50">Navigation</h3>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-neutral-400 hover:text-white transition-colors text-lg">About</Link></li>
                            <li><Link href="/projects" className="text-neutral-400 hover:text-white transition-colors text-lg">Projects</Link></li>
                            <li><Link href="/opportunities" className="text-neutral-400 hover:text-white transition-colors text-lg">Opportunities</Link></li>
                            <li><Link href="/gallery" className="text-neutral-400 hover:text-white transition-colors text-lg">Visual Journal</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest opacity-50">Socials</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="https://github.com/mohit0ranjan" target="_blank" className="flex items-center gap-2 text-neutral-400 hover:text-emerald-400 transition-colors text-lg group">
                                    <Github size={18} /> GitHub <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </li>
                            <li>
                                <a href="https://linkedin.com/in/itsmohitr" target="_blank" className="flex items-center gap-2 text-neutral-400 hover:text-pink-400 transition-colors text-lg group">
                                    <Linkedin size={18} /> LinkedIn <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/mohitranjan" target="_blank" className="flex items-center gap-2 text-neutral-400 hover:text-blue-400 transition-colors text-lg group">
                                    <Twitter size={18} /> Twitter <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest opacity-50">Resources</h3>
                        <ul className="space-y-4">
                            <li><Link href="/resume.pdf" className="text-neutral-400 hover:text-white transition-colors text-lg">Resume</Link></li>
                            <li><Link href="/hackathons" className="text-neutral-400 hover:text-white transition-colors text-lg">Hackathons</Link></li>
                            <li><Link href="/admin" className="text-neutral-400 hover:text-white transition-colors text-lg">Admin</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest opacity-50">Status</h3>
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <span className="text-emerald-400 font-medium">All Systems Normal</span>
                        </div>
                        <p className="text-neutral-500 text-sm">
                            Last deploy: {mounted ? new Date().toLocaleDateString() : '...'}
                        </p>
                    </div>

                </div>

                {/* 3. Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-6">
                    <p className="text-neutral-600 text-sm font-mono">
                        © {new Date().getFullYear()} Mohit Ranjan. All rights reserved.
                    </p>
                    <p className="text-neutral-700 text-xs font-mono uppercase tracking-widest">
                        Designed & Engineered with ❤️ in India
                    </p>
                </div>

            </div>
        </footer>
    );
}
