"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Section3DProps {
    children: ReactNode;
    className?: string;
    perspective?: number;
}

export function Section3D({
    children,
    className,
    perspective = 1200
}: Section3DProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

    // Much gentler transforms for better "feel"
    const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [3, 0, -3]); // Very subtle tilt
    const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.98, 1, 0.98]); // Minimal scale
    const opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
    const y = useTransform(smoothProgress, [0, 1], [30, -30]); // Gentle flow

    return (
        <div
            ref={ref}
            className={cn("relative w-full min-h-screen flex items-center justify-center py-24", className)}
            style={{ perspective: `${perspective}px` }}
        >
            <motion.div
                style={{
                    rotateX,
                    scale,
                    opacity,
                    y,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
                className="transform-gpu w-full h-full"
            >
                {children}
            </motion.div>
        </div>
    );
}

export function FloatingElement({
    children,
    depth = 20,
    className
}: {
    children: ReactNode,
    depth?: number,
    className?: string
}) {
    return (
        <div
            className={cn("relative transition-transform duration-500 ease-out preserve-3d group-hover:transform-gpu", className)}
            style={{ transform: `translateZ(${depth}px)` }}
        >
            {children}
        </div>
    );
}
