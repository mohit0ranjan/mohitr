"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function saveTool(formData: FormData) {
    const id = formData.get("id")?.toString() || ""
    const name = formData.get("name")?.toString() || ""
    const slug = formData.get("slug")?.toString() || ""
    const shortDescription = formData.get("shortDescription")?.toString() || ""
    const longDescription = formData.get("longDescription")?.toString() || ""
    const category = formData.get("category")?.toString() || ""
    const toolType = formData.get("toolType")?.toString() || ""

    const liveUrlRaw = formData.get("liveUrl")?.toString()
    const liveUrl = liveUrlRaw || null

    const githubUrlRaw = formData.get("githubUrl")?.toString()
    const githubUrl = githubUrlRaw || null

    const isFeatured = formData.get("isFeatured") === "on"
    const isPublished = formData.get("isPublished") === "on"

    const data = {
        name,
        slug,
        shortDescription,
        longDescription,
        category,
        toolType,
        liveUrl,
        githubUrl,
        isFeatured,
        isPublished
    }

    try {
        if (id === "new") {
            await prisma.devTool.create({ data })
        } else {
            await prisma.devTool.update({
                where: { id },
                data
            })
        }
    } catch (e) {
        console.error("Failed to save tool", e)
        return
    }

    revalidatePath("/admin/tools")
    revalidatePath("/tools")
    revalidatePath("/")
    redirect("/admin/tools")
}

export async function deleteTool(id: string) {
    try {
        await prisma.devTool.delete({ where: { id } })
        revalidatePath("/admin/tools")
        revalidatePath("/tools")
        revalidatePath("/")
    } catch (e) {
        console.error("Failed to delete tool", e)
    }
}
