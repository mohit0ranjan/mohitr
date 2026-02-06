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
    const id = formData.get("id") as string
    const role = formData.get("role") as string
    const company = formData.get("company") as string
    const description = formData.get("description") as string
    const url = formData.get("url") as string
    const type = formData.get("type") as string
    const status = formData.get("status") as string
    const isFeatured = formData.get("isFeatured") === "on"

    const data = {
        role,
        company,
        description,
        url: url || "",
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
