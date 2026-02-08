
"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, FileCheck } from "lucide-react";
import Link from "next/link";

interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string;
    url?: string;
}

const certificates: Certificate[] = [
    {
        id: "1",
        title: "Advanced React & GraphQL",
        issuer: "Frontend Masters",
        date: "2024",
        url: "#"
    },
    {
        id: "2",
        title: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023",
        url: "#"
    },
    {
        id: "3",
        title: "Full Stack Development",
        issuer: "Coursera",
        date: "2023",
        url: "#"
    },
    {
        id: "4",
        title: "System Design Interview Guide",
        issuer: "Educative",
        date: "2024",
        url: "#"
    }
];

export default function Certificates() {
    return (
        <section className="pt-24 pb-8 bg-[#030303] relative border-t border-white/5 overflow-hidden">

            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

                <div className="flex items-center gap-4 mb-16">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <Award size={24} />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                        Certifications.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {certificates.map((cert, i) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative p-6 rounded-2xl bg-[#080808] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <FileCheck className="text-neutral-600 group-hover:text-emerald-400 transition-colors" size={24} />
                                {cert.url && (
                                    <Link href={cert.url} className="text-neutral-600 hover:text-white transition-colors">
                                        <ExternalLink size={16} />
                                    </Link>
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-100 transition-colors line-clamp-2">
                                {cert.title}
                            </h3>
                            <p className="text-sm text-neutral-500 font-mono mb-4">
                                {cert.issuer}
                            </p>

                            <div className="flex items-center justify-between text-xs text-neutral-600 font-mono uppercase tracking-wider">
                                <span>Issued</span>
                                <span>{cert.date}</span>
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
