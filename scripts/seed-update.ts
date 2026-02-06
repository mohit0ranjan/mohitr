
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Updating Seed Data...')

    // Update Settings in PageContent
    const settings = {
        email: 'mohitranjan2021@gmail.com',
        linkedin: 'https://www.linkedin.com/in/itsmohitr/',
        github: 'https://github.com/mohit0ranjan',
        resume: '/resume.pdf'
    }

    await prisma.pageContent.upsert({
        where: { section: 'settings' },
        update: { content: JSON.stringify(settings) },
        create: {
            section: 'settings',
            content: JSON.stringify(settings),
        },
    })
    console.log('✅ Updated Social Links (LinkedIn, GitHub)')

    // Ensure at least one published post exists for testing
    const examplePost = {
        title: "Example Project Breakdown",
        slug: "example-project-breakdown",
        content: "# Integrating AI Agents\n\nThis is a test post to verify the blog functionality.",
        excerpt: "A deep dive into building autonomous agents.",
        isPublished: true,
        publishedAt: new Date()
    }

    await prisma.post.upsert({
        where: { slug: examplePost.slug },
        update: { isPublished: true },
        create: examplePost
    })
    console.log('✅ Verified/Created Example Post')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
