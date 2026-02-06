import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

import Hero from "@/components/sections/Hero";
import IdentitySignal from "@/components/sections/IdentitySignal";
import FeaturedWork from "@/components/sections/FeaturedWork";
import OpportunityStream from "@/components/sections/OpportunityStream";
import Workbench from "@/components/sections/Workbench";
import Journey from "@/components/sections/Journey";
import WritingStudio from "@/components/sections/WritingStudio";
import Gallery from "@/components/sections/Gallery";


export const dynamic = 'force-dynamic'

export default async function Home() {
  // Fetch data
  const [posts, projects, opportunities, techTools, timelineItems, galleryItems] = await Promise.all([
    prisma.post.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
      take: 4
    }),
    prisma.project.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: 'desc' },
      take: 4
    }),
    prisma.opportunity.findMany({
      where: { status: "Active" },
      orderBy: { dateShared: 'desc' },
      take: 5
    }),
    prisma.techTool.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }
    }),
    prisma.timelineEntry.findMany({
      where: { isVisible: true },
      orderBy: { order: 'desc' },
      take: 6
    }),
    prisma.galleryItem.findMany({
      where: { isVisible: true },
      orderBy: { date: 'desc' },
      take: 8
    })
  ]);

  // Format Data
  const formattedPosts = posts.map(post => ({
    id: post.slug,
    date: post.publishedAt ? format(post.publishedAt, "MMM dd, yyyy") : "",
    title: post.title,
    excerpt: post.excerpt || undefined
  }));

  const formattedProjects = projects.map(proj => ({
    id: proj.id,
    title: proj.name,
    category: proj.category,
    description: proj.description,
    href: proj.liveUrl || proj.githubUrl || "#",
    tech: proj.techStack ? proj.techStack.split(',').map(t => t.trim()) : []
  }));

  const formattedOpportunities = opportunities.map(job => ({
    id: job.id,
    role: job.role,
    company: job.company,
    type: job.type,
    location: job.location || "Remote",
    link: job.url || "#",
    isNew: true, // Could compare dateShared difference
    dateShared: job.dateShared
  }));

  // Fix: Gallery expects Date object, and imageUrl
  const formattedGalleryItems = galleryItems.map(item => ({
    id: item.id,
    title: item.title,
    imageUrl: item.imageUrl,
    date: item.date
  }));

  return (
    <main className="min-h-screen bg-[#030303] text-foreground selection:bg-indigo-500/30">

      {/* 1. SCENE I: THE CINEMATIC OPENING */}
      <Hero />

      {/* 2. SCENE II: THE PHILOSOPHY (SIGNAL) */}
      <IdentitySignal />

      {/* 3. SCENE III: THE OUTPUT (WORK) */}
      <FeaturedWork projects={formattedProjects} />

      {/* 4. SCENE IV: THE SIGNALS (OPPORTUNITIES) */}
      <OpportunityStream items={formattedOpportunities} />

      {/* 5. SCENE V: THE TOOLS (WORKBENCH) */}
      <Workbench tools={techTools} />

      {/* 6. SCENE VI: THE PATH (JOURNEY) */}
      <Journey items={timelineItems} />

      {/* 7. SCENE VII: THE THOUGHTS (WRITING) */}
      {/* 8. SCENE VIII: THOUGHTS (WRITING) */}
      <WritingStudio posts={formattedPosts} />



    </main>
  );
}
