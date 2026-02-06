import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { deleteProject } from "./actions"
import { Plus, Search, MoreHorizontal, Globe, Github, Star, FolderKanban } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                    <p className="text-neutral-400 mt-1">Manage your portfolio showcase items.</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
                >
                    <Plus size={18} />
                    <span>New Project</span>
                </Link>
            </div>

            {/* Content Grid */}
            {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <div key={project.id} className="group relative flex flex-col bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300">

                            {/* Card Header / Image Placeholder */}
                            <div className="h-40 bg-neutral-900/50 border-b border-white/5 relative group-hover:bg-neutral-900 transition-colors">
                                {/* Gradient Mesh Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="absolute top-4 right-4 flex gap-2">
                                    {project.isFeatured && (
                                        <span className="flex items-center gap-1 px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
                                            <Star size={10} fill="currentColor" /> Featured
                                        </span>
                                    )}
                                </div>

                                <div className="absolute bottom-4 left-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold text-lg border border-white/10">
                                        {project.name.charAt(0)}
                                    </div>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors truncate">
                                        {project.name}
                                    </h3>
                                    <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3">
                                        {project.category}
                                    </p>
                                    <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" className="p-1.5 text-neutral-500 hover:text-white transition-colors"><Globe size={16} /></a>
                                        )}
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" className="p-1.5 text-neutral-500 hover:text-white transition-colors"><Github size={16} /></a>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={`/admin/projects/${project.id}`}
                                            className="text-xs font-medium text-neutral-400 hover:text-white px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors"
                                        >
                                            Edit
                                        </Link>
                                        <form action={deleteProject.bind(null, project.id)}>
                                            <button className="text-xs font-medium text-red-500/70 hover:text-red-400 px-3 py-1.5 rounded-md hover:bg-red-500/10 transition-colors">
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 border border-dashed border-white/10 rounded-2xl bg-white/5">
                    <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center mb-4">
                        <FolderKanban className="text-neutral-600" size={32} />
                    </div>
                    <p className="text-neutral-400 font-medium">No projects found</p>
                    <p className="text-sm text-neutral-600 mt-1 mb-6">Start building your portfolio portfolio.</p>
                    <Link href="/admin/projects/new" className="px-5 py-2 bg-white text-black rounded-lg font-medium text-sm hover:bg-neutral-200 transition-colors">
                        Create First Project
                    </Link>
                </div>
            )}
        </div>
    )
}
