import { FadeIn, FadeInStagger } from "@/components/ui/motion";
import { GraduationCap, Briefcase, MapPin, Building2, ExternalLink } from "lucide-react";

interface TimelineEntry {
    id: string;
    year: string;
    title: string;
    company?: string | null;
    location?: string | null;
    url?: string | null;
    type: string;
    description: string;
}

export default function Journey({ items }: { items: TimelineEntry[] }) {
    const educationItems = items.filter(i => i.type === 'Education');
    const experienceItems = items.filter(i => i.type !== 'Education' && i.type !== 'Award');
    // Assuming awards might be separate or included. User specifically asked for Experience.

    return (
        <section className="py-32 bg-[#030303] relative border-t border-white/5 overflow-hidden">

            {/* Ambient Gradients - Shifted Down feeling */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute top-[10%] left-0 w-[500px] h-[500px] bg-indigo-900/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">

                <FadeIn className="mb-20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-[1px] bg-indigo-500/50" />
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-indigo-400">The Path</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                        Timeline.
                    </h2>
                    <p className="text-neutral-500 max-w-xl text-lg leading-relaxed">
                        My academic foundation, professional milestones, and key career pivots.
                    </p>
                </FadeIn>

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 relative">

                    {/* PART 1: EDUCATION (Dynamic) */}
                    <div>
                        <FadeIn delay={0.1}>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                    <GraduationCap size={24} />
                                </span>
                                <h3 className="text-2xl font-bold text-white tracking-tight">Education</h3>
                            </div>
                        </FadeIn>

                        <FadeInStagger className="space-y-8">
                            {educationItems.length > 0 ? (
                                educationItems.map((item, i) => (
                                    <FadeIn key={item.id} delay={0.1 + (i * 0.1)}>
                                        <div className="group relative">
                                            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm" />
                                            <div className="relative p-8 rounded-2xl bg-[#080808] border border-white/10 group-hover:border-white/20 transition-all">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h4 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">{item.title}</h4>
                                                        {item.company && <p className="text-neutral-400 text-sm mt-1">{item.company}</p>}
                                                    </div>
                                                    <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md border border-indigo-500/20 whitespace-nowrap ml-2">
                                                        {item.year}
                                                    </span>
                                                </div>
                                                <p className="text-neutral-500 text-sm leading-relaxed whitespace-pre-line">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </FadeIn>
                                ))
                            ) : (
                                <p className="text-neutral-600 italic">No education entries yet.</p>
                            )}
                        </FadeInStagger>
                    </div>


                    {/* PART 2: EXPERIENCE (Dynamic) */}
                    <div className="relative">
                        <FadeIn delay={0.2}>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    <Briefcase size={24} />
                                </span>
                                <h3 className="text-2xl font-bold text-white tracking-tight">Experience</h3>
                            </div>
                        </FadeIn>

                        {/* Connecting Line for Timeline */}
                        <div className="absolute left-6 top-24 bottom-0 w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent" />

                        <FadeInStagger className="space-y-12 pl-2">
                            {experienceItems.length > 0 ? (
                                experienceItems.map((item, i) => (
                                    <FadeIn key={item.id} delay={0.2 + (i * 0.1)}>
                                        <div className="relative pl-12 group">
                                            {/* Dot */}
                                            <div className="absolute left-[13px] top-2 w-3 h-3 rounded-full bg-[#030303] border-2 border-neutral-700 group-hover:border-emerald-500 group-hover:scale-125 transition-all z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
                                            {/* Connector Highlight */}
                                            <div className="absolute left-[18px] -top-12 bottom-4 w-[1px] bg-emerald-500/50 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-700 delay-100" />

                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                                                <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                                                    {item.title}
                                                </h4>
                                                <span className="text-xs font-mono text-neutral-500 group-hover:text-emerald-400 transition-colors shrink-0">
                                                    {item.year}
                                                </span>
                                            </div>

                                            {/* Company & Details */}
                                            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
                                                {item.company && (
                                                    <span className="flex items-center gap-1.5 text-neutral-300">
                                                        <Building2 size={12} /> {item.company}
                                                    </span>
                                                )}
                                                {item.location && (
                                                    <span className="flex items-center gap-1.5">
                                                        <MapPin size={12} /> {item.location}
                                                    </span>
                                                )}
                                                {item.url && (
                                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                                                        <ExternalLink size={12} /> Ref
                                                    </a>
                                                )}
                                            </div>

                                            <p className="text-neutral-500 text-sm leading-relaxed max-w-md whitespace-pre-line group-hover:text-neutral-400 transition-colors">
                                                {item.description}
                                            </p>
                                        </div>
                                    </FadeIn>
                                ))
                            ) : (
                                <div className="relative pl-12">
                                    <p className="text-neutral-600 italic">No experience entries yet.</p>
                                </div>
                            )}
                        </FadeInStagger>
                    </div>

                </div>
            </div>
        </section>
    );
}
