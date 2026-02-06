import { Radio } from "lucide-react";
import BentoCard from "./BentoCard";

interface FocusPoint {
    id: string;
    title: string;
    description: string | null;
}

export default function FocusCard({ points }: { points: FocusPoint[] }) {
    if (!points.length) return null;

    return (
        <BentoCard className="col-span-1 md:col-span-2 min-h-[220px] bg-gradient-to-br from-purple-900/10 to-transparent">
            <div className="flex flex-col h-full justify-between">

                <div className="flex items-center gap-2 mb-6">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </div>
                    <span className="text-[10px] font-mono uppercase text-purple-300 tracking-widest">
                        Focusing On
                    </span>
                </div>

                <div className="space-y-4">
                    {points.slice(0, 2).map((point) => (
                        <div key={point.id}>
                            <h3 className="text-xl font-bold text-white mb-1">
                                {point.title}
                            </h3>
                            <p className="text-sm text-purple-200/60 leading-relaxed max-w-lg">
                                {point.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </BentoCard>
    );
}
