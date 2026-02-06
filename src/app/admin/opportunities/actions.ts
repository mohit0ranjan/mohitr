'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function deleteOpportunity(id: string) {
    if (!id) return
    try {
        await prisma.opportunity.delete({ where: { id } })
        revalidatePath('/admin/opportunities')
    } catch (e) {
        console.error("Failed to delete opportunity", e)
    }
}

export async function saveOpportunity(formData: FormData) {
    const id = formData.get("id")?.toString() || ""
    const role = formData.get("role")?.toString() || ""
    const company = formData.get("company")?.toString() || ""
    const description = formData.get("description")?.toString() || ""
    const url = formData.get("url")?.toString() || ""
    const type = formData.get("type")?.toString() || ""
    const status = formData.get("status")?.toString() || ""
    const isFeatured = formData.get("isFeatured") === "on"

    const data = {
        role,
        company,
        description,
        url,
        type,
        status,
        isFeatured
    }

    try {
        if (id === "new") {
            await prisma.opportunity.create({ data })
        } else {
            await prisma.opportunity.update({ where: { id }, data })
        }
    } catch (e) {
        console.error("Failed to save opportunity", e)
        return
    }

    revalidatePath('/admin/opportunities')
    redirect('/admin/opportunities')
}
