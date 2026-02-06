import { prisma } from "@/lib/prisma"
import { saveTechTool } from "../actions"
import Link from "next/link"

export default async function EditTechStack({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    let item = null
    if (id !== "new") {
        item = await prisma.techTool.findUnique({ where: { id } })
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">{id === "new" ? "New Item" : "Edit Item"}</h1>
            <form action={saveTechTool} className="space-y-4">
                <input type="hidden" name="id" value={id} />
                <div className="flex flex-col gap-2">
                    <label>Name</label>
                    <input name="name" defaultValue={item?.name} className="p-2 rounded bg-neutral-900 border border-neutral-800" required />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Category</label>
                    <select name="category" defaultValue={item?.category || "Languages"} className="p-2 rounded bg-neutral-900 border border-neutral-800">
                        <option>Languages</option>
                        <option>Frameworks</option>
                        <option>Tools & Infra</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Icon (Lucide name)</label>
                    <input name="icon" defaultValue={item?.icon || ""} className="p-2 rounded bg-neutral-900 border border-neutral-800" />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Order</label>
                    <input name="order" type="number" defaultValue={item?.order || 0} className="p-2 rounded bg-neutral-900 border border-neutral-800" />
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" name="isVisible" defaultChecked={item?.isVisible ?? true} />
                    <label>Visible</label>
                </div>
                <button className="bg-white text-black px-4 py-2 rounded font-bold">Save</button>
            </form>
        </div>
    )
}
