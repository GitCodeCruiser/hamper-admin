import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TAuthAdminForgotPasswordParamType,
  TAuthAdminLoginParamType,
  TAuthAdminNotificationSettingsUpdateParamType,
  TAuthAdminResetPasswordParamType,
  TAuthAdminSettingsUpdateParamType,
} from '@/types/apps/auth/admin/index.type';
import {
  IAuthAdminForgotPasswordResponse,
  IAuthAdminLoginResponse,
  IAuthAdminLogoutResponse,
  IAuthAdminProfileDetailsResponse,
  IAuthAdminProfileUpdateResponse,
  IAuthAdminResetPasswordResponse,
  IAuthAdminSettingsDetailsResponse,
  IAuthAdminSettingsUpdateResponse,
} from '@/types/interface/auth/admin/index.interface';

export const authAdminLoginFn = async (body: TAuthAdminLoginParamType) => {
  const res = await axiosInstance.post<IAuthAdminLoginResponse>(endpoints.auth.admin.login, body);

  return res;
};

export const authAdminLogoutFn = async () => {
  const res = await axiosInstance.get<IAuthAdminLogoutResponse>(endpoints.auth.admin.logout);

  return res;
};

export const authAdminForgotPasswordFn = async (body: TAuthAdminForgotPasswordParamType) => {
  const res = await axiosInstance.post<IAuthAdminForgotPasswordResponse>(
    endpoints.auth.admin.forgotPassword,
    body,
  );

  return res;
};

export const authAdminResetPasswordFn = async (body: TAuthAdminResetPasswordParamType) => {
  const res = await axiosInstance.post<IAuthAdminResetPasswordResponse>(
    endpoints.auth.admin.resetPassword,
    body,
  );

  return res;
};

export const authAdminProfileUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IAuthAdminProfileUpdateResponse>(
    endpoints.auth.admin.profileUpdate('v1'),
    body,
  );

  return res;
};

export const authAdminProfileDetailsFn = async () => {
  const res = await axiosInstance.get<IAuthAdminProfileDetailsResponse>(
    endpoints.auth.admin.profileDetails('v1'),
  );

  return res;
};

export const authAdminSettingsDetailsFn = async () => {
  const res = await axiosInstance.get<IAuthAdminSettingsDetailsResponse>(
    endpoints.auth.admin.settingsDetails('v1'),
  );

  return res;
};

export const authAdminSettingsUpdateFn = async (body: TAuthAdminSettingsUpdateParamType) => {
  const res = await axiosInstance.post<IAuthAdminSettingsUpdateResponse>(
    endpoints.auth.admin.settingsUpdate('v1'),
    body,
  );

  return res;
};

export const authAdminNotificationSettingsUpdateFn = async (
  body: TAuthAdminNotificationSettingsUpdateParamType,
) => {
  const res = await axiosInstance.post<IAuthAdminSettingsUpdateResponse>(
    endpoints.auth.admin.notificationSettingsUpdate('v1'),
    body,
  );

  return res;
};
