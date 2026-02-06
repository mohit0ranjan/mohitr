import { prisma } from "@/lib/prisma"
import { saveProject } from "../actions"
import Link from "next/link"

export default async function ProjectEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const isNew = id === "new"
    let project = null

    if (!isNew) {
        project = await prisma.project.findUnique({ where: { id } })
        if (!project) return <div className="p-8 text-center">Project not found</div>
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{isNew ? "Add Project" : "Edit Project"}</h2>
                <Link href="/admin/projects" className="text-neutral-400 hover:text-white transition-colors">Cancel</Link>
            </div>

            <form action={saveProject} className="space-y-8">
                <input type="hidden" name="id" value={id} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-neutral-300">Project Name</label>
                            <input name="name" defaultValue={project?.name ?? ""} required className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium text-lg" />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-neutral-300">Category</label>
                            <select name="category" defaultValue={project?.category ?? "Web App"} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all">
                                <option value="Web App">Web App</option>
                                <option value="Tool">Tool</option>
                                <option value="System">System</option>
                                <option value="Open Source">Open Source</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-neutral-300">Short Description</label>
                            <textarea name="description" defaultValue={project?.description ?? ""} required rows={3} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" />
                            <p className="text-xs text-neutral-500">Appears on cards</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-neutral-300">Tech Stack</label>
                            <input name="techStack" defaultValue={project?.techStack ?? ""} placeholder="Next.js, Tailwind, Prisma..." className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-neutral-300">Live URL</label>
                                <input name="liveUrl" type="url" defaultValue={project?.liveUrl ?? ""} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-neutral-300">GitHub URL</label>
                                <input name="githubUrl" type="url" defaultValue={project?.githubUrl ?? ""} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-4 p-4 border border-neutral-800 rounded-lg bg-neutral-900/30">
                            <input type="checkbox" name="isFeatured" id="isFeatured" defaultChecked={project?.isFeatured ?? false} className="w-4 h-4 rounded border-neutral-800 bg-neutral-900 text-purple-600 focus:ring-purple-500/50" />
                            <label htmlFor="isFeatured" className="text-sm font-medium text-neutral-300">Feature this project</label>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-300">Detailed Content (Markdown)</label>
                    <textarea name="detail" defaultValue={project?.detail ?? ""} rows={10} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-mono text-sm" placeholder="# Detailed case study..." />
                </div>

                <div className="pt-4 border-t border-neutral-800">
                    <button type="submit" className="w-full bg-white text-black py-2.5 rounded-lg font-bold hover:bg-neutral-200 transition-colors shadow-lg shadow-purple-500/10">
                        Save Project
                    </button>
                </div>
            </form>
        </div>
    )
}
