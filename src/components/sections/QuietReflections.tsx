import Link from "next/link";
import { FadeIn } from "@/components/ui/motion";

export default function QuietReflections({ posts }: { posts: any[] }) {
    if (!posts.length) return null;
    const featured = posts[0];

    return (
        <section className="py-32 bg-[#050505] border-t border-white/5">
            <div className="container mx-auto px-6 md:px-12 max-w-2xl text-center">
                <FadeIn>
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-600 mb-8 block">
                        Reflections
                    </span>

                    <Link href={`/blog/${featured.id}`} className="block group">
                        <h2 className="text-3xl md:text-4xl font-serif italic text-white mb-6 group-hover:text-neutral-300 transition-colors">
                            "{featured.title}"
                        </h2>
                        <p className="text-neutral-500 font-light leading-relaxed max-w-lg mx-auto">
                            {featured.excerpt}
                        </p>
                        <div className="mt-8 text-xs font-mono uppercase text-neutral-600 group-hover:text-white transition-colors">
                            Read Essay
                        </div>
                    </Link>

                    <div className="mt-20 pt-20 border-t border-white/5">
                        <p className="text-xl md:text-2xl font-light text-neutral-400 mb-8">
                            Let's build something <span className="text-white">meaningful</span>.
                        </p>
                        <a href="mailto:hello@mohitranjan.com" className="text-sm font-mono text-indigo-400 hover:text-white transition-colors">
                            Say Hello
                        </a>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
