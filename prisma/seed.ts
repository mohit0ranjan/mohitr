
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Start seeding...')

    // 1. ADMIN USER (Idempotent)
    const email = 'mohitranjan2021@gmail.com'
    const passwordRaw = 'Admin@123'
    const passwordHash = await bcrypt.hash(passwordRaw, 10)

    const admin = await prisma.user.upsert({
        where: { email },
        update: {
            role: 'ADMIN',
            // Do NOT update password if user exists to prevent lockout if they changed it
        },
        create: {
            email,
            password: passwordHash,
            name: 'Mohit Ranjan',
            role: 'ADMIN',
        },
    })
    console.log(`👤 Admin user ensured: ${admin.email}`)

    // 2. HOMEPAGE CONTENT (Hero & Ticker)
    await prisma.pageContent.upsert({
        where: { section: 'hero' },
        update: {}, // Don't overwrite if exists
        create: {
            section: 'hero',
            content: JSON.stringify({
                title: "Building Digital <br/> <span class='text-neutral-500'>Experiences.</span>",
                subtitle: "Full-stack engineer and product designer based in India.",
                badge: "Available for hire"
            })
        }
    })

    await prisma.tickerUpdate.upsert({
        where: { id: 'default-ticker' }, // Using a fixed ID for singleton-like behavior if needed, but schema uses uuid. 
        // Strategy: Check if any exist, if not create.
        update: {},
        create: {
            content: "Just shipped v1.0 of the new portfolio!",
            type: "Update",
            isActive: true
        }
    }).catch(() => {
        // Fallback if ID constraint fails or just create fresh if really needed, 
        // but for 'seed' usually we want *some* data.
        // Let's just create one if table is empty.
    })

    // Better Ticker Strategy: Create if count is 0
    const tickerCount = await prisma.tickerUpdate.count()
    if (tickerCount === 0) {
        await prisma.tickerUpdate.create({
            data: {
                content: "Exploring Agentic AI workflows with Rust.",
                type: "Learning",
                isActive: true
            }
        })
    }


    // 3. PROJECTS
    const projects = [
        {
            name: 'E-Tax Assistant',
            description: 'AI-powered tax filing assistant for India. Automates ITR extraction and JSON generation.',
            category: 'System',
            isFeatured: true,
            techStack: 'Next.js, FastAPI, PostgreSQL, Python',
            liveUrl: 'https://etax-demo.vercel.app',
            githubUrl: 'https://github.com/mohitranjan/etax',
            imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80',
        },
        {
            name: 'Agentic Workflow Engine',
            description: 'Distributed system for orchestrating multi-agent LLM tasks with temporal reliability.',
            category: 'Infrastructure',
            isFeatured: true,
            techStack: 'Rust, Temporal, gRPC, Docker',
            githubUrl: 'https://github.com/mohitranjan/agentic-engine',
            imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80',
        },
        {
            name: 'Bento Portfolio',
            description: 'A premium, grid-style developer portfolio with built-in CMS and analytics.',
            category: 'Web App',
            isFeatured: true,
            techStack: 'Next.js 15, Tailwind, Prisma, Neon',
            liveUrl: '#',
            githubUrl: 'https://github.com/mohitranjan/bento-portfolio',
            imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80',
        }
    ]

    for (const p of projects) {
        // Simple dedupe check by name since we don't have unique slug for projects in schema (it uses ID)
        const existing = await prisma.project.findFirst({ where: { name: p.name } })
        if (!existing) {
            await prisma.project.create({ data: p })
        }
    }
    console.log('💻 Projects seeded')


    // 4. BLOG POSTS
    const posts = [
        {
            title: 'The Future of Agentic Systems',
            slug: 'agentic-systems-future',
            excerpt: 'Why we are moving from chat-bots to autonomous do-engines.',
            content: `
# The Shift to Agency

We are witnessing a paradigm shift in AI. The era of "chatbots" is ending, and the era of **Agentic Systems** is beginning.

## What defines an Agent?
Unlike a chatbot that waits for input, an agent:
1.  **Observes** its environment
2.  **Reasons** about state
3.  **Acts** to change that state

\`\`\`rust
// Simplified Agent Loop
loop {
    let state = env.observe();
    let action = agent.decide(state);
    env.execute(action);
}
\`\`\`

## The Reliability Problem
Building reliable agents is hard. LLMs are probabilistic, but software needs to be deterministic. This is where frameworks like LangChain and Temporal come in...
            `,
            isPublished: true,
            publishedAt: new Date('2025-10-15'), // Future date or past
        },
        {
            title: 'Optimizing Next.js for Performance',
            slug: 'optimizing-nextjs-performance',
            excerpt: 'Deep dive into server components, streaming, and partial prerendering.',
            content: `
# Next.js Performance Patterns

Performance is not a feature; it's a requirement.

## Server Components
React Server Components (RSC) allow us to keep heavy dependencies on the server.

- **Zero Bundle Size**: Libraries used in RSCs don't ship to client.
- **Direct DB Access**: No need for API routes for read-only data.

> "The fastest request is the one you don't make."

## Partial Prerendering (PPR)
PPR is the holy grail. It mixes static shell with dynamic holes...
            `,
            isPublished: true,
            publishedAt: new Date('2025-11-01'),
        },
        {
            title: 'Reflecting on 4 Years of CS',
            slug: 'reflecting-on-cs-degree',
            excerpt: 'Lessons learned from NIT Jalandhar and the road ahead.',
            content: `
# The Journey
Four years ago, I wrote my first line of C++. Today, I'm architecting distributed systems.

## Key Takeaways
1.  **Fundamentals Matter**: Frameworks change, but Data Structures and Algorithms stay.
2.  **Build Things**: You learn more by breaking production than by reading tutorials.
3.  **Network**: specific peers push you higher.

## What's Next?
I'm doubling down on Systems Programming and AI Infrastructure...
            `,
            isPublished: true,
            publishedAt: new Date('2026-01-20'),
        }
    ]

    for (const post of posts) {
        await prisma.post.upsert({
            where: { slug: post.slug },
            update: {},
            create: post
        })
    }
    console.log('✍️ Blog posts seeded')


    // 5. OPPORTUNITIES
    const opps = [
        {
            title: 'Backend Engineer',
            slug: 'backend-engineer-vercel',
            company: 'Vercel',
            type: 'Full-time',
            location: 'Remote',
            status: 'Active',
            applyLink: 'https://vercel.com/careers',
            shortDescription: 'Join the infrastructure team building the future of the web.',
            fullDescription: `
## About the Team
Vercel's infrastructure team builds the primitive that power the frontend cloud.

## Responsibilities
- Design and implement scalable backend services in Go and Rust.
- Optimize edge network latency.
- Work on distributed caching systems.

## Requirements
- 3+ years of experience with distributed systems.
- Proficiency in Go or Rust.
- Deep understanding of HTTP/2 and Networking.
            `,
            isPublished: true,
            stipend: "$120k - $160k",
            duration: "Full-time"
        },
        {
            title: 'AI Resident',
            slug: 'ai-resident-meta',
            company: 'Meta AI',
            type: 'Residency',
            location: 'New York / London',
            status: 'Active',
            applyLink: 'https://facebook.com/careers',
            shortDescription: '12-month research residency program for new grads.',
            fullDescription: `
## The Program
This residency is designed to jumpstart your career in AI Research. You will work alongside top researchers on problems in CV, NLP, and RL.

## Who should apply?
- Recent grads (BS/MS/PhD) in CS or Math.
- Strong PyTorch skills.
- Passion for solving hard problems.
            `,
            isPublished: true,
            stipend: "$90k / year",
            duration: "12 Months"
        }
    ]

    for (const op of opps) {
        await prisma.opportunity.upsert({
            where: { slug: op.slug },
            update: {},
            create: op
        })
    }
    console.log('🚀 Opportunities seeded')


    // 6. DEV TOOLS
    const devTools = [
        {
            name: 'JSON Formatter',
            slug: 'json-formatter',
            category: 'Utility',
            shortDescription: 'Prettify and validate JSON data instantly.',
            isPublished: true,
            longDescription: 'A simple, clean JSON formatter that runs entirely in your browser. No data is sent to any server.',
        },
        {
            name: 'JWT Debugger',
            slug: 'jwt-debugger',
            category: 'Security',
            shortDescription: 'Decode and inspect JWT tokens.',
            isPublished: true,
            longDescription: 'Parse JWT headers and payloads. Check expiration times.',
        }
    ]

    for (const tool of devTools) {
        await prisma.devTool.upsert({
            where: { slug: tool.slug },
            update: {},
            create: tool
        })
    }
    console.log('🛠️ Dev tools seeded')

    // 7. TECH STACK (If empty)
    const techCount = await prisma.techTool.count()
    if (techCount === 0) {
        await prisma.techTool.createMany({
            data: [
                { name: 'Next.js', category: 'Frontend', order: 1 },
                { name: 'React', category: 'Frontend', order: 2 },
                { name: 'TypeScript', category: 'Language', order: 3 },
                { name: 'Tailwind', category: 'Frontend', order: 4 },
                { name: 'PostgreSQL', category: 'Backend', order: 5 },
                { name: 'Rust', category: 'Language', order: 6 },
            ]
        })
    }


    // 8. HACKATHONS
    const hackathons = [
        {
            name: "ETHGlobal San Francisco",
            slug: "ethglobal-sf-2026",
            organizer: "ETHGlobal",
            website: "https://ethglobal.com",
            location: "San Francisco, CA",
            mode: "Offline",
            startDate: new Date("2026-10-16"),
            endDate: new Date("2026-10-18"),
            status: "Upcoming",
            tags: "Web3, Blockchain, Ethereum",
            description: "The world's largest Ethereum hackathon series comes back to SF.",
            isFeatured: true,
            imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80"
        },
        {
            name: "Google AI Challenge",
            slug: "google-ai-challenge-2026",
            organizer: "Google",
            website: "https://ai.google.dev",
            location: "Global",
            mode: "Online",
            startDate: new Date("2026-03-01"),
            endDate: new Date("2026-03-15"),
            status: "Open",
            tags: "AI, Machine Learning, Gemini",
            description: "Build the next generation of AI apps using Gemini models.",
            isFeatured: true,
            imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80"
        },
        {
            name: "StarkNet Hack",
            slug: "starknet-hack-2026",
            organizer: "StarkWare",
            website: "https://starknet.io",
            location: "Berlin / Online",
            mode: "Hybrid",
            startDate: new Date("2026-04-10"),
            endDate: new Date("2026-04-12"),
            status: "Upcoming",
            tags: "ZK-Rollups, Cairo, Layer 2",
            description: "Push the boundaries of scaling on Ethereum with StarkNet.",
            isFeatured: false,
            imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80"
        },
        { // Past Event for testing filters
            name: "NASA Space Apps 2025",
            slug: "nasa-space-apps-2025",
            organizer: "NASA",
            website: "https://spaceappschallenge.org",
            location: "Global",
            mode: "Hybrid",
            startDate: new Date("2025-10-02"),
            endDate: new Date("2025-10-04"),
            status: "Closed",
            tags: "Space, Data Science, Earth",
            description: "Solve challenges submitted by NASA personnel and space agency partners.",
            isFeatured: false,
            imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
        }
    ]

    for (const h of hackathons) {
        // Need to match the schema created. 
        // Schema: name, slug, organizer, website, location, mode, startDate, endDate, description, tags, status, isFeatured, imageUrl
        await prisma.hackathon.upsert({
            where: { slug: h.slug },
            update: {},
            create: h
        })
    }
    console.log('🏆 Hackathons seeded')

    console.log('✅ Seeding finished.')
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
