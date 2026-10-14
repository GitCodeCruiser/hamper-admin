import { TPaginationCommonType } from '@/types/common/common.type';

export type TGuideDownloadsGetAllParamType = {} & TPaginationCommonType;

export type TEachGuideDownloads = {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  createdAt: string;
};

export type TGuideDownloadSetting = {
  _id: string;
  heroImage: string;
  bannerImage: string;
  downloadFile: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  bannerImageSize?: number;
  heroImageSize?: number;
  downloadButtonText?: string;
  title?: string;
  description?: string;
};
