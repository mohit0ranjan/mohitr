'use client';

import { createHackathon, updateHackathon } from "../actions";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { fetchEventDetails } from "../fetch-metadata"; // Import our new server action

function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50"
        >
            {pending ? 'Saving...' : (isEditing ? 'Update Hackathon' : 'Create Hackathon')}
        </button>
    );
}

export function HackathonForm({ hackathon }: { hackathon?: any }) {
    const action = hackathon
        ? updateHackathon.bind(null, hackathon.id)
        : createHackathon;

    // Local state to populate form fields dynamically
    const [formData, setFormData] = useState(hackathon || {});
    const [isFetching, setIsFetching] = useState(false);

    const handleUrlPaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
        const url = e.clipboardData.getData("text");
        if (url && (url.includes("unstop.com") || url.includes("linkedin.com"))) {
            e.preventDefault(); // Prevent default paste behavior initially
            setIsFetching(true);

            // Call server action to fetch metadata
            const metadata = await fetchEventDetails(url);

            if (metadata) {
                // Ensure we respect user's manual entry: 
                // Only overwrite fields if they are currently blank/default OR if user explicitly wants auto-fill behavior.
                // For now, robust behavior: Overwrite existing state with metadata found because user initiated a paste action on the "Auto-Fill" field.
                setFormData((prev: any) => ({
                    ...prev,
                    ...metadata, // Spread fetched metadata (name, description, image, etc)
                    website: url // Ensure the URL field is also set
                }));
            }
            setIsFetching(false);
        }
    };

    return (
        <form action={action} className="space-y-8 max-w-2xl relative">
            {isFetching && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    <span className="ml-3 text-white font-medium">Auto-fetching details...</span>
                </div>
            )}

            <div className="bg-neutral-900/50 p-4 rounded-lg border border-neutral-800 mb-6">
                <p className="text-xs text-neutral-400 mb-2 font-mono uppercase tracking-wider">⚡ AI Auto-Fill</p>
                <div className="flex gap-2 items-center text-sm text-neutral-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Paste an <strong>Unstop</strong> or <strong>LinkedIn</strong> URL into the "Website URL" field below. We'll extract only what is clearly available (Name, Description, Image).
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* 1. Website URL (First for UX flow) */}
                <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium text-neutral-400">Website URL (Auto-fetch enabled)</label>
                    <input
                        name="website"
                        value={formData.website || ''}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        onPaste={handleUrlPaste}
                        type="url"
                        placeholder="Paste Unstop/LinkedIn link here..."
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors text-white font-mono text-sm"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400">Name</label>
                    <input
                        name="name"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:border-neutral-700"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400">Slug</label>
                    <input
                        name="slug"
                        value={formData.slug || ''}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        required
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:border-neutral-700"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400">Organizer</label>
                    <input
                        name="organizer"
                        value={formData.organizer || ''}
                        onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                        required
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:border-neutral-700"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400">Mode</label>
                    <select
                        name="mode"
                        value={formData.mode || "Online"}
                        onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:border-neutral-700"
                    >
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400">Location</label>
                    <input
                        name="location"
                        value={formData.location || ''}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. San Francisco (or leave blank if Online)"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:border-neutral-700"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400">Status</label>
                    <select
                        name="status"
                        value={formData.status || "Upcoming"}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:border-neutral-700"
                    >
                        <option value="Upcoming">Upcoming</option>
                        <option value="Open">Registration Open</option>
                        <option value="Live">Live</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>

                {/* 
                   KEY CHANGE: Dates are now often populated by user manually if extraction is ambiguous.
                   We only auto-fill if the metadata fetcher returned a *valid* ISO string.
                   Otherwise, left blank for user input.
                */}

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400">Start Date</label>
                    <input
                        name="startDate"
                        type="datetime-local"
                        value={formData.startDate ? new Date(formData.startDate).toISOString().slice(0, 16) : ''}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        required
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:border-neutral-700"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400">End Date</label>
                    <input
                        name="endDate"
                        type="datetime-local"
                        value={formData.endDate ? new Date(formData.endDate).toISOString().slice(0, 16) : ''}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        required
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:border-neutral-700"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400">Registration Deadline</label>
                    <input
                        name="registrationDeadline"
                        type="datetime-local"
                        value={formData.registrationDeadline ? new Date(formData.registrationDeadline).toISOString().slice(0, 16) : ''}
                        onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:border-neutral-700"
                    />
                </div>

                <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium text-neutral-400">Image URL</label>
                    <div className="flex gap-4">
                        <input
                            name="imageUrl"
                            value={formData.imageUrl || ''}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:border-neutral-700"
                        />
                        {formData.imageUrl && (
                            <img src={formData.imageUrl} alt="Preview" className="w-12 h-12 rounded object-cover border border-white/10" />
                        )}
                    </div>
                </div>

                <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium text-neutral-400">Description</label>
                    <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={6}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:border-neutral-700 font-mono text-xs"
                    />
                </div>

                <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium text-neutral-400">Tags (comma separated)</label>
                    <input
                        name="tags"
                        value={formData.tags || ''}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        placeholder="AI, Web3, Open Source..."
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:border-neutral-700"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="isFeatured"
                        id="isFeatured"
                        defaultChecked={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                        className="rounded bg-neutral-900 border-neutral-800"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-medium text-neutral-400">Feature on Homepage</label>
                </div>
            </div>

            <SubmitButton isEditing={!!hackathon} />
        </form>
    );
}
