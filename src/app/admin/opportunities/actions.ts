'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { extractFromImage, extractFromLink, parseOpportunityData } from "@/lib/opportunity-parser"
import slugify from "slugify"

export async function deleteOpportunity(id: string) {
    if (!id) return
    try {
        await prisma.opportunity.delete({ where: { id } })
        revalidatePath('/opportunities')
        revalidatePath('/admin/opportunities')
    } catch (e) {
        console.error("Failed to delete opportunity", e)
    }
}

function generateSlug(title: string) {
    return slugify(title, { lower: true, strict: true })
}

export async function saveOpportunity(formData: FormData) {
    const id = formData.get("id")?.toString()
    const isNew = !id || id === 'new'

    const title = formData.get("title")?.toString() || ""
    const company = formData.get("company")?.toString() || ""
    const location = formData.get("location")?.toString() || ""
    const type = formData.get("type")?.toString() || "Internship"
    const status = formData.get("status")?.toString() || "Active"

    const shortDescription = formData.get("shortDescription")?.toString() || ""
    const fullDescription = formData.get("fullDescription")?.toString() || ""
    const applyLink = formData.get("applyLink")?.toString() || ""
    const duration = formData.get("duration")?.toString() || ""
    const stipend = formData.get("stipend")?.toString() || ""
    const imageUrl = formData.get("imageUrl")?.toString() || ""

    const isPublished = formData.get("isPublished") === "on"
    const isFeatured = formData.get("isFeatured") === "on"

    let slug = formData.get("slug")?.toString() || ""

    // Auto-generate slug if missing
    if (!slug && title) {
        slug = generateSlug(`${company}-${title}-2026`)
        // Append random string for uniqueness robustness
        const randomSuffix = Math.random().toString(36).substring(2, 6)
        slug = `${slug}-${randomSuffix}`
    }

    const data = {
        title,
        slug,
        company,
        location,
        type,
        status,
        shortDescription,
        fullDescription,
        applyLink,
        duration,
        stipend,
        imageUrl,
        isPublished,
        isFeatured
    }

    try {
        if (isNew) {
            await prisma.opportunity.create({ data })
        } else {
            // Check if slug exists to avoid unique constraint error if changed manually to existing one?
            // Usually we trust the admin know what they are doing or handle error.
            // For update, we might not update slug if not changed.
            // But let's keep it simple.
            await prisma.opportunity.update({
                where: { id },
                data
            })
        }
    } catch (e) {
        console.error("Failed to save opportunity", e)
        return
    }

    revalidatePath('/opportunities')
    revalidatePath(`/opportunities/${slug}`)
    revalidatePath('/admin/opportunities')
    revalidatePath('/')
    redirect('/admin/opportunities')
}


export async function extractOpportunityData(formData: FormData) {
    try {
        const type = formData.get('type') as string;
        let extractedText = "";
        let extractedTitle = "";
        let extractedImage = "";

        if (type === 'image') {
            const file = formData.get('file') as File;
            if (file && file.size > 0) {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                extractedText = await extractFromImage(buffer);
            }
        } else if (type === 'text') {
            extractedText = formData.get('text') as string;
        } else if (type === 'link') {
            const url = formData.get('url') as string;
            const result = await extractFromLink(url);
            extractedText = result.text;
            extractedTitle = result.title;
            extractedImage = result.imageUrl || "";
        }

        if (!extractedText) {
            return { success: false, error: "No text could be extracted." };
        }

        const parsedData = parseOpportunityData(extractedText, extractedTitle);

        // Return structured data for review
        return {
            success: true,
            data: {
                ...parsedData,
                imageUrl: extractedImage || "/placeholder-opportunity.png", // Use extracted image if link, else placeholder
                sourceUrl: type === 'link' ? formData.get('url') as string : undefined
            }
        };

    } catch (error) {
        console.error("Extraction error:", error);
        return { success: false, error: "Failed to extract data" };
    }
}

export async function publishOpportunity(prevState: any, formData: FormData) {
    try {
        const title = formData.get("title")?.toString() || ""
        const company = formData.get("company")?.toString() || ""
        const location = formData.get("location")?.toString() || ""
        const type = formData.get("type")?.toString() || "Internship"
        const fullDescription = formData.get("fullDescription")?.toString() || ""

        // STRICT RULE: Manual Apply Link Priority
        // Check if manual link field has content. If so, use it. 
        // If not, use 'applyLink' which might be passed from extraction (but extraction puts it in a field named 'applyLink' too).
        // Wait, in the form, the input name IS 'applyLink'.
        // So whatever is submitted in the form IS the manual override or the confirmed link.
        const applyLink = formData.get("applyLink")?.toString() || ""

        const imageUrl = formData.get("imageUrl")?.toString() || "/placeholder-opportunity.png"

        // Create SEO-Friendly Slug
        // Rule: /opportunities/company-role (clean, short)
        // Remove '2026' or dates from slug base to keep it evergreen and clean unless collision.
        let slugBase = `${company}-${title}`;
        slugBase = slugBase.replace(/['".,!?:;&]/g, '').trim(); // Remove basic punctuation

        let baseSlug = slugify(slugBase, { lower: true, strict: true, trim: true });

        // Ensure slug isn't empty (fallback)
        if (!baseSlug) baseSlug = "opportunity";

        let slug = baseSlug;
        let counter = 1;
        while (await prisma.opportunity.findUnique({ where: { slug } })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }

        const data = {
            title,
            slug,
            company,
            location,
            type,
            shortDescription: fullDescription.substring(0, 150).replace(/\n/g, ' ') + "...",
            fullDescription,
            applyLink,
            status: "Active",
            isPublished: true,
            imageUrl,
        }

        const opportunity = await prisma.opportunity.create({ data });

        // LinkedIn Post Generation

        const websiteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.mohitr.in";

        // Option 1: Standardized Clean
        const template1 = `🚨 New Internship Opportunity\n\nCompany: ${company}\nRole: ${title}\nLocation: ${location}\n\nApply & full details:\n👉 ${websiteUrl}/opportunities/${slug}\n\n#internships #careers #students`;

        // Option 2: Ultra-Crisp
        const template2 = `🔥 Internship Alert: ${title} at ${company}\n📍 ${location}\n🔗 Details: ${websiteUrl}/opportunities/${slug}\n\n#hiring #internship`;

        // Option 3: Direct/Professional
        const template3 = `Hiring: ${title} @ ${company}\nLocation: ${location}\nApply here: ${websiteUrl}/opportunities/${slug}\n\n#students #careers`;

        const linkedInPost = `${template1}\n\n---\n\n${template2}\n\n---\n\n${template3}`;

        revalidatePath('/opportunities');
        revalidatePath('/');
        return {
            success: true,
            opportunity,
            linkedInPost,
            templates: {
                standard: template1,
                crisp: template2,
                direct: template3
            }
        };

    } catch (error) {
        console.error("Error publishing opportunity:", error);
        return { success: false, error: "Failed to publish opportunity" };
    }
}
