
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ArrowLeft, Calendar, MapPin, Clock, Building2, ExternalLink } from 'lucide-react'
import { ShareButtons } from '@/components/ui/ShareButtons'
import { remark } from 'remark'
import html from 'remark-html'

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

    // Render markdown
    let contentHtml = opp.fullDescription
    try {
        const processedContent = await remark().use(html).process(opp.fullDescription)
        contentHtml = processedContent.toString()
    } catch (e) { console.error("Markdown error", e) }


    return (
        <main className="min-h-screen bg-[#030303] text-foreground relative z-0 selection:bg-indigo-500/30 font-sans">
            {/* Backgrounds */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] bg-noise"></div>

            <div className="container mx-auto px-6 md:px-12 pt-32 pb-20 max-w-5xl relative z-10">

                {/* Back Link */}
                <Link href="/opportunities" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Opportunities
                </Link>

                <article className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {/* Header */}
                    <header className="mb-12 border-b border-white/5 pb-10">
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border ${opp.type === 'Internship' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-purple-500/10 border-purple-500/20 text-purple-400'}`}>
                                {opp.type}
                            </span>
                            {opp.status === 'Active' ? (
                                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-green-500/10 border border-green-500/20 text-green-400">
                                    Active
                                </span>
                            ) : (
                                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-neutral-500/10 border border-neutral-500/20 text-neutral-400">
                                    {opp.status}
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
                            {opp.title}
                        </h1>

                        <div className="flex flex-col md:flex-row md:items-center gap-6 text-neutral-400">
                            <div className="flex items-center gap-2 text-lg font-medium text-neutral-200">
                                <Building2 className="w-5 h-5 text-indigo-400" />
                                {opp.company}
                            </div>

                            <div className="hidden md:block w-px h-5 bg-white/10" />

                            <div className="flex flex-wrap gap-6 text-sm">
                                {opp.location && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        {opp.location}
                                    </div>
                                )}
                                {opp.duration && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {opp.duration}
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Posted {new Date(opp.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Main Layout: Content + Sidebar */}
                    <div className="grid md:grid-cols-[1fr,320px] gap-12">

                        {/* Description */}
                        <div>
                            {/* Stipend Callout */}
                            {opp.stipend && (
                                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 mb-10 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 shrink-0">
                                        <span className="font-bold">$</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">Stipend / Comp</p>
                                        <p className="text-lg font-medium text-white">{opp.stipend}</p>
                                    </div>
                                </div>
                            )}

                            <div
                                className="prose prose-invert prose-lg max-w-none text-neutral-300 prose-headings:text-white prose-a:text-indigo-400 prose-strong:text-white prose-li:text-neutral-300"
                                dangerouslySetInnerHTML={{ __html: contentHtml }}
                            />
                        </div>

                        {/* Sidebar: Actions */}
                        <aside className="space-y-8">
                            {/* Apply Card */}
                            <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 md:sticky md:top-24 backdrop-blur-sm">
                                <h3 className="text-lg font-bold text-white mb-6">Interested?</h3>

                                {opp.applyLink && opp.status === 'Active' ? (
                                    <a
                                        href={opp.applyLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-white text-black text-center font-bold py-4 rounded-xl hover:bg-neutral-200 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)] mb-4 flex items-center justify-center gap-2 group"
                                    >
                                        Apply Now
                                        <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                                    </a>
                                ) : (
                                    <button disabled className="block w-full bg-neutral-800 text-neutral-500 text-center font-bold py-4 rounded-xl cursor-not-allowed mb-4 select-none">
                                        {opp.status === 'Active' ? 'No Link Available' : 'Applications Closed'}
                                    </button>
                                )}

                                <div className="pt-6 border-t border-white/5">
                                    <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-4">Share this role</p>
                                    <ShareButtons title={`${opp.title} at ${opp.company}`} slug={slug} />
                                </div>
                            </div>
                        </aside>

                    </div>
                </article>
            </div>
        </main>
    )
}
