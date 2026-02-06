import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink, Star } from "lucide-react";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";

interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    href: string;
    tech: string[];
}

export default function FeaturedWork({ projects }: { projects: Project[] }) {
    if (!projects.length) return null;

    const primaryProject = projects[0];
    const secondaryProjects = projects.slice(1, 3);

    return (
        <section className="py-32 bg-[#030303] relative z-10 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative">

                <FadeIn className="mb-20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-[1px] bg-indigo-500/50" />
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-indigo-400">Selected Work</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                        Featured Projects.
                    </h2>
                </FadeIn>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* 1. PRIMARY HIGHLIGHT (Left Column - 7/12) */}
                    <FadeIn className="lg:col-span-7 h-full">
                        <Link href={primaryProject.href} target="_blank" className="group block relative h-[600px] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-700">

                            {/* Deep Background */}
                            <div className="absolute inset-0 bg-neutral-900/40 z-0" />

                            {/* Animated Gradient Glow */}
                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(99,102,241,0.15),_transparent_70%)] group-hover:scale-110 transition-transform duration-1000" />

                            {/* Decorative Elements */}
                            <div className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                                <Star size={14} className="text-indigo-400 fill-indigo-400" />
                                <span className="text-[10px] font-mono text-white uppercase tracking-widest font-bold">Priority Build</span>
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end z-20">
                                <div className="max-w-xl">
                                    <div className="mb-4 flex items-center gap-3">
                                        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">{primaryProject.category}</span>
                                        <div className="w-1 h-1 rounded-full bg-neutral-700" />
                                        <div className="flex gap-3">
                                            {primaryProject.tech.slice(0, 3).map(t => (
                                                <span key={t} className="text-[10px] text-neutral-500 font-mono uppercase">{t}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 group-hover:translate-x-2 transition-transform duration-500 tracking-tight">
                                        {primaryProject.title}
                                    </h3>

                                    <p className="text-neutral-400 text-lg md:text-xl leading-relaxed mb-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 line-clamp-2">
                                        {primaryProject.description}
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:scale-110">
                                            <ArrowUpRight size={24} />
                                        </div>
                                        <span className="text-sm font-bold text-white uppercase tracking-widest border-b border-white/20 pb-1">View Project</span>
                                    </div>
                                </div>
                            </div>

                            {/* Corner Tech Stack List (Subtle Decoration) */}
                            <div className="absolute top-10 right-10 z-20 flex flex-col items-end gap-1 opacity-20 group-hover:opacity-50 transition-opacity">
                                {primaryProject.tech.map(t => (
                                    <span key={t} className="text-xs font-mono text-white uppercase">{t}</span>
                                ))}
                            </div>
                        </Link>
                    </FadeIn>

                    {/* 2. SECONDARY PROJECTS (Right Column - 5/12) */}
                    <div className="lg:col-span-5 flex flex-col gap-8 h-full">
                        <FadeInStagger className="flex flex-col gap-8">
                            {secondaryProjects.map((project, i) => (
                                <FadeIn key={project.id} delay={i * 0.1}>
                                    <Link href={project.href} target="_blank" className="group block relative h-[284px] rounded-[2rem] overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 bg-neutral-900/20">

                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,_rgba(168,85,247,0.1),_transparent_70%)]" />

                                        <div className="relative h-full p-8 md:p-10 flex flex-col justify-between z-10">
                                            <div className="flex justify-between items-start">
                                                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                                                    {project.category}
                                                </div>
                                                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-neutral-500 group-hover:text-white group-hover:bg-indigo-500 group-hover:border-indigo-500 transition-all">
                                                    <ArrowUpRight size={16} />
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-indigo-400 transition-colors">
                                                    {project.title}
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tech.map(t => (
                                                        <span key={t} className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">{t}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </FadeIn>
                            ))}

                            {/* View All Teaser */}
                            <FadeIn delay={0.3}>
                                <Link href="/projects" className="group flex items-center justify-between p-8 rounded-[2rem] border border-white/5 bg-white/5 hover:bg-white text-black transition-all duration-500">
                                    <div>
                                        <h4 className="text-2xl font-bold transition-colors group-hover:text-black text-white">View Archive</h4>
                                        <p className="text-sm font-mono text-neutral-500 transition-colors group-hover:text-black/60">Exploring the full library</p>
                                    </div>
                                    <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:text-black group-hover:border-black transition-all">
                                        <ArrowUpRight size={28} />
                                    </div>
                                </Link>
                            </FadeIn>
                        </FadeInStagger>
                    </div>

                </div>

                {/* Empty State */}
                {projects.length === 0 && (
                    <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
                        <p className="text-neutral-500">No featured work to display yet.</p>
                    </div>
                )}

            </div>
        </section>
    );
}

