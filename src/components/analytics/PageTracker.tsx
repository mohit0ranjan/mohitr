"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function PageTrackerContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname) {
            // Logic to track page view
            // console.log(`Page viewed: ${pathname}`);
            // In a real app, send to Analytics API
        }
    }, [pathname, searchParams]);

    return null;
}

export default function PageTracker() {
    return (
        <Suspense fallback={null}>
            <PageTrackerContent />
        </Suspense>
    );
}
