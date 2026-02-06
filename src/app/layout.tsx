import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/seo/JsonLd";
import Navbar from "@/components/ui/navbar";
import { getSortedPostsData } from "@/lib/posts";
import PageTracker from "@/components/analytics/PageTracker";
import Footer from "@/components/ui/Footer";

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
  keywords: ["Mohit Ranjan", "NIT Jalandhar", "Software Engineer", "React", "Next.js", "Portfolio", "Student Developer", "Mohit Ranjan NITJ", "Mohit Ranjan developer", "Mohit Ranjan computer science student"],
  authors: [{ name: "Mohit Ranjan" }],
  creator: "Mohit Ranjan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohitranjan.dev",
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

import { prisma } from "@/lib/prisma";

// ... existing imports

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allPosts = getSortedPostsData();

  // Fetch gallery for global footer
  const galleryItems = await prisma.galleryItem.findMany({
    where: { isVisible: true },
    orderBy: { date: 'desc' },
    take: 4
  });

  const formattedGalleryItems = galleryItems.map(item => ({
    id: item.id,
    title: item.title,
    imageUrl: item.imageUrl,
    date: item.date
  }));

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#030303] text-white antialiased`}
      >
        <JsonLd />
        <PageTracker />
        <Navbar posts={allPosts} />
        {children}
        <Footer galleryItems={formattedGalleryItems} />
      </body>
    </html>
  );
}
