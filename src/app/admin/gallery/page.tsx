import { prisma } from "@/lib/prisma";
import { createGalleryItem, deleteGalleryItem } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default async function GalleryAdmin() {
    const items = await prisma.galleryItem.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Gallery Manager</h1>
                <p className="text-neutral-500">Add photos to your visual journal.</p>
            </div>

            <div className="border border-white/10 rounded-xl p-6 bg-white/5">
                <h2 className="text-xl font-semibold mb-4">Add New Photo</h2>
                <form action={createGalleryItem} className="space-y-4 max-w-lg">
                    <div>
                        <Label htmlFor="title">Title / Caption</Label>
                        <Input name="title" id="title" placeholder="e.g. Hackathon at IIT" required className="bg-neutral-900 border-white/10" />
                    </div>
                    <div>
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input name="imageUrl" id="imageUrl" placeholder="https://..." required className="bg-neutral-900 border-white/10" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="isVisible" name="isVisible" defaultChecked />
                        <Label htmlFor="isVisible">Visible</Label>
                    </div>
                    <Button type="submit" className="bg-white text-black hover:bg-neutral-200">
                        Add to Gallery
                    </Button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div key={item.id} className="border border-white/10 rounded-xl overflow-hidden bg-neutral-900">
                        <div className="aspect-video relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-white mb-1">{item.title}</h3>
                            <p className="text-xs text-neutral-500 mb-4">{new Date(item.date).toLocaleDateString()}</p>

                            <form action={deleteGalleryItem.bind(null, item.id)}>
                                <Button variant="destructive" size="sm" className="w-full">
                                    Delete
                                </Button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
