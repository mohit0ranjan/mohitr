import { prisma } from "@/lib/prisma";
import { deleteTool } from "./actions";
import { PenTool, Plus, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function ToolsAdminPage() {
    const tools = await prisma.outreachTool.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <PenTool className="w-6 h-6 text-purple-400" />
                    <h1 className="text-2xl font-bold">Outreach Tools</h1>
                </div>
                <Link
                    href="/admin/off-campus/tools/new"
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Tool
                </Link>
            </div>

            <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-900/20">
                <table className="w-full text-left text-sm">
                    <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Category</th>
                            <th className="p-4 font-medium">Pricing</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {tools.map((t) => (
                            <tr key={t.id} className="hover:bg-neutral-900/50 transition-colors group">
                                <td className="p-4">
                                    <div className="font-medium text-white flex items-center gap-2">
                                        {t.name}
                                        <a href={t.link} target="_blank" className="text-neutral-500 hover:text-white"><ExternalLink className="w-3 h-3" /></a>
                                    </div>
                                    <div className="text-xs text-neutral-500 truncate max-w-[300px]">{t.description}</div>
                                </td>
                                <td className="p-4 text-neutral-400">{t.category}</td>
                                <td className="p-4">
                                    <span className={`text-xs px-2 py-1 rounded-full border ${t.pricing === 'Free' ? 'border-green-500/20 text-green-500' : 'border-yellow-500/20 text-yellow-500'}`}>
                                        {t.pricing}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <form action={deleteTool.bind(null, t.id)}>
                                        <button className="p-2 hover:bg-red-500/10 text-neutral-500 hover:text-red-400 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
