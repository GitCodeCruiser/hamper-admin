import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TInsiderGuideGetAllParamType = {
  isFeatured?: boolean;
} & TPaginationCommonType;

export type TInsiderGuideChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachInsiderGuide = {
  _id: string;
  title: string;
  slug: string;
  bannerImage: string;
  thumbnailImage: string;
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
  openGraphImageSize?: number | string;
  bannerImageSize?: number;
  thumbnailImageSize?: number;
};
