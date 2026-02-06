import { ArrowUpRight, MapPin, Building2, Sparkles } from "lucide-react";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";
import Link from "next/link";
import { format } from "date-fns";

interface Opportunity {
    id: string;
    role: string;
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
        <section className="py-24 bg-[#030303] relative overflow-hidden">

            {/* Ambient Base Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/[0.02] blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

                <FadeIn className="mb-16">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="h-px w-8 bg-emerald-500/50" />
                                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-500 font-bold">Signals Feed</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                                Verified <span className="text-neutral-700">Opportunities.</span>
                            </h2>
                        </div>
                        <Link href="/opportunities" className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-full transition-all duration-300">
                            <span className="text-xs font-bold text-white">Full Stream</span>
                            <ArrowUpRight size={16} className="text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FadeInStagger className="contents">
                        {items.map((job, i) => (
                            <FadeIn key={job.id} delay={i * 0.05}>
                                <a
                                    href={job.link}
                                    target="_blank"
                                    className="group relative flex items-center gap-4 p-4 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-emerald-500/30 transition-all duration-500"
                                >
                                    {/* Left Accent Bar */}
                                    <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-r-full" />

                                    {/* Company Icon (Smaller & Unique) */}
                                    <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-95 transition-transform duration-500">
                                        <span className="text-lg font-black text-neutral-600 group-hover:text-emerald-500 transition-colors">
                                            {job.company.charAt(0)}
                                        </span>
                                    </div>

                                    {/* Main Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h3 className="text-sm md:text-base font-bold text-white truncate group-hover:text-emerald-400 transition-colors tracking-tight">
                                                {job.role}
                                            </h3>
                                            {job.isNew && (
                                                <Sparkles size={10} className="text-emerald-500 animate-pulse shrink-0" />
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3 text-[10px] text-neutral-500 font-medium">
                                            <div className="flex items-center gap-1 shrink-0">
                                                <Building2 size={10} className="text-neutral-700" />
                                                <span className="text-neutral-400 uppercase tracking-wider">{job.company}</span>
                                            </div>
                                            <span className="h-1 w-1 rounded-full bg-neutral-800" />
                                            <div className="flex items-center gap-1 truncate">
                                                <MapPin size={10} className="text-neutral-700" />
                                                <span className="truncate">{job.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Compact Right Section */}
                                    <div className="flex flex-col items-end shrink-0 gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[8px] font-black px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-neutral-400 uppercase tracking-[0.1em]">
                                            {job.type}
                                        </span>
                                        <span className="text-[9px] font-mono text-neutral-600">
                                            {format(new Date(job.dateShared), "MMM d")}
                                        </span>
                                    </div>

                                    {/* Hover Arrow (Minimal) */}
                                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-30 transition-opacity">
                                        <ArrowUpRight size={12} className="text-white" />
                                    </div>
                                </a>
                            </FadeIn>
                        ))}
                    </FadeInStagger>
                </div>

            </div>
        </section>
    );
}

