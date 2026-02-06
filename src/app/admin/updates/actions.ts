"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function saveTicker(formData: FormData) {
    const id = formData.get("id") as string
    const content = formData.get("content") as string
    const type = formData.get("type") as string
    const link = formData.get("link") as string
    const order = parseInt(formData.get("order") as string || "0")
    const isActive = formData.get("isActive") === "on"

    const data = { content, type, link: link || null, order, isActive }

    try {
        if (id === "new") {
            await prisma.tickerUpdate.create({ data })
        } else {
            await prisma.tickerUpdate.update({ where: { id }, data })
        }
    } catch (e) {
        return { error: "Failed to save" }
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
        return { error: "Failed to delete" }
    }
}
