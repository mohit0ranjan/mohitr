import * as Icons from "lucide-react";
import BentoCard from "./BentoCard";

// Helper
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    // @ts-ignore
    const Icon = Icons[name] || Icons.Code;
    return <Icon className={className} />;
};

interface Capability {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export default function CapabilitiesCard({ items }: { items: Capability[] }) {
    if (!items.length) return null;

    return (
        <BentoCard className="col-span-1 md:col-span-2 min-h-[200px]">
            <div className="flex flex-col h-full">
                <div className="mb-6">
                    <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-widest">
                        Core Capabilities
                    </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {items.slice(0, 6).map((item) => (
                        <div key={item.id} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors group cursor-default">
                            <div className="mb-2 text-neutral-500 group-hover:text-white transition-colors">
                                <DynamicIcon name={item.icon} className="w-5 h-5" />
                            </div>
                            <h4 className="text-xs font-bold text-neutral-300 group-hover:text-white mb-1">
                                {item.title}
                            </h4>
                            <p className="text-[10px] text-neutral-500 leading-tight line-clamp-2">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </BentoCard>
    );
}
