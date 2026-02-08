"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hackathon, HackathonCard } from "@/components/hackathons/HackathonCard";
import HackathonCalendar from "@/components/hackathons/HackathonCalendar";
import { Search, Filter, Calendar } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function HackathonDirectory({ hackathons }: { hackathons: Hackathon[] }) {
    const [filter, setFilter] = useState("active"); // active (default), all, upcoming, open, live, past
    const [modeFilter, setModeFilter] = useState("all"); // all, online, offline
    const [search, setSearch] = useState("");

    const filtered = hackathons.filter(h => {
        const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase()) ||
            h.organizer.toLowerCase().includes(search.toLowerCase()) ||
            h.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));

        const matchesFilter = filter === 'all' ? true :
            filter === 'active' ? ['Upcoming', 'Open', 'Live'].includes(h.status) :
                filter === 'upcoming' ? h.status === 'Upcoming' :
                    filter === 'open' ? h.status === 'Open' :
                        filter === 'live' ? h.status === 'Live' :
                            filter === 'past' ? h.status === 'Closed' : true;

        const matchesMode = modeFilter === 'all' ? true : h.mode.toLowerCase() === modeFilter;

        return matchesSearch && matchesFilter && matchesMode;
    });

    const categories = [
        { id: 'active', label: 'Active & Upcoming' },
        { id: 'all', label: 'All Events' },
        { id: 'open', label: 'Open' },
        { id: 'live', label: 'Live' },
        { id: 'past', label: 'Past' },
    ];

    return (
        <section className="min-h-screen pt-32 pb-20 px-6 relative">
            {/* Background */}
            <div className="fixed inset-0 bg-[#030303] -z-10" />
            <div className="fixed inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none -z-10" />

            <div className="container mx-auto max-w-7xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500 tracking-tight mb-6">
                            Hackathons.
                        </h1>
                        <p className="text-neutral-400 text-lg max-w-2xl leading-relaxed">
                            Discover the best hackathons, challenges, and coding competitions from around the world.
                            Curated for developers, designers, and innovators.
                        </p>
                    </div>
                </div>

                {/* Controls */}
                <div className="sticky top-24 z-30 mb-12 space-y-4 bg-[#030303]/80 backdrop-blur-xl p-4 rounded-2xl border border-white/5 shadow-2xl">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

                        {/* Status Filter */}
                        <div className="flex p-1 bg-neutral-900/50 rounded-xl border border-white/5 overflow-x-auto w-full md:w-auto">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setFilter(cat.id)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                                        filter === cat.id
                                            ? "bg-white text-black shadow-lg"
                                            : "text-neutral-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Search & Mode */}
                        <div className="flex gap-3 w-full md:w-auto">
                            <div className="relative group flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-white transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search hackathons..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-neutral-900/50 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-white/10 focus:bg-neutral-900 transition-all placeholder:text-neutral-600"
                                />
                            </div>

                            <select
                                value={modeFilter}
                                onChange={(e) => setModeFilter(e.target.value)}
                                className="bg-neutral-900/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-neutral-400 focus:outline-none focus:border-white/10 focus:text-white transition-colors appearance-none cursor-pointer hover:bg-neutral-900"
                            >
                                <option value="all">All Modes</option>
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((hackathon) => (
                            <motion.div
                                key={hackathon.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                            >
                                <HackathonCard hackathon={hackathon} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filtered.length === 0 && (
                    <div className="py-24 text-center">
                        <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Filter className="w-6 h-6 text-neutral-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No hackathons found</h3>
                        <p className="text-neutral-500">Try adjusting your filters or search terms.</p>
                        <button
                            onClick={() => { setFilter('all'); setSearch(''); setModeFilter('all'); }}
                            className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Calendar Section */}
                <div className="mt-24 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">
                            Calendar View
                        </h2>
                    </div>
                    <HackathonCalendar hackathons={hackathons} />
                </div>
            </div>
        </section>
    );
}
