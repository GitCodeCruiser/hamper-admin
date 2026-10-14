import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TWhyHoganiCategoryGetAllParamType = {} & TPaginationCommonType;

export type TWhyHoganiCategoryChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachWhyHoganiCategory = {
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

//  Below Why Hogani -------------------------------->

export type TWhyHoganiGetAllParamType = {
  whyHoganiCategoryId?: string;
  isFeatured?: Boolean;
} & TPaginationCommonType;

export type TWhyHoganiChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachWhyHogani = {
  _id: string;
  whyHoganiCategoryId: string;
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
  category: TEachWhyHoganiCategory;
  openGraphImageSize?: number | string;
  bannerImageSize?: number;
  thumbnailImageSize?: number;
  thumbnailImageTag?: string;
};
