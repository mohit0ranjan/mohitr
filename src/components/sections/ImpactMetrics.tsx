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
        <section className="py-12 border-b border-white/5 bg-[#030303] relative z-20">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <FadeInStagger className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {metrics.map((metric, i) => {
                        const Icon = metric.icon;
                        return (
                            <FadeIn key={metric.id} delay={i * 0.1}>
                                <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300">

                                    {/* Icon & Label Header */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-2 rounded-lg bg-white/5 ${metric.color}`}>
                                            <Icon size={16} />
                                        </div>
                                        <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 group-hover:text-neutral-300 transition-colors">
                                            {metric.label}
                                        </span>
                                    </div>

                                    {/* Large Metric Number */}
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl md:text-5xl font-black text-white tracking-tight">
                                            <Counter value={metric.value} />
                                        </span>
                                        <span className={`text-xl font-bold ${metric.color}`}>+</span>
                                    </div>

                                    {/* Subtle Glow Effect on Hover */}
                                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-current ${metric.color.replace('text-', 'bg-')}`} />
                                </div>
                            </FadeIn>
                        );
                    })}
                </FadeInStagger>
            </div>
        </section>
    );
}
