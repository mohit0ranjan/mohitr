"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
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
import { Section3D } from "@/components/ui/Section3D";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Background3D from "@/components/ui/Background3D";
import HackathonPreview from "@/components/sections/HackathonPreview";
import ActiveStreams from "@/components/sections/ActiveStreams";

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
    hackathons // Destructure this
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

                    {/* SCENE I: HERO (Has its own internal 3D logic, so wrapping lightly) */}
                    <div className="w-full relative z-20">
                        <Hero
                            content={heroContent}
                            settings={settings}
                            ticker={latestTicker}
                        />
                    </div>

                    {/* SCENE II: ACTIVE STREAMS (Opportunities + Hackathons) */}
                    <Section3D className="z-10 min-h-[50vh]">
                        <ActiveStreams
                            opportunities={formattedOpportunities}
                            hackathons={hackathons}
                        />
                    </Section3D>

                    {/* SCENE III: IMPACT & IDENTITY */}
                    <Section3D className="z-10 min-h-screen">
                        <div className="w-full flex flex-col gap-24">
                            <ImpactMetrics counts={metricsCounts} />
                            <IdentitySignal />
                        </div>
                    </Section3D>

                    {/* SCENE IV: CURRENT FOCUS */}
                    <Section3D className="z-10 min-h-[50vh]">
                        <CurrentFocus points={focusPoints} />
                    </Section3D>

                    {/* SCENE V: FEATURED WORK (Projects as 3D Cards) */}
                    {/* Using a larger Perspective for this to emphasize the cards */}
                    <Section3D perspective={2000} className="z-20 min-h-screen">
                        <FeaturedWork projects={formattedProjects} />
                    </Section3D>



                    {/* SCENE VI: TOOLS & CAPABILITIES */}
                    <Section3D className="z-10 min-h-screen">
                        <div className="w-full flex flex-col gap-32">
                            <Workbench tools={techTools} />
                            <Capabilities items={capabilities} />
                        </div>
                    </Section3D>

                    {/* SCENE VII: JOURNEY */}
                    <Section3D className="z-10 min-h-screen">
                        <Journey items={timelineItems} />
                    </Section3D>

                    {/* SCENE VIII: GALLERY & WRITING */}
                    <Section3D className="z-10 min-h-screen">
                        <div className="w-full flex flex-col gap-32">
                            <Gallery items={formattedGalleryItems} />
                            <WritingStudio posts={formattedPosts} />
                        </div>
                    </Section3D>

                </main>
            </div>
        </SmoothScroll>
    );
}
