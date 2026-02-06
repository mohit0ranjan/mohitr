"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function saveTimeline(formData: FormData) {
    const id = formData.get("id") as string
    const year = formData.get("year") as string
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const type = formData.get("type") as string
    const order = parseInt(formData.get("order") as string || "0")

    const isVisible = formData.get("isVisible") === "on"

    const data = { year, title, description, type, order, isVisible }

    try {
        if (id === "new") {
            await prisma.timelineEntry.create({ data })
        } else {
            await prisma.timelineEntry.update({ where: { id }, data })
        }
    } catch (e) {
        return { error: "Failed to save" }
    }

    revalidatePath("/admin/timeline")
    revalidatePath("/")
    redirect("/admin/timeline")
}

export async function deleteTimeline(id: string) {
    try {
        await prisma.timelineEntry.delete({ where: { id } })
        revalidatePath("/admin/timeline")
        revalidatePath("/")
    } catch (e) {
        return { error: "Failed to delete" }
    }
}
