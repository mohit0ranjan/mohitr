import { prisma } from "@/lib/prisma";
import HackathonDirectory from "./HackathonDirectory";

export const revalidate = 3600; // 1 hour revalidation

export default async function HackathonsPage() {
    const hackathons = await prisma.hackathon.findMany({
        orderBy: { startDate: 'asc' }
    });

    const formattedHackathons = hackathons.map(h => ({
        ...h,
        tags: h.tags ? h.tags.split(',').map(t => t.trim()) : [],
        // Convert Dates to ISO strings or Date objects as preferred by Client Component
        // Since we are inside the same project, simple serialization happens, but let's be safe.
        // Actually, if we pass Date objects to client components in Server Actions/Props, Next.js warns.
        // Format of interface in HackathonDirectory expects Date | string. 
        // Best to leave as Date if native support or parse string on client.
        // But Prisma returns Date objects. Next.js serialization of Date objects:
        // "Only plain objects, arrays, and primitives are allowed."
        // We must convert dates to strings.
        startDate: h.startDate.toISOString(),
        endDate: h.endDate.toISOString(),
        registrationDeadline: h.registrationDeadline ? h.registrationDeadline.toISOString() : null,
        createdAt: h.createdAt.toISOString(),
        updatedAt: h.updatedAt.toISOString(),
    }));

    return (
        <main className="bg-[#030303] min-h-screen">
            <HackathonDirectory hackathons={formattedHackathons} />
        </main>
    );
}
