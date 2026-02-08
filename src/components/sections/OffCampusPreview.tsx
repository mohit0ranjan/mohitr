"use client";

import Link from "next/link";
import { ArrowRight, Mail, Briefcase, Users, Zap } from "lucide-react"; // Added Zap
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function OffCampusPreview() {
    return (
        <section className="relative w-full py-24 flex justify-center items-center overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="flex flex-col gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                                Off-Campus <br />
                                <span className="text-neutral-500">Outreach Hub.</span>
                            </h2>
                            <p className="text-xl text-neutral-400 leading-relaxed max-w-md">
                                Don't wait for companies to come to campus. Access verified recruiter emails, cold email templates, and premium tools to land your dream role.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="flex gap-4"
                        >
                            <Link
                                href="/offcampus"
                                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors"
                            >
                                Explore the Hub
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        {/* Visual Representation Card */}
                        <div className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/5 flex flex-col gap-3 hover:bg-neutral-800/50 transition-colors">
                                    <Users className="w-8 h-8 text-blue-400" />
                                    <div>
                                        <span className="block text-2xl font-bold text-white">500+</span>
                                        <span className="text-sm font-medium text-neutral-500">Recruiter Emails</span>
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/5 flex flex-col gap-3 hover:bg-neutral-800/50 transition-colors">
                                    <Mail className="w-8 h-8 text-green-400" />
                                    <div>
                                        <span className="block text-2xl font-bold text-white">15+</span>
                                        <span className="text-sm font-medium text-neutral-500">Proven Templates</span>
                                    </div>
                                </div>
                                <div className="col-span-2 p-6 rounded-2xl bg-neutral-900/50 border border-white/5 flex flex-col gap-3 hover:bg-neutral-800/50 transition-colors">
                                    <Zap className="w-8 h-8 text-purple-400" />
                                    <div>
                                        <span className="block text-xl font-bold text-white">Premium Tools</span>
                                        <span className="text-sm font-medium text-neutral-500">Verification & AI Writers</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
