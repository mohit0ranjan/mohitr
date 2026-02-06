import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import BentoCard from "./BentoCard";

// Helper to render icon dynamically
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

export default function StackCard({ tools }: { tools: TechTool[] }) {
    if (!tools.length) return null;

    // Take top 8 tools
    const displayTools = tools.slice(0, 8);

    return (
        <BentoCard className="col-span-1 md:col-span-1 lg:col-span-1 min-h-[220px]">
            <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-widest">
                        Workbench
                    </span>
                    <ArrowRight size={12} className="text-neutral-600" />
                </div>

                <div className="flex flex-wrap content-start gap-2 h-full">
                    {displayTools.map(tool => (
                        <div
                            key={tool.id}
                            className="px-2.5 py-1.5 rounded-md bg-white/5 border border-white/5 flex items-center gap-1.5 hover:bg-white/10 transition-colors cursor-default"
                        >
                            {tool.icon && (
                                <DynamicIcon name={tool.icon} className="w-3 h-3 text-neutral-400" />
                            )}
                            <span className="text-[10px] font-medium text-neutral-300 uppercase tracking-tight">
                                {tool.name}
                            </span>
                        </div>
                    ))}
                    {tools.length > 8 && (
                        <div className="px-2 py-1.5 rounded-md bg-white/5 border border-white/5 text-[10px] text-neutral-500">
                            +{tools.length - 8}
                        </div>
                    )}
                </div>
            </div>
        </BentoCard>
    );
}
