# Team Design Architects — Website

**Stack:** Next.js 14 · Sanity CMS · Vercel · TypeScript · CSS Modules

---

## Quick Start (5 minutes to live locally)

### 1. Install Node.js (if not installed)
Download from https://nodejs.org — install the LTS version.

### 2. Install dependencies
```bash
cd teamdesign
npm install
```

### 3. Create Sanity project (for the CMS)
1. Go to https://sanity.io/manage
2. Click **New Project** → name it `Team Design`
3. Note your **Project ID** (e.g. `abc123de`)

### 4. Set up environment variables
```bash
cp .env.local.example .env.local
```
Open `.env.local` and replace `your_project_id_here` with your Sanity Project ID.

### 5. Run the dev server
```bash
npm run dev
```
- **Website:** http://localhost:3000
- **CMS Dashboard:** http://localhost:3000/studio-cms

---

## Deploy to Vercel (10 minutes)

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/teamdesign.git
git push -u origin main
```

### Step 2 — Import to Vercel
1. Go to https://vercel.com/new
2. Click **Import Git Repository** → select `teamdesign`
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = your Sanity project ID
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
4. Click **Deploy** — done in ~2 minutes

### Step 3 — Connect teamdesign.in
In Vercel → your project → **Settings → Domains**:
1. Add `teamdesign.in` and `www.teamdesign.in`
2. Copy the DNS records Vercel shows you
3. In your domain registrar (GoDaddy / BigRock), update DNS
4. Wait 10–60 minutes for propagation

---

## How Tasadduq uses the CMS

Visit `https://teamdesign.in/studio-cms` — log in with Sanity credentials.

### Adding a new project
1. **Projects → New Project**
2. Fill in: Name, Client, Location, Year, Area, Type
3. Write the project description
4. Upload main photo + gallery photos
5. Toggle **Feature on Homepage?** if it should appear in the grid
6. Click **Publish** → live within 30 seconds

### Updating contact details
**Site Settings** → edit phone, WhatsApp, email, address, stats.

### Updating team bios
**Team Members** → click a name → edit bio, photo, credentials.

---

## Enabling contact form emails

The contact form currently logs submissions to console (visible in Vercel logs). To receive emails:

**Option A: Resend** (recommended, free for 100 emails/day)
1. Sign up at https://resend.com
2. Add `RESEND_API_KEY=re_xxxx` to Vercel environment variables
3. In `app/api/contact/route.ts`, uncomment the Resend block

**Option B: Gmail SMTP**
1. Enable 2FA on Gmail → generate App Password
2. Add `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` to Vercel env vars
3. In `app/api/contact/route.ts`, uncomment the Nodemailer block
4. Run `npm install nodemailer @types/nodemailer`

---

## Replacing placeholder images

The site uses Unsplash placeholder images. Replace with real photography:
1. In Sanity CMS, open each **Project**
2. Upload real photos to **Main Image** and **Gallery**
3. For the homepage hero: update Sanity → `Site Settings → Hero Image`
   (or update line ~44 of `app/page.tsx` directly)

All images should be exported as WebP, max 200KB per file.

---

## File structure

```
app/
  page.tsx              → Homepage
  layout.tsx            → Global layout (nav, footer, WhatsApp button)
  globals.css           → Design system tokens
  sitemap.ts            → Auto-generated sitemap
  robots.ts             → SEO robots.txt
  work/
    page.tsx            → Portfolio grid (filterable)
    [slug]/page.tsx     → Individual project pages
  interiors/page.tsx    → Interiors portfolio
  people/page.tsx       → Team page
  studio/page.tsx       → About + Press
  contact/page.tsx      → Contact form (live submissions)
  studio-cms/           → Sanity CMS dashboard
  api/contact/route.ts  → Contact form API endpoint

components/
  Navigation.tsx        → Fixed navigation with scroll state
  Footer.tsx            → Site footer
  WhatsAppButton.tsx    → Persistent floating WhatsApp CTA
  ScrollReveal.tsx      → Scroll-triggered fade-up animation

lib/
  sanity.ts             → Sanity client
  queries.ts            → Data-fetching queries (for Sanity integration)

sanity/schemas/
  project.ts            → Project content schema
  teamMember.ts         → Team member schema
  settings.ts           → Testimonial + site settings schemas
```

---

## Design system

All tokens in `app/globals.css`. Key values:
- **Typefaces:** Cormorant Garamond (display) + DM Sans (body/UI)
- **Ground:** `#F4EEE6` (warm off-white)
- **Text Primary:** `#1C1612` (near-black)
- **WhatsApp:** `#1A5C38` (forest green)
- **Page margin:** 80px desktop / 24px mobile
- **Section spacing:** 120px

See `TD 05 Visual Identity.docx` for the full design specification.
