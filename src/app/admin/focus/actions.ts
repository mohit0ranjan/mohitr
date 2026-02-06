"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function saveFocusPoint(formData: FormData) {
    const id = formData.get("id")?.toString() || ""
    const title = formData.get("title")?.toString() || ""
    const description = formData.get("description")?.toString() || ""
    const orderStr = formData.get("order")?.toString() || "0"
    const order = parseInt(orderStr)
    const isActive = formData.get("isActive") === "on"

    const data = { title, description, order, isActive }

    try {
        if (id === "new") {
            await prisma.focusPoint.create({ data })
        } else {
            await prisma.focusPoint.update({ where: { id }, data })
        }
    } catch (e) {
        console.error("Save error:", e)
    }

    revalidatePath("/admin/focus")
    revalidatePath("/")
    redirect("/admin/focus")
}

export async function deleteFocusPoint(id: string) {
    try {
        await prisma.focusPoint.delete({ where: { id } })
        revalidatePath("/admin/focus")
        revalidatePath("/")
    } catch (e) {
        console.error("Delete error:", e)
    }
}
