import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TTravelResourcesCategoryGetAllParamType = {} & TPaginationCommonType;

export type TTravelResourcesCategoryChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachTravelResourcesCategory = {
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

//  Below Travel Resources -------------------------------->

export type TTravelResourcesGetAllParamType = {
  travelResourcesCategoryId?: string;
  isFeatured?: Boolean;
} & TPaginationCommonType;

export type TTravelResourcesChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachTravelResources = {
  _id: string;
  travelResourcesCategoryId: string;
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
  category: TEachTravelResourcesCategory;
  openGraphImageSize?: number | string;
  bannerImageSize?: number;
  thumbnailImageSize?: number;
};
