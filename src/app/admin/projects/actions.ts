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
    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const detail = formData.get("detail") as string
    const techStack = formData.get("techStack") as string
    const category = formData.get("category") as string
    const liveUrl = formData.get("liveUrl") as string
    const githubUrl = formData.get("githubUrl") as string
    const isFeatured = formData.get("isFeatured") === "on"

    const data = {
        name,
        description,
        detail,
        techStack,
        category,
        liveUrl: liveUrl || "",
        githubUrl: githubUrl || "",
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
    redirect('/admin/projects')
}
