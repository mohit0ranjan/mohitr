'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function deleteProject(id: string) {
    if (!id) return
    try {
        await prisma.project.delete({ where: { id } })
        revalidatePath('/admin/projects')
    } catch (e) {
        console.error("Failed to delete project", e)
    }
}

export async function saveProject(formData: FormData) {
    const id = formData.get("id")?.toString() || ""
    const name = formData.get("name")?.toString() || ""
    const description = formData.get("description")?.toString() || ""
    const detail = formData.get("detail")?.toString() || ""
    const techStack = formData.get("techStack")?.toString() || ""
    const category = formData.get("category")?.toString() || ""
    const liveUrl = formData.get("liveUrl")?.toString() || ""
    const githubUrl = formData.get("githubUrl")?.toString() || ""
    const isFeatured = formData.get("isFeatured") === "on"

    const data = {
        name,
        description,
        detail,
        techStack,
        category,
        liveUrl,
        githubUrl,
        isFeatured
    }

    try {
        if (id === "new") {
            await prisma.project.create({ data })
        } else {
            await prisma.project.update({ where: { id }, data })
        }
    } catch (e) {
        console.error("Failed to save project", e)
        return
    }

    revalidatePath('/admin/projects')
    revalidatePath('/')
    redirect('/admin/projects')
}
