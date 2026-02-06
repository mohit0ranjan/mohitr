import { FadeIn } from "@/components/ui/motion";

export default function IdentitySignal() {
    return (
        <section className="py-24 md:py-48 bg-[#030303] relative overflow-hidden">

            {/* Background Narrative Texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none overflow-hidden flex flex-col gap-4 font-black text-[20vw] leading-none whitespace-nowrap text-white uppercase italic">
                <div className="animate-marquee">ENGINEERING DESIGN SYSTEMS IMPACT</div>
                <div className="animate-marquee-reverse">ARCHITECTURE SCALABILITY PRODUCT</div>
            </div>

            <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
                <FadeIn>
                    <div className="flex flex-col md:flex-row gap-16 items-start">

                        {/* Left: The Badge */}
                        <div className="shrink-0 flex flex-col gap-8">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400">Philosophy 01</span>
                            </div>

                            {/* Decorative Block */}
                            <div className="grid grid-cols-2 gap-2 w-24 opacity-20">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="aspect-square bg-white rounded-sm" />
                                ))}
                            </div>
                        </div>

                        {/* Right: The Statement */}
                        <div className="space-y-12 max-w-4xl">
                            <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-[-0.05em]">
                                Beyond the <br />
                                <span className="text-neutral-500">Syntax.</span>
                            </h2>

                            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                                <div className="flex-1 space-y-6">
                                    <p className="text-xl md:text-2xl text-white font-medium leading-[1.3] tracking-tight">
                                        I move past the "how" of writing code to the "why" of building systems.
                                    </p>
                                    <p className="text-lg text-neutral-500 leading-relaxed font-light">
                                        Every line of code I author is a deliberate choice for scalability,
                                        semantic clarity, and long-term product value. I build architectures that last.
                                    </p>
                                </div>
                                <div className="flex-1 space-y-6 pt-0 md:pt-12">
                                    <p className="text-lg text-neutral-500 leading-relaxed font-light italic border-l-2 border-indigo-500/20 pl-8">
                                        "Whether it's architecting a distributed backend or
                                        refining a micro-interaction, the standard is always:
                                        <span className="text-white font-medium"> excellence without compromise.</span>"
                                    </p>
                                </div>
                            </div>

                            {/* Decorative Line */}
                            <div className="h-[1px] w-full bg-gradient-to-r from-indigo-500/50 via-neutral-800 to-transparent" />
                        </div>

                    </div>
                </FadeIn>
            </div>

        </section>
    );
}
