import Tesseract from 'tesseract.js';
import * as cheerio from 'cheerio';

interface ExtractedData {
    company: string;
    role: string;
    location: string;
    type: string;
    description: string;
    applyLink?: string;
    imageUrl?: string;
}

export async function extractFromImage(imageBuffer: Buffer): Promise<string> {
    const result = await Tesseract.recognize(imageBuffer, 'eng');
    return cleanText(result.data.text);
}

export async function extractFromLink(url: string): Promise<{ text: string; title: string, imageUrl?: string }> {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        const html = await response.text();
        const $ = cheerio.load(html);

        // 1. Extract Metadata (Open Graph / Twitter Cards)
        // Prefer og:description, sometimes twitter:description is better
        const ogTitle = $('meta[property="og:title"]').attr('content') || $('title').text() || '';
        const ogDescription = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
        const ogImage = $('meta[property="og:image"]').attr('content') || $('meta[property="twitter:image"]').attr('content') || '';

        // 2. Extract Body Text (Cleanup)
        $('script').remove();
        $('style').remove();
        $('noscript').remove();
        $('iframe').remove();
        $('nav').remove();
        $('footer').remove();
        $('header').remove();

        // Remove known cookie banners or popups if possible (basic heuristic)
        $('.cookie-banner, #cookie-banner, .popup, .modal, [class*="cookie"], [id*="cookie"]').remove();
        // Remove common sidebar/recommended/related/feed sections
        $('[class*="related"], [class*="recommended"], [class*="feed"], [class*="sidebar"]').remove();


        const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
        const cleanBody = cleanText(bodyText);

        // Combine Description: Prefer OG description, but often it's cut off. 
        // If it's a LinkedIn post, the body often contains the full post text if we fetch the public page properly.
        // For general sites, body text is usually better but needs truncation.

        let text = cleanBody;
        if (ogDescription && ogDescription.length > 50) {
            // If we have a good description, ensure it's at the start
            if (!text.includes(ogDescription.substring(0, 50))) {
                text = ogDescription + "\n\n" + text;
            }
        }

        return {
            text: text.substring(0, 5000), // Limit to 5000 chars to avoid overwhelming
            title: ogTitle.trim(),
            imageUrl: ogImage.trim()
        };

    } catch (error) {
        console.error("Error fetching link:", error);
        return { text: "", title: "" };
    }
}

function cleanText(text: string): string {
    return text
        // Remove common LinkedIn header/footer noise
        .replace(/Agree\?/gi, '')
        .replace(/god bless/gi, '')
        .replace(/thoughts\?/gi, '')
        .replace(/#\w+/g, '') // Remove hashtags
        // Remove creator headers like "Dr. Name posted this" or "Post by..." - very specific to LinkedIn public view
        .replace(/^[A-Za-z\s\.]+ posted this/m, '')
        .replace(/^Post by [A-Za-z\s\.]+/m, '')

        // Specific noise from user screenshot context
        .replace(/Dr\. [A-Za-z\s\.]+['’]s Post/gi, '') // "Dr. S Chand Rakesh Roshan, Ph.D.'s Post"
        .replace(/Musings of a University Teacher/gi, '')
        .replace(/\d{1,3}(?:,\d{3})*\s+followers/gi, '') // "23,223 followers"
        .replace(/\d{1,3}(?:,\d{3})*\s+Posts/gi, '')     // "1,501 Posts"
        .replace(/\d+\s+Musings/gi, '')
        .replace(/on this \./gi, '') // Trailing sentence fragment often left behind

        // Remove "Agree & Join LinkedIn" footer blocks commonly found in public scrapes
        .replace(/Agree & Join LinkedIn[\s\S]*?Cookie Policy\./gi, '')
        .replace(/Skip to main content/gi, '')
        .replace(/Article View/gi, '')
        .replace(/Profile Connect/gi, '')
        .replace(/More from this author/gi, '')
        .replace(/About the author/gi, '')
        // Specific noise from screenshot
        .replace(/Never miss a beat on the app/gi, '')
        .replace(/Don’t have the app\?/gi, '')
        .replace(/Get it in the Microsoft Store/gi, '')
        .replace(/Open the app/gi, '')

        // Remove email addresses and phone numbers (privacy/cleanliness)
        .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '')
        .replace(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, '')

        // Remove emojis (extended range)
        .replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '')

        // Whitespace cleanup
        .replace(/\s+/g, ' ')
        .trim();
}

export function parseOpportunityData(text: string, title?: string): ExtractedData {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const fullText = text.replace(/\s+/g, ' '); // Normalized for simple regex checks

    // Default values
    let role = "Software Intern";
    let company = ""; // Start empty to force detection
    let location = "Remote";
    let type = "Internship";

    // --- 1. COMPANY DETECTION (Priority) ---
    // Rule: Creator Name != Company. Ignore titles like "Dr.", "PhD", etc.
    // Heuristic: Look for "at [Company]" or "[Company] is hiring" or header patterns.

    // a) Explicit "at X" or "joining X" (strong signal)
    const atCompanyRegex = /(?:at|joining|for)\s+([A-Z][a-zA-Z0-9\s&]{2,30})(?:\s|$|\.|,|!)/;
    const matchAt = fullText.match(atCompanyRegex);

    // b) "X is hiring" (strong signal)
    const isHiringRegex = /([A-Z][a-zA-Z0-9\s&]{2,30})\s+(?:is|are)\s+hiring/i;
    const matchHiring = fullText.match(isHiringRegex);

    if (matchHiring && matchHiring[1] && !matchHiring[1].includes("Everyone")) {
        company = matchHiring[1].trim();
    } else if (matchAt && matchAt[1]) {
        // Filter out common false positives for "at"
        const candidate = matchAt[1].trim();
        if (!/least|the|this|my|our|a|an|some|any|time|launch/i.test(candidate)) {
            company = candidate;
        }
    }

    // c) Fallback: Check Title "Role | Company" or "Company - Role"
    if (!company && title) {
        if (title.includes('|')) {
            const parts = title.split('|');
            // Usually Company is 2nd in "Job | Company"
            if (parts.length > 1) company = parts[1].trim();
        } else if (title.includes('-')) {
            const parts = title.split('-');
            // Usually "Company - Job" or "Job - Company". Heuristic: which one looks like a company?
            // If part 0 has "Inc", "Ltd", "LLC" or is short/capitalized, maybe company.
            // Let's guess part 0 is company if it's shorter.
            if (parts.length > 1) {
                company = parts[0].length < parts[1].length ? parts[0].trim() : parts[1].trim();
            }
        }
    }

    // d) Fallback: First capitalized entity in text (Risky, use as last resort)
    if (!company) {
        // Look for the first 3-4 words that are capitalized
        const firstCapMatch = fullText.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})/);
        if (firstCapMatch) {
            // Only if it doesn't look like a person's name with title
            if (!/Dr\.|Mr\.|Mrs\.|Ms\.|Prof\./.test(firstCapMatch[1])) {
                company = firstCapMatch[1];
            }
        }
    }

    if (!company) company = "Unknown Company";


    // --- 2. ROLE DETECTION ---
    const roleKeywords = [
        /Software Engineer/i, /Engineer/i, /Developer/i, /Intern/i, /Interns/i, /Trainee/i, /Analyst/i,
        /Designer/i, /Product Manager/i, /Data Scientist/i, /Researcher/i, /Founder's Office/i, /Founders Office/i
    ];

    // Check title first
    if (title) {
        for (const regex of roleKeywords) {
            if (regex.test(title)) {
                // If title is just a generic "Post", ignore it
                if (!/Post|Feed|Timeline/i.test(title)) {
                    role = title.trim();
                    // Clean up title (remove company if widely separated)
                    if (role.includes('|')) role = role.split('|')[0].trim();
                    break;
                }
            }
        }
    }

    // Fallback to text scan for role
    if ((role === "Software Intern" || !role) && !title?.match(/Engineer|Intern|Developer/i)) {
        // Look for "Hiring: X" or "Role: X" or "Position: X"
        const roleMatch = text.match(/(?:Hiring|Role|Position|Looking for):\s*([a-zA-Z\s\/\-\&]+)(?:\n|$|\.)/i);
        if (roleMatch) {
            role = roleMatch[1].trim();
        } else {
            // Scan first few lines
            for (const line of lines.slice(0, 10)) {
                for (const regex of roleKeywords) {
                    if (regex.test(line) && line.length < 60) {
                        role = line; // Assume the line IS the role
                        break;
                    }
                }
                if (role !== "Software Intern") break;
            }
        }
    }


    // --- 3. LOCATION & TYPE ---
    const locationKeywords = [/Remote/i, /Hybrid/i, /On-site/i, /Bengaluru/i, /Bangalore/i, /Hyderabad/i, /Pune/i, /Mumbai/i, /Delhi/i, /Noida/i, /Gurgaon/i, /Chennai/i, /San Francisco/i, /New York/i, /London/i, /Worldwide/i, /India/i];
    for (const regex of locationKeywords) {
        if (regex.test(fullText)) {
            location = (fullText.match(regex) || [])[0] || "Remote";
            break;
        }
    }

    if (/Intern/i.test(fullText) || /Internship/i.test(fullText)) {
        type = "Internship";
    } else if (/Full-time/i.test(fullText) || /FTE/i.test(fullText)) {
        type = "Full-time";
    } else if (/Trainee/i.test(fullText)) {
        type = "Trainee";
    }

    return {
        company: company.replace(/[^\w\s\-\&\.]/g, ''), // Clean company name of special chars
        role: role.replace(/[^\w\s\-\&\/\(\)]/g, ''), // Clean role
        location,
        type,
        description: formatDescription(text),
    };
}


/**
 * Enforces a strict schema for job descriptions:
 * 1. **About the Role** (Short paragraph)
 * 2. **Eligibility** (Bulleted list, max 5)
 * 3. **Key Skills** (Bulleted list)
 */
function formatDescription(text: string): string {
    let formatted = text;

    // 0. Initial cleanup of URLs and noise
    formatted = formatted.replace(/(?:Apply|Link|Application).*?https?:\/\/[^\s]+/gi, '');
    formatted = formatted.replace(/See more|See less|Show more/gi, '');

    // Normalize line endings
    formatted = formatted.replace(/\r\n/g, '\n').replace(/\n{2,}/g, '\n');

    // 1. Identify Sections & Normalize Headers
    // We try to replace various header possibilities with our standard 3

    const aboutKeywords = ["About Us", "Job Description", "Role", "The Role", "What you will do", "Responsibilities", "Job Purpose", "Summary"];
    const eligibilityKeywords = ["Requirements", "Qualifications", "Who you are", "Eligibility", "Education", "Experience", "What we look for", "Mandatory Skills", "Crucial Skills"];
    const skillsKeywords = ["Key Skills", "Tech Stack", "Technologies", "Good to have", "Nice to have", "Bonus Skills", "Skills"];

    // Normalize About
    const aboutRegex = new RegExp(`(?:^|\\n)\\s*(${aboutKeywords.join('|')})(?:[:\\n]|$|\\s+)`, 'gmi');
    formatted = formatted.replace(aboutRegex, '\n\n**About the Role**\n');

    // Normalize Eligibility
    const eligibilityRegex = new RegExp(`(?:^|\\n)\\s*(${eligibilityKeywords.join('|')})(?:[:\\n]|$|\\s+)`, 'gmi');
    formatted = formatted.replace(eligibilityRegex, '\n\n**Eligibility**\n');

    // Normalize Skills
    const skillsRegex = new RegExp(`(?:^|\\n)\\s*(${skillsKeywords.join('|')})(?:[:\\n]|$|\\s+)`, 'gmi');
    formatted = formatted.replace(skillsRegex, '\n\n**Key Skills**\n');


    // 2. Formatting content within sections
    // Split by our new standardized headers to process chunks
    const parts = formatted.split(/\n\n(\*\*About the Role\*\*|\*\*Eligibility\*\*|\*\*Key Skills\*\*)\n/);

    // If we didn't effectively split (maybe no headers found), we try to assume structure or leave it clean
    if (parts.length < 3) {
        // Fallback: If no headers, treat the whole thing as "About" + maybe infer bullets
        // But better to at least try to format bullets
        return simpleBulletFormat(formatted);
    }

    let result = "";

    // Iterate through parts. parts[0] is preamble, parts[1] is header, parts[2] is content, parts[3] header...
    for (let i = 0; i < parts.length; i++) {
        let chunk = parts[i].trim();
        if (!chunk) continue;

        if (chunk === "**About the Role**") {
            result += `\n\n${chunk}\n`;
            // Next chunk is content
            if (parts[i + 1]) {
                const content = parts[i + 1].trim();
                // Ensure it's not a list, just a short paragraph
                const lines = content.split('\n');
                const para = lines.filter(l => !l.startsWith('-') && !l.startsWith('•')).join(' ').substring(0, 300); // Limit length
                result += para + (content.length > 300 ? "." : "") + "\n";
                i++;
            }
        }
        else if (chunk === "**Eligibility**" || chunk === "**Key Skills**") {
            result += `\n\n${chunk}\n`;
            if (parts[i + 1]) {
                let content = parts[i + 1].trim();
                // Enforce Bullets
                content = forceBullets(content);
                // Limit to 5 bullets for Eligibility
                if (chunk === "**Eligibility**") {
                    const bullets = content.split('\n').filter(l => l.startsWith('-'));
                    if (bullets.length > 5) {
                        content = bullets.slice(0, 5).join('\n');
                    } else {
                        content = bullets.join('\n');
                    }
                }
                result += content + "\n";
                i++;
            }
        }
        else if (i === 0) {
            // Preamble - often just "Hiring for X" or similar. 
            // If it's short, maybe just discard or put in About if About missing?
            // User said "About the Role: 1-2 short lines". 
            // If we have text here, let's treat it as the start of About.
            if (!result.includes("**About the Role**")) {
                result += `**About the Role**\n${chunk.substring(0, 200)}\n`;
            }
        }
    }

    return result.trim();
}

function simpleBulletFormat(text: string): string {
    // Basic formatting for text without clear headers
    let formatted = text;
    formatted = forceBullets(formatted);
    // Add a default header if none
    return `**About the Role**\n${formatted.substring(0, 200)}...\n\n**Details**\n${formatted.substring(200)}`;
}

function forceBullets(text: string): string {
    const bulletStarters = [
        "Assist", "Collaborate", "Support", "Participate", "Contribute", "Develop", "Create",
        "Perform", "Provide", "Ensure", "Work", "Design", "Test", "Maintain", "Debug", "Implement",
        "Strong", "Excellent", "Ability", "Knowledge", "Experience", "Proficiency", "Good", "Must have",
        "Preferred", "Basic", "Advanced", "Bachelor", "Master", "Degree", "Familiarity", "Understanding"
    ];

    let formatted = text;

    // a) Convert existing markers to dashes
    formatted = formatted.replace(/^[•\-\*><]\s*/gm, '- ');
    formatted = formatted.replace(/^\d+\.\s*/gm, '- ');

    // b) Split run-on sentences into bullets if they start with keywords
    // We iterate lines. If a line is long, we split it.

    const lines = formatted.split('\n');
    const newLines: string[] = [];

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        // If line is already a bullet, keep it
        if (line.startsWith('- ')) {
            newLines.push(line);
            continue;
        }

        // Check if line starts with a keyword -> make it a bullet
        const startsWithKeyword = bulletStarters.some(w => new RegExp(`^${w}`, 'i').test(line));
        if (startsWithKeyword) {
            newLines.push(`- ${line}`);
            continue;
        }

        // If not a bullet, check if we should split it?
        // For now, keep as text, but if we are in a "force bullet" context (like Eligibility), 
        // we might want to force everything into bullets? 
        // Let's assume non-keyword lines in Eligibility are still requirements if short.
        if (line.length < 100) {
            newLines.push(`- ${line}`);
        } else {
            newLines.push(line);
        }
    }

    return newLines.join('\n');
}
