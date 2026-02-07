import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/seo/JsonLd";
import Navbar from "@/components/ui/navbar";
import PageTracker from "@/components/analytics/PageTracker";
import Footer from "@/components/ui/Footer";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";
import { GalleryItem } from "@prisma/client";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mohit Ranjan | CSE Student & Developer @ NIT Jalandhar",
    template: "%s | Mohit Ranjan"
  },
  description: "Portfolio of Mohit Ranjan, a Computer Science student at NIT Jalandhar. Building full-stack applications, developer tools, and sharing career opportunities.",
  keywords: ["Mohit Ranjan", "NIT Jalandhar", "Software Engineer", "React", "Next.js", "Portfolio", "Student Developer", "Mohit Ranjan NITJ", "Mohit Ranjan developer"],
  authors: [{ name: "Mohit Ranjan" }],
  creator: "Mohit Ranjan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.mohitr.in",
    title: "Mohit Ranjan | CSE Student & Developer",
    description: "Building software, tools, and opportunities for the tech community.",
    siteName: "Mohit Ranjan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit Ranjan | CSE Student & Developer",
    creator: "@mohitranjan",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch actual posts from DB for Navbar
  const postsRaw = await prisma.post.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
    select: { title: true, slug: true, publishedAt: true }
  });

  const allPosts = postsRaw.map(p => ({
    id: p.slug,
    title: p.title,
    date: p.publishedAt ? format(p.publishedAt, 'MMM dd, yyyy') : ''
  }));

  // Fetch gallery for global footer
  let galleryItems: GalleryItem[] = [];
  try {
    galleryItems = await prisma.galleryItem.findMany({
      where: { isVisible: true },
      orderBy: { date: 'desc' },
      take: 4
    });
  } catch (e) {
    console.error("Failed to fetch gallery items for footer:", e);
    // Return empty array so build doesn't fail
  }

  const formattedGalleryItems = galleryItems.map(item => ({
    id: item.id,
    title: item.title,
    imageUrl: item.imageUrl,
    date: item.date
  }));

  // Fetch opportunities for global search
  const opportunitiesRaw = await prisma.opportunity.findMany({
    where: { status: 'Active' },
    select: { title: true, company: true, slug: true, type: true }
  });

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#030303] text-white antialiased`}
      >
        <JsonLd />
        <PageTracker />
        <Navbar posts={allPosts} opportunities={opportunitiesRaw} />
        {children}
        <Footer galleryItems={formattedGalleryItems} />
        <Analytics />
      </body>
    </html>
  );
}
