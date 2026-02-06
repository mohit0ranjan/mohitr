"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function saveTicker(formData: FormData) {
    const id = formData.get("id")?.toString() || ""
    const content = formData.get("content")?.toString() || ""
    const type = formData.get("type")?.toString() || ""
    const urlRaw = formData.get("url")?.toString()
    const url = urlRaw || null
    const orderStr = formData.get("order")?.toString() || "0"
    const order = parseInt(orderStr)
    const isActive = formData.get("isActive") === "on"

    const data = { content, type, url, order, isActive }

    try {
        if (id === "new") {
            await prisma.tickerUpdate.create({ data })
        } else {
            await prisma.tickerUpdate.update({ where: { id }, data })
        }
    } catch (e) {
        console.error("Save error:", e)
    }

    revalidatePath("/admin/updates")
    revalidatePath("/")
    redirect("/admin/updates")
}

export async function deleteTicker(id: string) {
    try {
        await prisma.tickerUpdate.delete({ where: { id } })
        revalidatePath("/admin/updates")
        revalidatePath("/")
    } catch (e) {
        console.error("Delete error:", e)
    }
}
