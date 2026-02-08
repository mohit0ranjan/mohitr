"use client"

import { ReactNode, useState, useEffect } from "react"
import { AdminSidebar } from "./AdminSidebar"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    // Clear state on navigation
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#030303] text-white font-sans selection:bg-purple-500/30">
            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between p-4 bg-[#030303] border-b border-white/5 sticky top-0 z-[60]">
                <div>
                    <h1 className="text-lg font-bold">Admin</h1>
                    <p className="text-[10px] text-neutral-500">Portfolio Manager</p>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg bg-neutral-900 border border-white/5 text-white active:scale-95 transition-transform"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </header>

            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 w-72 bg-[#030303] border-r border-white/5 p-6 flex flex-col z-[55] 
                transition-transform duration-300 md:translate-x-0
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:w-64 md:fixed
            `}>
                <div className="mb-8 px-2 hidden md:block">
                    <h1 className="text-xl font-bold tracking-tight">Admin</h1>
                    <p className="text-xs text-neutral-500 mt-1">Portfolio Manager</p>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                    <AdminSidebar />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full md:ml-64 p-4 md:p-8 min-h-screen bg-[#030303]">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
