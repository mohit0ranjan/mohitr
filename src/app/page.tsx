import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

import Hero from "@/components/sections/Hero";
import ImpactMetrics from "@/components/sections/ImpactMetrics";
import IdentitySignal from "@/components/sections/IdentitySignal";
import FeaturedWork from "@/components/sections/FeaturedWork";
import OpportunityStream from "@/components/sections/OpportunityStream";
import Workbench from "@/components/sections/Workbench";
import Journey from "@/components/sections/Journey";
import WritingStudio from "@/components/sections/WritingStudio";
import Gallery from "@/components/sections/Gallery";
import CurrentFocus from "@/components/sections/CurrentFocus";
import Capabilities from "@/components/sections/Capabilities";


export const revalidate = 3600 // Revalidate at least every hour


export default async function Home() {
  // Fetch data
  const [
    posts,
    projects,
    opportunities,
    techTools,
    timelineItems,
    galleryItems,
    focusPoints,
    capabilities,
    heroContentRaw,
    settingsRaw,
    latestTicker,
    postsCount,
    projectsCount,
    toolsCount,
    opportunitiesCount
  ] = await Promise.all([
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
      orderBy: { createdAt: 'desc' },
      take: 5
    }),
    prisma.techTool.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }
    }),
    prisma.timelineEntry.findMany({
      where: { isVisible: true },
      orderBy: { order: 'desc' }, // Order by order field
      take: 10
    }),
    prisma.galleryItem.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }, // Use order for gallery
      take: 10
    }),
    prisma.focusPoint.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    }),
    prisma.capability.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }
    }),
    prisma.pageContent.findUnique({ where: { section: 'hero' } }),
    prisma.pageContent.findUnique({ where: { section: 'settings' } }),
    prisma.tickerUpdate.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    }),
    // IMPACT METRICS COUNTS
    prisma.post.count({ where: { isPublished: true } }),
    prisma.project.count(),
    prisma.devTool.count({ where: { isPublished: true } }),
    prisma.opportunity.count()
  ]);

  // Parse JSON content safely
  const heroContent = heroContentRaw?.content ? JSON.parse(heroContentRaw.content) : null;
  const settings = settingsRaw?.content ? JSON.parse(settingsRaw.content) : null;

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
    title: job.title,
    company: job.company,
    type: job.type,
    location: job.location || "Remote",
    link: `/opportunities/${job.slug}`,
    isNew: true, // Could compare date difference
    dateShared: job.createdAt,
    isFeatured: job.isFeatured,
    description: job.shortDescription || undefined
  }));

  // Fix: Gallery expects Date object, and imageUrl
  const formattedGalleryItems = galleryItems.map(item => ({
    id: item.id,
    title: item.title,
    imageUrl: item.imageUrl,
    date: item.date
  }));

  const metricsCounts = {
    posts: postsCount,
    projects: projectsCount,
    tools: toolsCount,
    opportunities: opportunitiesCount
  };

  return (
    <main className="min-h-screen bg-[#030303] text-foreground selection:bg-indigo-500/30">

      {/* 1. SCENE I: THE CINEMATIC OPENING */}
      <Hero
        content={heroContent}
        settings={settings}
        ticker={latestTicker}
      />

      {/* 2. SCENE II: ACTIVE OPPORTUNITIES (Prominent) */}
      <OpportunityStream items={formattedOpportunities} />

      {/* 3. SCENE III: IMPACT METRICS & PHILOSOPHY */}
      <ImpactMetrics counts={metricsCounts} />
      <IdentitySignal />

      {/* 4. SCENE IV: CURRENT FOCUS */}
      <CurrentFocus points={focusPoints} />

      {/* 5. SCENE V: THE OUTPUT (WORK) */}
      <FeaturedWork projects={formattedProjects} />

      {/* 6. SCENE VI: THE TOOLS (WORKBENCH) */}
      <Workbench tools={techTools} />

      {/* 7. SCENE VII: CAPABILITIES */}
      <Capabilities items={capabilities} />

      {/* 8. SCENE VIII: THE PATH (JOURNEY) */}
      <Journey items={timelineItems} />

      {/* 9. SCENE IX: LIFE (GALLERY) */}
      <Gallery items={formattedGalleryItems} />

      {/* 10. SCENE X: THE THOUGHTS (WRITING) */}
      <WritingStudio posts={formattedPosts} />

    </main>
  );
}
