"use client";

import { createDataset } from "../actions";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewDatasetPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    return (
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/off-campus/datasets"
                    className="p-2 rounded-lg hover:bg-white/5 text-neutral-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold">Add New Dataset</h1>
            </div>

            <form
                action={async (formData) => {
                    setIsSubmitting(true);
                    await createDataset(formData);
                    // Router redirect is handled in server action, but loading state persists
                }}
                className="space-y-6"
            >
                <div className="space-y-4 p-6 rounded-2xl bg-neutral-900/50 border border-white/5">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Title</label>
                            <input
                                name="title"
                                required
                                placeholder="e.g. Top 500 India Recruiters"
                                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Price</label>
                            <input
                                name="price"
                                required
                                placeholder="e.g. ₹299 or Free"
                                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-400">Image URL</label>
                        <input
                            name="imageUrl"
                            placeholder="http://..."
                            className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-400">Companies Covered</label>
                        <input
                            name="companies"
                            required
                            placeholder="e.g. Google, Microsoft, Amazon..."
                            className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Target Role</label>
                            <input
                                name="role"
                                required
                                placeholder="e.g. HR / Tech Recruiter"
                                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Location</label>
                            <input
                                name="location"
                                required
                                placeholder="e.g. India / Remote"
                                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Email Count</label>
                            <input
                                name="emailCount"
                                type="number"
                                required
                                placeholder="500"
                                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Topmate/Download Link</label>
                            <input
                                name="topmateLink"
                                placeholder="https://topmate.io/..."
                                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-400">Description</label>
                        <textarea
                            name="description"
                            className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all h-24"
                            placeholder="Brief details about the dataset..."
                        />
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative">
                                <input type="checkbox" name="isVerified" defaultChecked className="peer sr-only" />
                                <div className="w-10 h-6 bg-neutral-800 rounded-full border border-white/10 peer-checked:bg-green-500/20 peer-checked:border-green-500/50 transition-all after:content-[''] after:absolute after:top-1 after:left-1 after:w-4 after:h-4 after:bg-neutral-400 after:rounded-full after:transition-all peer-checked:after:translate-x-4 peer-checked:after:bg-green-500"></div>
                            </div>
                            <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">Verified Badge</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative">
                                <input type="checkbox" name="isPublished" className="peer sr-only" />
                                <div className="w-10 h-6 bg-neutral-800 rounded-full border border-white/10 peer-checked:bg-blue-500/20 peer-checked:border-blue-500/50 transition-all after:content-[''] after:absolute after:top-1 after:left-1 after:w-4 after:h-4 after:bg-neutral-400 after:rounded-full after:transition-all peer-checked:after:translate-x-4 peer-checked:after:bg-blue-500"></div>
                            </div>
                            <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">Publish Immediately</span>
                        </label>
                    </div>

                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                    >
                        {isSubmitting ? (
                            "Creating..."
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Create Dataset
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
