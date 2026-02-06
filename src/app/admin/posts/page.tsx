import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { deletePost } from "./actions"

export const dynamic = 'force-dynamic'

export default async function PostsPage() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Blog Posts</h2>
                <Link href="/admin/posts/new" className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-neutral-200 transition-colors">
                    Create New
                </Link>
            </div>

            <div className="border border-neutral-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400">
                        <tr>
                            <th className="p-4 font-medium">Title</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium">Date</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800 bg-neutral-950">
                        {posts.map(post => (
                            <tr key={post.id} className="hover:bg-neutral-900/50 transition-colors">
                                <td className="p-4 font-medium">
                                    <Link href={`/admin/posts/${post.id}`} className="hover:underline">
                                        {post.title}
                                    </Link>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs border ${post.isPublished ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                                        {post.isPublished ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="p-4 text-neutral-400">{new Date(post.createdAt).toLocaleDateString()}</td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <Link href={`/admin/posts/${post.id}`} className="text-neutral-400 hover:text-white transition-colors">Edit</Link>
                                        <form action={deletePost.bind(null, post.id)}>
                                            <button className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-12 text-center text-neutral-500">No posts found. Start writing!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
