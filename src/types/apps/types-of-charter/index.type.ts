import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TTypesOfCharterCategoryGetAllParamType = {} & TPaginationCommonType;

export type TTypesOfCharterCategoryChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachTypesOfCharterCategory = {
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

//  Below Types Of Charter -------------------------------->

export type TTypesOfCharterGetAllParamType = {
  typesOfCharterCategoryId?: string;
  isFeatured?: Boolean;
} & TPaginationCommonType;

export type TTypesOfCharterChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachTypesOfCharter = {
  _id: string;
  typesOfCharterCategoryId: string;
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
  category: TEachTypesOfCharterCategory;
  openGraphImageSize?: number | string;
  bannerImageSize?: number;
  thumbnailImageSize?: number;
  bannerImageTag?: string;
  thumbnailImageTag?: string;
};
