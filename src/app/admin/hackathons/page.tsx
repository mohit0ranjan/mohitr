import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { deleteHackathon } from "./actions"

export const dynamic = 'force-dynamic'

export default async function HackathonsPage() {
    const hackathons = await prisma.hackathon.findMany({
        orderBy: { startDate: 'desc' }
    })

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Hackathons</h2>
                <Link href="/admin/hackathons/new" className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-neutral-200 transition-colors">
                    Add Hackathon
                </Link>
            </div>

            <div className="border border-neutral-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400">
                        <tr>
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Organizer</th>
                            <th className="p-4 font-medium">Dates</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800 bg-neutral-950">
                        {hackathons.map(hackathon => (
                            <tr key={hackathon.id} className="hover:bg-neutral-900/50 transition-colors">
                                <td className="p-4 font-medium">
                                    <div className="flex flex-col">
                                        <span className="text-white font-medium">{hackathon.name}</span>
                                        <span className="text-xs text-neutral-500">{hackathon.mode}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-neutral-400">{hackathon.organizer}</td>
                                <td className="p-4 text-neutral-400">
                                    <div className="flex flex-col text-xs">
                                        <span>Start: {new Date(hackathon.startDate).toLocaleDateString()}</span>
                                        <span>End: {new Date(hackathon.endDate).toLocaleDateString()}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs border ${hackathon.status === 'Upcoming' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                        hackathon.status === 'Open' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            hackathon.status === 'Live' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                'bg-neutral-500/10 text-neutral-400 border-neutral-500/20'
                                        }`}>
                                        {hackathon.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <Link href={`/admin/hackathons/${hackathon.id}`} className="text-neutral-400 hover:text-white transition-colors">Edit</Link>
                                        <form action={deleteHackathon.bind(null, hackathon.id)}>
                                            <button className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {hackathons.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-neutral-500">No hackathons found. Start adding!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
