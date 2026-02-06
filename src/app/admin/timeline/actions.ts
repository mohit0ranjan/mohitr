"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function saveTimeline(formData: FormData) {
    const id = formData.get("id")?.toString() || ""
    const year = formData.get("year")?.toString() || ""
    const title = formData.get("title")?.toString() || ""
    const description = formData.get("description")?.toString() || ""
    const type = formData.get("type")?.toString() || ""
    const orderStr = formData.get("order")?.toString() || "0"
    const order = parseInt(orderStr)

    const isVisible = formData.get("isVisible") === "on"

    const data = { year, title, description, type, order, isVisible }

    try {
        if (id === "new") {
            await prisma.timelineEntry.create({ data })
        } else {
            await prisma.timelineEntry.update({ where: { id }, data })
        }
    } catch (e) {
        console.error("Save error:", e)
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
        console.error("Delete error:", e)
    }
}
