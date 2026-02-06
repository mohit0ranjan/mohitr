import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Server, Shield, PenTool, Database, Cpu, Globe } from "lucide-react";

const features = [
    {
        icon: Server,
        title: "Backend Engineering",
        desc: "Scalable APIs, Microservices, and robust database architecture."
    },
    {
        icon: PenTool,
        title: "System Design",
        desc: "Planning high-availability systems with focus on performance."
    },
    {
        icon: Shield,
        title: "Security Research",
        desc: "Identifying vulnerabilities and implementing secure protocols."
    },
    {
        icon: Globe,
        title: "Technical Writing",
        desc: "Communicating complex technical concepts clearly."
    }
];

export default function FeatureCards() {
    return (
        <div className="py-20 bg-black/50">
            <div className="max-w-7xl mx-auto px-4 mb-10">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500">Capabilities</h2>
            </div>

            <BentoGrid>
                {features.map((feature, i) => (
                    <BentoCard key={i} className="p-6 flex flex-col justify-center hover:bg-white/5 transition-colors">
                        <div className="mb-4 text-accent">
                            <feature.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted">
                            {feature.desc}
                        </p>
                    </BentoCard>
                ))}
                {/* Large Tech Stack Card */}
                <BentoCard colSpan={2} rowSpan={1} className="p-8 flex items-center bg-gradient-to-r from-gray-900 to-black">
                    <div className="w-full">
                        <h3 className="text-2xl font-bold mb-6">Core Tech Stack</h3>
                        <div className="flex flex-wrap gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Replaced real logos with text for simplicity if no assets, or Lucide icons if available */}
                            {/* Using simple text representation for now or icons */}
                            <div className="flex flex-col items-center gap-2">
                                <Cpu className="w-8 h-8" />
                                <span className="text-xs">Next.js</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Database className="w-8 h-8" />
                                <span className="text-xs">Postgres</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Server className="w-8 h-8" />
                                <span className="text-xs">Node</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Shield className="w-8 h-8" />
                                <span className="text-xs">Rust</span>
                            </div>
                        </div>
                    </div>
                </BentoCard>
                <BentoCard colSpan={2} className="relative overflow-hidden p-8 flex flex-col justify-center">
                    <div className="absolute inset-0 bg-accent/5" />
                    <h3 className="text-xl font-bold mb-2">Always Learning</h3>
                    <p className="text-muted">Currently exploring AI Agents, WebGPU, and advanced distributed systems.</p>
                </BentoCard>
            </BentoGrid>
        </div>
    );
}
