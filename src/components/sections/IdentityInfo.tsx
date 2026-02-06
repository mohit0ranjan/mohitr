import { FadeIn, FadeInStagger } from "@/components/ui/motion";

export default function IdentityInfo() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-40" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <FadeInStagger>
                    <div className="max-w-4xl">
                        <FadeIn>
                            <h2 className="text-xs font-bold text-accent-blue mb-6 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-accent-blue/50"></span>
                                Identity
                            </h2>
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <div className="space-y-4 mb-10">
                                <h3 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                                    Mohit <span className="text-white/20">Ranjan</span>
                                </h3>
                                <p className="text-2xl md:text-3xl text-white/80 font-light tracking-wide">
                                    B.Tech Computer Science & Engineering
                                </p>
                                <p className="text-xl md:text-2xl text-white/40 font-light">
                                    National Institute of Technology, Jalandhar
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <p className="text-xl text-muted/60 leading-relaxed max-w-2xl font-light">
                                I am a builder at heart. While my academic foundation is in computer science, my real education comes from the <span className="text-white/90">late nights spent debugging</span>, the side projects that never shipped, and the ones that did.
                            </p>
                        </FadeIn>
                    </div>
                </FadeInStagger>
            </div>
        </section>
    );
}
