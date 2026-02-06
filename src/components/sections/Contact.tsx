import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Mail, Github, Linkedin, Twitter, Copy } from "lucide-react";

export default function Contact() {
    return (
        <div className="py-20 pb-32" id="contact">
            <BentoGrid className="lg:grid-cols-2">
                <BentoCard className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-accent/20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's build something extraordinary.</h2>
                    <p className="text-xl text-muted mb-8 max-w-md">
                        I'm currently available for freelance projects and technical consulting.
                    </p>
                    <a href="mailto:hello@mohit.dev" className="inline-flex items-center gap-3 text-2xl font-semibold hover:text-accent transition-colors">
                        <Mail className="w-6 h-6" />
                        hello@mohit.dev
                    </a>
                </BentoCard>

                <div className="grid grid-cols-2 gap-4">
                    <BentoCard className="p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors" href="https://github.com">
                        <Github className="w-10 h-10 mb-4" />
                        <h3 className="font-bold">GitHub</h3>
                        <p className="text-xs text-muted">Open Source</p>
                    </BentoCard>

                    <BentoCard className="p-6 flex flex-col items-center justify-center text-center hover:bg-blue-500/10 transition-colors" href="https://linkedin.com">
                        <Linkedin className="w-10 h-10 mb-4 text-blue-500" />
                        <h3 className="font-bold">LinkedIn</h3>
                        <p className="text-xs text-muted">Network</p>
                    </BentoCard>

                    <BentoCard className="p-6 flex flex-col items-center justify-center text-center hover:bg-sky-500/10 transition-colors" href="https://twitter.com">
                        <Twitter className="w-10 h-10 mb-4 text-sky-500" />
                        <h3 className="font-bold">Twitter</h3>
                        <p className="text-xs text-muted">Thoughts</p>
                    </BentoCard>

                    <BentoCard className="p-6 flex flex-col items-center justify-center text-center bg-white/5">
                        <div className="text-xs text-muted uppercase tracking-widest mb-2">Location</div>
                        <div className="font-bold text-lg">Bangalore, IN</div>
                        <div className="text-xs text-green-500 mt-2 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Remote Available
                        </div>
                    </BentoCard>
                </div>
            </BentoGrid>

            <div className="max-w-7xl mx-auto px-4 mt-20 text-center text-muted text-sm">
                <p>&copy; {new Date().getFullYear()} Mohit. Built with Next.js, Tailwind, and heavy doses of caffeine.</p>
            </div>
        </div>
    );
}
