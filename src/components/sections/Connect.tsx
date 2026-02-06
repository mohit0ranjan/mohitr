"use client";

import React from "react";
import { FadeIn } from "@/components/ui/motion";
import { Linkedin, Github, Download, Code2, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectActionProps {
    href: string;
    label: string;
    icon: React.ReactNode;
    primary?: boolean;
    accentColor: string;
}

const ConnectAction = ({ href, label, icon, primary, accentColor }: ConnectActionProps) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "group relative flex items-center gap-3 px-6 py-3.5 rounded-full transition-all duration-500",
                "border border-white/10 hover:border-white/20",
                primary
                    ? "bg-white text-black hover:scale-105"
                    : "bg-black/40 backdrop-blur-md hover:bg-black/60"
            )}
        >
            {/* Glow effect for secondary buttons */}
            {!primary && (
                <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                    style={{ backgroundColor: `${accentColor}20` }}
                />
            )}

            <span className={cn(
                "transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12",
                primary ? "text-black" : ""
            )} style={{ color: primary ? undefined : accentColor }}>
                {icon}
            </span>

            <span className="text-sm font-semibold tracking-tight">{label}</span>

            {!primary && (
                <ArrowUpRight
                    size={14}
                    className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-50 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300"
                />
            )}

            {/* Subtle border gradient for non-primary */}
            {!primary && (
                <div
                    className="absolute inset-0 rounded-full border border-transparent bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />
            )}
        </a>
    );
};

export default function ConnectSection() {
    const socialLinks = [
        {
            href: "https://linkedin.com/in/mohit",
            label: "Follow on LinkedIn",
            icon: <Linkedin size={20} />,
            accentColor: "#0077B5",
        },
        {
            href: "https://github.com/mohit",
            label: "View GitHub",
            icon: <Github size={20} />,
            accentColor: "#ffffff",
        },
        {
            href: "https://leetcode.com/mohit",
            label: "LeetCode Profile",
            icon: <Code2 size={20} />,
            accentColor: "#FFA116",
        },
    ];

    return (
        <section className="py-12 pb-24 container mx-auto px-6 md:px-12 max-w-7xl">
            <FadeIn delay={0.2} direction="up">
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
                    {/* Primary Action */}
                    <ConnectAction
                        href="/resume.pdf"
                        label="Download Resume (PDF)"
                        icon={<Download size={20} />}
                        primary
                        accentColor="#ffffff"
                    />

                    {/* Secondary Actions */}
                    {socialLinks.map((link) => (
                        <ConnectAction
                            key={link.label}
                            {...link}
                        />
                    ))}
                </div>
            </FadeIn>
        </section>
    );
}
