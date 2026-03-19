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
        hostname: 'images.unsplash.com',
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
    const securityHeaders = [
      { key: 'X-Content-Type-Options',    value: 'nosniff' },
      { key: 'X-Frame-Options',           value: 'DENY' },
      { key: 'X-XSS-Protection',          value: '1; mode=block' },
      { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
      { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
      { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=(), payment=()' },
    ];

    return [
      // Apply to all routes
      { source: '/(.*)', headers: securityHeaders },
      // Sanity Studio needs to iframe itself — override X-Frame-Options only
      { source: '/studio-cms/:path*', headers: [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }] },
    ];
  },
};

export default nextConfig;
