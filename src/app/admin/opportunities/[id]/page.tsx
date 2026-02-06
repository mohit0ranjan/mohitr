import { prisma } from "@/lib/prisma"
import { saveOpportunity } from "../actions"
import Link from "next/link"

export default async function OpportunityEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const isNew = id === "new"
    let opp = null

    if (!isNew) {
        opp = await prisma.opportunity.findUnique({ where: { id } })
        if (!opp) return <div className="p-8 text-center">Opportunity not found</div>
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{isNew ? "Add Opportunity" : "Edit Opportunity"}</h2>
                <Link href="/admin/opportunities" className="text-neutral-400 hover:text-white transition-colors">Cancel</Link>
            </div>

            <form action={saveOpportunity} className="space-y-6">
                <input type="hidden" name="id" value={id} />

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-neutral-300">Role Title</label>
                        <input name="role" defaultValue={opp?.role} required className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-neutral-300">Company</label>
                        <input name="company" defaultValue={opp?.company} required className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-neutral-300">Type</label>
                        <select name="type" defaultValue={opp?.type || "Internship"} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all">
                            <option value="Internship">Internship</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Freelance">Freelance</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-neutral-300">Status</label>
                        <select name="status" defaultValue={opp?.status || "Active"} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all">
                            <option value="Active">Active</option>
                            <option value="Expired">Expired</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-300">Description</label>
                    <textarea name="description" defaultValue={opp?.description} required rows={4} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-300">Link URL</label>
                    <input name="url" type="url" defaultValue={opp?.url || ""} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder="https://..." />
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <input type="checkbox" name="isFeatured" id="isFeatured" defaultChecked={opp?.isFeatured} className="w-4 h-4 rounded border-neutral-800 bg-neutral-900 text-purple-600 focus:ring-purple-500/50" />
                    <label htmlFor="isFeatured" className="text-sm font-medium text-neutral-300">Feature on Homepage</label>
                </div>

                <div className="pt-4 border-t border-neutral-800">
                    <button type="submit" className="w-full bg-white text-black py-2.5 rounded-lg font-bold hover:bg-neutral-200 transition-colors shadow-lg shadow-purple-500/10">
                        Save Opportunity
                    </button>
                </div>
            </form>
        </div>
    )
}
