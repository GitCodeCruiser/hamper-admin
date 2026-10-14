import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TBlogGetAllParamType = {
  isFeatured?: boolean;
} & TPaginationCommonType;

export type TBlogChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachBlog = {
  _id: string;
  title: string;
  slug: string;
  bannerImage: string;
  bannerImageTag?: string;
  thumbnailImage: string;
  thumbnailImageTag?: string;
  status: TStatusChangeType;
  createdAt: string;
  description: string;
  smallDescription: string;
  postedDate: string;
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
  isFeatured: boolean;
  isDeleted: boolean;
  updatedAt: string;
  isShowUpdatedAt?: boolean;
  bannerImageSize: number;
  thumbnailImageSize: number;
  openGraphImageSize?: number | string;
};
