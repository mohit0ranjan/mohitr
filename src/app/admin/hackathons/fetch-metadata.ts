"use server";

import { JSDOM } from "jsdom";

export async function fetchEventDetails(url: string) {
    if (!url) return null;

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                "Referer": "https://unstop.com/"
            }
        });

        if (!response.ok) {
            console.error(`Fetch failed with status: ${response.status}`);
            return null;
        }

        const html = await response.text();
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        // --- 1. Basic Metadata (Always reliable) ---
        const title = doc.querySelector("meta[property='og:title']")?.getAttribute("content")
            || doc.querySelector("title")?.textContent
            || "";

        const image = doc.querySelector("meta[property='og:image']")?.getAttribute("content") || "";
        const siteName = doc.querySelector("meta[property='og:site_name']")?.getAttribute("content") || "Unstop";

        // --- 2. Advanced: JSON-LD Structured Data (Best Source for Dates) ---
        // Unstop often embeds Event or EducationalOccupationalCredential schema
        let startDateStr = "";
        let endDateStr = "";
        let locationStr = "";
        let descriptionStr = "";
        let organizerStr = "";

        // Attempt 1: Check all JSON-LD scripts
        const scriptTags = doc.querySelectorAll('script[type="application/ld+json"]');
        for (const script of scriptTags) {
            try {
                const data = JSON.parse(script.textContent || "{}");

                // Handle single object or array/graph
                const items = Array.isArray(data) ? data : (data['@graph'] || [data]);

                for (const item of items) {
                    if (item['@type'] === 'Event' || item['@type'] === 'Hackathon' || item['@type'] === 'Competition') {
                        if (item.startDate) startDateStr = item.startDate;
                        if (item.endDate) endDateStr = item.endDate;
                        if (item.location && item.location.name) locationStr = item.location.name;
                        if (item.description) descriptionStr = item.description;
                        if (item.organizer && item.organizer.name) organizerStr = item.organizer.name;
                    }
                }
            } catch (e) { /* ignore parse errors */ }
        }

        // --- 3. DOM Scraping (Unstop Specific Fallbacks) ---

        // Dates often in distinct containers
        // Look for typical Unstop date text patterns if JSON-LD fails
        if (!startDateStr) {
            // Heuristic: Search for elements containing date-like strings near "Registration Deadline" or "Hackathon Dates" headers
            // This is fragile, so we prefer to leave blank if unsure rather than guessing wrong dates.
        }

        // Description from DOM if JSON-LD missing
        if (!descriptionStr) {
            // Unstop usually puts description in specific divs
            // Try common selectors
            const descEl = doc.querySelector('.description_content') || doc.querySelector('#details .content');
            if (descEl) descriptionStr = descEl.textContent || "";
        }

        // --- 4. Logic to only return what we found ---

        const result: any = {
            website: url,
            imageUrl: image,
            status: "Open", // Default assumption
        };

        if (title) {
            result.name = title
                .replace(" | Unstop", "")
                .replace(" | LinkedIn", "")
                .replace("Competitions & Challenges", "")
                .trim();
            result.slug = result.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        }

        if (organizerStr) result.organizer = organizerStr;
        else if (siteName) result.organizer = siteName;

        // Only valid if we found concrete parsing
        if (startDateStr) result.startDate = new Date(startDateStr).toISOString().slice(0, 16);
        if (endDateStr) result.endDate = new Date(endDateStr).toISOString().slice(0, 16);
        if (startDateStr) result.registrationDeadline = new Date(startDateStr).toISOString().slice(0, 16); // Heuristic

        if (locationStr) {
            result.location = locationStr;
            result.mode = locationStr.toLowerCase().includes("online") ? "Online" : "Offline";
        }

        if (descriptionStr) {
            result.description = descriptionStr.slice(0, 1000).trim(); // Limit length
        } else {
            // Fallback to OG Description
            const ogDesc = doc.querySelector("meta[property='og:description']")?.getAttribute("content");
            if (ogDesc) result.description = ogDesc;
        }

        return result;

    } catch (error) {
        console.error("Error scraping URL:", error);
        return null;
    }
}
