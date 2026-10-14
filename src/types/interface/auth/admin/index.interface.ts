import { BaseApiResponse } from '../../common.interface';

import { TAuthAdminSetting } from '@/types/apps/auth/admin/index.type';
import { TUsersData } from '@/types/common/common.type';

export interface IAuthAdminLoginResponse extends BaseApiResponse {
  data: {
    user: TUsersData;
    accessToken: string;
    refreshToken: string;
  };
}

export interface IAuthAdminLogoutResponse extends BaseApiResponse {
  data: TUsersData;
}

export interface IAuthAdminForgotPasswordResponse extends BaseApiResponse {
  data: TUsersData;
}

export interface IAuthAdminResetPasswordResponse extends BaseApiResponse {
  data: TUsersData;
}

export interface IAuthAdminProfileUpdateResponse extends BaseApiResponse {
  data: TUsersData;
}

export interface IAuthAdminProfileDetailsResponse extends BaseApiResponse {
  data: TUsersData;
}

export interface IAuthAdminSettingsDetailsResponse extends BaseApiResponse {
  data: TAuthAdminSetting;
}
export interface IAuthAdminSettingsUpdateResponse extends BaseApiResponse {
  data: TAuthAdminSetting;
}
