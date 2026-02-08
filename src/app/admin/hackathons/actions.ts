'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createHackathon(formData: FormData) {
    const name = formData.get('name') as string
    const organizer = formData.get('organizer') as string
    const website = formData.get('website') as string
    const location = formData.get('location') as string
    const mode = formData.get('mode') as string
    const description = formData.get('description') as string
    const tags = formData.get('tags') as string
    const status = formData.get('status') as string
    const slug = formData.get('slug') as string
    const imageUrl = formData.get('imageUrl') as string

    // Dates need parsing
    const startDate = new Date(formData.get('startDate') as string)
    const endDate = new Date(formData.get('endDate') as string)
    const registrationDeadline = formData.get('registrationDeadline')
        ? new Date(formData.get('registrationDeadline') as string)
        : null

    const isFeatured = formData.get('isFeatured') === 'on'

    await prisma.hackathon.create({
        data: {
            name,
            slug,
            organizer,
            website,
            location,
            mode,
            startDate,
            endDate,
            registrationDeadline,
            description,
            tags,
            status,
            isFeatured,
            imageUrl
        }
    })

    revalidatePath('/admin/hackathons')
    revalidatePath('/hackathons')
    revalidatePath('/')
    redirect('/admin/hackathons')
}

export async function updateHackathon(id: string, formData: FormData) {
    const name = formData.get('name') as string
    const organizer = formData.get('organizer') as string
    const website = formData.get('website') as string
    const location = formData.get('location') as string
    const mode = formData.get('mode') as string
    const description = formData.get('description') as string
    const tags = formData.get('tags') as string
    const status = formData.get('status') as string
    const slug = formData.get('slug') as string
    const imageUrl = formData.get('imageUrl') as string

    const startDate = new Date(formData.get('startDate') as string)
    const endDate = new Date(formData.get('endDate') as string)
    const registrationDeadline = formData.get('registrationDeadline')
        ? new Date(formData.get('registrationDeadline') as string)
        : null

    const isFeatured = formData.get('isFeatured') === 'on'

    await prisma.hackathon.update({
        where: { id },
        data: {
            name,
            slug,
            organizer,
            website,
            location,
            mode,
            startDate,
            endDate,
            registrationDeadline,
            description,
            tags,
            status,
            isFeatured,
            imageUrl
        }
    })

    revalidatePath('/admin/hackathons')
    revalidatePath('/hackathons')
    revalidatePath('/')
    redirect('/admin/hackathons')
}

export async function deleteHackathon(id: string) {
    await prisma.hackathon.delete({
        where: { id }
    })

    revalidatePath('/admin/hackathons')
    revalidatePath('/hackathons')
    revalidatePath('/')
}
