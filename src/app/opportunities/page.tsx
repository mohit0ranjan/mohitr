
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { ArrowUpRight, Calendar, MapPin, Building2, Ticket, BarChart, Clock } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function OpportunitiesPage() {
    const opportunities = await prisma.opportunity.findMany({
        where: {
            isPublished: true,
            status: 'Active'
        },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <main className="min-h-screen bg-[#030303] text-foreground relative z-0 overflow-hidden font-sans">
            {/* Backgrounds */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] bg-noise"></div>

            <div className="container mx-auto px-6 md:px-12 pt-40 pb-32 max-w-5xl relative z-10">

                <header className="mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-[1px] bg-indigo-500/50" />
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-indigo-400">Career & Growth</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                        Open <br /> <span className="text-neutral-500">Signals.</span>
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
                        Curated list of internships, jobs, and research roles from my network and beyond.
                    </p>
                </header>

                <div className="grid gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                    {opportunities.length === 0 ? (
                        <div className="text-neutral-500 py-24 border border-dashed border-white/5 rounded-3xl text-center bg-white/[0.02]">
                            <p>No active opportunities at the moment.</p>
                            <p className="text-sm mt-2 opacity-50">Check back later or follow explicitly.</p>
                        </div>
                    ) : (
                        opportunities.map((opp, index) => (
                            <Link
                                key={opp.id}
                                href={`/opportunities/${opp.slug}`}
                                className="group relative block w-full bg-[#080808] border border-white/5 hover:border-indigo-500/20 rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl shadow-black/50 hover:shadow-indigo-900/10"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex flex-col md:flex-row h-full">

                                    {/* LEFT: MAIN PASS (70%) */}
                                    <div className="flex-1 p-8 relative">
                                        <div className="relative z-10 flex flex-col justify-between h-full gap-6">
                                            <div>
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                                    <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-indigo-400 transition-colors tracking-tight">
                                                        {opp.title}
                                                    </h2>
                                                    <span className="w-fit text-[10px] font-mono uppercase tracking-widest text-indigo-400 border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 rounded-full">
                                                        {opp.type}
                                                    </span>
                                                </div>
                                                <p className="text-lg text-neutral-400 font-medium flex items-center gap-2 mb-4">
                                                    <Building2 size={16} className="text-neutral-600" />
                                                    {opp.company}
                                                </p>
                                                <p className="text-neutral-500 text-sm leading-relaxed max-w-2xl line-clamp-2">
                                                    {opp.shortDescription}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-neutral-500 uppercase tracking-wider mt-4 pt-6 border-t border-dashed border-white/5">
                                                <span className="flex items-center gap-2">
                                                    <MapPin size={12} className="text-neutral-600" />
                                                    {opp.location}
                                                </span>
                                                <span className="hidden md:block w-1 h-1 rounded-full bg-neutral-800" />
                                                <span className="flex items-center gap-2">
                                                    <Clock size={12} className="text-neutral-600" />
                                                    Posted {new Date(opp.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* DIVIDER (Perforation) */}
                                    <div className="relative md:w-px h-px md:h-auto border-t md:border-t-0 md:border-l-2 border-dashed border-[#1a1a1a] bg-[#080808]">
                                        <div className="absolute -left-2 -top-2 md:-top-2 md:-left-2 w-4 h-4 bg-[#030303] rounded-full z-20" />
                                        <div className="absolute -right-2 -top-2 md:-bottom-2 md:-left-2 w-4 h-4 bg-[#030303] rounded-full z-20" />
                                    </div>

                                    {/* RIGHT: STUB (Action) */}
                                    <div className="md:w-48 bg-[#0a0a0a] group-hover:bg-[#0c0c0c] transition-colors p-6 flex flex-row md:flex-col items-center justify-between md:justify-center relative">

                                        <div className="hidden md:flex flex-col gap-1 w-full items-center opacity-20 mb-4">
                                            <div className="w-full h-1 bg-white mb-1" />
                                            <div className="w-4/5 h-0.5 bg-white" />
                                            <div className="w-full h-2 bg-white mt-1" />
                                        </div>

                                        <div className="text-left md:text-center md:mb-4">
                                            <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest mb-1">Status</p>
                                            <p className="text-xs font-bold text-indigo-500 flex items-center md:justify-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                                                Verified
                                            </p>
                                        </div>

                                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-lg shadow-indigo-500/20">
                                            <ArrowUpRight size={18} />
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </main>
    )
}
