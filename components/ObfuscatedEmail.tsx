'use client';

/**
 * Renders a mailto link whose address is assembled client-side so static
 * HTML scrapers cannot harvest it. Passes all standard anchor props through.
 */
export default function ObfuscatedEmail({
  user,
  domain,
  label,
  className,
}: {
  user: string;
  domain: string;
  label?: string;
  className?: string;
}) {
  const address = `${user}@${domain}`;
  return (
    <a href={`mailto:${address}`} className={className}>
      {label ?? address}
    </a>
  );
}
