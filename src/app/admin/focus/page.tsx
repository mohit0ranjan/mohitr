import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { deleteFocusPoint } from "./actions"

export const dynamic = 'force-dynamic'

export default async function FocusPage() {
    const items = await prisma.focusPoint.findMany({ orderBy: { order: 'asc' } })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Current Focus</h2>
                <Link href="/admin/focus/new" className="bg-white text-black px-4 py-2 rounded">Add Focus Point</Link>
            </div>

            <div className="p-4 bg-blue-900/10 border border-blue-500/20 rounded text-sm text-blue-200 mb-6">
                Note: The main heading/intro of this section is currently managed in code. Here you can manage the list of bullet points.
            </div>

            <div className="space-y-4">
                {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-neutral-900 rounded border border-neutral-800">
                        <div>
                            <div className="font-bold">{item.title}</div>
                            {item.description && <div className="text-sm text-neutral-400">{item.description}</div>}
                        </div>
                        <div className="flex gap-4">
                            <Link href={`/admin/focus/${item.id}`} className="text-neutral-400 hover:text-white">Edit</Link>
                            <form action={deleteFocusPoint.bind(null, item.id)}>
                                <button className="text-red-400">Delete</button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
