"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Menu, X, Command } from "lucide-react";
import SearchModal from "./search-modal";

interface NavbarProps {
    posts?: any[];
    opportunities?: any[];
}

export default function Navbar({ posts = [], opportunities = [] }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Don't render on admin or login pages
    if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
        return null;
    }

    const links = [
        { name: "Projects", href: "/projects" },
        { name: "Tools", href: "/tools" },
        { name: "Blog", href: "/blog" },
        { name: "Opps", href: "/opportunities", full: "Opportunities" }, // Shortened for space
        { name: "Hackathons", href: "/hackathons" },
        { name: "About", href: "/about" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 flex justify-center items-start pt-6 px-4 pointer-events-none"
                )}
            >
                <div
                    className={cn(
                        "pointer-events-auto flex items-center gap-1 p-1.5 rounded-full transition-all duration-500 ease-out border border-white/5",
                        scrolled
                            ? "bg-[#0a0a0a]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] scale-[0.98]"
                            : "bg-[#0a0a0a]/50 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
                    )}
                >
                    {/* Logo Pill */}
                    <Link
                        href="/"
                        className="flex items-center justify-center px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group"
                    >
                        <span className="font-bold text-sm tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                            MR
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center bg-white/5 rounded-full px-2 py-1 border border-white/5">
                        {links.map((link) => {
                            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 group"
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-white/10 rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className={cn(
                                        "relative z-10 transition-colors duration-300",
                                        isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"
                                    )}>
                                        {link.name}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-1 pl-1">
                        <div className="rounded-full hover:bg-white/5 transition-colors">
                            <SearchModal posts={posts} opportunities={opportunities} />
                        </div>

                        <a
                            href="https://github.com/mohit0ranjan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-neutral-400 hover:text-white"
                        >
                            <Github className="w-4 h-4" />
                        </a>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                        >
                            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-24 left-4 right-4 z-40 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl md:hidden flex flex-col gap-2 origin-top"
                    >
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "flex items-center justify-between p-4 rounded-xl transition-all",
                                    pathname === link.href
                                        ? "bg-white/10 text-white"
                                        : "hover:bg-white/5 text-neutral-400 hover:text-white"
                                )}
                            >
                                <span className="text-sm font-medium">{link.full || link.name}</span>
                                {pathname === link.href && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                )}
                            </Link>
                        ))}
                        <div className="h-px bg-white/5 my-2" />
                        <a
                            href="https://github.com/mohit0ranjan"
                            target="_blank"
                            className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/5 text-neutral-400 hover:text-white transition-all"
                        >
                            <Github className="w-4 h-4" />
                            <span className="text-sm font-medium">GitHub Profile</span>
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
