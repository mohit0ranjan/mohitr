"use client";

import { createTemplate } from "../actions";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NewTemplatePage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/off-campus/templates"
                    className="p-2 rounded-lg hover:bg-white/5 text-neutral-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold">New Email Template</h1>
            </div>

            <form
                action={async (formData) => {
                    setIsSubmitting(true);
                    await createTemplate(formData);
                }}
                className="space-y-6"
            >
                <div className="space-y-4 p-6 rounded-2xl bg-neutral-900/50 border border-white/5">

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-400">Template Title</label>
                        <input
                            name="title"
                            required
                            placeholder="e.g. Asking for Referral"
                            className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-400">Category</label>
                        <select
                            name="category"
                            required
                            className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 outline-none transition-all text-neutral-300"
                        >
                            <option value="Internship">Internship</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Referral">Referral Request</option>
                            <option value="Follow-up">Follow-up</option>
                            <option value="Networking">Networking</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-400">Subject Line</label>
                        <input
                            name="subject"
                            required
                            placeholder="e.g. Application for [Role] - [Your Name]"
                            className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 outline-none transition-all font-mono text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-400">Email Body</label>
                        <textarea
                            name="body"
                            required
                            placeholder="Hi [Name]..."
                            className="w-full px-4 py-4 rounded-lg bg-black/40 border border-white/10 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 outline-none transition-all min-h-[200px] font-mono text-sm"
                        />
                        <p className="text-xs text-neutral-500">Use brackets [] for placeholders.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-400">Pro Tips</label>
                        <input
                            name="tips"
                            placeholder="e.g. Keep it short and attach resume"
                            className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 outline-none transition-all"
                        />
                    </div>

                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                    >
                        {isSubmitting ? "Saving..." : "Save Template"}
                    </button>
                </div>
            </form>
        </div>
    );
}
