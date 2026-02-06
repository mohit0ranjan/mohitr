
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Migrating Timeline...')

    // Check if NIT Jalandhar exists
    const exists = await prisma.timelineEntry.findFirst({
        where: { title: { contains: 'NIT Jalandhar' } }
    })

    if (!exists) {
        await prisma.timelineEntry.create({
            data: {
                title: "NIT Jalandhar",
                year: "2023 — 2027",
                type: "Education",
                description: "Computer Science & Engineering. Specialized in Data Structures, Algorithms, and Distributed Systems. Active contributor to the technical coding society.",
                order: 10,
                isVisible: true
            }
        })
        console.log('✅ Created Education Entry: NIT Jalandhar')
    } else {
        console.log('ℹ️ Education Entry already exists.')
    }

    // Ensure an Experience entry exists
    const expExists = await prisma.timelineEntry.findFirst({
        where: { type: 'Experience' }
    })

    if (!expExists) {
        await prisma.timelineEntry.create({
            data: {
                title: "Full Stack Engineer",
                year: "2024 — Present",
                type: "Experience",
                description: "Building scalable web applications and AI agents.",
                order: 5,
                isVisible: true
            }
        })
        console.log('✅ Created Default Experience Entry')
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
