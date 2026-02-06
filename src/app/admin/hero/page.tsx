
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Save } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function AdminHeroPage() {
    // Fetch existing content
    const heroContentRaw = await prisma.pageContent.findUnique({ where: { section: 'hero' } })
    const heroContent = heroContentRaw?.content ? JSON.parse(heroContentRaw.content) : { heading: "", subheading: "", status: "" }

    async function updateHero(formData: FormData) {
        "use server"
        const heading = formData.get("heading")?.toString() || ""
        const subheading = formData.get("subheading")?.toString() || ""
        const status = formData.get("status")?.toString() || ""

        const content = { heading, subheading, status }

        await prisma.pageContent.upsert({
            where: { section: 'hero' },
            update: { content: JSON.stringify(content) },
            create: { section: 'hero', content: JSON.stringify(content) }
        })

        revalidatePath("/")
        revalidatePath("/admin/hero")
    }

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Hero Section</h2>
                <p className="text-neutral-400 mt-1">Manage the main homepage statement and subtext.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <form action={updateHero} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Heading (System Architect & Maker)</label>
                        <input
                            name="heading"
                            defaultValue={heroContent.heading || "System Architect & Maker"}
                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                        <p className="text-xs text-neutral-500">Format: First Second Other... (e.g. System Architect & Maker)</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Subheading</label>
                        <textarea
                            name="subheading"
                            defaultValue={heroContent.subheading}
                            rows={3}
                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Status / Top Ticker</label>
                        <input
                            name="status"
                            defaultValue={heroContent.status}
                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors">
                            <Save size={18} />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
