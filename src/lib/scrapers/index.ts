import * as cheerio from "cheerio";

export async function scrapeUnstop(url: string) {
    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch URL: ${response.statusText}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // --- Extract Data (These selectors are approximate based on Unstop's structure) ---

        // 1. Title
        const title = $("h1").first().text().trim() || "";

        // 2. Organizer
        const organizer = $(".org-name").first().text().trim() || "Unstop";

        // 3. Location & Mode
        const mode = $(".mode-tag").first().text().trim() || "Online"; // Heuristic
        const location = mode.toLowerCase().includes("online") ? undefined : "See details";

        // 4. Dates
        const startDateMeta = $("meta[itemprop='startDate']").attr("content");
        const endDateMeta = $("meta[itemprop='endDate']").attr("content");

        const startDate = startDateMeta ? new Date(startDateMeta) : new Date();
        const endDate = endDateMeta ? new Date(endDateMeta) : new Date(Date.now() + 86400000 * 2); // Default +2 days

        // 5. Description
        const description = $(".description-content").first().text().slice(0, 300) + "..." || "";

        // 6. Tags
        const tags = $(".tags-section .tag").map((_, t) => $(t).text().trim()).get().join(", ") || "Hackathon";

        // 7. Image
        const imageUrl = $("meta[property='og:image']").attr("content") || "";

        return {
            name: title,
            organizer,
            website: url,
            location: location || "",
            mode: mode.includes("Online") ? "Online" : "Offline",
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            registrationDeadline: startDate.toISOString(),
            description,
            tags,
            status: "Open",
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
            imageUrl
        };

    } catch (error) {
        console.error("Unstop Scraper Error:", error);
        return null;
    }
}

export async function scrapeLinkedIn(url: string) {
    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch URL: ${response.statusText}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        const title = $("meta[property='og:title']").attr("content") || "LinkedIn Event";
        const description = $("meta[property='og:description']").attr("content") || "";
        const imageUrl = $("meta[property='og:image']").attr("content") || "";

        return {
            name: title,
            organizer: "LinkedIn",
            website: url,
            location: "See LinkedIn",
            mode: "Online",
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 86400000).toISOString(),
            registrationDeadline: new Date().toISOString(),
            description: description.slice(0, 200),
            tags: "Professional, Networking",
            status: "Upcoming",
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
            imageUrl
        };

    } catch (error) {
        console.error("LinkedIn Scraper Error:", error);
        return null;
    }
}

