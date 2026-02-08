
import { prisma } from "@/lib/prisma"
import OpportunityDirectory from "./OpportunityDirectory"

export const dynamic = 'force-dynamic'

// Fetch data on server
export default async function OpportunitiesPage() {
    const opportunities = await prisma.opportunity.findMany({
        where: {
            isPublished: true,
        },
        orderBy: { createdAt: 'desc' }
    })

    // Serialize dates for client component
    const formattedOpportunities = opportunities.map(o => ({
        ...o,
        createdAt: o.createdAt.toISOString(),
        updatedAt: o.updatedAt.toISOString(),
        startDate: o.startDate ? o.startDate.toISOString() : null,
        endDate: o.endDate ? o.endDate.toISOString() : null,
    }));

    return (
        <main className="bg-[#030303] min-h-screen">
            <OpportunityDirectory opportunities={formattedOpportunities} />
        </main>
    )
}
