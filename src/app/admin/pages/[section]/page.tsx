import { prisma } from "@/lib/prisma"
import { savePageContent } from "../actions"
import Link from "next/link"

// This is a generic editor that could be enhanced with specific fields per section
export default async function PageSectionEditor({ params }: { params: Promise<{ section: string }> }) {
    const { section } = await params

    const pageData = await prisma.pageContent.findUnique({
        where: { section }
    })

    // We'll treat content as simple text/markdown for now, or JSON if you want to get fancy later
    const defaultContent = pageData?.content || ""

    return (
        <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold capitalize">Edit {section}</h2>
                <Link href="/admin/pages" className="text-neutral-400 hover:text-white transition-colors">Cancel</Link>
            </div>

            <form action={savePageContent} className="space-y-6">
                <input type="hidden" name="section" value={section} />

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-300">Content (JSON or Text)</label>
                    <textarea
                        name="content"
                        defaultValue={defaultContent}
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-mono text-sm leading-relaxed h-96"
                        placeholder="{ 'title': '...' }"
                    />
                    <p className="text-xs text-neutral-500">
                        For now, enter raw content. Later we can add specific fields for '{section}'.
                    </p>
                </div>

                <div className="pt-4 border-t border-neutral-800">
                    <button type="submit" className="w-full bg-white text-black py-2.5 rounded-lg font-bold hover:bg-neutral-200 transition-colors shadow-lg shadow-purple-500/10">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}
