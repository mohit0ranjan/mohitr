"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Filter, Sparkles, Briefcase } from "lucide-react";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";
import { formatDistanceToNow } from "date-fns";

type Opportunity = {
    id: string;
    role: string;
    company: string;
    type: string;
    description: string;
    url: string;
    date: Date;
    isFeatured: boolean;
};

export default function OpportunitiesList({ initialOpportunities }: { initialOpportunities: Opportunity[] }) {
    const [filter, setFilter] = useState("All");

    const categories = ["All", "Internship", "Full-time", "Remote", "Off-campus"];

    const filteredOpportunities = filter === "All"
        ? initialOpportunities
        : initialOpportunities.filter(job => job.type.includes(filter));

    return (
        <main className="min-h-screen bg-[#030303] pt-32 pb-20 relative overflow-hidden text-white">

            {/* Ambient Gradients to match Homepage */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">

                {/* 1. Header & Intro */}
                <FadeIn className="mb-16">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-mono text-neutral-500 hover:text-white mb-8 transition-colors uppercase tracking-wider">
                        <ArrowLeft size={16} /> Back to HQ
                    </Link>

                    <div className="flex items-center gap-3 mb-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                            Live Signal Feed
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-6 tracking-tight">
                        Curated Opportunities
                    </h1>
                    <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl font-light">
                        A selected stream of roles, hackathons, and collaborations I'm tracking. <br />
                        <span className="text-white/60 text-base mt-2 block">All manually verified. No noise.</span>
                    </p>
                </FadeIn>

                {/* 2. Filters */}
                <FadeIn delay={0.1} className="mb-12">
                    <div className="flex flex-wrap gap-2 items-center p-1 bg-white/5 rounded-full w-fit border border-white/5 backdrop-blur-md">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </FadeIn>

                {/* 3. List */}
                <div className="space-y-6 relative">
                    {/* Vertical Connecting Line */}
                    <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-gradient-to-b from-indigo-500/20 via-white/5 to-transparent hidden md:block" />

                    {filteredOpportunities.length > 0 ? (
                        <FadeInStagger className="space-y-4">
                            {filteredOpportunities.map((job, i) => (
                                <FadeIn key={job.id} delay={i * 0.05} className="w-full">
                                    <a
                                        href={job.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative block"
                                    >
                                        {/* GRADIENT BORDER EFFECT */}
                                        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                                        <article className="relative bg-[#080808] border border-white/5 rounded-2xl p-6 md:pl-20 hover:border-transparent transition-all duration-300 overflow-hidden">

                                            {/* Timeline Node */}
                                            <div className="absolute left-[21px] top-8 w-3 h-3 rounded-full bg-[#050505] border-2 border-indigo-500/30 group-hover:border-indigo-500 group-hover:bg-indigo-500 group-hover:scale-125 transition-all duration-300 hidden md:block z-20" />

                                            <div className="flex flex-col md:flex-row justify-between gap-6 md:items-start">

                                                {/* Left: Info */}
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-purple-300 transition-all">
                                                            {job.role}
                                                        </h3>
                                                        {job.isFeatured && (
                                                            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-emerald-500/20 flex items-center gap-1">
                                                                <Sparkles size={8} /> New
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-3 text-sm text-neutral-400 mb-4">
                                                        <span className="font-semibold text-white">{job.company}</span>
                                                        <span className="w-1 h-1 rounded-full bg-neutral-600" />
                                                        <span className="font-mono text-xs uppercase tracking-wider">{job.type}</span>
                                                        <span className="w-1 h-1 rounded-full bg-neutral-600" />
                                                        <span className="text-neutral-600">{formatDistanceToNow(new Date(job.date), { addSuffix: true })}</span>
                                                    </div>

                                                    <p className="text-neutral-500 text-sm leading-relaxed max-w-2xl group-hover:text-neutral-300 transition-colors">
                                                        {job.description}
                                                    </p>
                                                </div>

                                                {/* Right: Action */}
                                                <div className="flex items-center justify-between md:flex-col md:items-end gap-3 min-w-fit">
                                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 group-hover:bg-white group-hover:text-black transition-all group-hover:scale-110 group-hover:-rotate-12 shadow-xl">
                                                        <ArrowUpRight size={20} />
                                                    </div>
                                                </div>

                                            </div>
                                        </article>
                                    </a>
                                </FadeIn>
                            ))}
                        </FadeInStagger>
                    ) : (
                        <div className="py-20 text-center text-neutral-600">
                            <Briefcase className="mx-auto mb-4 opacity-20" size={48} />
                            <p>No active signals found for "{filter}".</p>
                            <button onClick={() => setFilter("All")} className="text-indigo-400 hover:text-white mt-2 text-sm font-mono border-b border-indigo-500/30">Reset Feed</button>
                        </div>
                    )}
                </div>

            </div>
        </main>
    )
}
