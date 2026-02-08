import { FadeIn, FadeInStagger } from "@/components/ui/motion";
import Counter from "@/components/ui/counter";
import { Database, Code2, PenTool, Share2 } from "lucide-react";

interface MetricItem {
    id: string;
    label: string;
    value: number;
    icon: React.ElementType<{ size?: number | string; className?: string }>;
    color: string;
}

interface ImpactMetricsProps {
    counts: {
        posts: number;
        projects: number;
        tools: number;
        opportunities: number;
    };
}

export default function ImpactMetrics({ counts }: ImpactMetricsProps) {
    const metrics: MetricItem[] = [
        {
            id: "posts",
            label: "Technical Articles",
            value: counts.posts,
            icon: PenTool,
            color: "text-purple-400",
        },
        {
            id: "projects",
            label: "Projects Shipped",
            value: counts.projects,
            icon: Code2,
            color: "text-blue-400",
        },
        {
            id: "tools",
            label: "Tools & Utilities",
            value: counts.tools,
            icon: Database,
            color: "text-emerald-400",
        },
        {
            id: "opportunities",
            label: "Opportunities Shared",
            value: counts.opportunities,
            icon: Share2,
            color: "text-amber-400",
        },
    ];

    return (
        <section className="py-12 border-b border-white/5 bg-[#030303] relative z-20 overflow-hidden">
            {/* Ambient background for consistency */}
            <div className="absolute inset-0 bg-emerald-900/5 blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
                <FadeInStagger className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {metrics.map((metric, i) => {
                        const Icon = metric.icon;
                        return (
                            <FadeIn key={metric.id} delay={i * 0.1}>
                                <div className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 overflow-hidden">

                                    {/* Glass Highlight */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                    {/* Icon & Label Header */}
                                    <div className="flex items-center gap-3 mb-4 relative z-10">
                                        <div className={`p-2 rounded-lg bg-white/5 ${metric.color} group-hover:scale-110 transition-transform`}>
                                            <Icon size={16} />
                                        </div>
                                        <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 group-hover:text-emerald-400 transition-colors">
                                            {metric.label}
                                        </span>
                                    </div>

                                    {/* Large Metric Number */}
                                    <div className="flex items-baseline gap-1 relative z-10">
                                        <span className="text-4xl md:text-5xl font-black text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-emerald-400 transition-all">
                                            <Counter value={metric.value} />
                                        </span>
                                        <span className={`text-xl font-bold ${metric.color}`}>+</span>
                                    </div>

                                    {/* Decorative Scanline */}
                                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                </div>
                            </FadeIn>
                        );
                    })}
                </FadeInStagger>
            </div>
        </section>
    );
}
