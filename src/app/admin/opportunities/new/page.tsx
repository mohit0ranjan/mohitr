'use client';

import { useState, useRef } from 'react';
import { extractOpportunityData, publishOpportunity } from '../actions';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import Editor from '@/components/admin/Editor';
import { ArrowLeft, Check, Copy, ExternalLink, RefreshCcw, Bold, List, Heading, Link as LinkIcon, Quote, Code, ArrowUpRight } from 'lucide-react';

function SubmitButton({ label, loadingLabel }: { label: string, loadingLabel: string }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-neutral-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
            {pending && <RefreshCcw className="w-4 h-4 animate-spin" />}
            {pending ? loadingLabel : label}
        </button>
    );
}


export default function NewOpportunityPage() {
    const [step, setStep] = useState<'input' | 'review' | 'success'>('input');
    const [activeTab, setActiveTab] = useState<'image' | 'text' | 'link'>('link'); // Default to link as per request

    // State to hold extracted data for review
    const [extractedData, setExtractedData] = useState<any>(null);
    const [finalResult, setFinalResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Step 1: Extraction Handler
    async function handleExtraction(formData: FormData) {
        setError(null);
        formData.append('type', activeTab);

        const res = await extractOpportunityData(formData);

        if (res?.success) {
            setExtractedData(res.data);
            setStep('review');
        } else {
            setError(res?.error || "Failed to extract data. Please try again.");
        }
    }

    // Step 2: Publish Handler
    async function handlePublish(formData: FormData) {
        setError(null);
        // We need to pass the image URL from extraction if exists, or allow user override in form
        // The form fields in 'review' step will naturally be included in formData

        const res = await publishOpportunity(null, formData);

        if (res?.success) {
            setFinalResult(res);
            setStep('success');
        } else {
            setError(res?.error || "Failed to publish opportunity.");
        }
    }

    // --- RENDER: SUCCESS STATE ---
    if (step === 'success' && finalResult) {
        return (
            <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500 pt-10">
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-8 rounded-2xl text-center space-y-4">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Published Successfully!</h2>
                    <p className="opacity-80 text-lg">Your opportunity is live and indexed.</p>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-white">Choose Your Template</h3>
                        <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">3 Options Generated</span>
                    </div>

                    {[
                        { id: 'standard', label: 'Option 1: Standard', content: finalResult.templates?.standard || finalResult.linkedInPost },
                        { id: 'crisp', label: 'Option 2: Crisp', content: finalResult.templates?.crisp },
                        { id: 'direct', label: 'Option 3: Direct', content: finalResult.templates?.direct },
                    ].filter(i => i.content).map((template) => (
                        <div key={template.id} className="space-y-2">
                            <label className="text-[10px] font-mono uppercase text-neutral-600 tracking-[0.2em] ml-2">
                                {template.label}
                            </label>
                            <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl relative group hover:border-neutral-700 transition-colors">
                                <div className="text-neutral-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                                    {template.content}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        navigator.clipboard.writeText(template.content);
                                        // Optional: Add some toast/feedback logic if available, 
                                        // for now we'll just rely on the button action
                                    }}
                                    className="absolute top-4 right-4 bg-neutral-800 hover:bg-white hover:text-black text-neutral-400 text-[10px] uppercase font-bold px-3 py-1.5 rounded-md transition-all flex items-center gap-2 border border-neutral-700"
                                >
                                    <Copy className="w-3 h-3" /> Copy
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <a
                        href="https://www.linkedin.com/feed/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-[#0077b5] text-white py-4 rounded-xl font-bold hover:bg-[#006399] transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Open LinkedIn
                    </a>
                    <Link
                        href={`/opportunities/${finalResult.opportunity.slug}`}
                        target="_blank"
                        className="flex items-center justify-center gap-2 bg-neutral-800 text-white py-4 rounded-xl font-bold hover:bg-neutral-700 transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" />
                        View Page
                    </Link>
                </div>

                <div className="text-center pt-8 border-t border-neutral-800 mt-8">
                    <button
                        onClick={() => {
                            setStep('input');
                            setExtractedData(null);
                            setFinalResult(null);
                            setError(null);
                        }}
                        className="text-neutral-500 hover:text-white underline"
                    >
                        Add Another Opportunity
                    </button>
                </div>
            </div>
        );
    }

    // --- RENDER: REVIEW STATE ---
    if (step === 'review' && extractedData) {
        return (
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="flex items-center gap-4">
                    <button onClick={() => setStep('input')} className="p-2 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Review & Publish</h1>
                        <p className="text-neutral-400">Verify the extracted details before going live.</p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                <form action={handlePublish} className="space-y-8">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 space-y-6">

                        {/* Hidden Fields for non-editable but necessary data */}
                        <input type="hidden" name="imageUrl" value={extractedData.imageUrl || ''} />

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase text-neutral-500 tracking-wider">Company / Org</label>
                                <input
                                    type="text"
                                    name="company"
                                    defaultValue={extractedData.company}
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:border-neutral-600 outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase text-neutral-500 tracking-wider">Role Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={extractedData.role}
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:border-neutral-600 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase text-neutral-500 tracking-wider">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    defaultValue={extractedData.location}
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:border-neutral-600 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase text-neutral-500 tracking-wider">Type</label>
                                <select
                                    name="type"
                                    defaultValue={extractedData.type}
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:border-neutral-600 outline-none transition-all"
                                >
                                    <option value="Internship">Internship</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Trainee">Trainee</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono uppercase text-neutral-500 tracking-wider">Apply Link (High Priority)</label>
                            <input
                                type="url"
                                name="applyLink"
                                defaultValue={extractedData.applyLink || extractedData.sourceUrl || ''}
                                placeholder="https://..."
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-indigo-400 focus:border-neutral-600 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-mono uppercase text-neutral-500 tracking-wider flex items-center justify-between">
                                Full Description
                                <span className="text-[10px] text-neutral-600">Markdown Supported</span>
                            </label>

                            <Editor
                                markdown={extractedData.description}
                                name="fullDescription"
                            />
                        </div>

                    </div>

                    <SubmitButton label="Confirm & Publish" loadingLabel="Publishing..." />
                </form>
            </div>
        );
    }

    // --- RENDER: INPUT STATE ---
    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-white tracking-tight">Add Opportunity</h1>
                <p className="text-neutral-400">Import from LinkedIn, images, or text. We'll handle the parsing.</p>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm mb-6">
                    {error}
                </div>
            )}

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden p-1">
                <div className="grid grid-cols-3 gap-1 p-1 bg-neutral-950 rounded-xl">
                    <button
                        onClick={() => setActiveTab('link')}
                        className={`py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'link' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
                    >
                        🔗 From Link
                    </button>
                    <button
                        onClick={() => setActiveTab('image')}
                        className={`py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'image' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
                    >
                        📸 From Image
                    </button>
                    <button
                        onClick={() => setActiveTab('text')}
                        className={`py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'text' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
                    >
                        📝 Paste Text
                    </button>
                </div>

                <div className="p-6 md:p-8">
                    <form action={handleExtraction} className="space-y-6">

                        {activeTab === 'link' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                <label className="block text-sm font-medium text-neutral-400">LinkedIn Post / Job URL</label>
                                <input
                                    type="url"
                                    name="url"
                                    placeholder="https://linkedin.com/posts/..."
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-neutral-600 transition-all placeholder:text-neutral-600"
                                    required
                                    autoFocus
                                />
                                <p className="text-xs text-neutral-500">Works with LinkedIn posts, job listings, and company career pages.</p>
                            </div>
                        )}

                        {activeTab === 'image' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                <label className="block w-full border-2 border-dashed border-neutral-700 rounded-xl p-10 text-center cursor-pointer hover:border-neutral-500 hover:bg-neutral-800/50 transition-all bg-neutral-950/50 group">
                                    <input type="file" name="file" accept="image/*" className="hidden" required />
                                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📸</div>
                                    <span className="text-neutral-400 font-medium block">Click to upload screenshot</span>
                                    <span className="text-neutral-600 text-xs mt-2 block">Supports PNG, JPG (Max 5MB)</span>
                                </label>
                            </div>
                        )}

                        {activeTab === 'text' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                <label className="block text-sm font-medium text-neutral-400">Paste Information</label>
                                <textarea
                                    name="text"
                                    placeholder="Paste job description, LinkedIn post text, or email content here..."
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 min-h-[200px] text-neutral-300 focus:outline-none focus:border-neutral-600 transition-all font-mono text-sm"
                                    required
                                    autoFocus
                                />
                            </div>
                        )}

                        <div className="pt-2">
                            <SubmitButton label="Analyze & Review" loadingLabel="Extracting Data..." />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
