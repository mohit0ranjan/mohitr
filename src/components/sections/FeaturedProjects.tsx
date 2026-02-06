import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";

interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    href: string;
    tech: string[];
}

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
    if (!projects.length) return null;

    // We only want 2-3 specific highlight cards
    const featured = projects.slice(0, 2);

    return (
        <section className="py-24 bg-[#080808] border-y border-white/5 relative overflow-hidden" id="work">

            {/* Soft Ambient Glow */}
            <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-indigo-900/10 blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">

                <FadeIn className="mb-16 flex justify-between items-end">
                    <div>
                        <span className="text-xs font-mono uppercase tracking-widest text-neutral-600 block mb-2">
                            Selected Work
                        </span>
                        <h2 className="text-3xl font-light text-white">Visual Highlights</h2>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    <FadeInStagger>
                        {featured.map((project, i) => (
                            <FadeIn key={project.id} delay={i * 0.1}>
                                <Link
                                    href={project.href}
                                    target="_blank"
                                    className="group block relative h-[450px] rounded-3xl overflow-hidden bg-neutral-900 border border-white/5 shadow-2xl transition-transform duration-500 hover:-translate-y-2"
                                >
                                    {/* Abstract Card Background */}
                                    <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-700 opacity-20 group-hover:opacity-30 ${i === 0 ? 'from-indigo-600 to-purple-800' : 'from-blue-600 to-emerald-800'}`} />

                                    {/* Noise Overlay */}
                                    <div className="absolute inset-0 opacity-[0.05] bg-[url('/noise.svg')] mix-blend-overlay" />

                                    <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                                        <div className="mb-auto">
                                            <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white mb-4">
                                                {project.category}
                                            </span>
                                        </div>

                                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-blue-100 transition-colors">
                                            {project.title}
                                        </h3>

                                        <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-8 max-w-md line-clamp-3">
                                            {project.description}
                                        </p>

                                        <div className="flex items-center justify-between border-t border-white/10 pt-6">
                                            <div className="flex gap-2">
                                                {project.tech.slice(0, 3).map(t => (
                                                    <span key={t} className="text-[10px] uppercase font-mono text-neutral-400">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                                                <ArrowUpRight size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </FadeIn>
                        ))}
                    </FadeInStagger>
                </div>

            </div>
        </section>
    );
}
