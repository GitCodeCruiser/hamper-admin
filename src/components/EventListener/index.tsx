'use client';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

import { endpoints } from '@/api/endpoints';
import { authAdminLogoutFn } from '@/api/functions/auth/admin/index.api';
import { WEB_APP_ROLE, WEB_APP_TOKEN } from '@/constant';
import useEventEmitter from '@/hooks/utils/useEventEmitter';
import { clearSessionAndCookies } from '@/lib/actions/app';
import events from '@/lib/event';
import { PAGE_ROUTE } from '@/routes/index.route';
import { authZustand } from '@/zustand/auth.zustand';

export default function EventListeners() {
  const showNotifications = useCallback((data: { message: string; variant: string }) => {
    if (data.variant === 'error') {
      toast.error(data.message);
    }

    if (data.variant === 'success') {
      toast.success(data.message);
    }

    if (data.variant === 'warning') {
      toast.error(data.message);
    }
  }, []);

  const router = useRouter();
  const handleRoutes = useCallback(
    (pathName: string) => {
      router.push(pathName);
    },
    [router],
  );

  const handleForceLogout = useCallback(
    async (shouldHitApi: boolean = true, errorType?: string) => {
      try {
        if (shouldHitApi) {
          await authAdminLogoutFn();
        } else {
          // Use raw fetch to bypass axios interceptors (and prevent loops) while still allowing the backend to clear HttpOnly cookies via Set-Cookie headers
          await fetch(process.env.NEXT_APP_BASE_URL + endpoints.auth.admin.logout, {
            method: 'GET',
            credentials: 'include',
          });
        }
      } catch {
        // ignore —
      } finally {
        await clearSessionAndCookies();

        if (errorType === 'server_error') {
          if (!window.location.pathname.includes('/server-unreachable')) {
            window.location.href = '/server-unreachable';
          }
          return;
        }
        destroyCookie(null, WEB_APP_TOKEN, { path: '/' });
        destroyCookie(null, WEB_APP_ROLE, { path: '/' });

        // Force clear all accessible cookies
        if (typeof document !== 'undefined') {
          document.cookie = 'forceLogout=true; path=/; max-age=60';
          document.cookie.split(';').forEach((c) => {
            document.cookie = c
              .replace(/^ +/, '')
              .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
          });
        }

        authZustand.set('isLoggedIn', false);
        authZustand.set('userData', null);
        if (!window.location.pathname.includes(PAGE_ROUTE.auth.login)) {
          window.location.href = PAGE_ROUTE.auth.login;
        }
      }
    },
    [],
  );

  useEventEmitter(events.showNotification, showNotifications);
  useEventEmitter(events.routerPush, handleRoutes);
  useEventEmitter(events.logoutCurrentUser, handleForceLogout);

  return null;
}
