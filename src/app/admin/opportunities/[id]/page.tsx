
import { prisma } from "@/lib/prisma"
import { saveOpportunity } from "../actions"
import Link from "next/link"
import Editor from "@/components/admin/Editor"

export default async function OpportunityEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const isNew = id === "new"
    let opp = null

    if (!isNew) {
        opp = await prisma.opportunity.findUnique({ where: { id } })
        if (!opp) return <div className="p-8 text-center text-red-500">Opportunity not found</div>
    }

    return (
        <div className="space-y-8 max-w-3xl mx-auto animate-in fade-in duration-500 py-8">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-6">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                        {isNew ? "Create New Opportunity" : "Edit Opportunity"}
                    </h2>
                    <p className="text-neutral-500 text-sm mt-1">Manage details for internship or job listing.</p>
                </div>
                <Link
                    href="/admin/opportunities"
                    className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white border border-neutral-800 rounded-lg hover:bg-neutral-900 transition-colors"
                >
                    Cancel
                </Link>
            </div>

            <form action={saveOpportunity} className="space-y-8">
                <input type="hidden" name="id" value={id} />

                {/* Core Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Opportunity Title <span className="text-red-500">*</span></label>
                        <input name="title" defaultValue={opp?.title ?? ""} required placeholder="e.g. Frontend Engineer Intern" className="w-full px-4 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all placeholder:text-neutral-700" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Company Name <span className="text-red-500">*</span></label>
                        <input name="company" defaultValue={opp?.company ?? ""} required placeholder="e.g. Acme Corp" className="w-full px-4 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all placeholder:text-neutral-700" />
                    </div>
                </div>

                {/* Slug (Optional override) */}
                {!isNew && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-400">Slug (URL Identifier)</label>
                        <input name="slug" defaultValue={opp?.slug ?? ""} className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-500 focus:outline-none focus:border-neutral-700 transition-all font-mono text-sm" />
                        <p className="text-xs text-neutral-600">Leave unchanged unless necessary. Changing this breaks existing links.</p>
                    </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Location</label>
                        <input name="location" defaultValue={opp?.location ?? ""} placeholder="e.g. Remote / New York" className="w-full px-4 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Type</label>
                        <select name="type" defaultValue={opp?.type ?? "Internship"} className="w-full px-4 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all">
                            <option value="Internship">Internship</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Research">Research</option>
                            <option value="Open Source">Open Source</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Duration</label>
                        <input name="duration" defaultValue={opp?.duration ?? ""} placeholder="e.g. 3 Months" className="w-full px-4 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Stipend / Salary</label>
                        <input name="stipend" defaultValue={opp?.stipend ?? ""} placeholder="e.g. $5000/mo or Unpaid" className="w-full px-4 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all" />
                    </div>
                </div>

                {/* Descriptions */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Short Description <span className="text-neutral-500 text-xs">(For cards & previews)</span></label>
                        <textarea name="shortDescription" defaultValue={opp?.shortDescription ?? ""} rows={2} className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all" placeholder="Brief summary..." />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Full Description <span className="text-neutral-500 text-xs">(Markdown supported)</span></label>
                        <Editor
                            markdown={opp?.fullDescription ?? ""}
                            name="fullDescription"
                            className="min-h-[500px]"
                        />
                    </div>
                </div>

                {/* Link & Meta */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-800">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Application Link</label>
                        <input name="applyLink" type="url" defaultValue={opp?.applyLink ?? ""} placeholder="https://..." className="w-full px-4 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Status</label>
                        <select name="status" defaultValue={opp?.status ?? "Active"} className="w-full px-4 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all">
                            <option value="Active">Active</option>
                            <option value="Closed">Closed</option>
                            <option value="Expired">Expired</option>
                        </select>
                    </div>
                </div>

                {/* Toggles */}
                <div className="flex gap-8 pt-2">
                    <div className="flex items-center gap-3">
                        <input type="checkbox" name="isPublished" id="isPublished" defaultChecked={opp?.isPublished ?? false} className="w-5 h-5 rounded border-neutral-800 bg-neutral-900 text-purple-600 focus:ring-purple-500/50 transition-all" />
                        <label htmlFor="isPublished" className="text-sm font-medium text-neutral-300 cursor-pointer select-none">Publish Visible</label>
                    </div>

                    <div className="flex items-center gap-3">
                        <input type="checkbox" name="isFeatured" id="isFeatured" defaultChecked={opp?.isFeatured ?? false} className="w-5 h-5 rounded border-neutral-800 bg-neutral-900 text-purple-600 focus:ring-purple-500/50 transition-all" />
                        <label htmlFor="isFeatured" className="text-sm font-medium text-neutral-300 cursor-pointer select-none">Feature on Homepage</label>
                    </div>
                </div>


                <div className="pt-8 border-t border-neutral-800">
                    <button type="submit" className="w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-neutral-200 transition-all shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 active:scale-[0.99]">
                        {isNew ? "Create Opportunity" : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    )
}
