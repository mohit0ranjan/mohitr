import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { ArrowUpRight, Github, Terminal } from "lucide-react"
import { FadeIn, FadeInStagger } from "@/components/ui/motion"

export const dynamic = 'force-dynamic'

export default async function ToolsPage() {
    const tools = await prisma.devTool.findMany({
        where: { isPublished: true },
        orderBy: { category: 'asc' }
    })

    const groupedTools: Record<string, any[]> = {}
    tools.forEach((tool: any) => {
        if (!groupedTools[tool.category]) {
            groupedTools[tool.category] = []
        }
        groupedTools[tool.category].push(tool)
    })

    return (
        <main className="min-h-screen bg-[#030303] text-foreground relative z-0 overflow-hidden">

            {/* Ambient Background Glows */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

            {/* Noise Overlay */}
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] bg-noise"></div>

            <div className="container mx-auto px-6 md:px-12 pt-40 pb-32 max-w-7xl relative z-10">

                <FadeIn className="mb-20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-[1px] bg-indigo-500/50" />
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-indigo-400">The Workbench</span>
                    </div>
                    <header className="mb-12">
                        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                            Discovery & <br /> <span className="text-neutral-500">Utility.</span>
                        </h1>
                        <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl">
                            A curated suite of developer tools, boilerplates, and efficiency scripts I've built to accelerate the building process.
                        </p>
                    </header>
                </FadeIn>

                <div className="space-y-32">
                    {Object.entries(groupedTools).map(([category, categoryTools], groupIndex) => (
                        <div key={category}>
                            <FadeIn delay={groupIndex * 0.1}>
                                <div className="flex items-center gap-4 mb-12">
                                    <h2 className="text-3xl font-bold text-white tracking-tight">
                                        {category}
                                    </h2>
                                    <div className="flex-1 h-[1px] bg-white/5" />
                                </div>
                            </FadeIn>

                            <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {categoryTools.map((tool: any, i: number) => (
                                    <FadeIn key={tool.id} delay={i * 0.05}>
                                        <article className="h-full bg-white/[0.03] border border-white/5 rounded-[2rem] p-8 md:p-10 hover:border-white/20 transition-all duration-500 relative group overflow-hidden flex flex-col">

                                            <div className="flex justify-between items-start mb-8">
                                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                                                    <Terminal size={24} />
                                                </div>
                                                <div className="flex gap-4">
                                                    {tool.githubUrl && (
                                                        <a href={tool.githubUrl} target="_blank" className="p-2 text-neutral-500 hover:text-white transition-colors"><Github size={18} /></a>
                                                    )}
                                                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-500 group-hover:bg-white group-hover:text-black transition-all">
                                                        <ArrowUpRight size={16} />
                                                    </div>
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-bold mb-3 text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                                                {tool.name}
                                            </h3>

                                            <p className="text-neutral-400 leading-relaxed mb-10 flex-grow text-base line-clamp-3">
                                                {tool.shortDescription}
                                            </p>

                                            <div className="pt-6 border-t border-white/5">
                                                {tool.liveUrl ? (
                                                    <Link
                                                        href={tool.liveUrl}
                                                        target="_blank"
                                                        className="flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 hover:bg-white hover:text-black text-white text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500"
                                                    >
                                                        Access Tool
                                                    </Link>
                                                ) : (
                                                    <div className="text-center py-3 text-xs font-mono text-neutral-600 uppercase tracking-widest">Documentation Pending</div>
                                                )}
                                            </div>
                                        </article>
                                    </FadeIn>
                                ))}
                            </FadeInStagger>
                        </div>
                    ))}

                    {tools.length === 0 && (
                        <div className="py-24 text-center border border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.02]">
                            <p className="text-neutral-500 font-mono text-sm uppercase tracking-widest">The bench is currently clear.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
