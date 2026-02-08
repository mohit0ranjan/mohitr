import { FadeIn, FadeInStagger } from "@/components/ui/motion";
import * as Icons from "lucide-react";
import React from "react";

// Helper for dynamic icon rendering with robust fallback and mapping
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    // Map db names to Lucide icons
    const iconMap: Record<string, keyof typeof Icons> = {
        'C++': 'Cpu',
        'JavaScript': 'FileCode2',
        'Python': 'FileJson',
        'Java': 'Coffee',
        'SQL': 'Database',
        'React': 'Atom',
        'Next.js': 'Layers',
        'Node.js': 'Server',
        'Tailwind': 'Wind',
        'MongoDB': 'Database',
        'PostgreSQL': 'Database',
        'Spring Boot': 'Zap',
        'AWS': 'Cloud',
        'Docker': 'Container',
        'Git': 'GitBranch',
        'Linux': 'Terminal',
        'Algorithms': 'Binary',
        'System Design': 'Share2',
        'Full Stack': 'Layers',
        'Prisma': 'Triangle',
        'Rust': 'Cog',
        'Go': 'Box',
        'WebAssembly': 'Cpu'
    };

    // keyof typeof Icons is huge, so we cast loosely then check
    const mappedName = iconMap[name] || name;
    // @ts-ignore - straightforward access to the lucide library
    const IconComponent = (Icons[mappedName] || Icons.Code) as React.ElementType;

    // @ts-ignore
    return <IconComponent className={className} />;
};

interface TechTool {
    id: string;
    name: string;
    category: string;
    icon: string | null;
}

export default function Workbench({ tools }: { tools: TechTool[] }) {

    const coreKernel = [
        { name: "C++", icon: "Cpu", label: "Kernel & Systems" },
        { name: "Algorithms", icon: "Binary", label: "Logic Design" },
        { name: "System Design", icon: "Share2", label: "Architecture" },
        { name: "Full Stack", icon: "Layers", label: "End-to-End" },
    ];

    return (
        <section className="py-24 md:py-32 bg-background relative z-10 overflow-hidden">

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

            {/* Focal Glow - Updated to premium purple/emerald */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-12 max-w-7xl relative z-10">

                <FadeIn className="mb-16 md:mb-24">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-[1px] bg-primary/50" />
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary">The Arsenal</span>
                    </div>
                    <header className="max-w-3xl">
                        <h2 className="text-3xl md:text-7xl font-black text-foreground tracking-tighter mb-6 md:mb-8 leading-[0.9]">
                            Technical <br /> <span className="text-muted-foreground">Infrastructure.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                            A deep-bench stack focused on performance, type-safety, and modern architecture.
                        </p>
                    </header>
                </FadeIn>

                {/* 1. CORE PILLARS */}
                <div className="mb-20 md:mb-24">
                    <FadeInStagger className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                        {coreKernel.map((item, i) => (
                            <FadeIn key={item.name} delay={i * 0.1}>
                                <div className="group relative p-5 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/20 transition-all duration-700 overflow-hidden flex flex-col items-center text-center">
                                    <div className="absolute top-0 right-0 p-6 md:p-10 opacity-[0.03] group-hover:opacity-10 group-hover:scale-125 transition-all duration-1000 text-foreground">
                                        <DynamicIcon name={item.icon} className="w-16 h-16 md:w-32 md:h-32" />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 md:mb-8 mx-auto group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                                            <DynamicIcon name={item.icon} className="w-6 h-6 md:w-8 md:h-8" />
                                        </div>
                                        <h3 className="text-lg md:text-2xl font-bold text-foreground group-hover:text-primary-foreground transition-colors tracking-tight mb-1 md:mb-2">
                                            {item.name}
                                        </h3>
                                        <p className="text-[9px] md:text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                                            {item.label}
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </FadeInStagger>
                </div>

                {/* 2. ECOSYSTEM MINI GRID */}
                {tools.length > 0 && (
                    <FadeIn>
                        <div className="relative p-6 md:p-14 rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

                            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8 md:mb-12 text-center">The Extended Ecosystem</h4>

                            <FadeInStagger className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-10">
                                {tools.map((tool, i) => (
                                    <FadeIn key={tool.id} delay={i * 0.02}>
                                        <div className="group flex flex-col items-center gap-3 md:gap-4 text-center">
                                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-muted-foreground group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
                                                {tool.icon || tool.name ? <DynamicIcon name={tool.name} className="w-6 h-6 md:w-7 md:h-7" /> : null}
                                            </div>
                                            <span className="text-[10px] md:text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-widest font-mono">
                                                {tool.name}
                                            </span>
                                        </div>
                                    </FadeIn>
                                ))}
                            </FadeInStagger>
                        </div>
                    </FadeIn>
                )}

            </div>
        </section>
    );
}
