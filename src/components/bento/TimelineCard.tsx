import { ArrowRight } from "lucide-react";
import BentoCard from "./BentoCard";

interface TimelineEntry {
    id: string;
    year: string;
    title: string;
    type: string;
}

export default function TimelineCard({ items }: { items: TimelineEntry[] }) {
    if (!items.length) return null;

    return (
        <BentoCard className="col-span-1 md:col-span-1 min-h-[300px]">
            <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-widest">
                        The Path
                    </span>
                    <ArrowRight size={12} className="text-neutral-600" />
                </div>

                <div className="relative pl-2 flex-grow">
                    {/* Vertical Line */}
                    <div className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-white/10" />

                    <div className="space-y-6">
                        {items.slice(0, 4).map((item) => (
                            <div key={item.id} className="relative pl-6 group">
                                <div className="absolute left-0 top-1.5 w-[7px] h-[7px] rounded-full bg-neutral-800 border border-neutral-700 group-hover:bg-blue-500 group-hover:border-blue-400 transition-colors z-10" />

                                <span className="block text-[9px] font-mono text-neutral-500 mb-0.5">
                                    {item.year}
                                </span>
                                <h4 className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors line-clamp-1">
                                    {item.title}
                                </h4>
                                <span className="text-[9px] text-neutral-600 uppercase tracking-wide">
                                    {item.type}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </BentoCard>
    );
}
