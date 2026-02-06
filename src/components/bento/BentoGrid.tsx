import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function BentoGrid({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={cn(
            "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-min",
            className
        )}>
            {children}
        </div>
    );
}
