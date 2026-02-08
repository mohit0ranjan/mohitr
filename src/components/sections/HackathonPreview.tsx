"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HackathonCard, Hackathon } from "@/components/hackathons/HackathonCard";

export default function HackathonPreview({ items }: { items: Hackathon[] }) {
    if (!items.length) return null;

    return (
        <section className="py-32 relative bg-black overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(120,119,198,0.1),transparent_50%)]" />
            <div className="absolute bottom-0 right-0 w-full h-[500px] bg-[radial-gradient(circle_at_100%_100%,rgba(50,50,50,0.1),transparent_60%)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                            </span>
                            <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase">
                                Upcoming Events
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">
                            Hackathon Calendar.
                        </h2>
                    </div>

                    <Link
                        href="/hackathons"
                        className="group flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                        View All
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((hackathon, idx) => (
                        <motion.div
                            key={hackathon.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <HackathonCard hackathon={hackathon} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
