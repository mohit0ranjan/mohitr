import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import BentoCard from "./BentoCard";

export default function IdentityCard() {
    return (
        <BentoCard className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 min-h-[400px]">
            <div className="flex flex-col justify-between h-full">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 overflow-hidden relative mb-6">
                        {/* Placeholder for real avatar if available, else gradient */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue to-accent-purple opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-white">M</div>
                    </div>

                    <div className="px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-400">Open to work</span>
                    </div>
                </div>

                {/* Main Identity */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                        Mohit
                    </h1>
                    <h2 className="text-xl text-neutral-400 font-medium mb-6">
                        System Architect & <br />
                        <span className="text-neutral-200">Full Stack Engineer</span>
                    </h2>

                    <p className="text-neutral-500 text-sm leading-relaxed max-w-sm mb-8">
                        Computer Science undergraduate at <span className="text-neutral-300">NIT Jalandhar</span>.
                        Building scalable systems, crafting editorial interfaces, and exploring distributed AI.
                    </p>
                </div>

                {/* Footer Meta */}
                <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-neutral-600">
                    <div className="flex items-center gap-2">
                        <MapPin size={12} />
                        <span>India</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Sparkles size={12} />
                        <span>Builder</span>
                    </div>
                </div>

            </div>
        </BentoCard>
    );
}
