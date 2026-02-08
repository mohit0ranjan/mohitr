"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createTool(formData: FormData) {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const link = formData.get("link") as string
    const pricing = formData.get("pricing") as string
    const category = formData.get("category") as string

    await prisma.outreachTool.create({
        data: {
            name,
            description,
            link,
            pricing,
            category,
            isPublished: true
        }
    })

    revalidatePath("/admin/off-campus/tools")
    revalidatePath("/offcampus")
    redirect("/admin/off-campus/tools")
}

export async function deleteTool(id: string) {
    await prisma.outreachTool.delete({
        where: { id }
    })
    revalidatePath("/admin/off-campus/tools")
    revalidatePath("/offcampus")
}
