import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    const email = process.env.ADMIN_EMAIL || "admin@example.com"
    // Default password if not provided. User should change this ASAP or provide env var.
    const password = process.env.ADMIN_PASSWORD || "admin123"

    console.log(`Creating admin user: ${email}...`)

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            updatedAt: new Date()
        },
        create: {
            email,
            password: hashedPassword,
            name: "Admin",
            createdAt: new Date(),
            updatedAt: new Date()
        },
    })

    console.log(`✅ Admin user ready.`)
    console.log(`Email: ${user.email}`)
    if (!process.env.ADMIN_PASSWORD) {
        console.log(`Password: admin123 (Change this immediately!)`)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
