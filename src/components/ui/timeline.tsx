"use client";

import { TIMELINE } from "@/lib/data";
import { FadeIn, FadeInStagger } from "./motion";
import { Calendar } from "lucide-react";

export default function Timeline() {
    return (
        <section>
            <FadeIn>
                <div className="flex items-center gap-2 mb-8">
                    <Calendar className="text-pink-500" size={24} />
                    <h2 className="text-3xl font-bold">Journey</h2>
                </div>
            </FadeIn>

            <FadeInStagger className="relative ml-4 border-l border-white/20 pl-8 space-y-12">
                {TIMELINE.map((item, i) => (
                    <FadeIn key={i} delay={i * 0.1}>
                        <div className="relative">
                            {/* Dot */}
                            <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border border-white/20 bg-neutral-900 group-hover:bg-white transition-colors" />

                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                                <span className="font-mono text-sm text-pink-400">{item.year}</span>
                                <h3 className="text-xl font-bold">{item.title}</h3>
                            </div>
                            <p className="text-muted mt-2 max-w-lg leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </FadeIn>
                ))}
            </FadeInStagger>
        </section>
    );
}
