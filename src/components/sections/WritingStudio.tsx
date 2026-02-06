import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";

interface Post {
    id: string;
    title: string;
    excerpt?: string;
    date: string;
}

export default function WritingStudio({ posts }: { posts: Post[] }) {
    if (!posts.length) return null;

    return (
        <section className="py-32 bg-[#030303] relative z-10 overflow-hidden">

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative">

                <FadeIn className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-[1px] bg-indigo-500/50" />
                                <span className="text-xs font-mono uppercase tracking-[0.2em] text-indigo-400">The Studio</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                                Engineering <br /> <span className="text-neutral-500">Insights.</span>
                            </h2>
                        </div>
                        <Link href="/blog" className="hidden md:flex flex-col items-end group">
                            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500 mb-2">
                                <ArrowUpRight size={28} />
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">View Archive</span>
                        </Link>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FadeInStagger className="contents">
                        {posts.map((post, i) => (
                            <FadeIn key={post.id} delay={i * 0.1}>
                                <Link href={`/blog/${post.id}`} className="group relative block h-full min-h-[400px] p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 overflow-hidden hover:border-white/20 transition-all duration-700">

                                    {/* Subtle Ambient Glow */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] group-hover:bg-indigo-500/20 transition-all duration-700 translate-x-1/2 -translate-y-1/2" />

                                    <div className="relative z-10 h-full flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-10">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">
                                                        {post.date}
                                                    </span>
                                                    <div className="w-8 h-[1px] bg-indigo-500/30" />
                                                </div>
                                                <div className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-neutral-600 group-hover:text-white group-hover:rotate-45 transition-all duration-500">
                                                    <ArrowUpRight size={18} />
                                                </div>
                                            </div>

                                            <h3 className="text-3xl font-bold text-white leading-[1.2] group-hover:text-indigo-300 transition-colors tracking-tight mb-6">
                                                {post.title}
                                            </h3>
                                        </div>

                                        <div>
                                            {post.excerpt && (
                                                <p className="text-neutral-400 text-base leading-relaxed line-clamp-3 mb-8 opacity-60 group-hover:opacity-100 transition-opacity">
                                                    {post.excerpt}
                                                </p>
                                            )}

                                            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                                <BookOpen size={12} />
                                                <span>Read Signal</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Progress Line */}
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                                </Link>
                            </FadeIn>
                        ))}
                    </FadeInStagger>
                </div>

                {/* Mobile View All */}
                <div className="mt-12 md:hidden">
                    <Link href="/blog" className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-white">
                        Access Full Library <ArrowUpRight size={16} />
                    </Link>
                </div>

            </div>
        </section>
    );
}

