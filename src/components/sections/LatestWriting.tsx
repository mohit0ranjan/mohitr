import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";

type Post = {
    id: string;
    date: string;
    title: string;
    excerpt?: string;
};

export default function LatestWriting({ posts }: { posts: Post[] }) {
    if (!posts.length) return null;

    const [featured, ...others] = posts;

    return (
        <section className="py-24 border-t border-white/5 relative bg-[#050505] z-10">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl">

                <FadeIn className="mb-16">
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-600 block mb-2">
                        Writing
                    </span>
                    <h2 className="text-2xl font-light text-white">Thoughts & Notes</h2>
                </FadeIn>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Featured Post - Large Typography */}
                    <div className="lg:col-span-7">
                        <FadeIn>
                            <Link href={`/blog/${featured.id}`} className="group block">
                                <span className="text-xs font-mono text-neutral-500 mb-6 block">
                                    {featured.date} — Featured
                                </span>
                                <h3 className="text-3xl md:text-5xl font-serif text-white leading-[1.1] mb-6 group-hover:text-neutral-300 transition-colors">
                                    {featured.title}
                                </h3>
                                <p className="text-lg text-neutral-400 font-light leading-relaxed mb-8 max-w-md">
                                    {featured.excerpt}
                                </p>
                                <span className="inline-flex items-center gap-2 text-sm font-medium text-white border-b border-white hover:border-transparent transition-colors pb-0.5">
                                    Read Article <ArrowRight size={14} />
                                </span>
                            </Link>
                        </FadeIn>
                    </div>

                    {/* Secondary List - Minimal Titles */}
                    <div className="lg:col-span-5 flex flex-col justify-end pb-4">
                        <FadeInStagger className="space-y-8">
                            {others.map((post, i) => (
                                <FadeIn key={post.id} delay={i * 0.1}>
                                    <Link href={`/blog/${post.id}`} className="group block">
                                        <span className="text-xs font-mono text-neutral-600 mb-2 block">
                                            {post.date}
                                        </span>
                                        <h4 className="text-lg font-medium text-neutral-300 group-hover:text-white transition-colors leading-snug">
                                            {post.title}
                                        </h4>
                                    </Link>
                                </FadeIn>
                            ))}
                            {others.length === 0 && (
                                <p className="text-sm text-neutral-600 italic">More writing coming soon...</p>
                            )}
                        </FadeInStagger>
                    </div>

                </div>
            </div>
        </section>
    );
}
