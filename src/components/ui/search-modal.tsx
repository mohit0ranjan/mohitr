import { useState, useEffect } from "react";
import { Search, X, ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/lib/data";

interface Post {
    id: string;
    title: string;
    date: string;
    excerpt?: string;
}

interface Opportunity {
    slug: string;
    title: string;
    company: string;
    type: string;
}

interface SearchModalProps {
    posts?: Post[];
    opportunities?: Opportunity[];
}

const staticPages = [
    { type: "Page", title: "Home", href: "/" },
    { type: "Page", title: "Projects", href: "/projects" },
    { type: "Page", title: "Blog", href: "/blog" },
    { type: "Page", title: "Tools", href: "/tools" },
    { type: "Page", title: "Gallery", href: "/gallery" },
    { type: "Page", title: "About", href: "/about" },
];

export default function SearchModal({ posts = [], opportunities = [] }: SearchModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    // Debounce Logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    // Build Search Index
    const items = [
        ...staticPages,
        ...PROJECTS.map(p => ({ type: "Project", title: p.title, href: p.link })),
        ...(opportunities || []).map(j => ({ type: "Opportunity", title: `${j.title} @ ${j.company}`, href: `/opportunities/${j.slug}` })),
        ...posts.map(p => ({ type: "Blog", title: p.title, href: `/blog/${p.id}` }))
    ];

    const filteredItems = debouncedQuery
        ? items.filter(item =>
            item.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
        : [];

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

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setQuery(""); // Reset query on close
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isOpen]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
                <Search size={14} className="text-neutral-500 group-hover:text-white transition-colors" />
                <span className="font-medium group-hover:text-white transition-colors">Search...</span>
                <kbd className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-neutral-500 border border-white/5 group-hover:border-white/10 group-hover:text-neutral-300 transition-colors">⌘ K</kbd>
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
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]"
                        >
                            <div className="flex items-center px-4 py-4 border-b border-white/5 gap-3 bg-white/[0.02]">
                                <Search className="text-neutral-500" size={20} />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search projects, blogs, opportunities..."
                                    className="flex-1 bg-transparent outline-none text-white placeholder-neutral-600 text-lg"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                {query && (
                                    <button onClick={() => setQuery("")} className="text-neutral-500 hover:text-white transition-colors">
                                        <X size={16} />
                                    </button>
                                )}
                            </div>

                            <div className="overflow-y-auto p-2 custom-scrollbar">
                                {!debouncedQuery ? (
                                    <div className="p-8 text-center text-neutral-600 text-sm">
                                        <div className="inline-block p-3 rounded-full bg-white/5 mb-3">
                                            <Search size={24} className="opacity-50" />
                                        </div>
                                        <p>Type to search across the portfolio...</p>
                                    </div>
                                ) : filteredItems.length === 0 ? (
                                    <div className="p-12 text-center text-neutral-500 text-sm">
                                        <p className="mb-2 text-lg">🤔</p>
                                        No results found for <span className="text-white">"{debouncedQuery}"</span>.
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        <h3 className="px-3 py-2 text-xs font-mono uppercase text-neutral-600 tracking-wider">Results</h3>
                                        {filteredItems.map((item, i) => (
                                            <Link
                                                key={i}
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 group transition-colors border border-transparent hover:border-white/5"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-2 rounded-lg ${item.type === 'Page' ? 'bg-blue-500/10 text-blue-400' :
                                                            item.type === 'Project' ? 'bg-purple-500/10 text-purple-400' :
                                                                item.type === 'Opportunity' ? 'bg-orange-500/10 text-orange-400' :
                                                                    'bg-green-500/10 text-green-400'
                                                        }`}>
                                                        {item.type === 'Opportunity' ? <Briefcase size={16} /> :
                                                            item.type === 'Page' ? <ArrowRight size={16} className="-rotate-45" /> :
                                                                null}
                                                        {item.type === 'Project' && <span className="text-xs font-bold">P</span>}
                                                        {item.type === 'Blog' && <span className="text-xs font-bold">B</span>}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-neutral-300 group-hover:text-white transition-colors">
                                                            {item.title}
                                                        </div>
                                                        <div className="text-[10px] text-neutral-500 uppercase tracking-wider">{item.type}</div>
                                                    </div>
                                                </div>
                                                <ArrowRight size={16} className="text-neutral-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="p-3 border-t border-white/5 bg-white/[0.02] text-[10px] text-neutral-500 flex justify-between px-6">
                                <div className="flex gap-4">
                                    <span><kbd className="font-sans bg-white/5 px-1.5 py-0.5 rounded border border-white/5">↑↓</kbd> Navigate</span>
                                    <span><kbd className="font-sans bg-white/5 px-1.5 py-0.5 rounded border border-white/5">Enter</kbd> Select</span>
                                </div>
                                <span><kbd className="font-sans bg-white/5 px-1.5 py-0.5 rounded border border-white/5">Esc</kbd> Close</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
