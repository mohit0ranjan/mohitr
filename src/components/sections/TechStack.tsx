import { FadeIn, FadeInStagger } from "@/components/ui/motion";
import * as Icons from "lucide-react";

// Helper
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    // @ts-ignore
    const Icon = Icons[name] || Icons.Code;
    return <Icon className={className} />;
};

interface TechTool {
    id: string;
    name: string;
    category: string;
    icon: string | null;
}

export default function TechStack({ tools }: { tools: TechTool[] }) {
    if (!tools.length) return null;

    // Group by category manually or just display as a clean grid
    // Let's do a simple clean flow for simplicity and elegance

    return (
        <section className="py-24 border-t border-white/5 relative bg-[#050505] z-10">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl">

                <FadeIn className="mb-12">
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-600 block mb-2">
                        Workbench
                    </span>
                    <h2 className="text-2xl font-light text-white">Tools of my craft</h2>
                </FadeIn>

                <FadeInStagger>
                    <div className="flex flex-wrap gap-x-8 gap-y-4">
                        {tools.map((tool, i) => (
                            <FadeIn key={tool.id} delay={i * 0.02}>
                                <div className="flex items-center gap-2 group cursor-default">
                                    {tool.icon && (
                                        <div className="text-neutral-500 group-hover:text-white transition-colors">
                                            <DynamicIcon name={tool.icon} className="w-4 h-4" />
                                        </div>
                                    )}
                                    <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">
                                        {tool.name}
                                    </span>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </FadeInStagger>

            </div>
        </section>
    );
}
