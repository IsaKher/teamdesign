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
const LIMITS = { name: 100, phone: 20, email: 254, type: 50, project: 2000 };

export async function POST(request: NextRequest) {
  try {
    // ─── 1. CSRF: verify the request comes from our own site ─────────────────
    //    Browsers always send the Origin header for cross-site POST requests.
    //    If it's missing or wrong, we reject immediately.
    const origin = request.headers.get('origin') ?? '';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://teamdesign.in';
    if (!origin.startsWith(siteUrl)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { name, phone, email, project, type, website } = body;

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

    // ─── 4. Length limits — reject oversized payloads ────────────────────────
    if (
      name.length > LIMITS.name ||
      (phone && phone.length > LIMITS.phone) ||
      (email && email.length > LIMITS.email) ||
      (type && type.length > LIMITS.type) ||
      (project && project.length > LIMITS.project)
    ) {
      return NextResponse.json(
        { error: 'One or more fields exceed the maximum allowed length.' },
        { status: 400 }
      );
    }

    // ─── 5. Sanitize all inputs before any further use ───────────────────────
    const safe = {
      name:    sanitize(name),
      phone:   sanitize(phone   ?? ''),
      email:   sanitize(email   ?? ''),
      type:    sanitize(type    ?? ''),
      project: sanitize(project ?? ''),
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

    // ─── Option B: Log submission (current placeholder) ──────────────────────
    console.log('[Contact Form Submission]', {
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Contact Form Error]', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try calling or WhatsApp instead.' },
      { status: 500 }
    );
  }
}
