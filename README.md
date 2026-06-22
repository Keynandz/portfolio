# Ananda Purnomo - Portfolio Website

A modern, animated portfolio website built with Next.js 16, TypeScript, Tailwind CSS v4, and Framer Motion. Features a black-teal color theme with smooth scroll animations, a draggable project carousel, and a live GitHub contribution calendar.

## Tech Stack

- **Framework:** Next.js 16.2.9 (App Router, Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion 12
- **Icons:** Lucide React
- **Runtime:** React 19

## Features

- **Custom Cursor** - Teal dot + trailing ring that expands on hoverable elements, hidden on touch devices
- **Infinite Project Carousel** - Auto-scrolling, drag-to-scroll, with a draggable slider bar and placeholder images
- **GitHub Contribution Calendar** - Live multi-year contribution heatmap fetched from GitHub's public API, rendered as a custom SVG with drag navigation
- **Scroll Animations** - Per-card `useInView` animations triggered as sections enter the viewport
- **Responsive Design** - Fully responsive across desktop, tablet, and mobile
- **Dark Theme** - Black (#0D1117) and teal (#00D4AA) color scheme

## Sections

| Section | Component | Description |
|---------|-----------|-------------|
| Hero | `Hero.tsx` | Name, title, typing animation, social links |
| About | `About.tsx` | Three pillars: Backend, AI/ML, IoT |
| Projects | `Projects.tsx` | Infinite auto-scroll carousel with drag + slider |
| Tech Stack | `Skills.tsx` | Categorized skills with colored cards |
| Journey | `Experience.tsx` | Career timeline with animated cards |
| Highlights | `Highlights.tsx` | Key achievement cards |
| Activity | `GithubActivity.tsx` | Live GitHub contribution calendar |
| Education | `Education.tsx` | Academic background |
| Contact | `Contact.tsx` | Contact methods + message form |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── api/
│   └── github/
│       └── contributions/
│           └── route.ts          # API route for GitHub contribution data
├── components/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── CustomCursor.tsx
│   ├── Education.tsx
│   ├── Experience.tsx
│   ├── Footer.tsx
│   ├── GithubActivity.tsx
│   ├── Hero.tsx
│   ├── Highlights.tsx
│   ├── Navbar.tsx
│   ├── Projects.tsx
│   └── Skills.tsx
├── globals.css
├── layout.tsx
└── page.tsx
```

## GitHub Activity API

The `/api/github/contributions` route fetches contribution data from GitHub's public calendar endpoint for all years since account creation. It parses the HTML to extract per-day contribution levels and returns a sorted, trimmed dataset starting from the first active contribution day.

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#0D1117` | Page background |
| Surface | `#161B22` | Cards, panels |
| Teal | `#00D4AA` | Accent, links, highlights |
| Text Primary | `#E6EDF3` | Headings, body text |
| Text Secondary | `#8B949E` | Muted text, labels |
| Border | `#21262D` | Card borders, dividers |

## License

This project is for personal portfolio use.
