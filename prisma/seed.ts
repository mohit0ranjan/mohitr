import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding ...')

    // Clean up existing data (optional, but good for idempotent runs)
    // await prisma.project.deleteMany()
    // await prisma.opportunity.deleteMany()
    // await prisma.techTool.deleteMany()
    // await prisma.timelineEntry.deleteMany()
    // await prisma.post.deleteMany()
    // await prisma.galleryItem.deleteMany() 
    // Be careful with deleteMany in production, but okay for dev loop if configured. 
    // For now I will just UPSERT or CREATE if not exists to avoid duplicates if possible, or just create.

    // 1. Projects
    await prisma.project.create({
        data: {
            name: 'E-Tax Assistant',
            description: 'An AI-powered tax filing assistant for India. Automates ITR json generation.',
            category: 'System',
            isFeatured: true,
            techStack: 'Next.js, FastAPI, PostgreSQL, Python',
            liveUrl: 'https://etax.example.com',
            githubUrl: 'https://github.com/mohitranjan/etax',
        },
    })

    await prisma.project.create({
        data: {
            name: 'Agentic Workflow Engine',
            description: 'A distributed system for orchestrating multi-agent LLM tasks.',
            category: 'Infrastructure',
            isFeatured: true,
            techStack: 'Rust, Temporal, gRPC',
            liveUrl: '#',
        }
    })

    // 2. Opportunities (Signals)
    await prisma.opportunity.createMany({
        data: [
            {
                role: 'Backend Engineer',
                company: 'Vercel',
                type: 'Full-time',
                url: 'https://vercel.com/careers',
                status: 'Active',
            },
            {
                role: 'AI Researcher',
                company: 'DeepMind',
                type: 'Residency',
                url: 'https://deepmind.com',
                status: 'Active',
            }
        ]
    })

    // 3. Tech Tools
    const tools = [
        { name: 'Next.js', category: 'Frontend', icon: 'Box' },
        { name: 'React', category: 'Frontend', icon: 'Atom' },
        { name: 'Tailwind', category: 'Frontend', icon: 'Palette' },
        { name: 'PostgreSQL', category: 'Backend', icon: 'Database' },
        { name: 'Python', category: 'Language', icon: 'Terminal' },
        { name: 'Rust', category: 'Language', icon: 'Cog' },
    ]

    for (const t of tools) {
        await prisma.techTool.create({
            data: { ...t, isVisible: true }
        })
    }

    // 4. Timeline
    await prisma.timelineEntry.createMany({
        data: [
            {
                year: '2026',
                title: 'Graduation',
                type: 'Education',
                description: 'B.Tech in Computer Science from NIT Jalandhar.',
                order: 1
            },
            {
                year: '2024',
                title: 'Full Stack Intern',
                type: 'Role',
                description: 'Built scalable APIs at TechCorp.',
                order: 2
            }
        ]
    })

    // 5. Posts
    await prisma.post.create({
        data: {
            title: 'The Future of Agentic Systems',
            slug: 'agentic-systems-future',
            excerpt: 'Why we are moving from chat-bots to do-engines.',
            content: 'Full content here...',
            isPublished: true,
            publishedAt: new Date(),
        }
    })

    // 6. Gallery
    await prisma.galleryItem.create({
        data: {
            title: 'Late Night Deploy',
            imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
            date: new Date(),
            isVisible: true
        }
    })

    console.log('Seeding finished.')
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
