import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'teamdesign.in',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // ─── Security headers (mirrors vercel.json — applies in all environments) ─
  async headers() {
    // ── Content Security Policy ───────────────────────────────────────────
    // 'unsafe-inline' on script-src is required for Next.js JSON-LD <script>
    // tags and React hydration. 'unsafe-eval' is intentionally excluded.
    // Google Maps embeds are iframed from google.com — whitelisted in frame-src.
    // Maps also loads tile images from gstatic.com and googleapis.com.
    // Next.js Image Optimization proxies external images through /_next/image
    // (same origin), so most external image domains are not needed in img-src.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://cdn.sanity.io https://maps.gstatic.com https://maps.googleapis.com",
      "font-src 'self' data:",
      "connect-src 'self'",
      // Google Maps embeds are served from google.com
      "frame-src https://www.google.com",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join('; ');

    const securityHeaders = [
      { key: 'Content-Security-Policy',    value: csp },
      { key: 'X-Content-Type-Options',     value: 'nosniff' },
      { key: 'X-Frame-Options',            value: 'DENY' },
      { key: 'X-XSS-Protection',           value: '1; mode=block' },
      { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
      { key: 'Strict-Transport-Security',  value: 'max-age=31536000; includeSubDomains' },
      { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=(), payment=()' },
    ];

    // The Sanity Studio is a complex embedded app with its own scripts, styles,
    // and WebSocket connections. Apply a broad CSP there so nothing breaks.
    const studioCsp = "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;";

    return [
      // Apply strict headers to every route
      { source: '/(.*)', headers: securityHeaders },
      // Studio overrides: allow iframing itself + broad CSP
      {
        source: '/studio-cms/:path*',
        headers: [
          { key: 'X-Frame-Options',         value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: studioCsp },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
