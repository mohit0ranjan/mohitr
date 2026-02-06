"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import SearchModal from "./search-modal";

interface NavbarProps {
    posts?: any[];
}

export default function Navbar({ posts = [] }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
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
        { name: "Opportunities", href: "/opportunities" },
        { name: "About", href: "/about" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4 flex justify-center",
                scrolled ? "pt-4" : "pt-6"
            )}
        >
            <div
                className={cn(
                    "flex items-center justify-between transition-all duration-500 rounded-full px-6 py-3 w-full max-w-4xl shadow-2xl relative group/nav",
                    "border border-white/10 overflow-hidden",
                    scrolled
                        ? "bg-black/80 backdrop-blur-xl"
                        : "bg-black/40 backdrop-blur-md"
                )}
            >
                {/* Background Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 via-accent-purple/5 to-accent-teal/5 opacity-0 group-hover/nav:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute -inset-[1px] bg-gradient-to-r from-accent-blue/20 via-accent-purple/20 to-accent-teal/20 rounded-full opacity-0 group-hover/nav:opacity-100 transition-opacity duration-700 -z-10 blur-sm pointer-events-none" />

                <Link href="/" className="group flex items-center gap-1.5">
                    <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70 group-hover:from-accent-blue group-hover:to-accent-purple transition-all duration-500">
                        Mohit
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-blue animate-pulse" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-bold transition-all duration-300 relative group/link",
                                pathname === link.href ? "text-white" : "text-neutral-400 hover:text-white"
                            )}
                        >
                            {link.name}
                            <span className={cn(
                                "absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent-blue transition-all duration-300 rounded-full",
                                pathname === link.href ? "w-full" : "group-hover/link:w-full"
                            )} />
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <SearchModal posts={posts} />
                    <a
                        href="https://github.com/mohit0ranjan"
                        target="_blank"
                        className="text-xs font-mono bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2 group"
                    >
                        <span className="text-neutral-500 group-hover:text-neutral-300 transition-opacity">gh/</span>
                        <span className="font-bold text-white">mohit0ranjan</span>
                    </a>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <SearchModal posts={posts} />
                    <button
                        className="text-white"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileOpen && (
                <div className="absolute top-20 left-4 right-4 bg-black/90 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 md:hidden shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium text-white py-2 border-b border-white/5"
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
