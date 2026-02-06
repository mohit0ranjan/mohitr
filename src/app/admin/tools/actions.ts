"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function saveTool(formData: FormData) {
    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const shortDescription = formData.get("shortDescription") as string
    const longDescription = formData.get("longDescription") as string
    const category = formData.get("category") as string
    const toolType = formData.get("toolType") as string
    const liveUrl = formData.get("liveUrl") as string
    const githubUrl = formData.get("githubUrl") as string
    const isFeatured = formData.get("isFeatured") === "on"
    const isPublished = formData.get("isPublished") === "on"

    const data = {
        name,
        slug,
        shortDescription,
        longDescription,
        category,
        toolType,
        liveUrl: liveUrl || null,
        githubUrl: githubUrl || null,
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
        return { error: "Failed to save" }
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
        return { error: "Failed to delete" }
    }
}
