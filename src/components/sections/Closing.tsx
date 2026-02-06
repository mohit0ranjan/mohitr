import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

export default function Closing() {
    return (
        <section className="py-32 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent-blue/5 pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
                <FadeIn>
                    <div className="max-w-2xl mx-auto space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-accent-blue mb-4">
                            <Sparkles size={12} />
                            <span>Open for new adventures</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                            Let's build something <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">meaningful.</span>
                        </h2>
                        <p className="text-xl text-muted leading-relaxed">
                            Whether you want to discuss a potential project, a job opportunity, or just geek out over the latest tech—my inbox is always open.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link
                                href="/projects"
                                className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 hover:-translate-y-1 transition-all w-full sm:w-auto shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            >
                                View Projects
                            </Link>
                            <Link
                                href="https://linkedin.com"
                                className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all w-full sm:w-auto font-medium text-white backdrop-blur-md"
                            >
                                Connect on LinkedIn
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
