'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function deletePost(id: string) {
    if (!id) return
    try {
        await prisma.post.delete({
            where: { id }
        })
        revalidatePath('/admin/posts')
    } catch (e) {
        console.error("Failed to delete post", e)
    }
}

export async function savePost(formData: FormData) {
    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const excerpt = formData.get("excerpt") as string
    const tags = formData.get("tags") as string
    const isPublished = formData.get("isPublished") === "on"
    let slug = formData.get("slug") as string

    if (!slug) {
        slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    }

    const data = {
        title,
        slug,
        content,
        excerpt,
        tags,
        isPublished,
        publishedAt: isPublished ? new Date() : null
    }

    try {
        if (id === "new") {
            await prisma.post.create({ data })
        } else {
            await prisma.post.update({
                where: { id },
                data
            })
        }
    } catch (e) {
        console.error("Failed to save post", e)
        // In real app, return error state
        return { error: "Failed to save" }
    }

    revalidatePath('/admin/posts')
    redirect('/admin/posts')
}
