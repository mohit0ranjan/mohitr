import Link from "next/link";
import { ArrowLeft, ArrowRight, Terminal } from "lucide-react";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";

interface DevTool {
    id: string;
    name: string;
    category: string;
    shortDescription: string;
    liveUrl: string | null;
}

interface DevToolsProps {
    tools: DevTool[];
}

export default function DevTools({ tools }: DevToolsProps) {
    if (tools.length === 0) return null;

    return (
        <section className="py-24 bg-[#080808]/50 border-y border-white/5" id="tools">
            <div className="container mx-auto px-4 md:px-8">

                <FadeIn className="flex justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Terminal size={14} className="text-accent-teal" />
                            <span className="text-xs font-mono uppercase tracking-widest text-accent-teal">Dev Utilities</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Build Faster</h2>
                        <p className="text-muted">Tools I use or built to save time.</p>
                    </div>
                    <Link
                        href="/tools"
                        className="text-sm text-muted hover:text-white transition-colors flex items-center gap-2 group"
                    >
                        Browse all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </FadeIn>

                <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {tools.map((tool, i) => (
                        <FadeIn key={tool.id} delay={i * 0.05}>
                            <a
                                href={tool.liveUrl || "/tools"}
                                className="block group h-full"
                            >
                                <article className="bg-[#0A0A0A] hover:bg-[#111111] border border-white/5 rounded-2xl p-5 transition-all duration-300 h-full flex flex-col justify-between group/card relative overflow-hidden">
                                    {/* Subtle terminal scanline effect or pattern? No, let's keep it clean */}
                                    <div className="absolute top-0 left-0 w-1 h-full bg-accent-teal/0 group-hover/card:bg-accent-teal/40 transition-all duration-500" />

                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">
                                                {tool.category}
                                            </span>
                                            <Terminal size={14} className="text-neutral-600 group-hover/card:text-accent-teal transition-colors" />
                                        </div>

                                        <h3 className="font-bold text-gray-200 mb-2 group-hover/card:text-white transition-colors">
                                            {tool.name}
                                        </h3>

                                        <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2 font-medium">
                                            {tool.shortDescription}
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between opacity-0 group-hover/card:opacity-100 transition-opacity">
                                        <span className="text-[10px] uppercase font-bold text-accent-teal tracking-wider">Use Utility</span>
                                        <ArrowRight size={12} className="text-accent-teal" />
                                    </div>
                                </article>
                            </a>
                        </FadeIn>
                    ))}
                </FadeInStagger>

            </div>
        </section>
    );
}
