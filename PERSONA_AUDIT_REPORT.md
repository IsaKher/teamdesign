# Persona Click-Path Beta Test Report — Team Design Architects
**Role:** Senior UX Architect + QA Lead
**Date:** March 2026
**Codebase:** Next.js 14 App Router · TypeScript · CSS Modules
**Method:** Static code trace + component structure analysis for three target personas

---

## Persona 1: Priya — Referred High-Net-Worth Residential Client
*Priya was referred by a friend. She is seeking aesthetic alignment, prestige, and quiet reassurance that this firm handles homes at her scale.*

---

### 1.1 Arrival (0–8 seconds)
**Verdict: PASS — with one caveat**

**What works:**
The hero (`app/page.tsx`, lines 88–114) is a single, full-bleed cinematic image with a dark overlay gradient, a philosophy line ("Spaces shaped by site, light, and the people who inhabit them."), and the firm name in large Cormorant Garamond serif. There is no carousel, no slider, no rotating content. This is the correct premium architecture pattern — one image, one statement, total visual authority.

The CTAs added in the prior audit ("View Our Work" / "Begin a Conversation →") give Priya an immediate next step without visual noise.

**The caveat:**
The hero image (`photo-1600585154340-be6161a56a0c`, Unsplash) is a *modern residential exterior* — correct aesthetic signal for Priya. However, this is a stock image, and architecture clients at Priya's level are increasingly attuned to placeholder imagery. Credibility depends on the hero being an actual project photo. This is a content issue, not a structural one, but it is the first thing she will judge.

---

### 1.2 Orientation — Mariwala Testimonial and Screwvala Client Association
**Verdict: CONDITIONAL PASS — testimonial timing is unreliable**

**Positive finding:**
The Selected Clients list (`app/page.tsx`, lines 180–203, `SELECTED_CLIENTS` array) renders all four clients in a static list: Kishore Mariwala is first, Ronnie Screwvala is second. Both names and their descriptions ("Founder, Marico" / "Founder, UTV / UpGrad") are visible simultaneously without any interaction. This is in the Credentials section, approximately 2–3 scrolls below the fold. **Priya can confirm both associations in a single glance.**

**The friction:**
The Kishore Mariwala testimonial lives inside `<TestimonialSlider>` (`components/TestimonialSlider.tsx`), which auto-advances every 6000ms (`interval={6000}`, `app/page.tsx` line 176). The testimonials array has 4 entries in this order: Mariwala (index 0), Screwvala (1), J&K Bank (2), ITM Group (3).

If Priya takes longer than 6 seconds to scroll to the credentials section — which is typical on a first visit, especially on mobile — she will arrive mid-rotation and may see J&K Bank's commercial testimonial or the institutional ITM quote. **There is no logic that guarantees the first visible testimonial on page load will be the most relevant one for a residential visitor.**

The carousel resets to index 0 on mount, so if she reaches the section within 6 seconds she sees Mariwala. The window is narrow.

**Code reference:**
`app/page.tsx` line 176: `<TestimonialSlider testimonials={TESTIMONIALS} interval={6000} />`
`TESTIMONIALS` array: lines 57–82 — residential testimonial is index 0 by declaration order only.

---

### 1.3 Trust Check — Tasadduq Kher's Bio and Rachana Sansad Credential
**Verdict: PASS — zero clicks required**

The Principal section (`app/page.tsx`, lines 207–244) renders directly on the homepage without any click or navigation. It contains:
- Label: "Principal Architect" ✅
- Name: "Tasadduq Kher" in `--size-h2` serif ✅
- Bio paragraph: "Tasadduq Kher founded Team Design in 1999 after graduating from Rachana Sansad Academy of Architecture — one of India's most respected architectural institutions." ✅
- Credential grid: `B.Arch — Rachana Sansad Academy of Architecture, Mumbai` ✅
- Year practice founded: `1999` ✅
- Link to full team page: "Meet the Team →" pointing to `/people` ✅

Priya can read the founding story and the institutional credential in approximately 4–5 scrolls from the hero. No navigation required. The deeper People page (`app/people/page.tsx`) carries the extended bio. The Studio page (`app/studio/page.tsx`) has the full founding narrative. All three paths converge on the same trust signal.

**One gap:** The homepage Principal section has no mention of notable residential projects alongside the bio. A sentence referencing Mont Blanc specifically — at the bio level — would strengthen the residential trust signal for Priya.

---

### 1.4 Contact — Persistent WhatsApp Button
**Verdict: PASS — globally persistent**

The `WhatsAppButton` component (`components/WhatsAppButton.tsx`) is instantiated in `app/layout.tsx` line 62:
```tsx
<WhatsAppButton />
```
Because it is inside `RootLayout`, it renders on **every page without exception**. The button includes a pre-filled message: `"Hello, I'd like to discuss a project with Team Design Architects."` Opening `wa.me/919876543210?text=...` in a new tab.

The Contact page (`app/contact/page.tsx`, lines 74–85) also surfaces WhatsApp explicitly in the info sidebar with the label "The fastest way to reach us." Priya has a low-friction, non-committal contact channel available at all times.

**No friction identified** for Priya's WhatsApp path.

---

### Persona 1 Summary Scorecard

| Check | Status | Severity |
|---|---|---|
| Premium hero — no sliders | ✅ Pass | — |
| Mariwala + Screwvala visible in one scroll | ✅ Pass (static client list) | — |
| Testimonial timing reliable | ⚠️ Risk | Medium |
| Tasadduq Kher bio — zero clicks | ✅ Pass | — |
| Rachana Sansad credential visible | ✅ Pass | — |
| WhatsApp persistent globally | ✅ Pass | — |

---
---

## Persona 2: Vikram — Commercial Developer
*Vikram is evaluating Team Design as a potential partner for a ₹40–80 Cr commercial development. He is transactional, delivery-focused, and will decide within minutes whether this firm can operate at his scale.*

---

### 2.1 Arrival — Does the Homepage Signal Commercial Capability?
**Verdict: FAIL — hero reads as a luxury residential practice**

The hero image (`app/page.tsx`, line 91) is:
```
photo-1600585154340-be6161a56a0c
```
This is an Unsplash photograph of a modern single-family residential home. It is the same image used as the hero for the *Mont Blanc Residence* project detail page. Vikram's first visual impression — at zero seconds — is that this firm designs premium homes.

The philosophy line reinforces this: *"Spaces shaped by site, light, and the people who inhabit them."* This is lyrical, residential language. A commercial developer reading "the people who inhabit them" is not reading "we can deliver a 22,000 sq ft banking hall on time and on budget."

The stat bar does surface "20L+ sq ft Built Space" and "300+ Projects Completed" immediately below the hero, which are commercial-credibility signals. But by the time Vikram reads them he has already formed his first impression.

**Code reference:** `app/page.tsx` line 91 — hero `src` prop.

---

### 2.2 Credentials — 300+ Projects and 20L+ sq ft Statistics
**Verdict: PASS — immediately visible below the fold**

`STATS` array (`app/page.tsx`, lines 8–13):
```tsx
{ value: '300+', label: 'Projects Completed' }
{ value: '20L+ sq ft', label: 'Built Space' }
```
Both render in the stat bar section immediately after the hero — approximately 1 scroll on desktop. The dark background treatment makes this section visually distinct and the numbers are in large serif type. Vikram can read them without any click.

The `/work` page header (`app/work/page.tsx`, line 43) also reinforces: *"300+ completed projects across residential, commercial, and institutional architecture in Mumbai and beyond."*

**No code-level friction** on this path.

---

### 2.3 Portfolio Filter — Commercial Projects and J&K Bank Visibility
**Verdict: CONDITIONAL PASS — filter works, but portfolio depth is a credibility problem**

**The filter mechanism works correctly.** The homepage category link `/work?type=Commercial` triggers `useSearchParams()` in `app/work/page.tsx` (lines 23–31), which reads the `type` URL parameter on mount and sets the `active` filter state accordingly. Vikram can click "Commercial" on the homepage and land on a pre-filtered commercial portfolio in one click.

**The J&K Bank project is present.** `jk-bank-business-centre` (slug) appears in the `PROJECTS` array at index 2 and in `FEATURED_PROJECTS` on the homepage at index 2. When Vikram filters for Commercial, it renders second (behind Unilazer Ventures Office at 4,500 sq ft, then J&K Bank at 22,000 sq ft).

**However, three structural problems exist:**

**Problem A — Only 2 commercial projects in the portfolio.**
The `PROJECTS` array (`app/work/page.tsx`, lines 11–20) contains 8 total projects:
- Residential: 3 (Mont Blanc, Bungalow Tirupur, Villa Lonavala)
- Commercial: 2 (Unilazer, J&K Bank)
- Institutional: 3 (ITM College, Kalimata Temple, MBA Hostel)

With a claimed "300+" project history, showing 2 commercial projects creates an immediate credibility gap for Vikram. There is no "Load More" or pagination mechanism — the grid is entirely static.

**Problem B — J&K Bank detail page has no testimonial.**
`app/work/[slug]/page.tsx` line 108: `testimonial: null`
The J&K Bank project description is strong, but there is no client voice confirming delivery, professionalism, or scale. Vikram needs peer validation from institutional buyers; the absence of a testimonial on the largest commercial project is a missed trust signal.

**Problem C — No "Project Scale" or "Construction Value" metadata.**
The project data model (`interface Project`, lines 23–35) has: `title`, `client`, `type`, `location`, `year`, `area`, `description`, `gallery`, `testimonial`, `related`. There is no `constructionValue`, `projectScale`, or `complexity` field. Vikram cannot self-qualify on scale from the portfolio cards. Area (sq ft) is shown but budget tier is not.

---

### 2.4 Contact — Phone Number Visibility
**Verdict: PARTIAL FAIL — phone requires navigation or scroll**

The phone number (`+91 98765 43210`) is accessible via:
1. **Contact page** (`app/contact/page.tsx`, line 66) — requires navigating to `/contact`
2. **Footer** (`components/Footer.tsx`) — requires scrolling to the bottom of any page

The phone number does NOT appear on:
- The homepage
- The hero section or hero CTAs
- The nav bar
- Any inline section CTA

For Vikram, who may want to call before committing to a form submission, the phone is one click plus significant scroll away. The `WhatsAppButton` is persistent globally, but WhatsApp is a secondary contact preference for institutional buyers who often prefer a direct call.

**Code reference:** Phone only rendered in `app/contact/page.tsx` line 66 and in `components/Footer.tsx`.

---

### Persona 2 Summary Scorecard

| Check | Status | Severity |
|---|---|---|
| Hero signals commercial capability | ❌ Fail | High |
| 300+ / 20L+ sq ft stats visible in one scroll | ✅ Pass | — |
| Commercial filter functional from homepage | ✅ Pass | — |
| J&K Bank project present | ✅ Pass | — |
| J&K Bank has testimonial | ❌ Missing | Medium |
| Portfolio commercial depth (only 2 projects) | ⚠️ Risk | High |
| Phone visible without navigation | ⚠️ Partial Fail | Medium |

---
---

## Persona 3: Meera — Interior Design Client
*Meera is visually driven and wants to know if this firm understands her taste, respects her budget, and will be a trustworthy partner. She found Team Design through Instagram.*

---

### 3.1 Navigation — Is "Interiors" a First-Class Nav Item?
**Verdict: PASS — second item in primary nav**

`components/Navigation.tsx`, lines 9–15:
```tsx
const navItems = [
  { label: 'Work', href: '/work' },
  { label: 'Interiors', href: '/interiors' },
  { label: 'Studio', href: '/studio' },
  { label: 'People', href: '/people' },
  { label: 'Contact', href: '/contact' },
];
```

"Interiors" is the **second item** in the primary navigation — more prominent than "Studio", "People", and "Contact". It is not buried in a dropdown or under a "Portfolio" parent item. On mobile, it is the second link in the burger menu (`styles.mobileLink` in `Navigation.module.css`).

The homepage also has a dedicated Interiors CTA section (`app/page.tsx`, lines 246–263) with a full-bleed interior image and the line *"Spaces that feel like they belong to you."* — a direct path to `/interiors`.

**No friction.** Meera's primary landing signal is well-placed.

---

### 3.2 Detail Check — Gallery Support for Material and Lighting Shots
**Verdict: PARTIAL FAIL — gallery exists but has no semantic structure**

The `Project` interface (`app/work/[slug]/page.tsx`, lines 23–35) defines:
```tsx
gallery: string[];  // array of image URL strings only
```

Gallery items are plain strings — there is no `caption`, `type`, `label`, or `category` field. The gallery render loop (lines 322–339):
```tsx
{project.gallery.map((src, i) => (
  <div className={`${styles.galleryItem} ${i % 3 === 0 ? styles.galleryFull : ''}`}>
    <Image src={src} alt={`${project.title} — image ${i + 1}`} ... />
  </div>
))}
```

The `alt` text is auto-generated as "Mont Blanc Residence — image 2" — not descriptive. There is no way for Meera to know if a gallery image shows a material detail, a lighting condition, a bathroom, or a kitchen. The layout alternates full-width vs. half-width (via `i % 3 === 0`) which creates visual rhythm, but provides no semantic meaning about *what* she is looking at.

**For Meera, who arrives with material and mood questions**, this is a significant limitation. She cannot filter for "kitchen images" or "lighting conditions" or "material palette" from the gallery component.

---

### 3.3 — CRITICAL BUG: All Interior Project Detail Pages Are Broken

**Verdict: CRITICAL FAIL — affects all 6 interior portfolio projects**

This is the most serious structural issue found in the entire audit.

`app/interiors/page.tsx` renders 6 projects, each linking to:
```tsx
<Link href={`/work/${p.slug}`} className={styles.card}>
```

The slugs used are:
- `mariwala-interior`
- `unilazer-interiors`
- `apartment-worli`
- `villa-lonavala-interiors`
- `restaurant-bkc`
- `home-powai`

**None of these slugs exist in `PROJECT_DATA`** in `app/work/[slug]/page.tsx`. The `PROJECT_DATA` object (lines 37–233) only contains:
- `mont-blanc-mariwala-residence`
- `unilazer-ventures-office`
- `jk-bank-business-centre`
- `itm-college-navi-mumbai`
- `kalimata-temple-kharghar`
- `bungalow-tirupur`
- `mba-hostel-towers`
- `villa-lonavala`

Every interior project Meera clicks will trigger the FALLBACK case (`app/work/[slug]/page.tsx`, lines 237–249 and 271–273):
```tsx
const FALLBACK: Project = {
  title: 'Project',
  description: 'Project details coming soon.',
  gallery: [],
  testimonial: null,
  ...
}
```

Meera clicks "Mont Blanc Residence — Interiors" → arrives at `/work/mariwala-interior` → sees a page titled "Mariwala Interior" with the text "Project details coming soon." and no gallery. **This is a complete dead end for every single interior project.** Her journey terminates at the first point of deep interest.

---

### 3.4 Reassurance — Budget and Delivery Testimonials
**Verdict: PASS on homepage, FAIL on Interiors page**

**Homepage — works:**
The Kishore Mariwala testimonial explicitly states: *"Team Design managed the entire project lifecycle — from concept and design to contractor management, budget adherence, and on-time delivery."*

This is exactly the language Meera needs. It renders:
1. In the testimonial carousel on the homepage (index 0 — first on page load)
2. On the `mont-blanc-mariwala-residence` project detail page (the only project with a testimonial)

**The gap:**
The `/interiors` page (`app/interiors/page.tsx`) has **no testimonial section at all** — no carousel, no static quote, nothing. Meera landing on the Interiors page directly (from nav or from Instagram) has no client reassurance visible anywhere on that page. The page is: hero → filter bar → project grid. The budget/delivery testimony only exists on the homepage, which she may never visit if she navigates directly to `/interiors`.

---

### 3.5 Contact — WhatsApp Accessibility
**Verdict: PASS — low-friction, persistent**

Global `WhatsAppButton` in `layout.tsx` line 62 covers all pages including `/interiors`. The pre-filled message keeps the interaction low-commitment. **No friction for Meera's contact path.**

---

### Persona 3 Summary Scorecard

| Check | Status | Severity |
|---|---|---|
| "Interiors" first-class in primary nav | ✅ Pass | — |
| Gallery supports multiple detail shot types | ⚠️ Partial Fail | Medium |
| Interior project detail links functional | ❌ Critical Fail | Critical |
| Budget/delivery testimonial — homepage | ✅ Pass | — |
| Budget/delivery testimonial — Interiors page | ❌ Missing | High |
| WhatsApp low-pressure and persistent | ✅ Pass | — |

---
---

## Friction Log — Top 3 Structural / Code-Level Changes

---

### Friction #1 — CRITICAL: Broken Interior Project Slugs
**Affects:** Persona 3 (Meera) — entire portfolio journey collapses
**File:** `app/interiors/page.tsx` (PROJECTS slugs) vs. `app/work/[slug]/page.tsx` (PROJECT_DATA keys)

**Root cause:**
The 6 slugs in `app/interiors/page.tsx` do not match any key in `PROJECT_DATA`. Every interior project click lands on the FALLBACK page.

**Fix required:**
Either (A) add entries to `PROJECT_DATA` for all 6 interior slugs with real content and gallery arrays, or (B) change the interiors slugs to match existing project entries (e.g., link `mariwala-interior` → `mont-blanc-mariwala-residence`), or (C) create a separate `INTERIOR_PROJECT_DATA` record and a dedicated `app/interiors/[slug]/page.tsx` route.

Option A (or C) is architecturally cleanest. Option B is a stopgap. Any of the three eliminates the dead-end.

**Impact of fix:** Unblocks Meera's entire portfolio exploration journey.

---

### Friction #2 — HIGH: Hero Image Misaligns Commercial Persona
**Affects:** Persona 2 (Vikram) — first impression signals residential-only practice
**File:** `app/page.tsx` line 91

**Root cause:**
The hero `src` points to a single residential house photograph. There is no commercial visual signal anywhere in the above-the-fold viewport.

**Fix required:**
Either (A) replace the hero with a mixed-use or commercial image that carries the firm's aesthetic while communicating scale (a J&K Bank interior shot, a double-height banking hall, or an institutional campus), or (B) implement a split-hero — two panels, residential on left and commercial/institutional on right — communicating practice breadth in the first viewport, or (C) add a sub-label below the philosophy line: *"Residential · Commercial · Institutional"* in the existing `heroLabel` position to signal scope without replacing the image.

Option C is the lowest-friction code change and is a single-line copy edit to `app/page.tsx` line 105.

**Impact of fix:** Vikram no longer misreads the firm as residential-only at first glance.

---

### Friction #3 — MEDIUM: Testimonial Carousel Timing is Unreliable for Priya's Key Social Proof
**Affects:** Persona 1 (Priya) — most relevant testimonial may not be the first she sees
**File:** `app/page.tsx` line 176 / `components/TestimonialSlider.tsx`

**Root cause:**
The slider auto-advances on a fixed 6-second timer from mount. The residential Mariwala testimonial is only guaranteed to be visible if Priya reaches the credentials section within 6 seconds of page load. The testimonials array currently orders them: Mariwala (0), Screwvala (1), J&K Bank (2), ITM Group (3) — which is correct by intent but not enforced structurally.

**Fix required:**
Two options:
- (A) Add a `data-` attribute or prop to `TestimonialSlider` that accepts an `initialIndex` and defaults to 0 — already effectively the case, but make it explicit and document it. Ensure the component does not randomize or advance before the user's first view (check for IntersectionObserver-based start).
- (B) More impactful: Add a static "pinned" testimonial above the carousel — a single non-rotating quote (the Mariwala one) that Priya will always see, with the carousel below showing "More client voices." This eliminates timing dependency entirely for the most important testimonial.

Option B is a one-section HTML addition in `app/page.tsx` and a small CSS addition.

**Impact of fix:** Priya always reads the highest-relevance testimonial (budget adherence + on-time delivery + residential context) regardless of scroll timing.

---

## Summary Matrix

| Persona | Journey Stage | Status | Priority |
|---|---|---|---|
| Priya | Hero — premium first impression | ✅ | — |
| Priya | Mariwala + Screwvala visible on scroll | ✅ | — |
| Priya | Testimonial carousel timing | ⚠️ Risk | Medium |
| Priya | Tasadduq Kher bio — zero clicks | ✅ | — |
| Priya | WhatsApp — globally persistent | ✅ | — |
| Vikram | Hero signals commercial capability | ❌ | High |
| Vikram | Stats immediately visible | ✅ | — |
| Vikram | Commercial filter one click from homepage | ✅ | — |
| Vikram | J&K Bank project present | ✅ | — |
| Vikram | J&K Bank has testimonial | ❌ | Medium |
| Vikram | Phone visible without navigation | ⚠️ | Medium |
| Meera | Interiors first-class in nav | ✅ | — |
| Meera | Gallery supports material detail shots | ⚠️ | Medium |
| Meera | **Interior project detail pages functional** | ❌ **BUG** | **Critical** |
| Meera | Budget/delivery testimonial — homepage | ✅ | — |
| Meera | Budget/delivery testimonial — Interiors page | ❌ | High |
| Meera | WhatsApp low-pressure and accessible | ✅ | — |
