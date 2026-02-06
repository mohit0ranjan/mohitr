import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export const revalidate = 3600


export default async function BlogIndex() {
    const posts = await prisma.post.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: 'desc' },
        select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            publishedAt: true,
            content: true
        }
    });

    const formattedPosts = posts.map((post: any) => {
        const wordCount = post.content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200) + " min read";

        return {
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            tags: [],
            date: post.publishedAt ? format(post.publishedAt, "MMM dd, yyyy") : "Draft",
            readTime
        };
    });

    return (
        <main className="min-h-screen bg-[#030303] text-foreground relative z-0 overflow-hidden">

            {/* Ambient Background Glows */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

            {/* Noise Overlay */}
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] bg-noise"></div>

            <div className="container mx-auto px-6 md:px-12 pt-40 pb-32 max-w-4xl relative z-10">

                <FadeIn className="mb-20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-[1px] bg-indigo-500/50" />
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-indigo-400">The Studio</span>
                    </div>
                    <header className="mb-12">
                        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-white transition-colors mb-8 uppercase tracking-widest">
                            <ArrowLeft size={14} /> Back to HQ
                        </Link>
                        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                            Writing & <br /> <span className="text-neutral-500">Insights.</span>
                        </h1>
                        <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl">
                            A log of engineering challenges, product philosophies, and my journey through the Indian tech landscape.
                        </p>
                    </header>
                </FadeIn>

                <FadeInStagger className="space-y-6">
                    {formattedPosts.length === 0 && (
                        <div className="py-20 text-center border border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.02]">
                            <p className="text-neutral-500 font-mono text-sm uppercase tracking-widest">No signals detected yet.</p>
                        </div>
                    )}
                    {formattedPosts.map((post: any) => (
                        <FadeIn key={post.id}>
                            <Link href={`/blog/${post.slug}`} className="block group">
                                <article className="p-8 md:p-10 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 relative overflow-hidden">
                                    {/* Subtle Row Selection Glow */}
                                    <div className="absolute inset-y-0 left-0 w-1 bg-indigo-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />

                                    <div className="flex flex-col md:flex-row justify-between gap-6 md:items-center">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-4">
                                                <span>{post.date}</span>
                                                <span className="w-1 h-1 rounded-full bg-neutral-700" />
                                                <span>{post.readTime}</span>
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-indigo-400 transition-colors tracking-tight">
                                                {post.title}
                                            </h2>
                                            <p className="text-neutral-400 leading-relaxed line-clamp-2 max-w-2xl text-base">
                                                {post.excerpt}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-end">
                                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-500 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500">
                                                <ArrowLeft className="rotate-180" size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </FadeIn>
                    ))}
                </FadeInStagger>
            </div>
        </main>
    );
}
