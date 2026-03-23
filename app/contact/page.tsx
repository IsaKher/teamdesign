'use client';

import { useState, FormEvent } from 'react';
import styles from './page.module.css';
import { STUDIO } from '@/lib/siteContent';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const typeField = form.elements.namedItem('type');
    const data = {
      name:     (form.elements.namedItem('name')    as HTMLInputElement).value,
      phone:    (form.elements.namedItem('phone')   as HTMLInputElement).value,
      email:    (form.elements.namedItem('email')   as HTMLInputElement).value,
      project:  (form.elements.namedItem('project') as HTMLTextAreaElement).value,
      type:     typeField instanceof RadioNodeList ? typeField.value : (typeField as HTMLInputElement)?.value ?? '',
      budget:   (form.elements.namedItem('budget')   as HTMLSelectElement)?.value ?? '',
      timeline: (form.elements.namedItem('timeline') as HTMLSelectElement)?.value ?? '',
      // Honeypot — real users never fill this; bots do
      website:  (form.elements.namedItem('website') as HTMLInputElement)?.value ?? '',
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Submission failed');
      }
      setStatus('success');
      form.reset();
    } catch (err: unknown) {
      clearTimeout(timeout);
      setStatus('error');
      const isTimeout = err instanceof Error && err.name === 'AbortError';
      setErrorMsg(
        isTimeout
          ? 'Request timed out — please try WhatsApp or call us directly.'
          : err instanceof Error ? err.message : 'Something went wrong.'
      );
    }
  }

  return (
    <>
      <div className={styles.pageHero}>
        <span className={styles.pageLabel}>Get In Touch</span>
        <h1 className={styles.pageTitle}>Begin a conversation.</h1>
        <p className={styles.pageSubtitle}>
          Every project starts with a conversation. Tell us about what you&apos;re building — we&apos;ll take it from there.
        </p>
      </div>

      <div className={styles.layout}>
        {/* Contact info */}
        <div className={styles.infoCol}>
          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>Studio</span>
            <a
              href={STUDIO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.addressLink}
            >
              <address className={styles.address}>
                A-145/6A, Pawane Village Midc Road<br />
                T.T.C. Industrial Area, MIDC Sector 2<br />
                Kopar Khairane, Navi Mumbai<br />
                Maharashtra 400710, India
              </address>
            </a>
          </div>

          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>Phone</span>
            <a href={`tel:${STUDIO.phone.replace(/\s/g, '')}`} className={styles.infoLink}>{STUDIO.phone}</a>
          </div>

          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>Email</span>
            <a href={`mailto:${STUDIO.email}`} className={styles.infoLink}>{STUDIO.email}</a>
          </div>

          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>WhatsApp</span>
            <a
              href={`https://wa.me/${STUDIO.whatsappNumber}`}
              className={styles.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open WhatsApp Chat →
            </a>
            <span className={styles.whatsappNote}>The fastest way to reach us</span>
          </div>

          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>Hours</span>
            <span className={styles.infoText}>Monday – Saturday<br />9:30 AM – 7:00 PM IST</span>
          </div>

          <div className={styles.responseNote}>
            <span className={styles.responseText}>
              A member of the team will respond within one business day.
            </span>
          </div>
        </div>

        {/* Contact form */}
        <div className={styles.formCol}>
          <span className={styles.formLabel}>Send a Message</span>

          {status === 'success' ? (
            <div className={styles.successMessage}>
              <p className={styles.successTitle}>Message received.</p>
              <p className={styles.successText}>
                Thank you — we&apos;ll be in touch within one business day. For a faster response, please WhatsApp us directly.
              </p>
              <a
                href={`https://wa.me/${STUDIO.whatsappNumber}`}
                className={styles.successWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Continue on WhatsApp →
              </a>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {/* Honeypot — visually hidden, only bots fill this in */}
              <input
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
              />
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={styles.input}
                    placeholder="Priya Sharma"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="phone" className={styles.label}>Phone / WhatsApp</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={styles.input}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={styles.input}
                  placeholder="priya@example.com"
                />
              </div>

              <div className={styles.field}>
                <span className={styles.label}>Type of Project</span>
                <div className={styles.typeCards}>
                  {[
                    { value: 'residential-bungalow', label: 'Bungalow / Villa' },
                    { value: 'residential-apartment', label: 'Apartment' },
                    { value: 'commercial', label: 'Commercial' },
                    { value: 'institutional', label: 'Institutional' },
                    { value: 'interiors', label: 'Interiors Only' },
                    { value: 'other', label: 'Not Sure Yet' },
                  ].map(({ value, label }) => (
                    <label key={value} className={styles.typeCard}>
                      <input type="radio" name="type" value={value} className={styles.typeCardInput} />
                      <span className={styles.typeCardLabel}>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="budget" className={styles.label}>Approximate Budget</label>
                  <select id="budget" name="budget" className={styles.select}>
                    <option value="">Prefer not to say</option>
                    <option value="under-50l">Under ₹50 Lakhs</option>
                    <option value="50l-1cr">₹50L – ₹1 Crore</option>
                    <option value="1cr-3cr">₹1 – ₹3 Crore</option>
                    <option value="3cr-plus">₹3 Crore+</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="timeline" className={styles.label}>Timeline</label>
                  <select id="timeline" name="timeline" className={styles.select}>
                    <option value="">Not sure yet</option>
                    <option value="asap">As soon as possible</option>
                    <option value="6-months">Within 6 months</option>
                    <option value="1-year">Within a year</option>
                    <option value="flexible">Flexible / Exploring</option>
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="project" className={styles.label}>Tell us about your project</label>
                <textarea
                  id="project"
                  name="project"
                  className={styles.textarea}
                  rows={5}
                  placeholder="I'm planning a 4,000 sq ft bungalow in Juhu. I have a plot and am looking for an architect to lead the design and manage the build..."
                />
              </div>

              {status === 'error' && (
                <p className={styles.errorMessage}>{errorMsg}</p>
              )}

              <button
                type="submit"
                className={styles.submit}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
