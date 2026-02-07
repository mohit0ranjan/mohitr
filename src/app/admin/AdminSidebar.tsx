"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    FolderKanban,
    Wrench,
    Image as ImageIcon,
    Cpu,
    History,
    Crosshair,
    Zap,
    Radio,
    LogOut,
    ExternalLink,
    LayoutTemplate
} from "lucide-react"

export function AdminSidebar() {
    const pathname = usePathname()

    const navGroups = [
        {
            label: "Content",
            items: [
                { href: "/admin", label: "Overview", icon: LayoutDashboard },
                { href: "/admin/hero", label: "Hero Section", icon: LayoutTemplate },
                { href: "/admin/about", label: "About Section", icon: Briefcase },
                { href: "/admin/posts", label: "Blog Posts", icon: FileText },
                { href: "/admin/projects", label: "Projects", icon: FolderKanban },
                { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
            ]
        },
        {
            label: "Professional",
            items: [
                { href: "/admin/opportunities", label: "Opportunities", icon: Briefcase },
                { href: "/admin/timeline", label: "Timeline", icon: History },
                { href: "/admin/capabilities", label: "Capabilities", icon: Zap },
            ]
        },
        {
            label: "System",
            items: [
                { href: "/admin/tech-stack", label: "Tech Stack", icon: Cpu },
                { href: "/admin/tools", label: "Dev Tools", icon: Wrench },
                { href: "/admin/focus", label: "Current Focus", icon: Crosshair },
                { href: "/admin/updates", label: "Update Ticker", icon: Radio },
            ]
        }
    ]

    return (
        <nav className="flex-1 flex flex-col min-h-full">
            <div className="space-y-8">
                {navGroups.map((group) => (
                    <div key={group.label}>
                        <h3 className="px-4 text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3">
                            {group.label}
                        </h3>
                        <div className="space-y-1">
                            {group.items.map((link) => {
                                const isActive = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href))
                                const Icon = link.icon

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`group flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-all duration-200 border border-transparent ${isActive
                                            ? "bg-white/5 text-white border-white/5 shadow-sm"
                                            : "text-neutral-400 hover:text-white hover:bg-white/5"
                                            }`}
                                    >
                                        <Icon size={16} className={`transition-colors ${isActive ? "text-indigo-400" : "text-neutral-500 group-hover:text-indigo-400"}`} />
                                        <span>{link.label}</span>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 space-y-2">
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors group"
                >
                    <ExternalLink size={16} className="text-neutral-500 group-hover:text-white" />
                    Visit Website
                </Link>
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </div>

            {/* User Profile Snippet (Optional) */}
            <div className="mt-auto pt-6 px-4 pb-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs border border-indigo-500/30">
                        MR
                    </div>
                    <div>
                        <p className="text-xs font-medium text-white">Mohit Ranjan</p>
                        <p className="text-[10px] text-neutral-500">Super Admin</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}
