import { prisma } from "@/lib/prisma"
import { saveImage } from "../actions"
import Link from "next/link"

export default async function GalleryEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const isNew = id === "new"
    let img = null

    if (!isNew) {
        img = await prisma.galleryItem.findUnique({ where: { id } })
        if (!img) return <div className="p-8 text-center">Image not found</div>
    }

    return (
        <div className="space-y-6 max-w-xl mx-auto animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{isNew ? "Add Image" : "Edit Image"}</h2>
                <Link href="/admin/gallery" className="text-neutral-400 hover:text-white transition-colors">Cancel</Link>
            </div>

            <form action={saveImage} className="space-y-6">
                <input type="hidden" name="id" value={id} />

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-300">Image URL</label>
                    <input name="imageUrl" type="url" defaultValue={img?.imageUrl} required placeholder="https://..." className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-mono text-sm" />
                    <p className="text-xs text-neutral-500">Direct link to image (Unsplash, Cloudinary, etc)</p>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-300">Title / Caption</label>
                    <textarea name="title" defaultValue={img?.title || ""} required rows={3} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-neutral-300">Order Priority</label>
                        <input name="order" type="number" defaultValue={img?.order || 0} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" />
                    </div>
                </div>

                <div className="pt-4 border-t border-neutral-800">
                    <button type="submit" className="w-full bg-white text-black py-2.5 rounded-lg font-bold hover:bg-neutral-200 transition-colors shadow-lg shadow-purple-500/10">
                        Save Image
                    </button>
                </div>
            </form>
        </div>
    )
}
