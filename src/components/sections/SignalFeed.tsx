import { ArrowUpRight } from "lucide-react";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";

interface Opportunity {
    id: string;
    role: string;
    company: string;
    type: string;
    link: string;
    dateShared: Date;
}

export default function SignalFeed({ items }: { items: Opportunity[] }) {
    if (!items.length) return null;

    return (
        <section className="py-24 bg-[#050505] border-t border-white/5">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">

                <FadeIn className="mb-16 flex items-center justify-between">
                    <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500">
                        Signal Feed
                    </h2>
                    <span className="w-12 h-[1px] bg-neutral-800" />
                </FadeIn>

                <div className="space-y-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                    <FadeInStagger>
                        {items.map((job, i) => (
                            <FadeIn key={job.id} delay={i * 0.05}>
                                <a
                                    href={job.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-[#080808] p-6 hover:bg-[#0a0a0a] transition-colors group relative"
                                >
                                    <div className="flex justify-between items-center sm:hidden mb-2">
                                        <span className="text-[10px] font-mono text-neutral-600 uppercase">
                                            {job.type}
                                        </span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                                            <h3 className="text-lg font-medium text-neutral-200 group-hover:text-white transition-colors">
                                                {job.role} <span className="text-neutral-600 mx-2 font-light">at</span> {job.company}
                                            </h3>
                                        </div>

                                        <div className="flex items-center gap-6 text-sm text-neutral-500 font-mono">
                                            <span className="hidden sm:block">{job.type}</span>
                                            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" />
                                        </div>
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
