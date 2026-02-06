import Link from "next/link"

export default function PagesIndex() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-bold">Pages Content</h2>
                <p className="text-neutral-400 mt-2">Manage static content sections across the site.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ContentCard
                    title="Homepage Hero"
                    description="Edit headline, subheadline, and status badges."
                    section="hero"
                />
                <ContentCard
                    title="About Section"
                    description="Update your bio and personal details."
                    section="about"
                />
                <ContentCard
                    title="Contact Info"
                    description="Manage social links and contact email."
                    section="contact"
                />
            </div>
        </div>
    )
}

function ContentCard({ title, description, section }: { title: string, description: string, section: string }) {
    return (
        <Link href={`/admin/pages/${section}`} className="block p-6 border border-neutral-800 rounded-xl hover:bg-neutral-900/50 transition-colors group">
            <h3 className="text-lg font-medium group-hover:text-purple-400 transition-colors">{title}</h3>
            <p className="text-sm text-neutral-400 mt-2">{description}</p>
        </Link>
    )
}
