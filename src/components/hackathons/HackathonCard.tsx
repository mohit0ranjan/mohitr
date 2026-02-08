"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { format, differenceInDays } from "date-fns";
import { Calendar, MapPin, Clock, ArrowRight, Trophy, Users, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface Hackathon {
    id: string;
    name: string;
    organizer: string;
    mode: string;
    startDate: Date | string;
    endDate: Date | string;
    registrationDeadline: Date | string | null;
    status: string;
    tags: string[];
    slug: string;
    imageUrl?: string | null;
    location?: string | null;
    website?: string | null;
}

export function HackathonCard({ hackathon }: { hackathon: Hackathon }) {
    const linkTarget = hackathon.website || `/hackathons/${hackathon.slug}`;
    const daysLeft = hackathon.registrationDeadline
        ? differenceInDays(new Date(hackathon.registrationDeadline), new Date())
        : null;

    return (
        <Link
            href={linkTarget}
            target={hackathon.website ? "_blank" : undefined}
            className="block h-full group perspective-1000"
        >
            <div className="h-full relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 transition-all duration-500 group-hover:bg-[#0f0f0f] group-hover:border-indigo-500/30 group-hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.15)] flex flex-col overflow-hidden">

                {/* Visual Flair: Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-[100px] -mr-4 -mt-4 transition-all group-hover:from-indigo-500/20" />

                {/* Header: Mode & Status */}
                <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="flex flex-wrap gap-2">
                        <span className={cn(
                            "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5",
                            hackathon.status === 'Open' ? "bg-emerald-950/30 text-emerald-400 border-emerald-500/20" :
                                hackathon.status === 'Live' ? "bg-rose-950/30 text-rose-400 border-rose-500/20" :
                                    "bg-indigo-950/30 text-indigo-400 border-indigo-500/20"
                        )}>
                            <span className={cn("w-1.5 h-1.5 rounded-full",
                                hackathon.status === 'Open' ? "bg-emerald-400 animate-pulse" :
                                    hackathon.status === 'Live' ? "bg-rose-400 animate-pulse" :
                                        "bg-indigo-400"
                            )} />
                            {hackathon.status}
                        </span>
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/5 text-neutral-400 border border-white/5 flex items-center gap-1.5">
                            {hackathon.mode === 'Online' ? <Globe className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                            {hackathon.mode}
                        </span>
                    </div>

                    {/* Logo/Icon Placeholder if no Image */}
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-white group-hover:bg-indigo-500 group-hover:border-indigo-400 transition-all duration-300">
                        <Trophy className="w-4 h-4" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 relative z-10">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-200 transition-all">
                        {hackathon.name}
                    </h3>
                    <p className="text-sm font-mono text-neutral-500 mb-6">
                        @{hackathon.organizer}
                    </p>

                    {/* Meta Grid */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 py-4 border-t border-dashed border-white/10">
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">Timeline</p>
                            <div className="flex items-center gap-2 text-xs text-neutral-300">
                                <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                                <span>{format(new Date(hackathon.startDate), "MMM d")}</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">Deadline</p>
                            {hackathon.registrationDeadline ? (
                                <div className={cn("flex items-center gap-2 text-xs", daysLeft && daysLeft < 5 ? "text-rose-400" : "text-neutral-300")}>
                                    <Clock className="w-3.5 h-3.5 opacity-70" />
                                    <span>{daysLeft !== null && daysLeft > 0 ? `${daysLeft} days left` : format(new Date(hackathon.registrationDeadline), "MMM d")}</span>
                                </div>
                            ) : (
                                <span className="text-xs text-neutral-500">TBA</span>
                            )}
                        </div>

                        {/* Location (Full width if needed) */}
                        {hackathon.location && (
                            <div className="col-span-2 space-y-1">
                                <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">Location</p>
                                <p className="text-xs text-neutral-300 truncate">{hackathon.location}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2 relative z-10">
                    {hackathon.tags?.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] font-mono text-indigo-300/60 bg-indigo-500/5 px-2 py-1 rounded border border-indigo-500/10">
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Hover Action */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="text-white w-5 h-5" />
                </div>
            </div>
        </Link>
    )
}
