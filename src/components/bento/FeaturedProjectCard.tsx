import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BentoCard from "./BentoCard";

interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    href: string;
    tech: string[];
}

export default function FeaturedProjectCard({ project }: { project: Project }) {
    if (!project) return null;

    return (
        <BentoCard className="col-span-1 md:col-span-2 min-h-[400px] group relative p-0" noPadding>

            {/* Background Gradient/Image Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#050505] z-0" />
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]" />

            {/* Abstract visual */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-xl bg-gradient-to-tr from-blue-500/10 to-purple-500/10 border border-white/5 shadow-2xl skew-y-3 group-hover:skew-y-0 group-hover:scale-105 transition-all duration-700 ease-out" />

            <div className="relative z-10 h-full flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">

                <div className="mb-4">
                    <span className="px-2 py-1 rounded bg-white/10 text-[10px] font-mono uppercase text-white tracking-widest backdrop-blur-sm border border-white/10">
                        Featured Work
                    </span>
                </div>

                <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                    {project.title}
                </h3>

                <p className="text-neutral-400 text-sm max-w-md line-clamp-2 mb-6">
                    {project.description}
                </p>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="flex gap-2">
                        {project.tech.slice(0, 3).map(t => (
                            <span key={t} className="text-[10px] text-neutral-500 bg-black/50 px-2 py-1 rounded border border-white/5">
                                {t}
                            </span>
                        ))}
                    </div>
                    <Link href={project.href} className="flex items-center gap-1 text-xs font-bold uppercase text-white hover:text-blue-300 transition-colors">
                        View Case <ArrowUpRight size={14} />
                    </Link>
                </div>
            </div>

        </BentoCard>
    );
}
