import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Navbar from "@/components/ui/navbar";
import DatasetCard from "@/components/offcampus/DatasetCard";
import TemplateCard from "@/components/offcampus/TemplateCard";
import ToolCard from "@/components/offcampus/ToolCard";
import { Mail, BookOpen, PenTool, Database } from "lucide-react";

export const metadata: Metadata = {
    title: "Off-Campus Outreach Hub | Mohit Ranjan",
    description: "verified recruiter email datasets, cold email templates, and outreach tools for job seekers.",
    openGraph: {
        title: "Off-Campus Outreach Hub",
        description: "One-stop solution for cold emailing recruiters and finding off-campus opportunities.",
        images: ["/og-offcampus.png"],
    },
};

export const revalidate = 3600;

export default async function OffCampusPage() {
    const [datasets, templates, tools] = await Promise.all([
        prisma.recruiterDataset.findMany({ where: { isPublished: true }, orderBy: { createdAt: 'desc' } }),
        prisma.coldEmailTemplate.findMany({ where: { isPublished: true }, orderBy: { createdAt: 'asc' } }),
        prisma.outreachTool.findMany({ where: { isPublished: true }, orderBy: { pricing: 'asc' } }),
    ]);

    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-purple-500/30">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-16 px-6 border-b border-white/5 bg-noise overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
                {/* Local noise overlay if global not enough */}
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none" />

                <div className="container max-w-5xl mx-auto text-center relative z-10">
                    <span className="inline-block mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-400">
                        🚀 For Students & Job Seekers
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
                        Master the Art of <br /> Cold Emailing.
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Access verified recruiter datasets, proven templates, and powerful tools to land your next off-campus opportunity.
                    </p>
                </div>
            </section>

            <div className="container max-w-6xl mx-auto px-6 py-24 flex flex-col gap-32">

                {/* 1. DATASETS MARKETPLACE */}
                <section id="datasets" className="scroll-mt-32">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <Database className="w-6 h-6 text-blue-500" />
                                <h2 className="text-3xl font-bold">Recruiter Datasets</h2>
                            </div>
                            <p className="text-neutral-400 max-w-lg">
                                Verified email lists of HRs and Talent Acquisition leads. Updated manually to ensure high deliverability.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {datasets.map((d) => (
                            <DatasetCard
                                key={d.id}
                                title={d.title}
                                companies={d.companies}
                                role={d.role}
                                location={d.location}
                                emailCount={d.emailCount}
                                price={d.price}
                                topmateLink={d.topmateLink}
                                isVerified={d.isVerified}
                                imageUrl={d.imageUrl}
                            />
                        ))}
                    </div>
                </section>

                {/* 2. EMAIL TEMPLATES */}
                <section id="templates" className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-4">
                        <Mail className="w-6 h-6 text-green-500" />
                        <h2 className="text-3xl font-bold">Cold Email Templates</h2>
                    </div>
                    <p className="text-neutral-400 mb-12 max-w-2xl">
                        Copy-paste ready templates that actually get replies. Customized for internships, full-time roles, and referral requests.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {templates.map((t) => (
                            <TemplateCard
                                key={t.id}
                                title={t.title}
                                subject={t.subject}
                                body={t.body}
                                tips={t.tips}
                            />
                        ))}
                    </div>
                </section>

                {/* 3. GUIDE / PROCESS (Static Content for now) */}
                <section id="guide" className="p-8 md:p-12 rounded-3xl bg-neutral-900/30 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <BookOpen className="w-6 h-6 text-yellow-500" />
                            <h2 className="text-3xl font-bold">The Process</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                { step: "01", title: "Research & Verify", desc: "Don't spam. Find relevance between your skills and the company's needs." },
                                { step: "02", title: "Find Valid Emails", desc: "Use tools or our datasets to get the right contact. Verify before sending." },
                                { step: "03", title: "Personalize", desc: "Mention a specific project or news about the company in the first line." },
                                { step: "04", title: "Follow Up", desc: "If no reply in 3 days, send a gentle nudge. Persistence wins." }
                            ].map((s) => (
                                <div key={s.step} className="flex flex-col gap-2">
                                    <span className="text-4xl font-bold text-white/10">{s.step}</span>
                                    <h3 className="font-semibold text-white">{s.title}</h3>
                                    <p className="text-sm text-neutral-400">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. TOOLS */}
                <section id="tools" className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-4">
                        <PenTool className="w-6 h-6 text-purple-500" />
                        <h2 className="text-3xl font-bold">Curated Tools</h2>
                    </div>
                    <p className="text-neutral-400 mb-12">
                        Essential tools for email verification, tracking, and AI writing assistance.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tools.map((tool) => (
                            <ToolCard
                                key={tool.id}
                                name={tool.name}
                                description={tool.description}
                                link={tool.link}
                                pricing={tool.pricing}
                                category={tool.category}
                            />
                        ))}
                    </div>
                </section>

            </div>

            {/* Footer note */}
            <div className="py-12 text-center text-neutral-600 text-sm border-t border-white/5">
                <p>Designed to help you navigate off-campus placements.</p>
                <p className="mt-2">© {new Date().getFullYear()} Mohit Ranjan</p>
            </div>
        </main>
    );
}
