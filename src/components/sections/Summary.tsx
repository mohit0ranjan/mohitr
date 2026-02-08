import { FadeIn, FadeInStagger } from "@/components/ui/motion";
import { Terminal, Cpu, Database, Cloud, Code2, Trophy, ArrowRight, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Summary() {
    return (
        <section id="about" className="py-24 md:py-32 bg-[#050505] relative border-b border-white/5 overflow-hidden">

            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
                <FadeIn>
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                        {/* LEFT: BIO & CONTEXT */}
                        <div className="flex-1 space-y-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-[1px] w-12 bg-blue-500/50"></div>
                                <span className="text-xs font-mono uppercase tracking-[0.2em] text-blue-400">About Me</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
                                Engineering robust solutions for <br />
                                <span className="text-muted-foreground">complex problems.</span>
                            </h2>

                            <div className="space-y-6 text-lg text-neutral-400 font-light leading-relaxed">
                                <p>
                                    I am a <strong className="text-white font-medium">Computer Science</strong> undergraduate at <strong className="text-white font-medium">NIT Jalandhar</strong>, bridging the gap between theoretical foundations and production-grade software.
                                </p>
                                <p>
                                    My journey involves architecting <span className="text-neutral-300">distributed systems</span>, optimizing <span className="text-neutral-300">real-time collaboration platforms</span>, and deriving insights from large-scale data. I thrive in environments where performance and scalability are paramount.
                                </p>
                                <p>
                                    Currently, I am focused on building <strong>agentic workflows</strong> and exploring system-level optimizations.
                                </p>
                            </div>

                            <div className="flex items-center gap-6 pt-4">
                                <Link
                                    href="#experience"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="group flex items-center gap-2 text-white font-medium border-b border-white/20 pb-1 hover:border-white transition-all"
                                >
                                    View Experience <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>


                        {/* RIGHT: IMPACT & STATS (resume based) */}
                        <div className="w-full lg:w-[420px]">
                            <FadeInStagger className="space-y-4">

                                {/* CARD 1: Optimization */}
                                <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-all overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 group-hover:via-emerald-500/5 transition-all" />
                                    <div className="relative flex gap-4">
                                        <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 h-fit">
                                            <Zap size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-1">35%</h3>
                                            <p className="text-sm font-bold text-neutral-300 uppercase tracking-wide mb-2">Faster Response</p>
                                            <p className="text-sm text-neutral-500 leading-relaxed">
                                                Optimized backend APIs and database queries for the Alumni Cell portal.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* CARD 2: Impact */}
                                <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/30 transition-all overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/5 group-hover:via-blue-500/5 transition-all" />
                                    <div className="relative flex gap-4">
                                        <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 h-fit">
                                            <TrendingUp size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-1">Top 20</h3>
                                            <p className="text-sm font-bold text-neutral-300 uppercase tracking-wide mb-2">HackMol 5.0</p>
                                            <p className="text-sm text-neutral-500 leading-relaxed">
                                                Secured a top position out of 150+ teams for building innovative health-tech.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* CARD 3: Data */}
                                <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/5 group-hover:via-purple-500/5 transition-all" />
                                    <div className="relative flex gap-4">
                                        <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 h-fit">
                                            <Database size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-1">Intern</h3>
                                            <p className="text-sm font-bold text-neutral-300 uppercase tracking-wide mb-2">Govt. of Bihar</p>
                                            <p className="text-sm text-neutral-500 leading-relaxed">
                                                Analyzed district-level agriculture and rainfall datasets to support data-driven planning.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Achievements Strip */}
                                <div className="pt-4 flex flex-wrap gap-3">
                                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">JEE Mains 98.6%ile</span>
                                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">AIR 15707</span>
                                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Lead Code Club</span>
                                </div>

                            </FadeInStagger>
                        </div>

                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
