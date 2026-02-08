'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { extractFromImage, extractFromLink, parseOpportunityData } from "@/lib/opportunity-parser"
import slugify from "slugify"
import { fetchEventDetails } from "../hackathons/fetch-metadata" // Reuse existing logic

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
        let extractedCompany = "";
        let extractedRole = "";
        let extractedLocation = "";
        let extractedApplyLink = "";

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

            // NEW: Enhanced Unstop/LinkedIn Support
            if (url.includes("unstop.com") || url.includes("linkedin.com")) {
                const metadata = await fetchEventDetails(url);
                if (metadata) {
                    extractedTitle = metadata.name;
                    extractedCompany = metadata.organizer;
                    extractedText = metadata.description; // Unstop/LinkedIn usually have less detail in OG description
                    extractedImage = metadata.imageUrl;
                    extractedApplyLink = url;
                    // Try to scrape body for more text if metadata description is short
                    // But fetchEventDetails only does metadata.
                    // Let's use cleanText + metadata as a starting point.
                }
            }

            // Fallback to generic link extractor if metadata failed or we want more body text
            if (!extractedText || extractedText.length < 200) {
                const result = await extractFromLink(url);
                extractedText = result.text; // Confirmed body text
                if (!extractedTitle) extractedTitle = result.title;
                if (!extractedImage) extractedImage = result.imageUrl || "";
            }

            extractedApplyLink = url;
        }

        if (!extractedText) {
            return { success: false, error: "No text could be extracted." };
        }

        // Parse using existing logic but override with metadata if strong
        const parsedData = parseOpportunityData(extractedText, extractedTitle);

        return {
            success: true,
            data: {
                ...parsedData,
                role: extractedTitle || parsedData.role, // Prefer metadata title if available
                company: extractedCompany || parsedData.company,
                imageUrl: extractedImage || "/placeholder-opportunity.png",
                applyLink: extractedApplyLink || parsedData.applyLink
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
        const applyLink = formData.get("applyLink")?.toString() || ""

        const imageUrl = formData.get("imageUrl")?.toString() || "/placeholder-opportunity.png"

        let slugBase = `${company}-${title}`;
        slugBase = slugBase.replace(/['".,!?:;&]/g, '').trim();

        let baseSlug = slugify(slugBase, { lower: true, strict: true, trim: true });

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

        const websiteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.mohitr.in";

        const template1 = `🚨 New Internship Opportunity\n\nCompany: ${company}\nRole: ${title}\nLocation: ${location}\n\nApply & full details:\n👉 ${websiteUrl}/opportunities/${slug}\n\n#internships #careers #students`;
        const template2 = `🔥 Internship Alert: ${title} at ${company}\n📍 ${location}\n🔗 Details: ${websiteUrl}/opportunities/${slug}\n\n#hiring #internship`;
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
