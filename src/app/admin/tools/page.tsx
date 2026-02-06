import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { deleteTool } from "./actions"

export const dynamic = 'force-dynamic'

export default async function ToolsPage() {
    const tools = await prisma.devTool.findMany({
        orderBy: { updatedAt: 'desc' }
    })

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Dev Tools</h2>
                <Link href="/admin/tools/new" className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-neutral-200 transition-colors">
                    Add Tool
                </Link>
            </div>

            <div className="border border-neutral-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400">
                        <tr>
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Category</th>
                            <th className="p-4 font-medium">Type</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800 bg-neutral-950">
                        {tools.map((tool: any) => (
                            <tr key={tool.id} className="hover:bg-neutral-900/50 transition-colors">
                                <td className="p-4 font-medium">
                                    <div className="flex items-center gap-2">
                                        <Link href={`/admin/tools/${tool.id}`} className="hover:underline text-white">
                                            {tool.name}
                                        </Link>
                                        {tool.isFeatured && (
                                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="p-4 text-neutral-400">{tool.category}</td>
                                <td className="p-4 text-neutral-400">{tool.toolType}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs border ${tool.isPublished ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20'}`}>
                                        {tool.isPublished ? "Published" : "Draft"}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <Link href={`/admin/tools/${tool.id}`} className="text-neutral-400 hover:text-white transition-colors">Edit</Link>
                                        <form action={deleteTool.bind(null, tool.id)}>
                                            <button className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {tools.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-neutral-500">No tools yet. Create one!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
