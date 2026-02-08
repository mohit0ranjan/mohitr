import { prisma } from "@/lib/prisma"
import { HackathonForm } from "../_components/HackathonForm"
import { notFound } from "next/navigation"

interface PageProps {
    params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'

export default async function EditHackathonPage({ params }: PageProps) {
    const { id } = await params
    const hackathon = await prisma.hackathon.findUnique({
        where: { id }
    })

    if (!hackathon) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Edit Hackathon</h2>
            <HackathonForm hackathon={hackathon} />
        </div>
    )
}
