# ENTS · Rwanda Coding Academy Business & Trading Society

A modern, high-contrast monochrome website for **ENTS** (Entrepreneurs &amp; Traders Society) at **Rwanda Coding Academy** (Nyabihu, Rwanda).

Built with **Next.js (App Router, TypeScript)**, **Tailwind CSS**, and local structured TypeScript data modules. Ready to deploy directly to **Vercel**.

---

## ✦ Design System: Strict Monochrome

- **Palette**: Pure Black (`#000000`), Pure White (`#FFFFFF`), and Neutral Hairline Grays (`#F5F5F5`, `#E5E5E5`, `#737373`).
- **Aesthetic**: Editorial, financial publication, high-contrast, confident typography with oversized headings and tight tracking (`tracking-tighter`).
- **Borders**: Thin gray hairline borders (`border border-neutral-200`) instead of heavy drop shadows.
- **Interactions**: Subtle hover background shifts, smooth transitions, and a scroll-aware sticky header.

---

## ✦ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm
- **Data Layer**: Static TypeScript data files in `src/data/` (zero database required for v1)

---

## ✦ Project Structure

```
ents/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with Geist font, SEO metadata, Header & Footer
│   │   ├── page.tsx           # Home: Hero, Who We Are, Tracks, SIFS, Stats Strip, CTA Band
│   │   ├── about/             # About: Mission, RCA tech edge, Leadership grid
│   │   ├── tracks/            # Tracks: Deep-dive into Business Handlers & Traders
│   │   ├── projects/          # Projects: SIFS Simulator + Campus Venture Grid
│   │   ├── leaderboard/       # Leaderboard: Hairline trading league standings
│   │   └── join/              # Join: Membership application form with validation
│   ├── components/
│   │   ├── layout/            # Sticky Header, Footer
│   │   ├── sections/          # Flagship Simulator, Stats Strip, Leaderboard Table, Application Form
│   │   └── ui/                # Button, Card, Badge, SectionHeading, Container, Icons
│   ├── data/
│   │   ├── site.ts            # Site branding, nav links, social handles
│   │   ├── tracks.ts          # Weekly curriculum and skills gained
│   │   ├── projects.ts        # Projects and SIFS specifications
│   │   ├── team.ts            # Student leadership committee profiles
│   │   ├── leaderboard.ts     # Trading league standings & CSV/API helper
│   │   └── stats.ts           # Club metrics and numbers
│   └── types/
│       └── index.ts           # Shared TypeScript interfaces
```

---

## ✦ Content Management: Easy for Students to Edit

All website content lives in typed configuration files in `src/data/`. Any student can easily update information without touching UI components:

1. **Club Navigation & Socials**: `src/data/site.ts`
2. **Curriculum & Schedules**: `src/data/tracks.ts`
3. **Ventures & Products**: `src/data/projects.ts`
4. **Leadership Team**: `src/data/team.ts`
5. **Trading Standings**: `src/data/leaderboard.ts` (includes a parser ready to be plugged into a Google Sheets CSV endpoint)
6. **Key Metrics**: `src/data/stats.ts`

---

## ✦ Local Development

Ensure you have [Node.js](https://nodejs.org) and [pnpm](https://pnpm.io) installed:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run linting
pnpm lint

# Build for production
pnpm build

# Run production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## ✦ Deploying to Vercel

The repository is pre-configured for seamless deployment to Vercel:

1. Push this repository to GitHub or GitLab.
2. Go to [Vercel](https://vercel.com/new).
3. Import the `ents` repository.
4. Framework Preset will auto-detect **Next.js**.
5. Package manager will automatically use **pnpm**.
6. Click **Deploy**.

---

## ✦ License & Attribution

Built with pride by the students of **Rwanda Coding Academy** (Nyabihu, Rwanda).
