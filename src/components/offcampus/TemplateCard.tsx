"use client";

import React, { useState } from 'react';
import { Copy, Check, FileText } from "lucide-react";

interface TemplateCardProps {
    title: string;
    subject: string;
    body: string;
    tips?: string | null;
}

export default function TemplateCard({ title, subject, body, tips }: TemplateCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-6 rounded-3xl bg-neutral-900/50 border border-white/5 flex flex-col gap-4">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                        <FileText className="w-4 h-4" />
                    </div>
                    <h3 className="font-medium text-white">{title}</h3>
                </div>
                <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg hover:bg-white/5 text-neutral-400 hover:text-white transition-colors"
                    title="Copy to clipboard"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>

            <div className="bg-black/40 rounded-xl p-4 text-sm text-neutral-300 font-mono whitespace-pre-wrap border border-white/5">
                <div className="mb-2 text-neutral-500 select-none">Subject: {subject}</div>
                {body}
            </div>

            {tips && (
                <div className="text-xs text-neutral-500 italic">
                    💡 Tip: {tips}
                </div>
            )}
        </div>
    );
}
