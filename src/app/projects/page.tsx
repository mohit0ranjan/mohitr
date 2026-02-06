import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { ExternalLink, Github, Terminal, Database, Cloud, Code, Smartphone, Globe } from "lucide-react";
import Contact from "@/components/sections/Contact";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic'

function getIconForCategory(category: string) {
    if (!category) return Code;
    const lower = category.toLowerCase();
    if (lower.includes('web')) return Globe;
    if (lower.includes('tool')) return Terminal;
    if (lower.includes('system')) return Database;
    if (lower.includes('mobile')) return Smartphone;
    if (lower.includes('cloud')) return Cloud;
    return Code;
}

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <main className="min-h-screen bg-[#030303] text-foreground relative z-0 overflow-hidden">

            {/* Ambient Background Glows */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

            {/* Noise Overlay */}
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] bg-noise"></div>

            <div className="container mx-auto px-6 md:px-12 pt-40 pb-32 max-w-7xl relative z-10">

                <header className="mb-20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-[1px] bg-indigo-500/50" />
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-indigo-400">The Archive</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                        Selected <br /> <span className="text-neutral-500">Creations.</span>
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
                        A repository of open-source tools, side experiments, and institutional projects built over the years.
                    </p>
                </header>

                <BentoGrid className="auto-rows-[minmax(380px,auto)] gap-8">
                    {projects.length === 0 && (
                        <div className="col-span-full text-center py-32 text-neutral-500 border border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.02]">
                            No projects found in the archive.
                        </div>
                    )}
                    {projects.map((project: any, i: number) => {
                        const Icon = getIconForCategory(project.category);
                        const tags = project.techStack ? project.techStack.split(',').map((t: string) => t.trim()) : [];
                        const isLarge = i % 5 === 0;

                        return (
                            <BentoCard key={project.id} colSpan={isLarge ? 2 : 1} className="flex flex-col group p-10 md:p-12 relative overflow-hidden bg-white/[0.03] border-white/5 hover:border-white/20 transition-all duration-700 rounded-[2.5rem]">

                                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Icon size={120} />
                                </div>

                                <div className="flex justify-between items-start mb-8 relative z-10">
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                                        <Icon size={28} />
                                    </div>
                                    <div className="flex gap-4">
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/5 hover:border-white/20 hover:text-indigo-400 transition-all">
                                                <Github size={20} />
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/5 hover:border-white/20 hover:text-indigo-400 transition-all">
                                                <ExternalLink size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-auto relative z-10">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{project.category}</span>
                                    </div>

                                    <h2 className="text-3xl font-bold mb-4 text-white group-hover:text-indigo-300 transition-colors tracking-tight">{project.name}</h2>

                                    <p className="text-neutral-400 mb-8 leading-relaxed line-clamp-3 md:line-clamp-none">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-3">
                                        {tags.map((tag: string) => (
                                            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-neutral-400 font-mono uppercase tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </BentoCard>
                        )
                    })}
                </BentoGrid>
            </div>
        </main>
    );
}
