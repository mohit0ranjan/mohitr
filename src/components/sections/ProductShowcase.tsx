import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const products = [
    {
        title: "E-Tax Assistant",
        description: "AI-powered tax filing assistant for India. Automates ITR generation and document extraction.",
        status: "In Progress",
        statusColor: "bg-yellow-500",
        tags: ["Next.js", "FastAPI", "PostgreSQL"],
        link: "#",
        github: "#",
        color: "from-blue-500/20 to-cyan-500/20"
    },
    {
        title: "DevFlow",
        description: "A collaborative project management tool designed for remote engineering teams.",
        status: "Live",
        statusColor: "bg-green-500",
        tags: ["React", "Node.js", "Socket.io"],
        link: "#",
        github: "#",
        color: "from-purple-500/20 to-pink-500/20"
    },
    {
        title: "HyperScale",
        description: "Database scaling solution for high-traffic e-commerce applications.",
        status: "Research",
        statusColor: "bg-blue-500",
        tags: ["Rust", "WASM", "Redis"],
        link: "#",
        github: "#",
        color: "from-orange-500/20 to-red-500/20"
    }
];

export default function ProductShowcase() {
    return (
        <div className="py-20" id="products">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 px-4 max-w-7xl mx-auto">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Selected Work</h2>
                    <p className="text-muted max-w-md">
                        A collection of products and tools I've built to solve real-world engineering problems.
                    </p>
                </div>
                <a href="#" className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-white transition-colors text-muted">
                    View all projects <ArrowUpRight className="w-4 h-4" />
                </a>
            </div>

            <BentoGrid>
                {products.map((product, i) => (
                    <BentoCard
                        key={i}
                        colSpan={i === 0 ? 2 : 1}
                        rowSpan={1}
                        className="group"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${product.statusColor} shadow-[0_0_8px_rgba(0,0,0,0.5)]`} />
                                    <span className="text-xs font-mono text-muted uppercase tracking-wider">{product.status}</span>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                    <a href={product.github} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                                        <Github className="w-4 h-4" />
                                    </a>
                                    <a href={product.link} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                            <div className="mt-auto">
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">{product.title}</h3>
                                <p className="text-muted text-sm line-clamp-2 mb-4 group-hover:text-gray-300 transition-colors">
                                    {product.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag) => (
                                        <span key={tag} className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/5 text-muted group-hover:border-white/20 transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </BentoCard>
                ))}
                {/* Feature/Placeholder for more */}
                <BentoCard className="flex items-center justify-center p-6 border-dashed border-white/10 bg-transparent hover:bg-white/5">
                    <div className="text-center">
                        <div className="text-muted mb-2">More on GitHub</div>
                        <ArrowUpRight className="w-6 h-6 mx-auto text-muted" />
                    </div>
                </BentoCard>
            </BentoGrid>
        </div>
    );
}
