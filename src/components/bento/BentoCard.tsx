import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
    children: ReactNode;
    className?: string; // For grid spans (col-span-2, etc)
    noPadding?: boolean;
}

export default function BentoCard({ children, className, noPadding = false }: BentoCardProps) {
    return (
        <div className={cn(
            "relative bg-[#080808] border border-white/5 rounded-3xl overflow-hidden group flex flex-col",
            "hover:border-white/10 transition-colors duration-500",
            "shadow-[0_0_0_1px_rgba(0,0,0,0)] hover:shadow-[0_0_20px_rgba(255,255,255,0.02)]",
            className
        )}>
            {/* Subltle Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-100 pointer-events-none" />

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Content */}
            <div className={cn("relative z-10 h-full", noPadding ? "p-0" : "p-6 md:p-8")}>
                {children}
            </div>
        </div>
    );
}
