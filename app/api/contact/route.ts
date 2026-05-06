import { NextRequest, NextResponse } from 'next/server';

// ─── HTML sanitizer — strips tags to prevent XSS in email templates ──────────
function sanitize(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// ─── Field length limits (characters) ────────────────────────────────────────
const LIMITS = { name: 100, phone: 20, email: 254, type: 50, project: 2000, budget: 30, timeline: 30 };

// ─── Rate limiter (in-memory, per serverless instance) ───────────────────────
// Limits each IP to 5 submissions per 60-second window.
const rateMap = new Map<string, { count: number; reset: number }>();
const RATE = { window: 60_000, max: 5 };

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE.window });
    return false;
  }
  if (entry.count >= RATE.max) return true;
  entry.count++;
  return false;
}

// ─── Email format validation ──────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    // ─── 0. Rate limit ───────────────────────────────────────────────────────
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    // ─── 1. CSRF: verify the request comes from our own site ─────────────────
    //    Browsers always send the Origin header for cross-site POST requests.
    //    If it's missing or wrong, we reject immediately.
    const origin = request.headers.get('origin');
    const siteUrl = process.env.SITE_URL ?? 'https://teamdesignarchitects.com';
    if (!origin || !origin.startsWith(siteUrl)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { name, phone, email, project, type, budget, timeline, website } = body;

    // ─── 2. Honeypot: bots fill every field; humans never touch "website" ─────
    //    We silently return success so bots think they succeeded.
    if (website) {
      return NextResponse.json({ success: true });
    }

    // ─── 3. Basic presence validation ────────────────────────────────────────
    if (!name || (!phone && !email)) {
      return NextResponse.json(
        { error: 'Name and at least one contact method (phone or email) are required.' },
        { status: 400 }
      );
    }

    // ─── 4. Email format validation ───────────────────────────────────────────
    if (email && !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // ─── 5. Length limits — reject oversized payloads ────────────────────────
    if (
      name.length > LIMITS.name ||
      (phone && phone.length > LIMITS.phone) ||
      (email && email.length > LIMITS.email) ||
      (type && type.length > LIMITS.type) ||
      (project && project.length > LIMITS.project) ||
      (budget && budget.length > LIMITS.budget) ||
      (timeline && timeline.length > LIMITS.timeline)
    ) {
      return NextResponse.json(
        { error: 'One or more fields exceed the maximum allowed length.' },
        { status: 400 }
      );
    }

    // ─── 6. Sanitize all inputs before any further use ───────────────────────
    const safe = {
      name:     sanitize(name),
      phone:    sanitize(phone    ?? ''),
      email:    sanitize(email    ?? ''),
      type:     sanitize(type     ?? ''),
      project:  sanitize(project  ?? ''),
      budget:   sanitize(budget   ?? ''),
      timeline: sanitize(timeline ?? ''),
    };

    // ─── Option A: Send via Resend ───────────────────────────────────────────
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Website <noreply@teamdesign.in>',
    //   to: ['studio@teamdesign.in'],
    //   subject: `New enquiry from ${safe.name}`,
    //   text: `Name: ${safe.name}\nPhone: ${safe.phone || '—'}\nEmail: ${safe.email || '—'}\nProject Type: ${safe.type || '—'}\n\nMessage:\n${safe.project || '—'}`,
    // });

    // ─── Option B: Nodemailer ─────────────────────────────────────────────────
    // Requires: npm install nodemailer @types/nodemailer
    // Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env.local
    /*
    import nodemailer from 'nodemailer';
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"Team Design Website" <${process.env.SMTP_USER}>`,
      to: 'studio@teamdesign.in',
      subject: `New project enquiry from ${safe.name}`,
      html: `
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Phone:</strong> ${safe.phone || '—'}</p>
        <p><strong>Email:</strong> ${safe.email || '—'}</p>
        <p><strong>Project Type:</strong> ${safe.type || '—'}</p>
        <p><strong>Message:</strong><br>${safe.project.replace(/\n/g, '<br>') || '—'}</p>
      `,
    });
    */

    void safe; // suppress unused-variable warning until email sending is wired up

    return NextResponse.json({ success: true });
  } catch (error) {
    // Structured JSON log — Vercel's log explorer treats one line per JSON
    // object, so timestamp/route/error/stack become filterable fields.
    console.error(JSON.stringify({
      level: 'error',
      timestamp: new Date().toISOString(),
      route: '/api/contact',
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    }));
    return NextResponse.json(
      { error: 'Something went wrong. Please try calling or WhatsApp instead.' },
      { status: 500 }
    );
  }
}
