/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Image Optimization ─────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // ─── Security Headers ───────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
  {
    key: "Permissions-Policy",
    value: "camera=(self), microphone=(), geolocation=()",
  },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/(.*)\\.(jpg|jpeg|png|gif|ico|svg|webp|avif|woff2?|ttf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache API auth routes less aggressively
        source: "/api/auth/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
        ],
      },
    ];
  },

  // ─── Redirects ──────────────────────────────────────
  async redirects() {
    return [
      // Redirect old Clerk auth paths if any
      {
        source: "/sign-in",
        destination: "/",
        permanent: true,
      },
      {
        source: "/sign-up",
        destination: "/",
        permanent: true,
      },
      // Legacy /component/* routes (renamed routes first, catchall last)
      {
        source: "/component/face-analyzer-front",
        destination: "/face-analyzer",
        permanent: true,
      },
      {
        source: "/component/makeup-recommendations",
        destination: "/makeup-guide",
        permanent: true,
      },
      {
        source: "/component/outfit-analyzer",
        destination: "/outfit-checker",
        permanent: true,
      },
      {
        source: "/component/usage-dashboard",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/component/terms-and-conditions",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/component/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
