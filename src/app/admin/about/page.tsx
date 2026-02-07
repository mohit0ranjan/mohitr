
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Save } from "lucide-react"
import Editor from "@/components/admin/Editor"

export const dynamic = 'force-dynamic'

export default async function AdminAboutPage() {
    // Fetch existing content
    const aboutContentRaw = await prisma.pageContent.findUnique({ where: { section: 'about' } })
    const aboutContent = aboutContentRaw?.content
        ? JSON.parse(aboutContentRaw.content)
        : {
            headline: "Beyond the Terminal.",
            subtext: "A software engineering student...",
            bio: ""
        }

    async function updateAbout(formData: FormData) {
        "use server"
        const headline = formData.get("headline")?.toString() || ""
        const subtext = formData.get("subtext")?.toString() || ""
        const bio = formData.get("bio")?.toString() || ""

        const content = { headline, subtext, bio }

        await prisma.pageContent.upsert({
            where: { section: 'about' },
            update: { content: JSON.stringify(content) },
            create: { section: 'about', content: JSON.stringify(content) }
        })

        revalidatePath("/about")
        revalidatePath("/admin/about")
    }

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in duration-500 pb-20">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">About Section</h2>
                <p className="text-neutral-400 mt-1">Manage your profile page content.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <form action={updateAbout} className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Headline</label>
                        <input
                            name="headline"
                            defaultValue={aboutContent.headline}
                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors text-xl font-bold"
                            placeholder="Beyond the Terminal."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Subtext / Intro</label>
                        <textarea
                            name="subtext"
                            defaultValue={aboutContent.subtext}
                            rows={3}
                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="Brief introduction..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Detailed Bio / Story (MDX)</label>
                        <div className="bg-black/20 rounded-lg border border-white/5">
                            <Editor
                                markdown={aboutContent.bio || ""}
                                name="bio"
                                className="min-h-[500px]"
                            />
                        </div>
                        <p className="text-xs text-neutral-500 pt-2">Use Markdown to write your story. Html is also supported for custom styling.</p>
                    </div>

                    <div className="pt-4 border-t border-white/5 sticky bottom-4 z-40">
                        <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 w-full justify-center md:w-auto">
                            <Save size={18} />
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
