import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Heart, Coffee, Globe, Code, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";
import { prisma } from "@/lib/prisma";
import { markdownToHtml } from "@/lib/markdown";

export const revalidate = 3600;

export default async function AboutPage() {
    // Fetch dynamic content
    const aboutContentRaw = await prisma.pageContent.findUnique({ where: { section: 'about' } });
    const content = aboutContentRaw?.content
        ? JSON.parse(aboutContentRaw.content)
        : {
            headline: "Beyond the Terminal.",
            subtext: "A software engineering student at NIT Jalandhar, building tools for developers and exploring the intersection of distributed systems and human-centric design.",
            bio: ""
        };

    const bioHtml = content.bio ? await markdownToHtml(content.bio) : "";

    return (
        <main className="min-h-screen bg-[#030303] text-foreground relative z-0 overflow-hidden font-sans selection:bg-indigo-500/30">

            {/* Ambient Background Glows */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

            {/* Noise Overlay */}
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] bg-noise"></div>

            <div className="container mx-auto px-6 md:px-12 pt-40 pb-32 max-w-7xl relative z-10">

                {/* Header Section */}
                <FadeIn className="mb-20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-[1px] bg-indigo-500/50" />
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-indigo-400">The Profile</span>
                    </div>
                    <header className="mb-12">
                        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-white transition-colors mb-8 uppercase tracking-widest">
                            <ArrowLeft size={14} /> Back to HQ
                        </Link>
                        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                            {content.headline || "Beyond the Terminal."}
                        </h1>
                        <p className="text-xl text-neutral-400 leading-relaxed max-w-3xl">
                            {content.subtext || "A software engineering student at NIT Jalandhar, building tools for developers."}
                        </p>
                    </header>
                </FadeIn>

                <BentoGrid className="lg:auto-rows-[280px] gap-8">
                    {/* Story / Bio Card - Replaces static Values */}
                    <BentoCard colSpan={2} rowSpan={2} className="p-10 md:p-14 bg-white/[0.03] border-white/5 rounded-[2.5rem] relative overflow-hidden group flex flex-col">

                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <Code size={180} />
                        </div>

                        {content.bio ? (
                            <div className="relative z-10">
                                <article
                                    className="prose prose-invert prose-lg max-w-none 
                                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white 
                                    prose-p:text-neutral-400 prose-p:leading-loose 
                                    prose-li:text-neutral-400 
                                    prose-strong:text-white prose-strong:font-semibold
                                    prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
                                    "
                                    dangerouslySetInnerHTML={{ __html: bioHtml }}
                                />
                            </div>
                        ) : (
                            // Fallback to static values if no bio
                            <div className="relative z-10 space-y-8">
                                <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">Values & Philosophy</h2>
                                <FadeInStagger>
                                    <div className="flex gap-6 group/item mb-8">
                                        <div className="p-3 bg-indigo-500/10 rounded-2xl h-fit text-indigo-400 group-hover/item:bg-indigo-500 group-hover/item:text-white transition-all"><Heart size={24} /></div>
                                        <div>
                                            <h3 className="text-lg font-bold mb-2 text-white">User Centricity</h3>
                                            <p className="text-neutral-400 leading-relaxed">Technological complexity is never an excuse for friction. I build with empathy, ensuring every interaction feels intentional.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 group/item mb-8">
                                        <div className="p-3 bg-indigo-500/10 rounded-2xl h-fit text-indigo-400 group-hover/item:bg-indigo-500 group-hover/item:text-white transition-all"><Code size={24} /></div>
                                        <div>
                                            <h3 className="text-lg font-bold mb-2 text-white">Digital Craftsmanship</h3>
                                            <p className="text-neutral-400 leading-relaxed">I care about the details visible and invisible. From clean architecture to pixel-perfect layouts.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 group/item">
                                        <div className="p-3 bg-indigo-500/10 rounded-2xl h-fit text-indigo-400 group-hover/item:bg-indigo-500 group-hover/item:text-white transition-all"><Globe size={24} /></div>
                                        <div>
                                            <h3 className="text-lg font-bold mb-2 text-white">The Open Web</h3>
                                            <p className="text-neutral-400 leading-relaxed">Believer in a free, open, and high-performance web. Dedicated to contributing to open source.</p>
                                        </div>
                                    </div>
                                </FadeInStagger>
                            </div>
                        )}
                    </BentoCard>

                    {/* Photo / Visual */}
                    <BentoCard colSpan={2} className="relative overflow-hidden min-h-[400px] rounded-[2.5rem] bg-neutral-900/50 border-white/5 group">
                        <div className="absolute inset-0 bg-neutral-900 group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                        <div className="absolute inset-0 flex items-center justify-center text-neutral-800 text-6xl font-black rotate-[-15deg] select-none opacity-20">
                            VISUAL ARCHIVE
                        </div>

                        <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10">
                            <p className="text-sm font-mono text-neutral-300 uppercase tracking-widest">Base of Operations: NIT Jalandhar, Punjab</p>
                        </div>
                    </BentoCard>

                    {/* Fun Fact */}
                    <BentoCard className="p-10 bg-white/[0.03] border-white/5 rounded-[2.5rem] flex flex-col justify-center text-center group hover:bg-white/[0.05] transition-all">
                        <Coffee className="w-12 h-12 mx-auto text-indigo-400 mb-6 group-hover:scale-110 transition-transform" />
                        <div className="text-5xl font-black text-white mb-2 tracking-tighter">1,400+</div>
                        <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Coffees Brewed</div>
                    </BentoCard>

                    {/* Tech Stack Marquee (Static for now) */}
                    <BentoCard className="p-10 bg-white/[0.03] border-white/5 rounded-[2.5rem] flex flex-col justify-center overflow-hidden hover:bg-white/[0.05] transition-all">
                        <h3 className="text-center font-bold mb-6 text-neutral-500 uppercase text-[10px] tracking-[0.2em]">Primary Stack</h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {["Rust", "React", "Next.js", "Design Systems", "WebAssembly", "Go", "PostgreSQL", "Prisma"].map(tech => (
                                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs text-neutral-400 font-mono">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </BentoCard>

                </BentoGrid>
            </div>
        </main>
    );
}
