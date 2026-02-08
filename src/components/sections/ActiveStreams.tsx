"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Zap, Code, ChevronRight } from "lucide-react";
import { format } from "date-fns";

// Types from your components (simplified for this view)
type Opportunity = {
    id: string;
    title: string;
    company: string;
    type: string;
    status: string;
    slug: string;
};

type Hackathon = {
    id: string;
    name: string;
    organizer: string;
    status: string;
    slug: string;
    mode: string;
    website?: string | null;
};

export default function ActiveStreams({
    opportunities,
    hackathons
}: {
    opportunities: Opportunity[],
    hackathons: Hackathon[]
}) {
    return (
        <section className="container mx-auto px-6 max-w-7xl py-24 relative z-10">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
            >
                <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                    <span className="block text-white mb-2">Build in Public.</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-500">
                        Share Opportunities.
                    </span>
                </h2>
                <p className="text-lg text-neutral-400 leading-relaxed">
                    A live feed of hackathons, internships, and open-source bounties.
                    Curated for the community.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">

                {/* Center Divider styling */}
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />

                {/* Left Column: Opportunities */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">Signal Feed</h2>
                        </div>
                        <Link href="/opportunities" className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors flex items-center gap-1">
                            View All <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {opportunities.slice(0, 5).map((opt, i) => (
                            <motion.div
                                key={opt.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    href={`/opportunities/${opt.slug}`}
                                    className="group flex items-center justify-between p-4 rounded-xl bg-[#0a0a0a] border border-white/5 hover:border-emerald-500/30 hover:bg-[#0f0f0f] transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Status Dot */}
                                        <span className={`w-1.5 h-1.5 rounded-full ${opt.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-neutral-600'}`} />

                                        <div>
                                            <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                                                {opt.title}
                                            </h3>
                                            <p className="text-xs text-neutral-500 font-mono mt-0.5">
                                                {opt.company} • <span className="text-neutral-600">{opt.type}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Hackathons */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                <Code className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">Active Arenas</h2>
                        </div>
                        <Link href="/hackathons" className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors flex items-center gap-1">
                            View All <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {hackathons.slice(0, 5).map((hack, i) => (
                            <motion.div
                                key={hack.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    href={hack.website || `/hackathons/${hack.slug}`}
                                    target={hack.website ? "_blank" : undefined}
                                    className="group flex items-center justify-between p-4 rounded-xl bg-[#0a0a0a] border border-white/5 hover:border-indigo-500/30 hover:bg-[#0f0f0f] transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Status Badge */}
                                        <div className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${hack.status === 'Open' ? 'bg-emerald-950/30 text-emerald-400 border-emerald-500/20' :
                                            hack.status === 'Live' ? 'bg-rose-950/30 text-rose-400 border-rose-500/20' :
                                                'bg-indigo-950/30 text-indigo-400 border-indigo-500/20'
                                            }`}>
                                            {hack.status}
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                                                {hack.name}
                                            </h3>
                                            <p className="text-xs text-neutral-500 font-mono mt-0.5">
                                                {hack.organizer} • <span className="text-neutral-600">{hack.mode}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center bg-white/5 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500 text-neutral-500 transition-all">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
