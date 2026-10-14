import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TAircraftOptionsCategoryGetAllParamType = {} & TPaginationCommonType;

export type TAircraftOptionsCategoryChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachAircraftOptionsCategory = {
  _id: string;
  image: string;
  title: string;
  description: string;
  url: string;
  status: string;
  createdAt: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalTag: string;
  structuredData: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImage: string;
  metaRobotsIndex?: string;
  metaRobotsFollow?: string;
  isDeleted: boolean;
  updatedAt: string;
  openGraphImageSize?: number | string;
  imageSize?: number;
};

//  Below Aircraft Options -------------------------------->

export type TAircraftOptionsGetAllParamType = {
  aircraftOptionsCategoryId?: string;
  isFeatured?: Boolean;
} & TPaginationCommonType;

export type TAircraftOptionsChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachAircraftOptions = {
  _id: string;
  aircraftOptionsCategoryId: string;
  title: string;
  slug: string;
  bannerImage: string;
  thumbnailImage: string;
  isFeatured: boolean;
  redirectUrl?: string;
  status: string;
  createdAt: string;
  description: string;
  smallDescription: string;
  postedDate: any;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalTag: string;
  structuredData: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImage: string;
  metaRobotsIndex?: string;
  metaRobotsFollow?: string;
  isDeleted: boolean;
  updatedAt: string;
  category: TEachAircraftOptionsCategory;
  openGraphImageSize?: number | string;
  bannerImageSize?: number;
  thumbnailImageSize?: number;
  thumbnailImageTag?: string;
};
