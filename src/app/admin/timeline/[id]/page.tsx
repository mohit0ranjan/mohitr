import { prisma } from "@/lib/prisma"
import { saveTimeline } from "../actions"
import Link from "next/link"

export default async function EditTimeline({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    let item = null
    if (id !== "new") {
        item = await prisma.timelineEntry.findUnique({ where: { id } })
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">{id === "new" ? "New Entry" : "Edit Entry"}</h1>
            <form action={saveTimeline} className="space-y-4">
                <input type="hidden" name="id" value={id} />
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label>Year</label>
                        <input name="year" defaultValue={item?.year} className="p-2 rounded bg-neutral-900 border border-neutral-800" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Type</label>
                        <select name="type" defaultValue={item?.type || "Education"} className="p-2 rounded bg-neutral-900 border border-neutral-800">
                            <option>Education</option>
                            <option>Work</option>
                            <option>Project</option>
                            <option>Award</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Title</label>
                    <input name="title" defaultValue={item?.title} className="p-2 rounded bg-neutral-900 border border-neutral-800" required />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Description</label>
                    <textarea name="description" defaultValue={item?.description} className="p-2 rounded bg-neutral-900 border border-neutral-800 h-24" required />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Order</label>
                    <input name="order" type="number" defaultValue={item?.order || 0} className="p-2 rounded bg-neutral-900 border border-neutral-800" />
                </div>
                <button className="bg-white text-black px-4 py-2 rounded font-bold">Save</button>
            </form>
        </div>
    )
}
