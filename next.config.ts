import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  // Allow images from self and configured remotes
  "img-src 'self' data: https:",
  // Scripts: self, Stripe, unsafe-inline for Next.js hydration inline; consider hashing later
  "script-src 'self' 'unsafe-inline' https://js.stripe.com",
  // Styles: allow inline for Tailwind and Next styles
  "style-src 'self' 'unsafe-inline'",
  // Frames: Stripe Elements + Google Maps embeds
  "frame-src https://js.stripe.com https://hooks.stripe.com https://www.google.com https://maps.google.com",
  // Connections (APIs) including Stripe
  "connect-src 'self' https://api.stripe.com",
  // Fonts
  "font-src 'self' data:",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
