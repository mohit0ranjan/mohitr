import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const gallerySchema = z.object({
    title: z.string().min(1),
    imageUrl: z.string().url(),
    isVisible: z.boolean().optional(),
});

export async function createGalleryItem(formData: FormData) {
    "use server";

    const rawData = {
        title: formData.get("title")?.toString() || "",
        imageUrl: formData.get("imageUrl")?.toString() || "",
        isVisible: formData.get("isVisible") === "on" || formData.get("isVisible") === "true",
    };

    const result = gallerySchema.safeParse(rawData);

    if (!result.success) {
        console.error("Validation error:", result.error.issues[0].message);
        return;
    }

    try {
        await prisma.galleryItem.create({
            data: {
                ...result.data,
            },
        });
        revalidatePath("/admin/gallery");
        revalidatePath("/");
    } catch (error) {
        console.error("Failed to create gallery item:", error);
    }
}

export async function saveGalleryItem(formData: FormData) {
    "use server";

    const id = formData.get("id")?.toString() || "";
    const isNew = id === "new" || !id;

    const rawData = {
        title: (formData.get("title") || formData.get("caption"))?.toString() || "",
        imageUrl: (formData.get("imageUrl") || formData.get("url"))?.toString() || "",
        isVisible: true, // Default to true for now
    };

    const result = gallerySchema.safeParse(rawData);
    if (!result.success) {
        console.error("Validation failed:", result.error);
        return;
    }

    try {
        if (isNew) {
            await prisma.galleryItem.create({ data: result.data });
        } else {
            await prisma.galleryItem.update({
                where: { id },
                data: result.data
            });
        }
        revalidatePath("/admin/gallery");
        revalidatePath("/");
    } catch (error) {
        console.error("Failed to save gallery item:", error);
    }
}

// Alias for compatibility if needed
export const saveImage = saveGalleryItem;

export async function deleteGalleryItem(id: string) {
    "use server";
    try {
        await prisma.galleryItem.delete({ where: { id } });
        revalidatePath("/admin/gallery");
        revalidatePath("/");
    } catch (error) {
        console.error("Failed to delete", error);
    }
}
