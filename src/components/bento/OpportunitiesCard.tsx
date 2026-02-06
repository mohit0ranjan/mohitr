import { ArrowRight, Clock } from "lucide-react";
import BentoCard from "./BentoCard";

interface Opportunity {
    id: string;
    role: string;
    company: string;
    type: string;
    location: string;
    link: string;
    isNew: boolean;
    dateShared: Date;
}

// Helper for "Time Ago"
const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = (now.getTime() - new Date(date).getTime()) / 1000 / 60 / 60; // hours
    if (diff < 24) return `${Math.floor(diff)}h`;
    return `${Math.floor(diff / 24)}d`;
};

export default function OpportunitiesCard({ items }: { items: Opportunity[] }) {
    if (!items.length) return null;

    return (
        <BentoCard className="col-span-1 md:col-span-1 h-full min-h-[300px]">
            <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-mono uppercase text-green-400 tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Signals
                    </span>
                    <ArrowRight size={12} className="text-neutral-600" />
                </div>

                <div className="flex-grow flex flex-col gap-4">
                    {items.map((job) => (
                        <a
                            key={job.id}
                            href={job.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block border-l-2 border-white/5 pl-4 hover:border-green-500 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="text-sm font-bold text-neutral-200 group-hover:text-white line-clamp-1">
                                    {job.role}
                                </h4>
                                <span className="text-[9px] font-mono text-neutral-600 flex items-center gap-1 shrink-0">
                                    {formatTimeAgo(job.dateShared)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-neutral-500 line-clamp-1">
                                    {job.company}
                                </p>
                                <span className="text-[9px] text-neutral-600 uppercase">
                                    {job.isNew && "New"}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 text-center">
                    <span className="text-[10px] text-neutral-600 uppercase tracking-wider group-hover:text-neutral-400 transition-colors">
                        View Feed
                    </span>
                </div>
            </div>
        </BentoCard>
    );
}
