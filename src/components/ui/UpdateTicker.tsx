"use client"

import { useEffect, useState } from "react"
import { useMotionValue, animate, motion, useTransform } from "framer-motion"
import Link from "next/link"
import { Bell, Zap, Star, Layout, ArrowRight } from "lucide-react"

interface UpdateItem {
    id: string;
    content: string;
    type: string;
    link: string | null;
}

const Icons = {
    "Update": Bell,
    "Blog": Layout,
    "Tool": Zap,
    "Project": Star,
    "Opportunity": Star
}

export default function UpdateTicker({ updates }: { updates: UpdateItem[] }) {
    // If no updates, don't render
    if (!updates || updates.length === 0) return null

    // Duplicate content for infinite loop effect
    const duplicatedUpdates = [...updates, ...updates, ...updates, ...updates]

    return (
        <div className="w-full bg-[#080808] border-b border-white/5 py-3 overflow-hidden relative group">
            {/* Gradient masks for smooth fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

            {/* Scrolling track */}
            <motion.div
                className="flex gap-12 w-max"
                animate={{ x: [0, -1000] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 40, // Adjust speed here (higher = slower)
                        ease: "linear",
                    },
                }}
            >
                {duplicatedUpdates.map((item, i) => {
                    // @ts-ignore
                    const Icon = Icons[item.type] || Bell

                    const Content = (
                        <div key={`${item.id}-${i}`} className="flex items-center gap-3 text-sm font-medium text-neutral-400 group-hover/item:text-white transition-colors cursor-pointer group/item whitespace-nowrap">
                            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] uppercase font-bold tracking-wider text-neutral-500 group-hover/item:border-neutral-700 transition-colors">
                                <Icon size={10} />
                                {item.type}
                            </span>
                            <span>{item.content}</span>
                        </div>
                    )

                    if (item.link) {
                        return <Link key={`${item.id}-${i}`} href={item.link}>{Content}</Link>
                    }
                    return Content
                })}
            </motion.div>
        </div>
    )
}
