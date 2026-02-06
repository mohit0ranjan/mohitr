import { prisma } from "@/lib/prisma"
import { saveTicker } from "../actions"
import Link from "next/link"

export default async function EditTicker({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    let item = null
    if (id !== "new") {
        item = await prisma.tickerUpdate.findUnique({ where: { id } })
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">{id === "new" ? "New Update" : "Edit Update"}</h1>
            <form action={saveTicker} className="space-y-4">
                <input type="hidden" name="id" value={id} />
                <div className="flex flex-col gap-2">
                    <label>Content (Short text)</label>
                    <input name="content" defaultValue={item?.content ?? ""} className="p-2 rounded bg-neutral-900 border border-neutral-800" required />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Type</label>
                    <select name="type" defaultValue={item?.type || "Update"} className="p-2 rounded bg-neutral-900 border border-neutral-800">
                        <option>Update</option>
                        <option>Blog</option>
                        <option>Tool</option>
                        <option>Project</option>
                        <option>Opportunity</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Link (Optional)</label>
                    <input name="url" defaultValue={item?.url ?? ""} className="p-2 rounded bg-neutral-900 border border-neutral-800" />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Order</label>
                    <input name="order" type="number" defaultValue={item?.order ?? 0} className="p-2 rounded bg-neutral-900 border border-neutral-800" />
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" name="isActive" defaultChecked={item?.isActive ?? true} />
                    <label>Active (Visible in slider)</label>
                </div>
                <button className="bg-white text-black px-4 py-2 rounded font-bold">Save</button>
            </form>
        </div>
    )
}
