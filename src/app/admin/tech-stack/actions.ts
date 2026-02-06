"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function saveTechTool(formData: FormData) {
    const id = formData.get("id")?.toString() || ""
    const name = formData.get("name")?.toString() || ""
    const category = formData.get("category")?.toString() || ""
    const icon = formData.get("icon")?.toString() || ""
    const orderStr = formData.get("order")?.toString() || "0"
    const order = parseInt(orderStr)
    const isVisible = formData.get("isVisible") === "on"

    const data = { name, category, icon, order, isVisible }

    try {
        if (id === "new") {
            await prisma.techTool.create({ data })
        } else {
            await prisma.techTool.update({ where: { id }, data })
        }
    } catch (e) {
        console.error("Save error:", e)
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
        console.error("Delete error:", e)
    }
}
