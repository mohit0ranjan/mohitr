import { prisma } from "@/lib/prisma";
import { deleteTemplate } from "./actions";
import { Mail, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function TemplatesAdminPage() {
    const templates = await prisma.coldEmailTemplate.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Mail className="w-6 h-6 text-green-400" />
                    <h1 className="text-2xl font-bold">Cold Email Templates</h1>
                </div>
                <Link
                    href="/admin/off-campus/templates/new"
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Template
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((t) => (
                    <div key={t.id} className="p-6 rounded-xl bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-colors group relative">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-semibold text-white">{t.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400">
                                        {t.category}
                                    </span>
                                </div>
                            </div>
                            <form action={deleteTemplate.bind(null, t.id)}>
                                <button className="p-2 text-neutral-500 hover:text-red-400 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </form>
                        </div>

                        <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs font-mono text-neutral-400 line-clamp-3">
                            <span className="block text-neutral-600 mb-1">Subject: {t.subject}</span>
                            {t.body}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
