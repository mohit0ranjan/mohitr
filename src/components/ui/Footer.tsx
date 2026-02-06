"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/motion";
import { Copy, Mail } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ConnectSection from "@/components/sections/Connect";

interface GalleryItem {
    id: string;
    title: string;
    imageUrl: string;
    date: Date;
}

export default function Footer({ galleryItems = [] }: { galleryItems?: GalleryItem[] }) {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    // Limit to latest 4 for the strip if provided
    const recentSnaps = galleryItems.slice(0, 4);

    if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
        return null;
    }

    return (
        <footer className="bg-black relative z-20 border-t border-white/10 overflow-hidden">

            {/* Render Grand Finale only on Home Page */}
            {isHomePage && (
                <>
                    {/* 0. VISUAL JOURNAL STRIP */}
                    {recentSnaps.length > 0 && (
                        <div className="w-full border-b border-white/5 py-12 bg-[#050505]">
                            <div className="container mx-auto px-6 max-w-7xl">
                                <FadeIn className="mb-8 flex items-center justify-between">
                                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-600">Visual Journal</span>
                                    <span className="text-xs font-mono text-neutral-600">@mohitranjan</span>
                                </FadeIn>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {recentSnaps.map((item) => (
                                        <div key={item.id} className="relative aspect-square group overflow-hidden rounded-md bg-neutral-900 filter grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 1. HUGE CALL TO ACTION */}
                    <div className="py-24 md:py-32 container mx-auto px-6 md:px-12 max-w-7xl text-center">
                        <FadeIn>
                            <h2 className="text-[12vw] leading-none font-black text-white tracking-tighter mb-8 select-none">
                                LET'S BUILD
                            </h2>
                            <p className="text-xl md:text-2xl text-neutral-400 font-light max-w-2xl mx-auto mb-12">
                                Have an idea or a complex system to engineer? <br className="hidden md:block" />
                                I'm currently available for select opportunities.
                            </p>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <Link
                                    href="mailto:hello@mohit.com"
                                    className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 hover:scale-105 transition-transform duration-300"
                                >
                                    <Mail size={20} />
                                    Say Hello
                                </Link>
                                <button
                                    className="px-8 py-4 rounded-full border border-white/20 text-white font-medium flex items-center gap-2 hover:bg-white/5 transition-colors"
                                    onClick={() => {
                                        navigator.clipboard.writeText("hello@mohit.com");
                                        alert("Email copied!");
                                    }}
                                >
                                    <Copy size={20} />
                                    Copy Email
                                </button>
                            </div>
                        </FadeIn>
                    </div>

                    {/* CONNECT & FOLLOW SECTION */}
                    <ConnectSection />


                    {/* 2. MARQUEE STRIP */}
                    <div className="w-full bg-indigo-600 overflow-hidden py-3 rotate-1 scale-105 origin-left md:rotate-0 md:scale-100">
                        <div className="flex whitespace-nowrap animate-marquee">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="flex items-center mx-8 text-black font-bold font-mono tracking-widest text-sm uppercase">
                                    <span>Open for Work</span>
                                    <span className="mx-4">•</span>
                                    <span>System Architecture</span>
                                    <span className="mx-4">•</span>
                                    <span>Full Stack</span>
                                    <span className="mx-4">•</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}


            {/* 3. SUBTLE BOTTOM FOOTER (Always Visible) */}
            <div className="bg-[#050505] py-12 border-t border-white/5">
                <div className="container mx-auto px-6 md:px-12 max-w-7xl flex flex-col md:flex-row justify-between items-end gap-8">

                    <div>
                        <span className="text-2xl font-bold text-white block mb-2">MR.</span>
                        <p className="text-neutral-500 text-sm max-w-xs">
                            Crafted with Next.js, Tailwind, and Prisma.<br />
                            Deployed on Vercel.
                        </p>
                    </div>

                    <div className="flex gap-8">
                        <Link href="https://github.com" className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-wider font-mono">Github</Link>
                        <Link href="https://linkedin.com" className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-wider font-mono">LinkedIn</Link>
                        <Link href="https://twitter.com" className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-wider font-mono">Twitter</Link>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </footer>
    );
}
