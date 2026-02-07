'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function deleteOpportunity(id: string) {
    if (!id) return
    try {
        await prisma.opportunity.delete({ where: { id } })
        revalidatePath('/opportunities')
        revalidatePath('/admin/opportunities')
    } catch (e) {
        console.error("Failed to delete opportunity", e)
    }
}

function generateSlug(title: string) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export async function saveOpportunity(formData: FormData) {
    const id = formData.get("id")?.toString()
    const isNew = !id || id === 'new'

    const title = formData.get("title")?.toString() || ""
    const company = formData.get("company")?.toString() || ""
    const location = formData.get("location")?.toString() || ""
    const type = formData.get("type")?.toString() || "Internship"
    const status = formData.get("status")?.toString() || "Active"

    const shortDescription = formData.get("shortDescription")?.toString() || ""
    const fullDescription = formData.get("fullDescription")?.toString() || ""
    const applyLink = formData.get("applyLink")?.toString() || ""
    const duration = formData.get("duration")?.toString() || ""
    const stipend = formData.get("stipend")?.toString() || ""

    const isPublished = formData.get("isPublished") === "on"
    const isFeatured = formData.get("isFeatured") === "on"

    let slug = formData.get("slug")?.toString() || ""

    // Auto-generate slug if missing
    if (!slug && title) {
        slug = generateSlug(title)
        // Append random string for uniqueness robustness
        const randomSuffix = Math.random().toString(36).substring(2, 6)
        slug = `${slug}-${randomSuffix}`
    }

    const data = {
        title,
        slug,
        company,
        location,
        type,
        status,
        shortDescription,
        fullDescription,
        applyLink,
        duration,
        stipend,
        isPublished,
        isFeatured
    }

    try {
        if (isNew) {
            await prisma.opportunity.create({ data })
        } else {
            await prisma.opportunity.update({
                where: { id },
                data
            })
        }
    } catch (e) {
        console.error("Failed to save opportunity", e)
        return // Or handle error UI
    }

    revalidatePath('/opportunities')
    revalidatePath(`/opportunities/${slug}`)
    revalidatePath('/admin/opportunities')
    revalidatePath('/')
    redirect('/admin/opportunities')
}
