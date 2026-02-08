"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import Hero from "@/components/sections/Hero";
import ImpactMetrics from "@/components/sections/ImpactMetrics";
import IdentitySignal from "@/components/sections/IdentitySignal";
import Summary from "@/components/sections/Summary";
import FeaturedWork from "@/components/sections/FeaturedWork";
import OpportunityStream from "@/components/sections/OpportunityStream";
import Workbench from "@/components/sections/Workbench";
import Journey from "@/components/sections/Journey";
import WritingStudio from "@/components/sections/WritingStudio";
import Gallery from "@/components/sections/Gallery";
import CurrentFocus from "@/components/sections/CurrentFocus";
import Capabilities from "@/components/sections/Capabilities";
import Certificates from "@/components/sections/Certificates";
import { Section3D } from "@/components/ui/Section3D";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Background3D from "@/components/ui/Background3D";
import HackathonPreview from "@/components/sections/HackathonPreview";
import ActiveStreams from "@/components/sections/ActiveStreams";
import OffCampusPreview from "@/components/sections/OffCampusPreview";

interface HomeSceneProps {
    heroContent: any;
    settings: any;
    latestTicker: any;
    formattedOpportunities: any[];
    metricsCounts: any;
    focusPoints: any[];
    formattedProjects: any[];
    techTools: any[];
    capabilities: any[];
    timelineItems: any[];
    formattedGalleryItems: any[];
    formattedPosts: any[];
    hackathons: any[]; // Add this
}

export default function HomeScene({
    heroContent,
    settings,
    latestTicker,
    formattedOpportunities,
    metricsCounts,
    focusPoints,
    formattedProjects,
    techTools,
    capabilities,
    timelineItems,
    formattedGalleryItems,
    formattedPosts,
    hackathons
}: HomeSceneProps) {

    const scrollRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end end"]
    });

    return (
        <SmoothScroll>
            <div
                ref={scrollRef}
                className="relative min-h-screen bg-[#030303] text-white overflow-hidden perspective-container"
                style={{ perspective: "2000px" }}
            >

                {/* REAL 3D BACKGROUND (Three.js) - Driven by Scroll */}
                <Background3D scrollYProgress={scrollYProgress} />


                {/* CONTENT LAYERS */}
                <main className="relative z-10 w-full flex flex-col items-center gap-0">

                    {/* 1. HERO (Clarity First) */}
                    <div className="w-full relative z-20">
                        <Hero
                            content={heroContent}
                            settings={settings}
                            ticker={latestTicker}
                        />
                    </div>

                    {/* 2. QUICK PROFESSIONAL SUMMARY (Resume Snapshot) */}
                    <div className="w-full relative z-10">
                        <Summary />
                    </div>

                    {/* 3. ANALYTICS / IMPACT (Proof of Work - Moved UP) */}
                    <Section3D className="z-20 min-h-[30vh]">
                        <div className="w-full py-12 md:py-16">
                            <ImpactMetrics counts={metricsCounts} />
                        </div>
                    </Section3D>

                    {/* 3.5. PLATFORM FEATURES (Opportunities - Highly Visible) */}
                    <Section3D className="z-20 min-h-[30vh]">
                        <div className="flex flex-col gap-0 border-y border-white/5 bg-[#050505]">
                            {/* Header for this section */}
                            <div className="container mx-auto px-6 md:px-12 py-10">
                                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Active Streams</h2>
                                <p className="text-neutral-400 text-sm">Live opportunities and hackathons you can join.</p>
                            </div>

                            <ActiveStreams
                                opportunities={formattedOpportunities}
                                hackathons={hackathons}
                            />
                            {/* Off-Campus Hub Preview */}
                            <OffCampusPreview />
                        </div>
                    </Section3D>

                    {/* 4. PROJECTS (Main Proof of Capability) */}
                    <Section3D perspective={2000} className="z-20 min-h-screen">
                        <FeaturedWork projects={formattedProjects} />
                    </Section3D>

                    {/* 5. EXPERIENCE & EDUCATION (Journey) */}
                    <Section3D className="z-10 min-h-screen">
                        <Journey items={timelineItems} />
                    </Section3D>

                    {/* 6. TECH STACK (Credibility) */}
                    <Section3D className="z-10 min-h-[50vh]">
                        <div className="w-full py-16">
                            <Workbench tools={techTools} />
                        </div>
                    </Section3D>

                    {/* 8. GALLERY & WRITING (Personal Side) */}
                    <Section3D className="z-10 min-h-screen">
                        <div className="w-full flex flex-col gap-16 pb-16">
                            <WritingStudio posts={formattedPosts} />
                            <Gallery items={formattedGalleryItems} />
                            {/* Certificates Section */}
                            <Certificates />
                        </div>
                    </Section3D>

                    {/* 9. CURRENT FOCUS (Optional) */}
                    <Section3D className="z-10">
                        <CurrentFocus points={focusPoints} />
                    </Section3D>

                </main>
            </div>
        </SmoothScroll>
    );
}
