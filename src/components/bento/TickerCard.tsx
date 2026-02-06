"use client";

import { motion } from "framer-motion";
import { Bell, Zap, Star, Layout } from "lucide-react";
import BentoCard from "./BentoCard";

interface UpdateItem {
    id: string;
    content: string;
    type: string;
}

const Icons: Record<string, any> = {
    "Update": Bell,
    "Blog": Layout,
    "Tool": Zap,
    "Project": Star,
    "Opportunity": Star
};

export default function TickerCard({ updates }: { updates: UpdateItem[] }) {
    if (!updates.length) return null;

    // Duplicate for loop
    const tickerItems = [...updates, ...updates, ...updates, ...updates];

    return (
        <BentoCard className="col-span-1 md:col-span-2 lg:col-span-2 h-full flex items-center" noPadding>
            <div className="relative w-full h-full flex items-center overflow-hidden py-4 md:py-0 bg-white/[0.02]">

                {/* Visual Label */}
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#080808] to-transparent flex items-center pl-6">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-accent-blue flex gap-2 items-center">
                        <span className="w-1.5 h-1.5 bg-accent-blue rounded-full animate-pulse" />
                        Live
                    </span>
                </div>

                {/* Ticker */}
                <motion.div
                    className="flex gap-8 items-center pl-24"
                    animate={{ x: [0, -500] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear",
                        },
                    }}
                >
                    {tickerItems.map((update, i) => {
                        const Icon = Icons[update.type] || Bell;
                        return (
                            <div key={`${update.id}-${i}`} className="flex items-center gap-3 shrink-0 group cursor-default">
                                <div className="p-1.5 rounded-full bg-white/5 text-neutral-400 group-hover:text-white transition-colors">
                                    <Icon size={12} />
                                </div>
                                <span className="text-sm text-neutral-400 font-medium group-hover:text-white transition-colors">
                                    {update.content}
                                </span>
                                <div className="w-1 h-1 rounded-full bg-neutral-800" />
                            </div>
                        );
                    })}
                </motion.div>

                {/* Fade Out Right */}
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none z-10" />
            </div>
        </BentoCard>
    );
}
