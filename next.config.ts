import type { NextConfig } from "next";

// What the site is allowed to load. Sent as "Report-Only" for now: the
// browser logs anything outside this list in its console but blocks nothing.
// Once a full click-through of the site logs no reports, rename the header to
// "Content-Security-Policy" to enforce it. See docs/environment.md.
const contentPolicy = [
  "default-src 'self'",
  // Next.js needs inline scripts; development also needs eval for reloads.
  `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com${
    process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""
  }`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  // Office maps on Contact. Add the video host here when a film is embedded.
  "frame-src https://www.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  // Browsers that have visited once only ever use HTTPS afterwards.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  // Files are treated as the type the server says, never guessed.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Other sites cannot show this site inside a frame.
  { key: "X-Frame-Options", value: "DENY" },
  // Other sites learn the domain a visitor came from, not the page.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The site uses none of these device features.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "Content-Security-Policy-Report-Only", value: contentPolicy },
];

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
