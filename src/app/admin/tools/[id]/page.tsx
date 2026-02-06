import { prisma } from "@/lib/prisma"
import { saveTool } from "../actions"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function ToolEditor({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    let tool = null

    if (id !== "new") {
        tool = await prisma.devTool.findUnique({
            where: { id }
        })
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <Link href="/admin/tools" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
                <ArrowLeft size={16} /> Back to Tools
            </Link>

            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{id === "new" ? "New Tool" : "Edit Tool"}</h1>
            </div>

            <form action={saveTool} className="space-y-6 bg-neutral-900/50 p-6 rounded-xl border border-neutral-800">
                <input type="hidden" name="id" value={id} />

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Name</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={tool?.name}
                            required
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                            placeholder="e.g. JWT Decoder"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Slug</label>
                        <input
                            type="text"
                            name="slug"
                            defaultValue={tool?.slug}
                            required
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                            placeholder="e.g. jwt-decoder"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">Short Description</label>
                    <input
                        type="text"
                        name="shortDescription"
                        defaultValue={tool?.shortDescription}
                        required
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder="Brief summary of what this tool does..."
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Category</label>
                        <select
                            name="category"
                            defaultValue={tool?.category || "Web Utilities"}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                        >
                            <option>Security</option>
                            <option>Web Utilities</option>
                            <option>Developer Helpers</option>
                            <option>Text / Encoding</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Tool Type</label>
                        <select
                            name="toolType"
                            defaultValue={tool?.toolType || "Online Tool"}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                        >
                            <option>Online Tool</option>
                            <option>Script</option>
                            <option>Resource</option>
                        </select>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Live URL (Optional)</label>
                        <input
                            type="url"
                            name="liveUrl"
                            defaultValue={tool?.liveUrl || ""}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                            placeholder="https://..."
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">GitHub URL (Optional)</label>
                        <input
                            type="url"
                            name="githubUrl"
                            defaultValue={tool?.githubUrl || ""}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                            placeholder="https://github.com/..."
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">Long Description (Markdown)</label>
                    <textarea
                        name="longDescription"
                        defaultValue={tool?.longDescription || ""}
                        rows={8}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none font-mono text-sm"
                        placeholder="# Detailed Guide..."
                    />
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-neutral-800">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="isPublished"
                            defaultChecked={tool?.isPublished}
                            className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-purple-500 focus:ring-purple-500"
                        />
                        <span className="text-sm font-medium text-neutral-300">Published</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            defaultChecked={tool?.isFeatured}
                            className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-purple-500 focus:ring-purple-500"
                        />
                        <span className="text-sm font-medium text-neutral-300">Featured</span>
                    </label>
                </div>

                <div className="pt-4">
                    <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-neutral-200 transition-colors">
                        Save Tool
                    </button>
                </div>
            </form>
        </div>
    )
}
