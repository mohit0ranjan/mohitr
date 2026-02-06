import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";

interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    href: string;
    tech: string[];
}

export default function VisualPeak({ projects }: { projects: Project[] }) {
    if (!projects.length) return null;
    const featured = projects.slice(0, 1)[0]; // ONLY ONE PEAK CARD

    return (
        <section className="py-24 bg-[#030303] relative overflow-hidden">

            <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
                <FadeIn>
                    <div className="flex flex-col items-center">

                        {/* Section Label */}
                        <div className="mb-12 text-center">
                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-600">
                                The Masterpiece
                            </span>
                        </div>

                        {/* THE CARD */}
                        <Link
                            href={featured.href}
                            target="_blank"
                            className="group relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl transition-all duration-700 hover:scale-[1.01]"
                        >
                            {/* Abstract Fluid Background */}
                            <div className="absolute inset-0 bg-neutral-900">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-black opacity-80 group-hover:opacity-100 transition-opacity duration-1000" />
                                <div className="absolute -right-32 -top-32 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen group-hover:bg-indigo-600/20 transition-all duration-1000" />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end items-start md:items-end md:justify-center md:flex-row md:gap-12">

                                <div className="z-10 md:w-1/2 md:mr-auto">
                                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white mb-6">
                                        {featured.category}
                                    </span>
                                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight tracking-tight">
                                        {featured.title}
                                    </h3>
                                    <p className="text-lg text-neutral-300 font-light leading-relaxed max-w-md">
                                        {featured.description}
                                    </p>
                                </div>

                                <div className="mt-8 md:mt-0 z-10 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                    <span className="text-sm font-medium text-white border-b border-white pb-1">Explore Project</span>
                                    <ArrowUpRight size={18} className="text-white" />
                                </div>

                            </div>
                        </Link>

                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
