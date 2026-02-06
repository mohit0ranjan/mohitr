"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function saveCapability(formData: FormData) {
    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const icon = formData.get("icon") as string
    const order = parseInt(formData.get("order") as string || "0")
    const isVisible = formData.get("isVisible") === "on"

    const data = { title, description, icon, order, isVisible }

    try {
        if (id === "new") {
            await prisma.capability.create({ data })
        } else {
            await prisma.capability.update({ where: { id }, data })
        }
    } catch (e) {
        return { error: "Failed to save" }
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
        return { error: "Failed to delete" }
    }
}
