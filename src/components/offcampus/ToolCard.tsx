import React from 'react';
import { ExternalLink, Zap } from "lucide-react";

interface ToolCardProps {
    name: string;
    description: string;
    link: string;
    pricing: string;
    category: string;
}

export default function ToolCard({ name, description, link, pricing, category }: ToolCardProps) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-white/10 hover:bg-neutral-800/50 transition-all duration-300 flex flex-col gap-3"
        >
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                        <Zap className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">{name}</h3>
                        <span className="text-xs text-neutral-500">{category}</span>
                    </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border ${pricing === 'Free' ? 'border-green-500/20 text-green-500' : 'border-yellow-500/20 text-yellow-500'}`}>
                    {pricing}
                </span>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed">
                {description}
            </p>
        </a>
    );
}
