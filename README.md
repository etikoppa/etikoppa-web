# etikoppa-web (`etikoppa.in`)

Parent technology holding hub & digital ecosystem directory for **etikoppa Inc.** (Hyderabad, India).

## Architecture

- **Framework**: Next.js 15 (App Router, Static Generation + Server Actions)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + `next-themes` (dark mode default)
- **Validation & Security**: Zod schema validation, honeypot spam guard, IP rate limiting, CSP & security headers (`next.config.ts`)
- **Email Delivery**: Resend API or Zoho Mail SMTP (Nodemailer) via `src/app/actions/contact.ts`

## Adding a New Subdomain Vertical

All verticals in the Navbar App Launcher, Home Grid, Sitemap, JSON-LD Organization schema, and `/verticals/[slug]` pages are driven by a single file:

1. Open [`src/config/verticals.ts`](src/config/verticals.ts).
2. Append a new `Vertical` object to the `verticals` array (e.g., `analytics.etikoppa.in`).
3. Add a matching SVG mark under `public/logos/`.
4. Deploy to Vercel — the new vertical automatically appears everywhere and gets its own statically generated `/verticals/<slug>` route.

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Production Build & Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Environment Variables (Lead Capture)

Configure either **Resend** (recommended on Vercel) or **Zoho Mail SMTP** in Vercel Project Settings:

- **Resend**: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`
- **Zoho SMTP**: `SMTP_HOST=smtp.zoho.in`, `SMTP_PORT=465`, `SMTP_USER=hello@etikoppa.in`, `SMTP_PASS`
