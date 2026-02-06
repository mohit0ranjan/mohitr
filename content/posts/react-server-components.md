---
title: "Understanding React Server Components (RSC)"
date: "2025-10-12"
excerpt: "A deep dive into why RSCs matter and how they change the way we build Next.js applications."
readTime: "5 min read"
tags: ["React", "Next.js", "Engineering"]
---

React Server Components (RSC) represent one of the biggest shifts in the React ecosystem. But what exactly are they, and why should you care?

## The Problem with Client-Side Rendering

For years, we've treated the browser as the primary place where React runs. We fetch JSON from an API, and then hydrate the page. This works, but it introduces:

1. **Waterfalls**: Component A fetches data, renders Component B, which then fetches more data.
2. **Bundle Size**: We send large JavaScript bundles just to format a date or render markdown.

## Enter Server Components

Server Components allow us to run React components **exclusively on the server**. They never hydrate on the client. This means:

- **Zero Bundle Size**: Dependencies used in RSCs are not sent to the browser.
- **Direct Database Access**: You can query your DB directly inside your component.

```jsx
// This runs on the server!
import db from './db';

async function UserProfile({ id }) {
  const user = await db.user.findUnique({ where: { id } });
  return <div>Hello, {user.name}</div>;
}
```

## When to use what?

- **Use Server Components** for: Data fetching, accessing backend resources, keeping sensitive info (API keys) on the server.
- **Use Client Components** for: Interactivity, `onClick` handlers, `useState`, `useEffect`.

RSC is not just a performance optimization; it's a new mental model for building hybrid applications.
