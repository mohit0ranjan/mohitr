
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ArrowLeft, Calendar, MapPin, Clock, Building2, ExternalLink } from 'lucide-react'
import { ShareButtons } from '@/components/ui/ShareButtons'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const opp = await prisma.opportunity.findUnique({ where: { slug } })

    if (!opp) return { title: 'Opportunity Not Found' }

    return {
        title: `${opp.title} at ${opp.company} | Opportunities`,
        description: opp.shortDescription,
        openGraph: {
            title: `${opp.title} at ${opp.company}`,
            description: opp.shortDescription,
            type: 'article',
            publishedTime: opp.createdAt.toISOString(),
        }
    }
}

export default async function OpportunityDetailPage({ params }: Props) {
    const { slug } = await params
    const opp = await prisma.opportunity.findUnique({ where: { slug } })

    if (!opp || !opp.isPublished) notFound()

    return (
        <main className="min-h-screen bg-[#050505] text-foreground relative z-0 font-sans selection:bg-neutral-800">
            {/* Subtle Ambient Background */}
            <div className="fixed top-0 inset-x-0 h-[400px] bg-gradient-to-b from-neutral-900/50 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 pt-24 pb-20 max-w-4xl relative z-10">

                {/* Navigation */}
                <Link href="/opportunities" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-8 group text-sm font-medium">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Jobs
                </Link>

                {/* Job Header Card */}
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 md:p-8 mb-8 backdrop-blur-md">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-white/10 text-white border border-white/5">
                                    {opp.company}
                                </span>
                                <span className={`px-2.5 py-0.5 rounded-md text-xs font-medium border ${opp.type === 'Internship' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'}`}>
                                    {opp.type}
                                </span>
                                {opp.location && (
                                    <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-neutral-800 text-neutral-400 border border-neutral-700 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> {opp.location}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                                {opp.title}
                            </h1>

                            <div className="flex items-center gap-4 text-sm text-neutral-500">
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    Posted {new Date(opp.createdAt).toLocaleDateString()}
                                </span>
                                {opp.stipend && (
                                    <span className="flex items-center gap-1.5 text-neutral-300">
                                        <span className="w-1 h-1 bg-neutral-600 rounded-full" />
                                        {opp.stipend}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Desktop Apply Button (Sticky-ish) */}
                        <div className="hidden md:block shrink-0">
                            {opp.applyLink && (
                                <a
                                    href={opp.applyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-neutral-200 transition-all shadow-lg shadow-white/5 hover:scale-105 active:scale-95"
                                >
                                    Apply Now <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid md:grid-cols-[1fr,300px] gap-12 items-start">

                    {/* Job Description */}
                    <article className="prose prose-invert prose-neutral max-w-none 
                        prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight prose-headings:mt-12 prose-headings:mb-6
                        prose-p:text-neutral-300 prose-p:leading-loose prose-p:mb-6
                        prose-li:text-neutral-300 prose-li:marker:text-emerald-500/50 prose-li:my-2
                        prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                        prose-strong:text-white prose-strong:font-semibold
                        prose-hr:border-neutral-800 prose-hr:my-10">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {opp.fullDescription}
                        </ReactMarkdown>
                    </article>

                    {/* Sidebar / Mobile Apply */}
                    <aside className="space-y-8 sticky top-24">
                        {/* Mobile Apply Button (Visible on small screens) */}
                        <div className="md:hidden sticky bottom-4 z-50">
                            {opp.applyLink && (
                                <a
                                    href={opp.applyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center bg-white text-black px-6 py-4 rounded-xl font-bold shadow-2xl shadow-black/50 border border-white/20"
                                >
                                    Apply Now
                                </a>
                            )}
                        </div>

                        {/* Share Widget */}
                        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 shadow-xl shadow-black/20">
                            <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-4">Share Signal</h3>
                            <ShareButtons title={`${opp.title} at ${opp.company}`} slug={slug} />
                        </div>
                    </aside>

                </div>

            </div>
        </main>
    )
}
