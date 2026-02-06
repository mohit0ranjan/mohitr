import Navbar from "@/components/ui/navbar";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { markdownToHtml } from "@/lib/markdown";

export const revalidate = 3600


// export async function generateStaticParams() {
//     const posts = await prisma.post.findMany({ select: { slug: true } });
//     return posts.map((post) => ({
//         slug: post.slug,
//     }));
// }

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const post = await prisma.post.findUnique({
        where: { slug }
    });

    if (!post || !post.isPublished) {
        notFound();
    }

    const contentHtml = await markdownToHtml(post.content);
    const readTime = Math.ceil(post.content.split(/\s+/).length / 200) + " min read";
    const date = post.publishedAt ? format(post.publishedAt, "MMM dd, yyyy") : "";

    return (
        <main className="min-h-screen bg-noise text-foreground selection:bg-accent/30">
            <Navbar />

            <div className="container mx-auto px-4 md:px-8 pt-32 pb-20">
                <FadeIn>
                    <div className="max-w-3xl mx-auto">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors mb-8">
                            <ArrowLeft size={16} /> Back to Writing
                        </Link>

                        <div className="mb-10">
                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted font-mono">
                                <span className="flex items-center gap-2">
                                    <Calendar size={14} /> {date}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock size={14} /> {readTime}
                                </span>
                            </div>
                        </div>

                        <article
                            className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-pink-400 prose-code:text-pink-300 prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                        />
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
