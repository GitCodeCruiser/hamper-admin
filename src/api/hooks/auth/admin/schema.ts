import { TCommonSchema } from '@/types/common/common.schema';

export type TAuthModel = {
  ILoginReq: {
    email: string;
    password: string;
    deviceToken?: string;
    webPush?: PushSubscription;
  };
  ILoginResData: {
    _id: string;
    fullName: string;
    email: string;
    role: TAuthModel['IRole'];
    profileImage: string;
    status: string;
    createdAt: string;
  };
  IData: {
    user: TAuthModel['IUserData'];
    accessToken: string;
    refreshToken: string;
  };
  IForgotPassReq: {
    email: string;
  };
  IResetPassReq: {
    newPassword: string;
    authToken: string;
  };
  IRole: {
    _id: string;
    role: string;
    roleDisplayName: string;
  };
  IUserData: {
    _id: string;
    role: TAuthModel['IRole'];
    userName: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    password: string;
    language: string;
    username: string;
    profileImage: string;
    isOnline: boolean;
    status: string;
    isDeleted: boolean;
    isVerified: boolean;
    phoneNumber: string;
    countryCode: string;
    createdAt: string;
    updatedAt: string;
    resetPasswordToken: string;
  };
  IRefreshTokenPayload: {
    accessToken: string;
    refreshToken: string;
  };
  IRefreshTokenResponse: TCommonSchema['BaseApiResponse'] & {
    data: {
      accessToken: string;
      refreshToken: string;
    };
  };
  IAuthResponseBody: {
    _id: string;
    role: string;
    fullName: string;
    countryCode: string;
    phone: string;
    email: string;
    userName: string;
    password: string;
    profileImage: string;
    emailOtp: string;
    otpExpireTime: string;
    status: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  ILoginResponse: TCommonSchema['BaseApiResponse'] & {
    data: TAuthModel['IData'];
  };
  IForgotPassResponse: TCommonSchema['BaseApiResponse'] & {
    data: TAuthModel['IUserData'];
  };
  IResetPassResponse: TCommonSchema['BaseApiResponse'] & {
    data: TAuthModel['IAuthResponseBody'];
  };
  ILogoutResponse: TCommonSchema['BaseApiResponse'] & {
    data: unknown;
  };
};
