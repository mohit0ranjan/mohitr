---
title: "How I Built This Portfolio"
date: "2025-09-28"
excerpt: "A look under the hood of the bento-grid design system and Next.js 14 optimizations."
readTime: "8 min read"
tags: ["Design", "CSS", "Personal"]
---

I wanted a personal site that didn't feel like a template. I wanted it to feel like *me*.

## The Bento Grid Aesthetic

The "Bento" layout style, popularized by Apple promotional videos and Linear's design system, treats UI like a bento box: organized, compartmentalized, but cohesive.

### CSS Grid is Magic

The entire layout is powered by a simple CSS Grid wrapper:

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 4.0
- **Motion**: Framer Motion
- **Content**: Markdown

## Why No CMS?

I considered Sanity or Contentful, but for a personal portfolio, `fs` (file system) is the best CMS. It's fast, free, and I can edit posts in VS Code.
