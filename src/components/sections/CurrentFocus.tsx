import { ArrowRight } from "lucide-react";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";

interface FocusPoint {
    id: string;
    title: string;
    description: string | null;
}

export default function CurrentFocus({ points }: { points: FocusPoint[] }) {
    if (!points.length) return null;

    return (
        <section className="py-24 border-t border-white/5 relative bg-[#050505] z-10">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl">
                <FadeInStagger>

                    <FadeIn className="mb-8">
                        <span className="text-xs font-mono uppercase tracking-widest text-neutral-600 block mb-4">
                            Current Focus
                        </span>
                        <h2 className="text-2xl md:text-3xl font-light text-white leading-tight max-w-2xl">
                            Exploring the intersection of <span className="text-indigo-400">local LLMs</span> and <span className="text-indigo-400">structured data pipelines</span>.
                        </h2>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 gap-12 mt-12">
                        {points.map((point, i) => (
                            <FadeIn key={point.id} delay={i * 0.1}>
                                <div className="group">
                                    <h3 className="text-lg font-medium text-neutral-200 mb-2 group-hover:text-indigo-300 transition-colors">
                                        {point.title}
                                    </h3>
                                    {point.description && (
                                        <p className="text-sm text-neutral-500 leading-relaxed max-w-sm">
                                            {point.description}
                                        </p>
                                    )}
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                </FadeInStagger>
            </div>
        </section>
    );
}
