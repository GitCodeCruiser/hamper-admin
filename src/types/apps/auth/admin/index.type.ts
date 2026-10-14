export type TAuthAdminLoginParamType = {
  email: string;
  password: string;
  deviceToken?: string;
  rememberMe?: boolean;
};

export type TAuthAdminForgotPasswordParamType = {
  email: string;
  baseUrl: string;
};

export type TAuthAdminResetPasswordParamType = {
  newPassword: string;
  authToken: string;
};

export type TAuthAdminSettingSocialLinksType = {
  youtube: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  tiktok: string;
  airCharterAssociation?: string;
  betterBusinessBureau?: string;
  nbaa?: string;
  argus?: string;
  wyvern?: string;
};

export type TAuthAdminSettingsUpdateParamType = {
  email: string;
  phone: string;
  countryCode: string;
  brokerDisclaimer: string;
  socialLinks: TAuthAdminSettingSocialLinksType;
  address: string;
  contactUs: {
    email: string;
    phone: string;
    countryCode: string;
  };
  aboutUs?: {
    title: string;
    description: string;
    url: string;
  };
  compareAircraft?: {
    title: string;
    description: string;
    url: string;
  };
};

export type TAuthAdminNotificationSettingsUpdateParamType = {
  isEmailNotification: boolean;
  // isPushNotification: boolean;
};

export type TAuthAdminSetting = {
  _id: string;
  address: string;
  brokerDisclaimer: string;
  createdAt: string;
  email: string;
  isDeleted: boolean;
  logoMediaId: string;
  logoUrl: string;
  phone: string;
  countryCode: string;
  socialLinks: TAuthAdminSettingSocialLinksType;
  status: string;
  updatedAt: string;
  contactUs: {
    email: string;
    phone: string;
    countryCode: string;
  };
  aboutUs?: {
    title: string;
    description: string;
    url: string;
  };
  compareAircraft?: {
    title: string;
    description: string;
    url: string;
  };
};
