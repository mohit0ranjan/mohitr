import { prisma } from "@/lib/prisma"
import { savePost } from "../actions"
import Link from "next/link"
import Editor from "@/components/admin/Editor"

export default async function PostEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const isNew = id === "new"
    let post = null

    if (!isNew) {
        post = await prisma.post.findUnique({ where: { id } })
        if (!post) return <div className="p-8 text-center">Post not found</div>
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-500">
            <div className="flex justify-between items-center bg-neutral-950/80 backdrop-blur pb-4 sticky top-0 z-10 border-b border-neutral-800 mb-6 pt-2">
                <div>
                    <h2 className="text-2xl font-bold">{isNew ? "New Post" : "Edit Post"}</h2>
                    <p className="text-sm text-neutral-400">Manage your content</p>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/admin/posts" className="text-sm text-neutral-400 hover:text-white transition-colors">Cancel</Link>
                    {/* Submit button is inside form, but we can use form attribute or move form up */}
                </div>
            </div>

            <form action={savePost} className="space-y-8">
                <input type="hidden" name="id" value={id} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-neutral-300">Title</label>
                            <input
                                name="title"
                                defaultValue={post?.title ?? ""}
                                required
                                className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-lg font-medium"
                                placeholder="Enter post title"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-neutral-300">Slug</label>
                            <input
                                name="slug"
                                defaultValue={post?.slug ?? ""}
                                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-mono text-sm text-neutral-400"
                                placeholder="auto-generated-slug"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-neutral-300">Content (Markdown)</label>
                            <Editor
                                markdown={post?.content ?? ""}
                                name="content"
                                className="min-h-[600px]"
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="p-5 border border-neutral-800 rounded-xl bg-neutral-900/30 space-y-6 sticky top-24">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-neutral-300">Publish Status</label>
                                <div className="flex items-center gap-3">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" name="isPublished" defaultChecked={post?.isPublished ?? false} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                    </label>
                                    <span className="text-xs text-neutral-400">Live</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-neutral-300">Tags</label>
                                <input
                                    name="tags"
                                    defaultValue={post?.tags ?? ""}
                                    placeholder="Design, Next.js"
                                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
                                />
                                <p className="text-xs text-neutral-500">Comma separated</p>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-neutral-300">Excerpt</label>
                                <textarea
                                    name="excerpt"
                                    defaultValue={post?.excerpt ?? ""}
                                    rows={4}
                                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
                                    placeholder="Short summary for SEO and previews..."
                                />
                            </div>

                            <div className="pt-4 border-t border-neutral-800">
                                <button type="submit" className="w-full bg-white text-black py-2.5 rounded-lg font-bold hover:bg-neutral-200 transition-colors shadow-lg shadow-purple-500/10">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
