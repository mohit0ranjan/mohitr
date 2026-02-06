import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { deleteTimeline } from "./actions"

export const dynamic = 'force-dynamic'

export default async function TimelinePage() {
    const items = await prisma.timelineEntry.findMany({ orderBy: { order: 'asc' } })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Timeline / Journey</h2>
                <Link href="/admin/timeline/new" className="bg-white text-black px-4 py-2 rounded">Add Entry</Link>
            </div>
            <div className="space-y-4">
                {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-neutral-900 rounded border border-neutral-800">
                        <div>
                            <div className="font-bold">{item.year} - {item.title}</div>
                            <div className="text-sm text-neutral-400">{item.type}</div>
                        </div>
                        <div className="flex gap-4">
                            <Link href={`/admin/timeline/${item.id}`} className="text-neutral-400 hover:text-white">Edit</Link>
                            <form action={deleteTimeline.bind(null, item.id)}>
                                <button className="text-red-400">Delete</button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
