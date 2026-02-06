import { FadeIn, FadeInStagger } from "@/components/ui/motion";
import { GraduationCap, Briefcase } from "lucide-react";

interface TimelineEntry {
    id: string;
    year: string;
    title: string;
    type: string;
    description: string;
}

export default function Journey({ items }: { items: TimelineEntry[] }) {
    const educationItems = items.filter(i => i.type === 'Education');
    const experienceItems = items.filter(i => i.type !== 'Education'); // Default to experience for others

    return (
        <section className="py-32 bg-[#030303] relative border-t border-white/5 overflow-hidden">

            {/* Ambient Gradients - Shifted Down feeling */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute top-[10%] left-0 w-[500px] h-[500px] bg-indigo-900/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">

                <FadeIn className="mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Timeline
                    </h2>
                    <p className="text-neutral-500 max-w-xl text-lg">
                        My academic foundation and professional milestones.
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
                                <h3 className="text-2xl font-bold text-white">Education</h3>
                            </div>
                        </FadeIn>

                        <FadeInStagger className="space-y-8">
                            {educationItems.length > 0 ? (
                                educationItems.map((item, i) => (
                                    <FadeIn key={item.id} delay={0.1 + (i * 0.1)}>
                                        <div className="group relative">
                                            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 group-hover:opacity-60 transition-opacity duration-500 blur-sm" />
                                            <div className="relative p-8 rounded-2xl bg-[#080808] border border-white/10 group-hover:border-transparent transition-all">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h4 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">{item.title}</h4>
                                                        {/* Optional: Parse description for subtitle if needed, or just show description */}
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
                                <h3 className="text-2xl font-bold text-white">Experience</h3>
                            </div>
                        </FadeIn>

                        {/* Connecting Line for Timeline */}
                        <div className="absolute left-4 top-20 bottom-0 w-[1px] bg-white/10" />

                        <FadeInStagger className="space-y-12">
                            {experienceItems.length > 0 ? (
                                experienceItems.map((item, i) => (
                                    <FadeIn key={item.id} delay={0.2 + (i * 0.1)}>
                                        <div className="relative pl-12 group">
                                            {/* Dot */}
                                            <div className="absolute left-[13px] top-2 w-2 h-2 rounded-full bg-[#030303] border border-neutral-600 group-hover:border-emerald-500 group-hover:scale-125 transition-all z-10" />

                                            <span className="text-xs font-mono text-neutral-500 mb-1 block group-hover:text-emerald-400 transition-colors">
                                                {item.year}
                                            </span>
                                            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                                                {item.title}
                                            </h4>
                                            <p className="text-neutral-500 text-sm leading-relaxed max-w-sm whitespace-pre-line">
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
