import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";

export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
    const images = await prisma.galleryItem.findMany({
        where: { isVisible: true },
        orderBy: { date: 'desc' }
    });

    return (
        <main className="min-h-screen bg-[#030303] text-foreground relative z-0 overflow-hidden">

            {/* Ambient Background Glows */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

            {/* Noise Overlay */}
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] bg-noise"></div>

            <div className="container mx-auto px-6 md:px-12 pt-40 pb-32 max-w-7xl relative z-10">

                <FadeIn className="mb-20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-[1px] bg-indigo-500/50" />
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-indigo-400">The Visuals</span>
                    </div>
                    <header className="mb-12">
                        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-white transition-colors mb-8 uppercase tracking-widest">
                            <ArrowLeft size={14} /> Back to HQ
                        </Link>
                        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                            Captured <br /> <span className="text-neutral-500">Moments.</span>
                        </h1>
                        <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl">
                            A snapshot of life outside the terminal—travel, nature, and small details that inspire my craft.
                        </p>
                    </header>
                </FadeIn>

                <BentoGrid className="lg:auto-rows-[350px] gap-8">
                    {images.length === 0 && (
                        <div className="col-span-full py-32 text-center text-neutral-500 border border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.02]">
                            <p className="font-mono text-sm uppercase tracking-widest">No captures found in the library.</p>
                        </div>
                    )}
                    <FadeInStagger className="contents">
                        {images.map((img: any, i: number) => {
                            const isLarge = i % 5 === 0;

                            return (
                                <FadeIn key={img.id} className={isLarge ? "md:col-span-2 md:row-span-2" : "col-span-1"}>
                                    <div className="group relative h-full w-full overflow-hidden rounded-[2rem] border border-white/5 bg-neutral-900 transition-all duration-700 hover:border-white/20">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={img.imageUrl}
                                            alt={img.title || "Gallery image"}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                            loading="lazy"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                                        <div className="absolute bottom-0 left-0 p-8 md:p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex flex-col justify-end h-full w-full">
                                            <div className="overflow-hidden">
                                                <p className="font-bold text-xl md:text-2xl text-white tracking-tight mb-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">{img.title}</p>
                                            </div>
                                            {img.description && (
                                                <p className="text-sm text-neutral-400 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 line-clamp-2">{img.description}</p>
                                            )}
                                        </div>

                                        {/* Corner Date Overlay */}
                                        <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 uppercase tracking-widest">
                                            {new Date(img.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                        </div>
                                    </div>
                                </FadeIn>
                            )
                        })}
                    </FadeInStagger>
                </BentoGrid>
            </div>
        </main>
    );
}
