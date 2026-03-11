import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, project, type } = body;

    // Basic validation
    if (!name || (!phone && !email)) {
      return NextResponse.json(
        { error: 'Name and at least one contact method (phone or email) are required.' },
        { status: 400 }
      );
    }

    // ─── Option A: Send via email using Resend (uncomment & configure if you have Resend API key) ───
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Website <noreply@teamdesign.in>',
    //   to: ['studio@teamdesign.in'],
    //   subject: `New enquiry from ${name}`,
    //   text: `Name: ${name}\nPhone: ${phone || '—'}\nEmail: ${email || '—'}\nProject Type: ${type || '—'}\n\nMessage:\n${project || '—'}`,
    // });

    // ─── Option B: Forward to WhatsApp via simple log / webhook ─────────────────────────────────
    // In production, integrate with your email provider (Resend, Nodemailer, etc.)
    // For now, we log the submission and return success.
    console.log('[Contact Form Submission]', {
      name,
      phone: phone || null,
      email: email || null,
      type: type || null,
      project: project || null,
      timestamp: new Date().toISOString(),
    });

    // ─── Option C: Send via email using Nodemailer (if SMTP credentials are set) ───────────────
    // Requires: npm install nodemailer @types/nodemailer
    // And setting SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env.local
    /*
    import nodemailer from 'nodemailer';
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail({
      from: `"Team Design Website" <${process.env.SMTP_USER}>`,
      to: 'studio@teamdesign.in',
      subject: `New project enquiry from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone || '—'}</p>
        <p><strong>Email:</strong> ${email || '—'}</p>
        <p><strong>Project Type:</strong> ${type || '—'}</p>
        <p><strong>Message:</strong><br>${project?.replace(/\n/g, '<br>') || '—'}</p>
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
