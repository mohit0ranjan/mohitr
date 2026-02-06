import Navbar from "@/components/ui/navbar";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Book, Video, Monitor, PenTool } from "lucide-react";

const resources = [
    {
        category: "Books",
        icon: Book,
        items: [
            { title: "Clean Architecture", author: "Robert C. Martin", note: "Essential for understanding system boundaries." },
            { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", note: "The bible of distributed systems." },
            { title: "Refactoring UI", author: "Adam Wathan", note: "Best practical design guide for devs." }
        ]
    },
    {
        category: "Courses & Videos",
        icon: Video,
        items: [
            { title: "Total TypeScript", author: "Matt Pocock", note: "Changed how I write TS." },
            { title: "Three.js Journey", author: "Bruno Simon", note: "Amazing for 3D web dev." }
        ]
    },
    {
        category: "Blogs & Reading",
        icon: Monitor,
        items: [
            { title: "Overreacted", author: "Dan Abramov", note: "Deep dives into React mental models." },
            { title: "Julia Evans' Zines", author: "Julia Evans", note: "Complex systems explained simply." }
        ]
    }
];

export default function ResourcesPage() {
    return (
        <main className="min-h-screen bg-noise text-foreground">
            <Navbar />
            <div className="container mx-auto px-4 pt-32 pb-20">
                <div className="max-w-2xl mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Resources</h1>
                    <p className="text-muted text-lg">
                        Curated things that helped me level up. No affiliate links, just good stuff.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {resources.map((section, i) => (
                        <div key={i} className="flex flex-col gap-6">
                            <h2 className="flex items-center gap-2 text-xl font-bold text-white/50">
                                <section.icon size={20} />
                                {section.category}
                            </h2>
                            {section.items.map((item, j) => (
                                <BentoCard key={j} className="p-6 hover:bg-white/5 transition-colors">
                                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                                    <p className="text-xs text-muted mb-4 uppercase tracking-wider">{item.author}</p>
                                    <p className="text-sm text-gray-400 border-l-2 border-accent/30 pl-3">
                                        "{item.note}"
                                    </p>
                                </BentoCard>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
