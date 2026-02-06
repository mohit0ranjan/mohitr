import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { deleteOpportunity } from "./actions"

export const dynamic = 'force-dynamic'

export default async function OpportunitiesPage() {
    const opportunities = await prisma.opportunity.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Opportunities</h2>
                <Link href="/admin/opportunities/new" className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-neutral-200 transition-colors">
                    Add Opportunity
                </Link>
            </div>

            <div className="border border-neutral-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400">
                        <tr>
                            <th className="p-4 font-medium">Role / Company</th>
                            <th className="p-4 font-medium">Type</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800 bg-neutral-950">
                        {opportunities.map(opp => (
                            <tr key={opp.id} className="hover:bg-neutral-900/50 transition-colors">
                                <td className="p-4">
                                    <div className="font-medium text-white">{opp.role}</div>
                                    <div className="text-neutral-500 text-xs">{opp.company}</div>
                                </td>
                                <td className="p-4 text-neutral-300">{opp.type}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs border ${opp.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20'}`}>
                                        {opp.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <Link href={`/admin/opportunities/${opp.id}`} className="text-neutral-400 hover:text-white transition-colors">Edit</Link>
                                        <form action={deleteOpportunity.bind(null, opp.id)}>
                                            <button className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {opportunities.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-12 text-center text-neutral-500">No opportunities listed. Add one!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
