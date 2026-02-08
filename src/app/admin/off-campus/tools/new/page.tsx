"use client";

import { createTool } from "../actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NewToolPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/off-campus/tools"
                    className="p-2 rounded-lg hover:bg-white/5 text-neutral-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold">Add Outreach Tool</h1>
            </div>

            <form
                action={async (formData) => {
                    setIsSubmitting(true);
                    await createTool(formData);
                }}
                className="space-y-6"
            >
                <div className="space-y-4 p-6 rounded-2xl bg-neutral-900/50 border border-white/5">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Tool Name</label>
                            <input
                                name="name"
                                required
                                placeholder="e.g. Hunter.io"
                                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Category</label>
                            <select
                                name="category"
                                required
                                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all text-neutral-300"
                            >
                                <option value="Verification">Email Verification</option>
                                <option value="AI Writer">AI Writer</option>
                                <option value="Tracking">Tracking</option>
                                <option value="CRM">CRM / Organization</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-400">Description</label>
                        <textarea
                            name="description"
                            required
                            placeholder="What does it do?"
                            className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all h-24"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Link</label>
                            <input
                                name="link"
                                required
                                placeholder="https://..."
                                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Pricing</label>
                            <select
                                name="pricing"
                                required
                                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all text-neutral-300"
                            >
                                <option value="Free">Free</option>
                                <option value="Freemium">Freemium</option>
                                <option value="Paid">Paid</option>
                                <option value="Trial">Free Trial</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                    >
                        {isSubmitting ? "Saving..." : "Add Tool"}
                    </button>
                </div>
            </form>
        </div>
    );
}
