import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { MoveRight } from "lucide-react";

const blogs = [
    {
        title: "Understanding React Server Components",
        date: "Oct 12, 2025",
        readTime: "5 min read",
        category: "React"
    },
    {
        title: "Building Scalable Systems with Rust",
        date: "Sep 28, 2025",
        readTime: "8 min read",
        category: "Systems"
    },
    {
        title: "The Future of AI Agents in Web Development",
        date: "Sep 15, 2025",
        readTime: "6 min read",
        category: "AI"
    }
];

export default function BlogList() {
    return (
        <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 mb-8 flex justify-between items-center">
                <h2 className="text-3xl font-bold">Latest Writing</h2>
                <a href="/blog" className="text-muted text-sm hover:text-white transition-colors">All Posts</a>
            </div>

            <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog, i) => (
                    <BentoCard key={i} className="p-6 flex flex-col justify-between hover:border-accent/40 group">
                        <div>
                            <div className="flex justify-between items-center mb-4 text-xs text-muted uppercase tracking-wider">
                                <span>{blog.category}</span>
                                <span>{blog.date}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{blog.title}</h3>
                            <p className="text-sm text-muted">{blog.readTime}</p>
                        </div>
                        <div className="mt-8 flex items-center gap-2 text-sm font-medium text-muted group-hover:text-white transition-colors">
                            Read Article <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </BentoCard>
                ))}

                {/* Newsletter / Substack */}
                <BentoCard colSpan={1} className="p-6 bg-accent/5 border-accent/20 flex flex-col justify-center text-center">
                    <h3 className="text-lg font-bold mb-2">Join the Newsletter</h3>
                    <p className="text-sm text-muted mb-4">Thoughts on tech, design, and building products.</p>
                    <form className="flex gap-2">
                        <input
                            type="email"
                            placeholder="email@example.com"
                            className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2 text-sm outline-none focus:border-accent"
                        />
                        <button type="submit" className="bg-white text-black text-xs font-bold px-3 py-2 rounded-md hover:bg-gray-200">
                            Sub
                        </button>
                    </form>
                </BentoCard>
            </BentoGrid>
        </div>
    );
}
