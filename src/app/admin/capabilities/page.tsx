import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { deleteCapability } from "./actions"

export const dynamic = 'force-dynamic'

export default async function CapabilitiesPage() {
    const items = await prisma.capability.findMany({ orderBy: { order: 'asc' } })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Capabilities</h2>
                <Link href="/admin/capabilities/new" className="bg-white text-black px-4 py-2 rounded">Add Item</Link>
            </div>
            <div className="space-y-4">
                {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-neutral-900 rounded border border-neutral-800">
                        <div>
                            <div className="font-bold">{item.title}</div>
                            <div className="text-sm text-neutral-400">{item.description}</div>
                        </div>
                        <div className="flex gap-4">
                            <Link href={`/admin/capabilities/${item.id}`} className="text-neutral-400 hover:text-white">Edit</Link>
                            <form action={deleteCapability.bind(null, item.id)}>
                                <button className="text-red-400">Delete</button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
