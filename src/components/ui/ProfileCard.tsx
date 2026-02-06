import React from "react";
import Image from "next/image";

export default function ProfileCard() {
    return (
        // Kept the larger size (max-w-[26rem]) as requested
        <div className="relative group z-10 w-full max-w-[26rem] mx-auto animate-float cursor-default">

            {/* The Strap - Minimal and Clean */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[2px] h-32 bg-gradient-to-b from-white/0 via-white/20 to-white/40 z-0 origin-top" />

            {/* The Card Container - Sleek Frosted Glass */}
            <div className="relative bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-1.5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-700 hover:shadow-[0_35px_70px_-15px_rgba(8,145,178,0.2)] group-hover:border-accent-blue/30 group-hover:-translate-y-1">

                {/* Inner Content Area */}
                <div className="relative bg-black rounded-[1.7rem] overflow-hidden">

                    {/* Top Decorative Header */}
                    <div className="h-28 bg-gradient-to-br from-accent-blue/20 via-accent-purple/20 to-accent-amber/10 relative p-6 flex flex-col justify-between">
                        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20" />
                        {/* Subtle geometric overlay */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                        <div className="flex justify-between items-start relative z-10">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-white/50" />
                                <div className="w-2 h-2 rounded-full bg-white/30" />
                            </div>
                            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">NITJ • CSE</span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="px-8 pb-8 pt-0 relative">

                        {/* Avatar - Overlapping Header */}
                        <div className="-mt-12 mb-6 relative w-24 h-24 rounded-2xl p-1 bg-black">
                            <div className="w-full h-full rounded-xl overflow-hidden relative border border-white/10">
                                <Image
                                    src="/hero-avatar.png"
                                    alt="Profile"
                                    width={100}
                                    height={100}
                                    className="object-cover w-full h-full opacity-90"
                                />
                            </div>
                            <div className="absolute bottom-[-4px] right-[-4px] w-4 h-4 rounded-full bg-green-500 border-2 border-black" />
                        </div>

                        {/* Identity */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Mohit Ranjan</h2>
                            <div className="flex items-center gap-3 text-sm text-muted">
                                <span className="font-medium text-white/80">Developer</span>
                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                <span>Software Engineer</span>
                            </div>
                        </div>

                        {/* Meta Data Grid */}
                        <div className="grid grid-cols-2 gap-4 py-6 border-t border-white/5">
                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-muted/40 mb-1">Location</div>
                                <div className="text-white/90 text-sm font-medium">India</div>
                            </div>
                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-muted/40 mb-1">Status</div>
                                <div className="text-accent-teal text-sm font-medium flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
                                    Open to work
                                </div>
                            </div>
                        </div>

                        {/* Barcode Visual */}
                        <div className="mt-2 pt-4 border-t border-white/5 flex justify-between items-end opacity-40">
                            <div className="h-8 w-24 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,white_2px,white_4px)]" />
                            <span className="font-mono text-[10px] tracking-widest">84920-DEV</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
