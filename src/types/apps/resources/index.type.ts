import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TResourcesCategoryGetAllParamType = {} & TPaginationCommonType;

export type TResourcesCategoryChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachResourcesCategory = {
  _id: string;
  bannerImage: string;
  thumbnailImage: string;
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
  bannerImageSize?: number;
  thumbnailImageSize?: number;
  bannerImageTag?: string;
  thumbnailImageTag?: string;
};

//  Below Resources -------------------------------->

export type TResourcesGetAllParamType = {
  resourcesCategoryId?: string;
  isFeatured?: boolean;
} & TPaginationCommonType;

export type TResourcesChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachResources = {
  _id: string;
  resourcesCategoryId: string;
  title: string;
  slug: string;
  bannerImage: string;
  thumbnailImage: string;
  isFeatured: boolean;
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
  isShowUpdatedAt?: boolean;
  category: TEachResourcesCategory;
  openGraphImageSize?: number | string;
  bannerImageSize?: number;
  thumbnailImageSize?: number;
  bannerImageTag?: string;
  thumbnailImageTag?: string;
};
