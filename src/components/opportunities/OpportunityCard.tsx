"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";
import { MapPin, ArrowRight, Building2, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Opportunity {
    id: string;
    title: string;
    company: string;
    location?: string | null;
    type: string;
    shortDescription: string;
    applyLink?: string | null;
    duration?: string | null;
    stipend?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    status: string;
    slug: string;
    isFeatured: boolean;
    createdAt: Date | string;
}

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
    const linkTarget = `/opportunities/${opportunity.slug}`;

    return (
        <Link
            href={linkTarget}
            className="block h-full group"
        >
            <div className="h-full relative bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-indigo-500/30 hover:bg-neutral-900/80 transition-all duration-300 group-hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.15)] group-hover:-translate-y-1 flex flex-col">

                {/* Badges */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2">
                        <span className={cn(
                            "px-2.5 py-1 rounded-full text-[10px] font-medium border uppercase tracking-wide",
                            opportunity.status === 'Active' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                "bg-neutral-500/10 text-neutral-400 border-neutral-500/20"
                        )}>
                            {opportunity.status}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-neutral-800 text-neutral-400 border border-white/5">
                            {opportunity.type}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4 flex-1">
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors mb-1">
                            {opportunity.title}
                        </h3>
                        <p className="text-sm text-neutral-400 font-medium flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5" />
                            {opportunity.company}
                        </p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-xs text-neutral-300">
                            <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                            <span>
                                Posted {format(new Date(opportunity.createdAt), "MMM d, yyyy")}
                            </span>
                        </div>

                        {opportunity.location && (
                            <div className="flex items-center gap-2 text-xs text-neutral-300">
                                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                                <span>{opportunity.location}</span>
                            </div>
                        )}

                        {opportunity.duration && (
                            <div className="flex items-center gap-2 text-xs text-neutral-300">
                                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                                <span>{opportunity.duration}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-medium text-neutral-400 group-hover:text-white transition-colors">
                    <span>View opportunity</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    )
}
