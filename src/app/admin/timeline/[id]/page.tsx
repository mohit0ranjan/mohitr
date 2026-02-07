
import { prisma } from "@/lib/prisma"
import { saveTimeline } from "../actions"
import Link from "next/link"

export default async function EditTimeline({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    let item = null
    const isNew = id === "new"

    if (!isNew) {
        item = await prisma.timelineEntry.findUnique({ where: { id } })
        if (!item) return <div className="p-8 text-center text-red-500">Entry not found</div>
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500 py-8">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-6">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                        {isNew ? "New Entry" : "Edit Entry"}
                    </h2>
                    <p className="text-neutral-500 text-sm mt-1">Manage timeline events.</p>
                </div>
                <Link href="/admin/timeline" className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white border border-neutral-800 rounded-lg hover:bg-neutral-900 transition-colors">
                    Back
                </Link>
            </div>

            <form action={saveTimeline} className="space-y-6">
                <input type="hidden" name="id" value={id} />

                {/* Main */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Year / Date</label>
                        <input name="year" defaultValue={item?.year ?? ""} placeholder="e.g. 2024 - Present" className="w-full px-4 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all placeholder:text-neutral-700" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Type</label>
                        <select name="type" defaultValue={item?.type || "Education"} className="w-full px-4 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all">
                            <option value="Education">Education</option>
                            <option value="Role">Role / Experience</option>
                            <option value="Project">Project</option>
                            <option value="Award">Award</option>
                        </select>
                    </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Title / Role</label>
                        <input name="title" defaultValue={item?.title ?? ""} placeholder="e.g. Senior Engineer" className="w-full px-4 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all placeholder:text-neutral-700" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Company / Organization</label>
                        <input name="company" defaultValue={item?.company ?? ""} placeholder="e.g. Google" className="w-full px-4 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all placeholder:text-neutral-700" />
                    </div>
                </div>

                {/* Extra */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Location</label>
                        <input name="location" defaultValue={item?.location ?? ""} placeholder="e.g. San Francisco" className="w-full px-4 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all placeholder:text-neutral-700" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Link URL (Optional)</label>
                        <input name="url" defaultValue={item?.url ?? ""} placeholder="https://..." className="w-full px-4 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all placeholder:text-neutral-700" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">Description</label>
                    <textarea name="description" defaultValue={item?.description ?? ""} placeholder="Brief summary of impact..." className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all h-32 resize-none placeholder:text-neutral-700" required />
                </div>

                <div className="flex gap-8 pt-2">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-neutral-300">Sort Order</label>
                        <input name="order" type="number" defaultValue={item?.order ?? 0} className="w-24 px-3 py-2 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all" />
                    </div>

                    <div className="flex items-center gap-3 self-end mb-2">
                        <input type="checkbox" name="isVisible" id="isVisible" defaultChecked={item?.isVisible ?? true} className="w-5 h-5 rounded border-neutral-800 bg-neutral-900 text-purple-600 focus:ring-purple-500/50 transition-all" />
                        <label htmlFor="isVisible" className="text-sm font-medium text-neutral-300 cursor-pointer select-none">Visible on Homepage</label>
                    </div>
                </div>


                <div className="pt-8 border-t border-neutral-800">
                    <button className="w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-neutral-200 transition-all shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 active:scale-[0.99]">
                        Save Entry
                    </button>
                </div>
            </form>
        </div>
    )
}
