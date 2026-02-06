import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { deleteTicker } from "./actions"

export const dynamic = 'force-dynamic'

export default async function TickerPage() {
    const items = await prisma.tickerUpdate.findMany({ orderBy: { order: 'asc' } })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Homepage Ticker</h2>
                <Link href="/admin/updates/new" className="bg-white text-black px-4 py-2 rounded">Add Update</Link>
            </div>
            <div className="space-y-4">
                {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-neutral-900 rounded border border-neutral-800">
                        <div>
                            <div className="font-bold flex items-center gap-2">
                                {item.content}
                                <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-neutral-400">{item.type}</span>
                            </div>
                            <div className="text-xs text-neutral-500 mt-1">{item.url || "No link"} • {item.isActive ? "Active" : "Hidden"}</div>
                        </div>
                        <div className="flex gap-4">
                            <Link href={`/admin/updates/${item.id}`} className="text-neutral-400 hover:text-white">Edit</Link>
                            <form action={deleteTicker.bind(null, item.id)}>
                                <button className="text-red-400">Delete</button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
