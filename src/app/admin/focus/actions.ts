"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function saveFocusPoint(formData: FormData) {
    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const order = parseInt(formData.get("order") as string || "0")
    const isActive = formData.get("isActive") === "on"

    const data = { title, description, order, isActive }

    try {
        if (id === "new") {
            await prisma.focusPoint.create({ data })
        } else {
            await prisma.focusPoint.update({ where: { id }, data })
        }
    } catch (e) {
        return { error: "Failed to save" }
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
        return { error: "Failed to delete" }
    }
}
