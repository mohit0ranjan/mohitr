"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function saveCapability(formData: FormData) {
    const id = formData.get("id")?.toString() || ""
    const title = formData.get("title")?.toString() || ""
    const description = formData.get("description")?.toString() || ""
    const icon = formData.get("icon")?.toString() || ""
    const orderStr = formData.get("order")?.toString() || "0"
    const order = parseInt(orderStr)
    const isVisible = formData.get("isVisible") === "on"

    const data = { title, description, icon, order, isVisible }

    try {
        if (id === "new") {
            await prisma.capability.create({ data })
        } else {
            await prisma.capability.update({ where: { id }, data })
        }
    } catch (e) {
        console.error("Save error:", e)
    }

    revalidatePath("/admin/capabilities")
    revalidatePath("/")
    redirect("/admin/capabilities")
}

export async function deleteCapability(id: string) {
    try {
        await prisma.capability.delete({ where: { id } })
        revalidatePath("/admin/capabilities")
        revalidatePath("/")
    } catch (e) {
        console.error("Delete error:", e)
    }
}
