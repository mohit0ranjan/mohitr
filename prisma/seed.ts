
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
        update: { role: 'ADMIN' },
        create: {
            email,
            password: passwordHash,
            name: 'Mohit Ranjan',
            role: 'ADMIN',
        },
    })
    console.log(`👤 Admin user ensured: ${admin.email}`)

    // 2. HOMEPAGE CONTENT (Hero)
    await prisma.pageContent.upsert({
        where: { section: 'hero' },
        update: {
            content: JSON.stringify({
                heading: "Building Scalable <br/> <span class='text-neutral-500'>Web Platforms.</span>",
                subheading: "Full Stack Engineer & Systems Enthusiast. Building real-time & distributed systems.",
                status: "Open to Work"
            })
        },
        create: {
            section: 'hero',
            content: JSON.stringify({
                heading: "Building Scalable <br/> <span class='text-neutral-500'>Web Platforms.</span>",
                subheading: "Full Stack Engineer & Systems Enthusiast. Building real-time & distributed systems.",
                status: "Open to Work"
            })
        }
    })

    // 3. PROJECTS (Resume based)
    // Clear existing to avoid duplicates with different IDs if we were using createMany but upsert is safer.
    // However, since we want exact resume projects, let's delete generic ones first if needed or just upsert by name.
    const projects = [
        {
            name: 'Social Music Platform (VibeRoom)',
            description: 'Real-time multi-user platform with synchronized music playback and chat.',
            category: 'Full Stack',
            isFeatured: true,
            techStack: 'React, TypeScript, Node.js, MongoDB, Socket.io',
            liveUrl: '#',
            githubUrl: 'https://github.com/mohitranjan/viberoom',
            imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80',
        },
        {
            name: 'AI-Based Travel Planner (Trip Genie)',
            description: 'Intelligent itinerary generation system producing 500+ personalized travel plans. Implemented RAG-style recommendation logic.',
            category: 'AI / Web',
            isFeatured: true,
            techStack: 'Next.js, Node.js, Google Maps API, Generative AI',
            liveUrl: '#',
            githubUrl: 'https://github.com/mohitranjan/trip-genie',
            imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80',
        },
        {
            name: 'Anonymous Advice Service (Anon-Mess)',
            description: 'Anonymous messaging platform with sentiment analysis to categorize advice patterns.',
            category: 'Full Stack',
            isFeatured: true,
            techStack: 'Next.js, Node.js, Express, MongoDB, Tailwind',
            liveUrl: '#',
            githubUrl: 'https://github.com/mohitranjan/anon-mess',
            imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80',
        }
    ]

    for (const p of projects) {
        // Upsert based on name.
        // First find if exists to get ID, or generic upsert won't work without unique constraint on name.
        // We will just delete and recreate for "Project" since names might change or duplicates exist.
        // Actually, let's just findFirst and update or create.
        const existing = await prisma.project.findFirst({ where: { name: p.name } })
        if (existing) {
            await prisma.project.update({
                where: { id: existing.id },
                data: p
            })
        } else {
            await prisma.project.create({ data: p })
        }
    }
    console.log('💻 Projects seeded')

    // 4. TIMELINE (Education & Experience)
    // Clear old timeline entries to ensure clean state (optional but good for "truth")
    await prisma.timelineEntry.deleteMany({})

    const timeline = [
        {
            year: 'Nov 2023 - Present',
            title: 'B.Tech in Computer Science',
            type: 'Education',
            description: 'National Institute of Technology, Jalandhar\nCGPA: 7.18\nCoursework: DSA, OOP, OS, DBMS',
            order: 1
        },
        {
            year: 'Jun 2025 - Jul 2025', // Future dates in resume? User provided them.
            title: 'Data Intern',
            company: 'District Statistics Office, Govt. of Bihar',
            location: 'Bihar, India',
            type: 'Experience',
            description: 'Analyzed and visualized district-level agriculture datasets. Built interactive dashboards for monitoring crop trends.',
            order: 2
        },
        {
            year: 'Feb 2025 - Apr 2025',
            title: 'Co-Developer',
            company: 'Alumni Cell Website, NITJ',
            location: 'Jalandhar, India',
            type: 'Experience',
            description: 'Developed full-stack platform automating 300+ alumni requests monthly. Optimized APIs reducing response time by 35%.',
            order: 3
        },
        {
            year: '2020 - 2022',
            title: 'Intermediate (Science)',
            type: 'Education',
            description: 'CM Science College, Darbhanga\nPhysics, Chemistry, Mathematics\nPercentage: 83%',
            order: 4
        }
    ]

    for (const t of timeline) {
        await prisma.timelineEntry.create({ data: t })
    }
    console.log('⏳ Timeline seeded')

    // 5. TECH TOOLS
    // Ensure all resume skills are there
    await prisma.techTool.deleteMany({})
    const tools = [
        // Languages
        { name: 'C++', category: 'Language', order: 1 },
        { name: 'JavaScript', category: 'Language', order: 2 },
        { name: 'Python', category: 'Language', order: 3 },
        { name: 'Java', category: 'Language', order: 4 },
        { name: 'SQL', category: 'Language', order: 5 },
        // Web
        { name: 'React', category: 'Frontend', order: 6 },
        { name: 'Next.js', category: 'Frontend', order: 7 },
        { name: 'Node.js', category: 'Backend', order: 8 },
        { name: 'Tailwind', category: 'Frontend', order: 9 },
        // Backend/DB
        { name: 'MongoDB', category: 'Backend', order: 10 },
        { name: 'PostgreSQL', category: 'Backend', order: 11 },
        { name: 'Spring Boot', category: 'Backend', order: 12 },
        // Cloud/DevOps
        { name: 'AWS', category: 'DevOps', order: 13 },
        { name: 'Docker', category: 'DevOps', order: 14 },
        { name: 'Git', category: 'DevOps', order: 15 },
        { name: 'Linux', category: 'DevOps', order: 16 },
    ]

    await prisma.techTool.createMany({ data: tools })
    console.log('🛠️ Tech Tools seeded')


    // 6. OPPORTUNITIES (Keep existing logic but upsert)
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
            fullDescription: '## About the Team\nVercel infrastructure...',
            isPublished: true,
            stipend: "$120k - $160k",
            duration: "Full-time"
        }
    ]
    for (const op of opps) {
        await prisma.opportunity.upsert({
            where: { slug: op.slug },
            update: {},
            create: op
        })
    }

    // 7. HACKATHONS
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
            tags: "Web3, Blockchain",
            description: "The world's largest Ethereum hackathon.",
            isFeatured: true,
        }
    ]
    for (const h of hackathons) {
        await prisma.hackathon.upsert({
            where: { slug: h.slug },
            update: {},
            create: h
        })
    }

    // 8. OFF-CAMPUS (Keep existing)
    const datasets = [
        {
            title: 'Top Tech Recruiters – India (2026)',
            description: 'Verified emails of HRs and Talent Acquisition leads.',
            companies: 'Google, Microsoft, Amazon, Swiggy, Zomato',
            role: 'HR / Tech Recruiter',
            location: 'India',
            emailCount: 500,
            fileFormat: 'CSV',
            price: '₹299',
            topmateLink: 'https://topmate.io/demo',
            imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
            isVerified: true,
            isPublished: true
        }
    ]
    for (const d of datasets) {
        const existing = await prisma.recruiterDataset.findFirst({ where: { title: d.title } })
        if (!existing) await prisma.recruiterDataset.create({ data: d })
    }

    const templates = [
        {
            title: 'Internship Application to HR',
            category: 'Internship',
            subject: 'Internship Application: [Name]',
            body: 'Hi [Name]...',
            isPublished: true
        }
    ]
    for (const t of templates) {
        const existing = await prisma.coldEmailTemplate.findFirst({ where: { title: t.title } })
        if (!existing) await prisma.coldEmailTemplate.create({ data: t })
    }

    const outreachTools = [
        {
            name: 'Hunter.io',
            category: 'Verification',
            description: 'Find professional email addresses.',
            link: 'https://hunter.io',
            pricing: 'Freemium',
            isPublished: true
        }
    ]
    for (const tool of outreachTools) {
        const existing = await prisma.outreachTool.findFirst({ where: { name: tool.name } })
        if (!existing) await prisma.outreachTool.create({ data: tool })
    }

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
