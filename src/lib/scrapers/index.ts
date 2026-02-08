import { JSDOM } from "jsdom";

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
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        // --- Extract Data (These selectors are approximate based on Unstop's structure) ---

        // 1. Title
        const title = doc.querySelector("h1")?.textContent?.trim() || "";

        // 2. Organizer
        const organizer = doc.querySelector(".org-name")?.textContent?.trim() || "Unstop";

        // 3. Location & Mode
        // Unstop usually puts this in meta tags or specific classes
        const mode = doc.querySelector(".mode-tag")?.textContent?.trim() || "Online"; // Heuristic
        const location = mode.toLowerCase().includes("online") ? undefined : "See details";

        // 4. Dates
        // Dates are tricky without an API, often in specific consistent divs
        const startDateMeta = doc.querySelector("meta[itemprop='startDate']")?.getAttribute("content");
        const endDateMeta = doc.querySelector("meta[itemprop='endDate']")?.getAttribute("content");

        const startDate = startDateMeta ? new Date(startDateMeta) : new Date();
        const endDate = endDateMeta ? new Date(endDateMeta) : new Date(Date.now() + 86400000 * 2); // Default +2 days

        // 5. Description
        const description = doc.querySelector(".description-content")?.textContent?.slice(0, 300) + "..." || "";

        // 6. Tags
        // Often in a 'tags' section
        const tags = Array.from(doc.querySelectorAll(".tags-section .tag")).map(t => t.textContent?.trim()).join(", ") || "Hackathon";

        // 7. Image
        const imageUrl = doc.querySelector("meta[property='og:image']")?.getAttribute("content") || "";

        return {
            name: title,
            organizer,
            website: url, // The original link
            location: location || "",
            mode: mode.includes("Online") ? "Online" : "Offline",
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            registrationDeadline: startDate.toISOString(), // Heuristic
            description,
            tags,
            status: "Open", // Default to Open if fetched successfully
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
            imageUrl
        };

    } catch (error) {
        console.error("Unstop Scraper Error:", error);
        return null;
    }
}

export async function scrapeLinkedIn(url: string) {
    // LinkedIn scraping is notoriously hard due to auth walls.
    // We will extract basic OpenGraph metadata which is often public.
    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" // Pretend to be a bot
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch URL: ${response.statusText}`);
        }

        const html = await response.text();
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const title = doc.querySelector("meta[property='og:title']")?.getAttribute("content") || "LinkedIn Event";
        const description = doc.querySelector("meta[property='og:description']")?.getAttribute("content") || "";
        const imageUrl = doc.querySelector("meta[property='og:image']")?.getAttribute("content") || "";

        return {
            name: title,
            organizer: "LinkedIn",
            website: url,
            location: "See LinkedIn",
            mode: "Online", // Default
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
