"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Search, MapPin, ArrowUpRight, Building2, Clock, Filter, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Opportunity } from "@/components/opportunities/OpportunityCard";

export default function OpportunityDirectory({ opportunities }: { opportunities: Opportunity[] }) {
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const filtered = opportunities.filter(o => {
        const matchesSearch = o.title.toLowerCase().includes(search.toLowerCase()) ||
            o.company.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' ? true :
            filter === 'active' ? o.status === 'Active' : o.status === 'Closed';
        return matchesSearch && matchesFilter;
    });

    const categories = [
        { id: 'all', label: 'All Signals' },
        { id: 'active', label: 'Live' },
        { id: 'closed', label: 'Archived' },
    ];

    return (
        <section className="min-h-screen pt-32 pb-16 px-4 md:px-8 relative font-sans">
            {/* Background Texture */}
            <div className="fixed inset-0 bg-[#030303] -z-10" />
            <div className="fixed inset-0 bg-[linear-gradient(rgba(18,18,18,0)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 -z-10" />

            <div className="container mx-auto max-w-6xl">
                {/* 1. Futuristic Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
                    <div className="w-full">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest">System Online</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tighter mix-blend-difference break-words">
                            OPPORTUNITIES
                            <span className="text-neutral-700 block md:inline">_LOG</span>
                        </h1>
                    </div>

                    {/* Unique Filter Interface */}
                    <div className="flex items-center gap-2 md:gap-4 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-sm mt-6 md:mt-0 overflow-x-auto max-w-full">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setFilter(cat.id)}
                                className={cn(
                                    "px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap",
                                    filter === cat.id
                                        ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                        : "text-neutral-500 hover:text-white"
                                )}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Search Bar - Minimal */}
                <div className="relative mb-12 group">
                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-white transition-colors" />
                    <input
                        type="text"
                        placeholder="FILTER_BY_KEYWORD..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-transparent border-b border-white/10 py-4 pl-10 text-lg md:text-xl text-white focus:outline-none focus:border-white/50 transition-all placeholder:text-neutral-700 font-mono"
                    />
                </div>

                {/* 3. The List (Ledger Style) */}
                <div className="space-y-4 md:space-y-2">
                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-mono text-neutral-600 uppercase tracking-widest border-b border-white/5 pb-4">
                        <div className="col-span-4">Role / Entity</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-3">Location</div>
                        <div className="col-span-2">Date</div>
                        <div className="col-span-1 text-right">Action</div>
                    </div>

                    <AnimatePresence>
                        {filtered.map((opp, idx) => (
                            <motion.div
                                key={opp.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <a
                                    href={`/opportunities/${opp.slug}`}
                                    onMouseEnter={() => setHoveredId(opp.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    className="group relative flex flex-col md:grid md:grid-cols-12 gap-4 items-start md:items-center p-6 bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all duration-300 rounded-lg overflow-hidden"
                                >
                                    {/* Hover Highlight */}
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                    {/* Column 1: Role & Company */}
                                    <div className="w-full md:col-span-4 flex flex-col justify-center relative z-10">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center gap-3">
                                                {opp.isFeatured && (
                                                    <Sparkles className="w-4 h-4 text-amber-400" />
                                                )}
                                                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                                                    {opp.title}
                                                </h3>
                                            </div>

                                            {/* Mobile Arrow */}
                                            <div className="md:hidden w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-neutral-500">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                        <p className="text-sm text-neutral-400 font-mono mt-1 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                                            @{opp.company}
                                        </p>
                                    </div>

                                    {/* Column 2: Type */}
                                    <div className="w-full md:col-span-2 relative z-10 flex items-center mt-2 md:mt-0">
                                        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/5 text-neutral-300 rounded border border-white/5 group-hover:bg-amber-500/10 group-hover:text-amber-200 group-hover:border-amber-500/20 transition-all">
                                            {opp.type}
                                        </span>
                                    </div>

                                    {/* Column 3: Location (Desktop) */}
                                    <div className="hidden md:flex col-span-3 relative z-10 items-center text-sm text-neutral-400">
                                        <MapPin className="w-4 h-4 mr-2 opacity-50" />
                                        {opp.location || "Remote"}
                                    </div>

                                    {/* Column 4: Date (Desktop) */}
                                    <div className="hidden md:flex col-span-2 relative z-10 items-center text-sm font-mono text-neutral-500">
                                        {format(new Date(opp.createdAt), "dd MMM yyyy")}
                                    </div>

                                    {/* Column 5: Action (Desktop Arrow) */}
                                    <div className="hidden md:flex col-span-1 relative z-10 justify-end">
                                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                            <ArrowUpRight className="w-5 h-5" />
                                        </div>
                                    </div>

                                    {/* Mobile Only: Extra Info */}
                                    <div className="md:hidden w-full border-t border-white/5 pt-4 mt-2 flex justify-between items-center text-xs text-neutral-500 font-mono relative z-10">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-3 h-3 opacity-50" />
                                            <span>{opp.location || "Remote"}</span>
                                        </div>
                                        <span>{format(new Date(opp.createdAt), "MMM d, yyyy")}</span>
                                    </div>
                                </a>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filtered.length === 0 && (
                    <div className="py-32 text-center border-t border-b border-white/5">
                        <p className="font-mono text-neutral-600 text-lg">
                            // NO_SIGNALS_DETECTED
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
