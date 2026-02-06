import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { ArrowUpRight, FileText, Briefcase, FolderKanban, Image as ImageIcon, Zap, Radio, Clock } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
    const [postsCount, oppsCount, projectsCount, galleryCount, updatesCount] = await Promise.all([
        prisma.post.count(),
        prisma.opportunity.count(),
        prisma.project.count(),
        prisma.galleryItem.count(),
        prisma.tickerUpdate.count()
    ])

    const recentUpdates = await prisma.tickerUpdate.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: { id: true, content: true, type: true, createdAt: true }
    })

    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-12">

            {/* 1. Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
                    <p className="text-neutral-400 mt-1">System status and content metrics.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono rounded-full">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        System Operational
                    </span>
                    <Link href="/" target="_blank" className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-white">
                        <ArrowUpRight size={18} />
                    </Link>
                </div>
            </div>

            {/* 2. Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Blog Posts"
                    count={postsCount}
                    href="/admin/posts"
                    icon={FileText}
                    trend="+2 this month"
                />
                <StatCard
                    title="Opportunities"
                    count={oppsCount}
                    href="/admin/opportunities"
                    icon={Briefcase}
                    trend="Active"
                />
                <StatCard
                    title="Projects"
                    count={projectsCount}
                    href="/admin/projects"
                    icon={FolderKanban}
                    trend="Featured"
                />
                <StatCard
                    title="Gallery"
                    count={galleryCount}
                    href="/admin/gallery"
                    icon={ImageIcon}
                    trend="Visuals"
                />
            </div>

            {/* 3. Secondary Metrics & Shortcuts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions Panel */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h3 className="font-semibold mb-6 flex items-center gap-2">
                        <Zap size={18} className="text-yellow-400" />
                        Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <QuickAction href="/admin/posts/new" label="New Post" emoji="✍️" />
                        <QuickAction href="/admin/opportunities/new" label="Add Opportunity" emoji="💼" />
                        <QuickAction href="/admin/projects/new" label="Add Project" emoji="🚀" />
                        <QuickAction href="/admin/updates/new" label="Post Update" emoji="📢" />
                    </div>
                </div>

                {/* Live Updates Feed */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h3 className="font-semibold mb-6 flex items-center gap-2">
                        <Radio size={18} className="text-red-400" />
                        Latest Ticker Updates
                    </h3>
                    <div className="space-y-4">
                        {recentUpdates.length > 0 ? (
                            recentUpdates.map(update => (
                                <div key={update.id} className="items-start gap-4 p-3 rounded-lg bg-black/40 border border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-xs font-mono text-indigo-400 mb-1">{update.type}</p>
                                        <p className="text-sm text-neutral-300 leading-snug">{update.content}</p>
                                        <p className="text-[10px] text-neutral-500 mt-2 flex items-center gap-1">
                                            <Clock size={10} />
                                            {new Date(update.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-neutral-500 text-sm">No updates posted yet.</p>
                        )}
                        <Link href="/admin/updates" className="block text-center text-xs text-neutral-500 hover:text-white mt-4 border-t border-white/5 pt-4">
                            View All Updates
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({ title, count, href, icon: Icon, trend }: { title: string, count: number, href: string, icon: any, trend: string }) {
    return (
        <Link href={href} className="group block p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon size={64} />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 text-neutral-400 group-hover:text-white transition-colors">
                    <Icon size={20} />
                    <span className="text-sm font-medium uppercase tracking-wider">{title}</span>
                </div>
                <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold text-white">{count}</span>
                    <span className="text-xs text-neutral-500 mb-1 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        {trend}
                    </span>
                </div>
            </div>
        </Link>
    )
}

function QuickAction({ href, label, emoji }: { href: string, label: string, emoji: string }) {
    return (
        <Link
            href={href}
            className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-neutral-900/50 border border-white/5 hover:bg-neutral-800 hover:border-white/20 transition-all group"
        >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{emoji}</span>
            <span className="text-xs font-medium text-neutral-400 group-hover:text-white text-center">{label}</span>
        </Link>
    )
}
