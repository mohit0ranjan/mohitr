import { prisma } from "@/lib/prisma";
import OpportunitiesList from "./OpportunitiesList";

export const dynamic = 'force-dynamic'

export default async function OpportunitiesPage() {

    // Fetch active opportunities
    const opportunities = await prisma.opportunity.findMany({
        where: {
            status: "Active"
        },
        orderBy: {
            dateShared: 'desc'
        }
    });

    const formattedOpportunities = opportunities.map(job => ({
        id: job.id,
        role: job.role,
        company: job.company,
        type: job.type,
        description: job.description,
        url: job.url || "#",
        date: job.dateShared,
        isFeatured: job.isFeatured
    }));

    return <OpportunitiesList initialOpportunities={formattedOpportunities} />
}
