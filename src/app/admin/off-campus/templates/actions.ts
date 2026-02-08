"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createTemplate(formData: FormData) {
    const title = formData.get("title") as string
    const subject = formData.get("subject") as string
    const body = formData.get("body") as string
    const category = formData.get("category") as string
    const tips = formData.get("tips") as string

    await prisma.coldEmailTemplate.create({
        data: {
            title,
            subject,
            body,
            category,
            tips,
            isPublished: true
        }
    })

    revalidatePath("/admin/off-campus/templates")
    revalidatePath("/offcampus")
    redirect("/admin/off-campus/templates")
}

export async function deleteTemplate(id: string) {
    await prisma.coldEmailTemplate.delete({
        where: { id }
    })
    revalidatePath("/admin/off-campus/templates")
    revalidatePath("/offcampus")
}
