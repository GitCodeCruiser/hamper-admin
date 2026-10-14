import { NextRequest, NextResponse } from 'next/server';

import { WEB_APP_ROLE, WEB_APP_TOKEN } from './constant';
import { PAGE_ROUTE } from './routes/index.route';

export function proxy(request: NextRequest) {
  const forceLogout = request.cookies.get('forceLogout');

  if (forceLogout) {
    const isAlreadyOnLogin = request.nextUrl.pathname === PAGE_ROUTE.auth.login;
    const response = isAlreadyOnLogin
      ? NextResponse.next()
      : NextResponse.redirect(new URL(PAGE_ROUTE.auth.login, request.url));

    response.cookies.set(WEB_APP_TOKEN, '', { maxAge: 0, path: '/' });
    response.cookies.set(WEB_APP_ROLE, '', { maxAge: 0, path: '/' });
    response.cookies.set('forceLogout', '', { maxAge: 0, path: '/' });

    return response;
  }

  const hasToken = request.cookies.get(WEB_APP_TOKEN);

  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith('/login') ||
    pathname.startsWith('/auth/login') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/auth/forgot-password') ||
    pathname.startsWith('/reset-password') ||
    pathname.startsWith('/auth/reset-password');

  const isDashboardPage = pathname.startsWith('/dashboard') || pathname === '/';

  if (!hasToken && isAuthPage) {
    return NextResponse.next();
  }

  if (hasToken && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = PAGE_ROUTE.dashboard.homepage;
    return NextResponse.redirect(url);
  }

  if (!hasToken && isDashboardPage) {
    const url = request.nextUrl.clone();
    url.pathname = PAGE_ROUTE.auth.login;

    url.searchParams.set('callback', pathname + request.nextUrl.search);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/auth/login',
    '/forgot-password',
    '/auth/forgot-password',
    '/reset-password',
    '/auth/reset-password',
    '/auth/reset-password/:path*',
    '/dashboard/:path*',
  ],
};
