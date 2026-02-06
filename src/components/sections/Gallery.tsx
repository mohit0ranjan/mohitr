import Image from "next/image";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";

interface GalleryItem {
    id: string;
    title: string;
    imageUrl: string;
    date: Date;
}

export default function Gallery({ items }: { items: GalleryItem[] }) {
    if (!items.length) return null;

    return (
        <section className="py-24 bg-[#030303] border-t border-white/5 relative overflow-hidden">

            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <FadeIn className="mb-12 flex items-baseline justify-between">
                    <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500">
                        Life through lens
                    </h2>
                </FadeIn>

                {/* Horizontal Masonry-ish Scroll */}
                <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide">
                    <FadeInStagger className="flex gap-6">
                        {items.map((item, i) => (
                            <FadeIn key={item.id} delay={i * 0.1}>
                                <div className="relative shrink-0 snap-center group">
                                    <div className="relative h-[300px] w-[220px] md:h-[400px] md:w-[300px] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.title}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                                        <div className="absolute bottom-6 left-6">
                                            <span className="text-[10px] font-mono text-neutral-400 block mb-1">
                                                {new Date(item.date).getFullYear()}
                                            </span>
                                            <p className="text-white font-medium text-sm leading-tight">
                                                {item.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </FadeInStagger>
                </div>

            </div>
        </section>
    );
}
