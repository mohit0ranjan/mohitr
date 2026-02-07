export default function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Mohit Ranjan",
        "url": "https://www.mohitr.in",
        "jobTitle": "Student & Software Developer",
        "affiliation": {
            "@type": "Organization",
            "name": "NIT Jalandhar"
        },
        "sameAs": [
            "https://github.com/mohit",
            "https://linkedin.com/in/mohit",
            "https://twitter.com/mohit"
        ],
        "description": "Computer Science student at NIT Jalandhar, Full Stack Developer, and Open Source contributor."
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
