import { FadeIn, FadeInStagger } from "@/components/ui/motion";
import * as Icons from "lucide-react";

// Helper
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    // @ts-ignore
    const Icon = Icons[name] || Icons.Code;
    return <Icon className={className} />;
};

interface Capability {
    id: string;
    title: string;
    description: string;
    icon: string;
}

interface CapabilitiesProps {
    items: Capability[];
}

export default function Capabilities({ items }: CapabilitiesProps) {
    if (!items || items.length === 0) return null;

    return (
        <section className="py-24" id="capabilities">
            <div className="container mx-auto px-4 md:px-8">
                <FadeIn className="mb-20">
                    <h2 className="text-3xl font-bold mb-4 text-white">Core Capabilities</h2>
                    <p className="text-muted max-w-xl text-sm md:text-base">
                        Specialized skill sets I bring to every project.
                    </p>
                </FadeIn>

                <FadeInStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, i) => (
                        <FadeIn key={item.id} delay={i * 0.1}>
                            <article className="h-full p-10 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-white/10 hover:bg-[#0F0F0F] transition-all duration-500 group shadow-sm hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-2">
                                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-neutral-400 group-hover:text-white transition-all duration-500 mb-8 group-hover:bg-white/10 group-hover:scale-110 group-hover:rotate-3 shadow-inner">
                                    <DynamicIcon name={item.icon} className="w-7 h-7" />
                                </div>

                                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-200 transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-neutral-500 leading-relaxed text-sm font-medium">
                                    {item.description}
                                </p>
                            </article>
                        </FadeIn>
                    ))}
                </FadeInStagger>
            </div>
        </section>
    );
}
