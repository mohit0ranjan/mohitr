
export const PROJECTS = [
    {
        id: "devflow",
        title: "DevFlow",
        description: "Real-time collaborative project management suite.",
        outcome: "Streamlined remote team collaboration by 40%",
        tech: ["Next.js", "Socket.io", "Tailwind"],
        link: "/projects/devflow",
        category: "Web App",
        gradientClass: "bg-[linear-gradient(135deg,rgba(96,165,250,0.1),rgba(192,132,252,0.05),rgba(5,5,5,0))]"
    },
    {
        id: "etax-assistant",
        title: "E-Tax Assistant",
        description: "AI-powered tax filing automation with OCR.",
        outcome: "Automated OCR extraction with 99% accuracy",
        tech: ["Python", "FastAPI", "OCR"],
        link: "/projects/etax",
        category: "AI Tool",
        gradientClass: "bg-[linear-gradient(135deg,rgba(251,191,36,0.1),rgba(255,100,100,0.05),rgba(5,5,5,0))]"
    }
];

export const OPPORTUNITIES = [
    {
        id: "microsoft-intern-2026",
        role: "Software Engineer Intern",
        company: "Microsoft",
        location: "Bangalore",
        type: "Internship",
        source: "LinkedIn",
        posted: "1 day ago",
        isNew: true,
        link: "https://linkedin.com", // In real app, this would be the actual post link
        description: "Great opportunity for 3rd year students. Focus on DSA and Core CS concepts.",
        tags: ["Freshers", "On-site"]
    },
    {
        id: "razorpay-backend",
        role: "Backend Engineer",
        company: "Razorpay",
        location: "Bangalore",
        type: "Full-time",
        source: "Network",
        posted: "2 days ago",
        isNew: true,
        link: "https://razorpay.com/jobs",
        description: "Looking for Go/Rust developers. Good for early career (1-2 YOE).",
        tags: ["Backend", "Early Career"]
    },
    {
        id: "cred-design",
        role: "Product Design Intern",
        company: "Cred",
        location: "Bangalore",
        type: "Internship",
        source: "Twitter",
        posted: "3 days ago",
        isNew: false,
        link: "https://cred.club/careers",
        description: "Portfolio-first selection. Ideal for UI/UX enthusiasts.",
        tags: ["Design", "Stipend"]
    },
    {
        id: "zomato-fe",
        role: "Frontend Developer",
        company: "Zomato",
        location: "Gurgaon",
        type: "Full-time",
        source: "LinkedIn",
        posted: "5 days ago",
        isNew: false,
        link: "https://zomato.com/careers",
        description: "React/Next.js heavy role. High-scale consumer tech exposure.",
        tags: ["Frontend", "React"]
    },
    {
        id: "remote-startup-fs",
        role: "Full Stack Developer",
        company: "Stealth Startup",
        location: "Remote",
        type: "Remote",
        source: "Community",
        posted: "1 week ago",
        isNew: false,
        link: "#",
        description: "Building next-gen dev tools. Equity heavy.",
        tags: ["Startup", "Remote"]
    }
];

export const JOBS = OPPORTUNITIES; // Backward compatibility if needed

export const TIMELINE = [
    {
        year: "2024",
        title: "Intern at Microsoft",
        description: "Worked on optimizations for Azure DevOps pipelines."
    },
    {
        year: "2023",
        title: "Built DevFlow",
        description: "Scaled to 500+ users. Real-time collaboration tool."
    },
    {
        year: "2022",
        title: "Started at NIT Jalandhar",
        description: "B.Tech in Computer Science."
    }
];
