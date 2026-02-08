"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createDataset(formData: FormData) {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const companies = formData.get("companies") as string
    const role = formData.get("role") as string
    const location = formData.get("location") as string
    const emailCount = parseInt(formData.get("emailCount") as string)
    const price = formData.get("price") as string
    const topmateLink = formData.get("topmateLink") as string
    const imageUrl = formData.get("imageUrl") as string
    const isVerified = formData.get("isVerified") === "on"
    const isPublished = formData.get("isPublished") === "on"

    await prisma.recruiterDataset.create({
        data: {
            title,
            description,
            companies,
            role,
            location,
            emailCount,
            price,
            topmateLink,
            imageUrl,
            isVerified,
            isPublished,
            fileFormat: "CSV" // Default for now
        }
    })

    revalidatePath("/admin/off-campus/datasets")
    revalidatePath("/offcampus")
    redirect("/admin/off-campus/datasets")
}

export async function deleteDataset(id: string) {
    await prisma.recruiterDataset.delete({
        where: { id }
    })
    revalidatePath("/admin/off-campus/datasets")
    revalidatePath("/offcampus")
}

export async function toggleDatasetPublish(id: string, currentState: boolean) {
    await prisma.recruiterDataset.update({
        where: { id },
        data: { isPublished: !currentState }
    })
    revalidatePath("/admin/off-campus/datasets")
    revalidatePath("/offcampus")
}
