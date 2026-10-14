import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TCountryListGetAllParamType = {} & TPaginationCommonType;

export type TCountryListChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TCountryListShowInCMSParamType = {
  id: string;
  showInCMS: boolean;
};

export type TEachCountryList = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  imageSize: number;
  imageTag?: string;
  isCaribbean: boolean;
  status: string;
  showInCMS?: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  isShowUpdatedAt?: boolean;
  bannerImage?: string;
  bannerImageSize?: number;
  bannerImageTag?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalTag?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: string;
  openGraphImageSize?: number | string;
  structuredData?: string;
  metaRobotsIndex?: string;
  metaRobotsFollow?: string;
};
