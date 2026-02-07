import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import HomeScene from "@/components/home/HomeScene";

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
    <HomeScene
      heroContent={heroContent}
      settings={settings}
      latestTicker={latestTicker}
      formattedOpportunities={formattedOpportunities}
      metricsCounts={metricsCounts}
      focusPoints={focusPoints}
      formattedProjects={formattedProjects}
      techTools={techTools}
      capabilities={capabilities}
      timelineItems={timelineItems}
      formattedGalleryItems={formattedGalleryItems}
      formattedPosts={formattedPosts}
    />
  );
}
