import path from 'path';

import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
    NEXT_PUBLIC_JWT_EXPIRATION: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
    NEXT_PUBLIC_JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET,
    NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET: process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_ADMIN_BASE_URL: process.env.NEXT_PUBLIC_ADMIN_BASE_URL,
    NEXT_PUBLIC_PROJECT_NAME: process.env.NEXT_PUBLIC_PROJECT_NAME,
    NEXT_PUBLIC_TOKEN_NAME: process.env.NEXT_PUBLIC_TOKEN_NAME,
    NEXT_PUBLIC_REFRESH_TOKEN_NAME: process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME,
    WEB_PUSH_KEY_PUBLIC: process.env.WEB_PUSH_KEY_PUBLIC,
    WEB_PUSH_KEY_PRIVATE: process.env.WEB_PUSH_KEY_PRIVATE,

    //
    NEXT_APP_TOKEN_NAME: process.env.NEXT_APP_TOKEN_NAME,
    NEXT_APP_PROJECT_NAME: process.env.NEXT_APP_PROJECT_NAME,
    NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
    NEXT_APP_MEDIA_BASE_URL: process.env.NEXT_APP_MEDIA_BASE_URL,
    NEXT_APP_FRONTEND_BASE_URL: process.env.NEXT_APP_FRONTEND_BASE_URL,
    NEXT_APP_MAIN_WEBSITE_URL: process.env.NEXT_APP_MAIN_WEBSITE_URL,

    NEXT_APP_ACCESS_KEY: process.env.NEXT_APP_ACCESS_KEY,
    NEXT_APP_COOKIE_SECRET_KEY: process.env.NEXT_APP_COOKIE_SECRET_KEY,
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
