# UX Audit Report — Team Design Architects
**Perspective:** Senior UX Researcher + Elite Architectural Client
**Date:** March 2026
**Codebase:** Next.js 14 App Router · TypeScript · CSS Modules

---

## 1. The First Impression

**Assumption formed within 5 seconds:**
*"This is a large, established Mumbai firm — probably volume-driven, not boutique."*

The hero communicates age and scale ("Est. 1999", "300+ Projects", "500+ Clients") immediately and well. Cormorant Garamond signals premium positioning, and the cinematic dark hero image is evocative. But the first impression has a critical flaw: **it says nothing about design philosophy**.

An elite architectural client — the kind who will spend ₹5–15 Cr on a home — does not care how many projects you've done. They care about *what you believe in*. The hero has no tagline that answers: *"What kind of architect is Team Design?"* Compare to the best architecture firm websites globally: they lead with a philosophy sentence — "We design for the way people actually live" or "Materiality, light, and the specificity of place." Without this, the firm reads as accomplished but generic.

**The stat bar immediately below the hero compounds this.** Jumping from an evocative dark photograph straight into a "25+ Years · 300+ Projects · 500+ Clients · 20L+ sq ft" data grid is a tonal whiplash. The atmosphere is broken. An elite client does not want to feel like they're consulting a production house.

**Secondary issue:** The hero has no CTA. A visitor moved by the image has nowhere to go. There is no "View Our Work" button, no "Begin a Conversation" link — just a beautiful dead end. The user's only option is to scroll, and many won't.

---

## 2. Friction Points

### 2.1 — The Hero Is a Dead End
**File:** `app/page.tsx` — Hero section (lines ~30–70)

The hero renders the firm name, a tagline, and background image — but contains zero interactive elements. On a conversion-optimised architecture site, the hero should capture intent. At minimum: one CTA pointing to `/work`, one pointing to `/contact`. Currently there is neither.

### 2.2 — No Self-Qualification Path for the Client
**File:** `app/page.tsx` — Selected Work section

The homepage shows 4 static featured projects. An elite residential client visiting for the first time cannot quickly answer: *"Does this firm do work like mine?"* The `/work` page has category filters (Residential / Commercial / Institutional) but the homepage grid has none. A client interested only in residential architecture has no fast path — they either scroll through everything or navigate away.

### 2.3 — The Contact Journey Has Too Many Steps
**Files:** `app/contact/page.tsx`, `components/Navigation.tsx`

"Contact" is the last nav item, visually the least prominent. There is no CTA on the hero, no CTA at the end of the stat bar, no "commission a project" button anywhere in the selected work section. The only persistent contact prompts are the WhatsApp floating button and the nav link. For a firm where a single project commission is worth ₹2–10 Cr in fees, this is a significant conversion gap.

The contact form itself is good — sticky info sidebar, form validation, WhatsApp fallback — but it is unreachable without deliberate effort.

### 2.4 — Testimonials Are Disembodied
**File:** `components/TestimonialSlider.tsx`, `app/page.tsx`

The testimonial carousel auto-advances through four client quotes, but they appear in a section completely disconnected from the projects they reference. The Mariwala testimonial ("Their sensitivity to the natural site...") means far more when placed *on* the Mont Blanc Mariwala Residence project page, with the gallery image visible. Currently, the quotes float in a beige section and read like generic social proof rather than specific, verifiable client experiences.

The project detail pages *do* have a testimonial slot, but only one project (Mont Blanc) is wired to display it. Seven out of eight projects have no client voice at all.

### 2.5 — Press Recognition Is Hidden
**File:** `app/studio/page.tsx` — Press section

Architectural Digest India, Times of India, and other press mentions are buried at the bottom of the Studio page — the least-visited page on the site. An elite client who Googles "Team Design Architects Mumbai" and lands on the homepage has no indication that this firm has been recognised by AD India. This is trust signal misplacement.

### 2.6 — Portfolio Depth Is Uneven
**File:** `app/work/[slug]/page.tsx` — Static project data

The portfolio has 8 projects. Some (Mont Blanc Mariwala Residence) have rich descriptions, gallery images, and a testimonial. Others are structurally identical but have thinner content. The firm's credentials page claims "300+ projects" — showing 8 creates an immediate credibility gap. An elite client will notice.

---

## 3. Missing Elements

### 3.1 — No Design Philosophy Statement
The Studio page tells a founding story ("Tasadduq Kher graduated from Rachana Sansad in 1999...") but never articulates *what the firm believes*. What is Team Design's stance on material honesty? On site-specificity? On the relationship between architecture and the people who inhabit it? This is not a nice-to-have — for a boutique-to-premium firm, it is the primary trust differentiator.

### 3.2 — No Awards or Accreditation Section
The Studio page has press coverage but no awards timeline. No "IIID Award 2019", no "CREDAI Mumbai finalist", no COA registration number. These are standard trust markers that elite clients and institutional procurement teams specifically look for. The press section exists but is text-only — there are no publication logos, no article links, no photos.

### 3.3 — No Defined Engagement Process
There is no page or section explaining *how the firm works*. What does commissioning Team Design actually involve? What are the phases — brief, concept, design development, site supervision? What is the typical project timeline? What is the minimum project scope? High-value clients want to understand the journey before they pick up the phone. Absence of this information forces them to ask basic questions in the first call, which erodes perceived expertise.

### 3.4 — No Sustainability or Certification Signals
The Services section on the Studio page lists "Sustainable Design" as a third service, but there are no supporting credentials: no IGBC membership, no LEED project certifications, no passive design metrics shown in project specs. In 2026, this is a significant omission for any firm targeting premium residential and institutional clients.

### 3.5 — No Video Content
Premium architecture firms globally use 60–120 second films — drone footage, material close-ups, inhabited spaces — to create emotional connection. The homepage hero uses a static image on a 12-second zoom loop. A single brand film embedded in the hero or studio page would substantially increase time-on-site and emotional engagement.

### 3.6 — No Project Scale Indicators for Client Self-Qualification
Project detail pages show area (sq ft) but not budget tier, not procurement complexity, not technical challenge. An elite client with a ₹8 Cr residential brief cannot easily tell whether Team Design works at that scale or primarily takes ₹80L renovation commissions. Adding a "Project Scale" or "Construction Value" field to project metadata would help self-qualification without stating prices.

### 3.7 — No Blog, Insights, or Studio Notes
There is no content marketing layer. A firm that has been operating since 1999 has an enormous bank of knowledge — material experiments, site responses, client collaboration stories. A "Studio Notes" or "Journal" section (even 6 articles per year) would: (a) significantly improve SEO for long-tail architecture queries, (b) demonstrate thought leadership, and (c) give returning visitors a reason to re-engage.

### 3.8 — No Indication of Geographic Reach
The homepage tagline says "Mumbai" and the contact page lists Navi Mumbai. But the project portfolio includes J&K Bank (Jammu & Kashmir) and ITM Group (institutional). It is not clear whether Team Design works nationally, or whether these were exceptions. Clarifying geographic reach (with a simple "We work across India" line, or a project map) removes a silent objection.

---

## 4. Action Items

### Action Item 1 — Add a Hero CTA to Close the Dead End

**File to edit:** `app/page.tsx`
**Impact:** High — directly addresses the single biggest conversion gap

The hero section ends with `<h1 className={styles.heroTitle}>Team Design Architects</h1>` and nothing else interactive. Add two CTA links immediately below the title inside the hero:

```tsx
// In app/page.tsx — inside the .heroContent div, after heroTitle
<div className={styles.heroCtas}>
  <Link href="/work" className={styles.heroCta}>
    View Our Work
  </Link>
  <Link href="/contact" className={styles.heroCtaSecondary}>
    Begin a Conversation →
  </Link>
</div>
```

```css
/* In app/page.module.css */
.heroCtas {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 40px;
}
.heroCta {
  font-family: var(--font-sans);
  font-size: var(--size-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: #F4EEE6;
  background: rgba(244, 238, 230, 0.12);
  border: 1px solid rgba(244, 238, 230, 0.35);
  padding: 14px 32px;
  text-decoration: none;
  transition: background 0.3s ease, border-color 0.3s ease;
}
.heroCta:hover {
  background: rgba(244, 238, 230, 0.22);
  border-color: rgba(244, 238, 230, 0.7);
}
.heroCtaSecondary {
  font-family: var(--font-sans);
  font-size: var(--size-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: rgba(244, 238, 230, 0.65);
  text-decoration: none;
  transition: color 0.3s ease;
}
.heroCtaSecondary:hover { color: rgba(244, 238, 230, 1); }
```

This single change ensures that every visitor who resonates with the hero image has an immediate next step.

---

### Action Item 2 — Move Press Logos to the Homepage Credentials Section

**File to edit:** `app/page.tsx` (credentials section) + `app/studio/page.tsx`
**Impact:** High — misplaced trust signals are worth zero

Currently the credentials section on the homepage has a testimonial carousel on the left and a "Selected Clients" list on the right. The Architectural Digest and Times of India mentions live on the Studio page that almost no one visits first.

Add a "As Featured In" strip inside the credentials section, directly below the selected clients list, in `app/page.tsx`:

```tsx
// In the credentials section, after the clients list
<div className={styles.pressStrip}>
  <p className={styles.pressLabel}>As featured in</p>
  <div className={styles.pressLogos}>
    {['Architectural Digest India', 'Times of India', 'Dezeen', 'ArchDaily India'].map((pub) => (
      <span key={pub} className={styles.pressItem}>{pub}</span>
    ))}
  </div>
</div>
```

```css
/* In app/page.module.css */
.pressStrip {
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid var(--color-rule);
}
.pressLabel {
  font-family: var(--font-sans);
  font-size: var(--size-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}
.pressLogos {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
}
.pressItem {
  font-family: var(--font-serif);
  font-size: 13px;
  color: var(--color-text-secondary);
  opacity: 0.6;
  letter-spacing: 0.04em;
  font-style: italic;
}
```

This surfaces the firm's highest-credibility signals on the homepage where they will actually influence a first-time visitor's decision.

---

### Action Item 3 — Add a Design Philosophy Sentence to the Hero Tagline

**File to edit:** `app/page.tsx` — hero section
**Impact:** Medium-High — differentiates from generic "established firm" positioning at zero cost

The current hero tagline is: `Mumbai · Est. 1999 · Architecture & Interiors`

This is descriptive but not differentiating. Change it to a two-line treatment: the factual credentials on line one, and a brief philosophy statement on line two. In `app/page.tsx`:

```tsx
// Replace the single heroTagline span with a two-line version
<div className={styles.heroTaglineBlock}>
  <span className={styles.heroTagline}>
    Mumbai · Est. 1999 · Architecture &amp; Interiors
  </span>
  <span className={styles.heroPhilosophy}>
    Spaces shaped by site, light, and the people who inhabit them.
  </span>
</div>
```

```css
/* In app/page.module.css */
.heroTaglineBlock {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 8px;
}
.heroPhilosophy {
  font-family: var(--font-serif);
  font-size: clamp(15px, 1.4vw, 19px);
  font-weight: 300;
  font-style: italic;
  color: rgba(244, 238, 230, 0.72);
  letter-spacing: 0.02em;
  line-height: 1.5;
}
```

This change costs one line of copy and communicates — in 10 words — that Team Design is a considered, site-specific, human-centred practice. It answers the elite client's first silent question: *"Do these people think the way I think?"*

---

## Summary Scorecard

| Area | Current | Priority |
|---|---|---|
| Hero conversion path | ❌ No CTA | Critical |
| Design philosophy communication | ❌ Missing | High |
| Trust signal placement | ⚠️ Press buried in Studio | High |
| Portfolio depth | ⚠️ 8 of 300+ shown | Medium |
| Client self-qualification | ⚠️ No type/scale filters on homepage | Medium |
| Testimonials tied to projects | ⚠️ Only 1 of 8 projects | Medium |
| Engagement process explained | ❌ Not present anywhere | Medium |
| Sustainability credentials | ❌ Not supported by data | Low-Medium |
| Awards / accreditation | ❌ Not present | Low-Medium |
| Video content | ❌ Not present | Low |
