import { FadeIn, FadeInStagger } from "@/components/ui/motion";

export default function ContextTransition() {
    return (
        <section className="py-24 md:py-32 bg-[#030303] border-t border-white/5 relative z-10">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <FadeInStagger>

                    <FadeIn className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
                        {/* Context Sidebar */}
                        <div className="md:w-1/3 shrink-0">
                            <span className="block w-8 h-[2px] bg-indigo-500 mb-6" />
                            <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-2">
                                Context
                            </h2>
                            <p className="text-white font-medium">NIT Jalandhar • 2026</p>
                        </div>

                        {/* Narrative Content */}
                        <div className="md:w-2/3">
                            <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed mb-8">
                                I believe software isn't just about code — it's about <span className="text-white border-b border-white/20">solving human friction</span>.
                            </p>
                            <p className="text-neutral-500 leading-relaxed text-lg">
                                My journey started with a curiosity for how things work. That curiosity evolved into a discipline for engineering robust backend systems, intuitive frontends, and the AI agents that connect them.
                            </p>
                        </div>
                    </FadeIn>

                </FadeInStagger>
            </div>
        </section>
    );
}
