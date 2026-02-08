import { prisma } from "@/lib/prisma";
import { deleteDataset, toggleDatasetPublish } from "./actions";
import { Database, Plus, Trash2, Check, X } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function DatasetsAdminPage() {
    const datasets = await prisma.recruiterDataset.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Database className="w-6 h-6 text-blue-400" />
                    <h1 className="text-2xl font-bold">Recruiter Datasets</h1>
                </div>
                <Link
                    href="/admin/off-campus/datasets/new"
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Dataset
                </Link>
            </div>

            <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-900/20">
                <table className="w-full text-left text-sm">
                    <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="p-4 font-medium">Title</th>
                            <th className="p-4 font-medium">Role / Companies</th>
                            <th className="p-4 font-medium">Stats</th>
                            <th className="p-4 font-medium">Price</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {datasets.map((d) => (
                            <tr key={d.id} className="hover:bg-neutral-900/50 transition-colors group">
                                <td className="p-4">
                                    <div className="font-medium text-white">{d.title}</div>
                                    <div className="text-xs text-neutral-500 truncate max-w-[200px]">{d.description}</div>
                                </td>
                                <td className="p-4 text-neutral-300">
                                    <div className="text-white">{d.role}</div>
                                    <div className="text-xs text-neutral-500">{d.companies}</div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2 text-neutral-400">
                                        <span>{d.emailCount} emails</span>
                                        {d.isVerified && <Check className="w-3 h-3 text-green-500" />}
                                    </div>
                                    <div className="text-xs text-neutral-500">{d.location}</div>
                                </td>
                                <td className="p-4 font-mono text-neutral-300">{d.price}</td>
                                <td className="p-4">
                                    <form action={toggleDatasetPublish.bind(null, d.id, d.isPublished)}>
                                        <button className={`px-2 py-1 rounded-full text-xs border transition-colors ${d.isPublished ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20'}`}>
                                            {d.isPublished ? "Published" : "Draft"}
                                        </button>
                                    </form>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <form action={deleteDataset.bind(null, d.id)}>
                                            <button
                                                className="p-2 rounded-lg hover:bg-red-500/10 text-neutral-500 hover:text-red-400 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {datasets.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-12 text-center text-neutral-500">
                                    No datasets found. Create your first one!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
