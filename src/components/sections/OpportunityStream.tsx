
import { ArrowUpRight, MapPin, Building2, Clock } from "lucide-react";
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
    description?: string; // Kept in interface but not used in UI
}

export default function OpportunityStream({ items }: { items: Opportunity[] }) {
    if (!items.length) return null;

    return (
        <section className="py-24 bg-[#030303] relative border-t border-white/5">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">

                <FadeIn className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <h2 className="text-xs font-mono text-emerald-500 uppercase tracking-widest">
                                Live Signal Feed
                            </h2>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter">
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

                <FadeInStagger className="space-y-3">
                    {items.map((job, i) => (
                        <FadeIn key={job.id} delay={i * 0.05}>
                            <Link
                                href={job.link}
                                className="group relative block w-full bg-[#080808] border border-white/5 hover:border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:bg-neutral-900/50"
                            >
                                <div className="flex items-center justify-between p-4 md:p-5">

                                    {/* LEFT: MAIN INFO */}
                                    <div className="flex flex-col gap-1.5 pr-4">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-base md:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors tracking-tight line-clamp-1">
                                                {job.title}
                                            </h3>
                                            {job.isNew && (
                                                <span className="hidden md:inline-flex text-[9px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                                    New
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-neutral-400">
                                            <span className="font-medium text-neutral-300 flex items-center gap-1.5">
                                                <Building2 size={12} className="text-neutral-500" />
                                                {job.company}
                                            </span>
                                            <span className="w-0.5 h-0.5 rounded-full bg-neutral-700" />
                                            <span className="flex items-center gap-1.5">
                                                <MapPin size={12} className="text-neutral-600" />
                                                {job.location}
                                            </span>
                                            <span className="w-0.5 h-0.5 rounded-full bg-neutral-700" />
                                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${job.type === 'Internship' ? 'bg-blue-500/5 text-blue-400 border-blue-500/10' : 'bg-purple-500/5 text-purple-400 border-purple-500/10'}`}>
                                                {job.type}
                                            </span>
                                        </div>
                                    </div>

                                    {/* RIGHT: ARROW */}
                                    <div className="shrink-0 pl-4 border-l border-white/5 h-8 flex items-center justify-center">
                                        <ArrowUpRight size={18} className="text-neutral-600 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
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
