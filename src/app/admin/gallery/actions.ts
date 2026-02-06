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
        title: formData.get("title"),
        imageUrl: formData.get("imageUrl"),
        isVisible: formData.get("isVisible") === "on",
    };

    const result = gallerySchema.safeParse(rawData);

    if (!result.success) {
        return { success: false, error: result.error.errors[0].message };
    }

    try {
        await prisma.galleryItem.create({
            data: {
                ...result.data,
            },
        });
        revalidatePath("/admin/gallery");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to create gallery item:", error);
        return { success: false, error: "Database error" };
    }
}

export async function deleteGalleryItem(id: string) {
    "use server";
    try {
        await prisma.galleryItem.delete({ where: { id } });
        revalidatePath("/admin/gallery");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete" };
    }
}
