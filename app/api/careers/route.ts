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
const LIMITS = { name: 100, email: 254, phone: 20, role: 50, portfolio: 500, note: 1000 };

export async function POST(request: NextRequest) {
  try {
    // ─── 1. CSRF: verify the request comes from our own site ─────────────────
    //    Browsers always send the Origin header for cross-site POST requests.
    //    If it's missing or wrong, we reject immediately.
    const origin = request.headers.get('origin') ?? '';
    const siteUrl = process.env.SITE_URL ?? 'https://teamdesign.in';
    if (!origin.startsWith(siteUrl)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { name, email, phone, role, portfolio, note, website } = body;

    // ─── 2. Honeypot: bots fill every field; humans never touch "website" ─────
    //    We silently return success so bots think they succeeded.
    if (website) {
      return NextResponse.json({ success: true });
    }

    // ─── 3. Basic presence validation ────────────────────────────────────────
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email address are required.' },
        { status: 400 }
      );
    }

    // ─── 4. Length limits — reject oversized payloads ────────────────────────
    if (
      name.length > LIMITS.name ||
      (email && email.length > LIMITS.email) ||
      (phone && phone.length > LIMITS.phone) ||
      (role && role.length > LIMITS.role) ||
      (portfolio && portfolio.length > LIMITS.portfolio) ||
      (note && note.length > LIMITS.note)
    ) {
      return NextResponse.json(
        { error: 'One or more fields exceed the maximum allowed length.' },
        { status: 400 }
      );
    }

    // ─── 5. Sanitize all inputs before any further use ───────────────────────
    const safe = {
      name:      sanitize(name),
      email:     sanitize(email      ?? ''),
      phone:     sanitize(phone      ?? ''),
      role:      sanitize(role       ?? ''),
      portfolio: sanitize(portfolio  ?? ''),
      note:      sanitize(note       ?? ''),
    };

    // ─── Option A: Send via Resend ───────────────────────────────────────────
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Website <noreply@teamdesign.in>',
    //   to: ['careers@teamdesign.in'],
    //   subject: `New application from ${safe.name} (${safe.role || 'Open Application'})`,
    //   text: `Name: ${safe.name}\nEmail: ${safe.email}\nPhone: ${safe.phone || '—'}\nRole: ${safe.role || '—'}\nPortfolio: ${safe.portfolio || '—'}\n\nNote:\n${safe.note || '—'}`,
    // });

    // ─── Option B: Log submission (current placeholder) ──────────────────────
    console.log('[Careers Application]', {
      ...safe,
      timestamp: new Date().toISOString(),
    });

    // ─── Option C: Nodemailer — now uses sanitized `safe.*` variables ─────────
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
      to: 'careers@teamdesign.in',
      subject: `New application from ${safe.name} (${safe.role || 'Open Application'})`,
      html: `
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Phone:</strong> ${safe.phone || '—'}</p>
        <p><strong>Role:</strong> ${safe.role || '—'}</p>
        <p><strong>Portfolio:</strong> ${safe.portfolio || '—'}</p>
        <p><strong>Note:</strong><br>${safe.note.replace(/\n/g, '<br>') || '—'}</p>
      `,
    });
    */

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Careers Application Error]', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try sending your portfolio via WhatsApp instead.' },
      { status: 500 }
    );
  }
}
