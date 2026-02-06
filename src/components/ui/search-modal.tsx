"use client";

import { useState, useEffect } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, JOBS } from "@/lib/data";

interface Post {
    id: string;
    title: string;
    date: string;
    excerpt?: string;
}

interface SearchModalProps {
    posts?: Post[];
}

const staticPages = [
    { type: "Page", title: "Home", href: "/" },
    { type: "Page", title: "Projects", href: "/projects" },
    { type: "Page", title: "Blog", href: "/blog" },
    { type: "Page", title: "Tools", href: "/tools" },
    { type: "Page", title: "Gallery", href: "/gallery" },
    { type: "Page", title: "About", href: "/about" },
];

export default function SearchModal({ posts = [] }: SearchModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    const items = [
        ...staticPages,
        ...PROJECTS.map(p => ({ type: "Project", title: p.title, href: p.link })),
        ...JOBS.map(j => ({ type: "Job", title: `${j.role} at ${j.company}`, href: j.link })),
        ...posts.map(p => ({ type: "Blog", title: p.title, href: `/blog/${p.id}` }))
    ];

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
                <Search size={14} className="text-accent-blue" />
                <span className="font-medium">Search Command</span>
                <kbd className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono text-neutral-300 border border-white/10">⌘ K</kbd>
            </button>

            <button onClick={() => setIsOpen(true)} className="md:hidden text-white p-2">
                <Search size={20} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                        >
                            <div className="flex items-center px-4 py-4 border-b border-white/5 gap-3">
                                <Search className="text-muted" size={20} />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search projects, pages, tools..."
                                    className="flex-1 bg-transparent outline-none text-white placeholder-muted/50"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button onClick={() => setIsOpen(false)} className="text-muted hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="max-h-[60vh] overflow-y-auto p-2">
                                {filteredItems.length === 0 ? (
                                    <div className="p-8 text-center text-muted text-sm">No results found.</div>
                                ) : (
                                    <div className="space-y-1">
                                        {filteredItems.map((item, i) => (
                                            <Link
                                                key={i}
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 group transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${item.type === 'Page' ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' :
                                                        item.type === 'Project' ? 'border-purple-500/30 text-purple-400 bg-purple-500/10' :
                                                            'border-green-500/30 text-green-400 bg-green-500/10'
                                                        }`}>
                                                        {item.type}
                                                    </span>
                                                    <span className="font-medium text-neutral-300 group-hover:text-white transition-colors">{item.title}</span>
                                                </div>
                                                <ArrowRight size={14} className="text-neutral-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="p-2 border-t border-white/5 text-[10px] text-muted text-center flex justify-center gap-4">
                                <span>Navigate <kbd className="font-sans">↑↓</kbd></span>
                                <span>Select <kbd className="font-sans">Enter</kbd></span>
                                <span>Close <kbd className="font-sans">Esc</kbd></span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
