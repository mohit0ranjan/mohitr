'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function savePageContent(formData: FormData) {
    const section = formData.get("section")?.toString() || ""
    const content = formData.get("content")?.toString() || "" // JSON string

    // In a real app we might parse separate fields, but for flexibility we'll just store JSON
    // Or we could have dynamic fields based on section. 
    // To keep it simple, we will trust the JSON or text content.

    try {
        await prisma.pageContent.upsert({
            where: { section },
            create: { section, content },
            update: { content }
        })
    } catch (e) {
        console.error("Failed to save page content", e)
        return
    }

    revalidatePath('/admin/pages')
    redirect('/admin/pages')
}
