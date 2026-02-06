import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3 | 4;
    rowSpan?: 1 | 2 | 3 | 4;
    href?: string;
}

export const BentoGrid = ({ children, className }: BentoGridProps) => {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto auto-rows-[minmax(180px,auto)]",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoCard = ({
    children,
    className,
    colSpan = 1,
    rowSpan = 1,
    href,
}: BentoCardProps) => {
    const Component = href ? "a" : "div";

    return (
        <Component
            href={href}
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-3xl glass p-6 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5",
                "glass-hover",
                colSpan === 2 && "md:col-span-2",
                colSpan === 3 && "md:col-span-3",
                colSpan === 4 && "md:col-span-4",
                rowSpan === 2 && "row-span-2",
                className
            )}
        >
            {children}
        </Component>
    );
};
