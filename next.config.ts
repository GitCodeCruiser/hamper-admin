import path from 'path';

import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

// Content-Security-Policy, REPORT-ONLY for now: the browser logs violations in the console but blocks
// nothing. Once the console is clean on production, rename the header below to
// 'Content-Security-Policy'. frame-ancestors 'none' = the admin can never be embedded in any frame.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  "media-src 'self' blob: https:",
  "connect-src 'self' https: wss:",
  "worker-src 'self' blob:",
  'frame-src https:',
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Keeps every admin page (login included) out of Google, even if a link to it exists elsewhere
  { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
  { key: 'Content-Security-Policy-Report-Only', value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // stop announcing "X-Powered-By: Next.js"
  trailingSlash: false,
  compress: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  devIndicators: {
    position: 'bottom-right',
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  productionBrowserSourceMaps: false,
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1988',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '14596',
      },
      {
        protocol: 'https',
        hostname: 'd2l43jltela1or.cloudfront.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd2fh6kg71io623.cloudfront.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    // Everything in this block is inlined into the browser bundle: never list secrets here.
    NEXT_PUBLIC_JWT_EXPIRATION: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_ADMIN_BASE_URL: process.env.NEXT_PUBLIC_ADMIN_BASE_URL,
    NEXT_PUBLIC_PROJECT_NAME: process.env.NEXT_PUBLIC_PROJECT_NAME,
    NEXT_PUBLIC_TOKEN_NAME: process.env.NEXT_PUBLIC_TOKEN_NAME,
    NEXT_PUBLIC_REFRESH_TOKEN_NAME: process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME,
    WEB_PUSH_KEY_PUBLIC: process.env.WEB_PUSH_KEY_PUBLIC,

    //
    NEXT_APP_TOKEN_NAME: process.env.NEXT_APP_TOKEN_NAME,
    NEXT_APP_PROJECT_NAME: process.env.NEXT_APP_PROJECT_NAME,
    NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
    NEXT_APP_MEDIA_BASE_URL: process.env.NEXT_APP_MEDIA_BASE_URL,
    NEXT_APP_FRONTEND_BASE_URL: process.env.NEXT_APP_FRONTEND_BASE_URL,
    NEXT_APP_MAIN_WEBSITE_URL: process.env.NEXT_APP_MAIN_WEBSITE_URL,
  },

  // async redirects() {
  //   return [
  //     {
  //       source: '/dashboard',
  //       destination: '/dashboard/analytics',
  //       permanent: false,
  //     },
  //   ];
  // },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },

  async rewrites() {
    return [
      {
        source: '/health',
        destination: '/api/health',
      },
      {
        source: '/login',
        destination: '/auth/login',
      },
      {
        source: '/forgot-password',
        destination: '/auth/forgot-password',
      },
      {
        source: '/reset-password',
        destination: '/auth/reset-password',
      },
      {
        source: '/robots.txt',
        destination: isProd ? '/robots.prod.txt' : '/robots.disallow.txt',
      },
    ];
  },
};

export default nextConfig;
