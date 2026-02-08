
import { prisma } from "./src/lib/prisma";

async function main() {
    console.log("Checking prisma.hackathon...");
    try {
        const count = await prisma.hackathon.count();
        console.log("Hackathon count:", count);
    } catch (e) {
        console.error("Error accessing hackathon:", e);
    }
}

main();
