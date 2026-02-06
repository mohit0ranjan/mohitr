import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BentoCard from "./BentoCard";

type Post = {
    id: string;
    date: string;
    title: string;
    excerpt?: string;
};

export default function WritingCard({ posts }: { posts: Post[] }) {
    if (!posts.length) return null;

    const featured = posts[0];

    return (
        <BentoCard className="col-span-1 md:col-span-1 lg:col-span-1 h-full min-h-[300px] bg-[#1a1a1a]">
            {/* Editorial Style Background */}
            <div className="absolute inset-0 bg-white/[0.02]" />

            <div className="flex flex-col h-full justify-between relative z-10">

                <div>
                    <div className="flex justify-between items-start mb-6">
                        <span className="text-[10px] font-serif italic text-neutral-400">
                            Thoughts & Notes
                        </span>
                        <span className="text-[10px] font-mono text-neutral-600">{featured.date}</span>
                    </div>

                    <Link href={`/blog/${featured.id}`} className="block group">
                        <h3 className="text-xl md:text-2xl font-serif text-white leading-tight mb-4 group-hover:underline decoration-1 underline-offset-4 decoration-neutral-500">
                            {featured.title}
                        </h3>
                        <p className="text-sm text-neutral-500 line-clamp-3 leading-relaxed font-sans">
                            {featured.excerpt}
                        </p>
                    </Link>
                </div>

                <div className="pt-6 mt-auto">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors">
                        Read Story <ArrowUpRight size={12} />
                    </Link>
                </div>

            </div>
        </BentoCard>
    );
}
