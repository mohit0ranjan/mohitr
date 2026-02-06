import { ArrowUpRight } from "lucide-react";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";

interface Opportunity {
    id: string;
    role: string;
    company: string;
    type: string;
    location: string;
    link: string;
    isNew: boolean;
    dateShared: Date;
}

// Helper for dates
const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(date));
};

export default function Opportunities({ items }: { items: Opportunity[] }) {
    if (!items.length) return null;

    return (
        <section className="py-24 border-t border-white/5 relative bg-[#050505] z-10">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl">

                <FadeIn className="mb-12 flex items-baseline justify-between">
                    <div>
                        <span className="text-xs font-mono uppercase tracking-widest text-neutral-600 block mb-2">
                            Signal Feed
                        </span>
                        <h2 className="text-2xl font-light text-white">Curated Opportunities</h2>
                    </div>
                </FadeIn>

                <div className="flex flex-col">
                    <FadeInStagger>
                        {items.map((job, i) => (
                            <FadeIn key={job.id} delay={i * 0.05}>
                                <a
                                    href={job.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-white/5 hover:border-white/10 transition-colors"
                                >
                                    <div className="flex items-baseline gap-4 md:gap-8 mb-2 md:mb-0">
                                        <div className="flex items-center gap-2 min-w-[200px]">
                                            {job.isNew && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            )}
                                            <h3 className="text-lg font-medium text-white group-hover:text-indigo-400 transition-colors">
                                                {job.role}
                                            </h3>
                                        </div>
                                        <p className="text-neutral-500 font-light group-hover:text-neutral-300 transition-colors">
                                            {job.company}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 md:gap-8">
                                        <span className="text-xs font-mono uppercase text-neutral-600 border border-white/5 px-2 py-1 rounded">
                                            {job.type}
                                        </span>
                                        <span className="text-xs font-mono text-neutral-600 min-w-[60px] text-right">
                                            {formatDate(job.dateShared)}
                                        </span>
                                        <ArrowUpRight size={14} className="text-neutral-700 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
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
