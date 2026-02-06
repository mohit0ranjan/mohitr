"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function saveTechTool(formData: FormData) {
    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const category = formData.get("category") as string
    const icon = formData.get("icon") as string
    const order = parseInt(formData.get("order") as string || "0")
    const isVisible = formData.get("isVisible") === "on"

    const data = { name, category, icon, order, isVisible }

    try {
        if (id === "new") {
            await prisma.techTool.create({ data })
        } else {
            await prisma.techTool.update({ where: { id }, data })
        }
    } catch (e) {
        return { error: "Failed to save" }
    }

    revalidatePath("/admin/tech-stack")
    revalidatePath("/")
    redirect("/admin/tech-stack")
}

export async function deleteTechTool(id: string) {
    try {
        await prisma.techTool.delete({ where: { id } })
        revalidatePath("/admin/tech-stack")
        revalidatePath("/")
    } catch (e) {
        return { error: "Failed to delete" }
    }
}
