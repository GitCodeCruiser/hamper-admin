'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';
import { useRouter } from 'next/navigation';

import { AuthAdminEnum } from './key';

import {
  authAdminForgotPasswordFn,
  authAdminLoginFn,
  authAdminLogoutFn,
  authAdminNotificationSettingsUpdateFn,
  authAdminProfileDetailsFn,
  authAdminProfileUpdateFn,
  authAdminResetPasswordFn,
  authAdminSettingsDetailsFn,
  authAdminSettingsUpdateFn,
} from '@/api/functions/auth/admin/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_ROUTE } from '@/routes/index.route';
import { useAppDispatch } from '@/zustand/index.hooks';

const useAuthAdminLogin = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  const router = useRouter();
  const { auth } = useAppDispatch();

  return useMutation({
    mutationKey: [AuthAdminEnum.Login],
    mutationFn: authAdminLoginFn,
    onSuccess: (res) => {
      const { statusCode, data } = res?.data || {};
      const user = data?.user;
      if (!user) {
        errorCallback();

        return;
      }

      auth.setLoginData(user);
      optionalCallback();

      window.location.href = PAGE_ROUTE.dashboard.homepage;
      // router.push(PAGE_ROUTE.dashboard.home);
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAuthAdminLogout = ({ optionalCallback }: { optionalCallback: () => void }) => {
  const { auth } = useAppDispatch();

  return useMutation({
    mutationKey: [AuthAdminEnum.Logout],
    mutationFn: authAdminLogoutFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        await new Promise<void>((resolve) => {
          auth.logout();

          // persistor.purge();
          resolve();
        });

        optionalCallback();
      }
    },
  });
};

const useAuthAdminForgotPassword = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AuthAdminEnum.ForgotPassword],
    mutationFn: authAdminForgotPasswordFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAuthAdminResetPassword = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AuthAdminEnum.ResetPassword],
    mutationFn: authAdminResetPasswordFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAuthAdminProfileUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AuthAdminEnum.ProfileUpdate],
    mutationFn: authAdminProfileUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AuthAdminEnum.ProfileDetails] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAuthAdminProfileDetails = () => {
  return useQuery({
    queryKey: [AuthAdminEnum.ProfileDetails],
    queryFn: authAdminProfileDetailsFn,
    select(data) {
      return data?.data?.data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });
};

const useAuthAdminSettingsDetails = () => {
  return useQuery({
    queryKey: [AuthAdminEnum.SettingsDetails],
    queryFn: authAdminSettingsDetailsFn,
    select(data) {
      return data?.data?.data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });
};

const useAuthAdminSettingsUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AuthAdminEnum.SettingsUpdate],
    mutationFn: authAdminSettingsUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AuthAdminEnum.SettingsDetails] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAuthAdminNotificationSettingsUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AuthAdminEnum.NotificationSettingsUpdate],
    mutationFn: authAdminNotificationSettingsUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AuthAdminEnum.SettingsDetails] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export {
  useAuthAdminForgotPassword,
  useAuthAdminLogin,
  useAuthAdminLogout,
  useAuthAdminNotificationSettingsUpdate,
  useAuthAdminProfileDetails,
  useAuthAdminProfileUpdate,
  useAuthAdminResetPassword,
  useAuthAdminSettingsDetails,
  useAuthAdminSettingsUpdate,
};
