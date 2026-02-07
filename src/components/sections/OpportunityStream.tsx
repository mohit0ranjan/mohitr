
import { ArrowUpRight, Clock, MapPin, Building2, Ticket } from "lucide-react";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";
import Link from "next/link";
import { format } from "date-fns";

interface Opportunity {
    id: string;
    title: string;
    company: string;
    type: string;
    location: string;
    link: string;
    isNew: boolean;
    dateShared: Date;
    isFeatured?: boolean;
}

export default function OpportunityStream({ items }: { items: Opportunity[] }) {
    if (!items.length) return null;

    return (
        <section className="py-24 bg-[#030303] relative border-t border-white/5">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">

                <FadeIn className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <h2 className="text-xs font-mono text-emerald-500 uppercase tracking-widest">
                                Live Signal Feed
                            </h2>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
                            Active <span className="text-neutral-600">Opportunities.</span>
                        </h2>
                    </div>
                    <Link
                        href="/opportunities"
                        className="text-xs font-mono text-neutral-500 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2 group"
                    >
                        View Full Index
                        <span className="w-4 h-px bg-neutral-700 group-hover:w-8 group-hover:bg-white transition-all" />
                    </Link>
                </FadeIn>

                <FadeInStagger className="space-y-6">
                    {items.map((job, i) => (
                        <FadeIn key={job.id} delay={i * 0.1}>
                            <Link
                                href={job.link}
                                className="group relative block w-full bg-[#080808] border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl shadow-black/50 hover:shadow-emerald-900/10"
                            >
                                <div className="flex flex-col md:flex-row h-full">

                                    {/* LEFT: MAIN PASS (70%) */}
                                    <div className="flex-1 p-6 md:p-8 relative">
                                        {/* BG Gradient on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="relative z-10 flex flex-col justify-between h-full gap-6">
                                            <div>
                                                <div className="flex items-start justify-between gap-4 mb-2">
                                                    <h3 className="text-xl md:text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors tracking-tight">
                                                        {job.title}
                                                    </h3>
                                                    {job.isNew && (
                                                        <span className="shrink-0 text-[9px] font-black uppercase tracking-widest text-emerald-500 border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 rounded">
                                                            New
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-lg text-neutral-400 font-medium flex items-center gap-2">
                                                    <Building2 size={16} className="text-neutral-600" />
                                                    {job.company}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-neutral-500 uppercase tracking-wider">
                                                <span className="flex items-center gap-2">
                                                    <MapPin size={12} className="text-neutral-600" />
                                                    {job.location}
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-neutral-800" />
                                                <span>{job.type}</span>
                                                <span className="hidden md:block w-1 h-1 rounded-full bg-neutral-800" />
                                                <span className="hidden md:flex items-center gap-2">
                                                    <Clock size={12} className="text-neutral-600" />
                                                    {format(new Date(job.dateShared), "MMM d, yyyy")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* DIVIDER (Perforation) */}
                                    <div className="relative md:w-px h-px md:h-auto border-t md:border-t-0 md:border-l-2 border-dashed border-[#1a1a1a] bg-[#080808]">
                                        {/* The Notches */}
                                        <div className="absolute -left-2 -top-2 md:-top-2 md:-left-2 w-4 h-4 bg-[#030303] rounded-full z-20" />
                                        <div className="absolute -right-2 -top-2 md:-bottom-2 md:-left-2 w-4 h-4 bg-[#030303] rounded-full z-20" />
                                    </div>

                                    {/* RIGHT: STUB (Action) */}
                                    <div className="md:w-48 bg-[#0a0a0a] group-hover:bg-[#0c0c0c] transition-colors p-6 flex flex-row md:flex-col items-center justify-between md:justify-center relative">

                                        {/* Barcode Lines (Fake) */}
                                        <div className="hidden md:flex flex-row gap-1 h-8 opacity-20 mb-4 scale-x-150 origin-center">
                                            <div className="w-1 bg-white h-full" />
                                            <div className="w-0.5 bg-white h-full" />
                                            <div className="w-2 bg-white h-full" />
                                            <div className="w-0.5 bg-white h-full" />
                                            <div className="w-3 bg-white h-full" />
                                        </div>

                                        <div className="text-left md:text-center md:mb-4">
                                            <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest mb-1">Status</p>
                                            <p className="text-xs font-bold text-emerald-500 flex items-center md:justify-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                OP-EN
                                            </p>
                                        </div>

                                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300">
                                            <ArrowUpRight size={18} />
                                        </div>

                                        {/* Mobile Date Fallback */}
                                        <div className="md:hidden text-[10px] font-mono text-neutral-600">
                                            {format(new Date(job.dateShared), "MMM d")}
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </FadeInStagger>

            </div>
        </section>
    );
}
