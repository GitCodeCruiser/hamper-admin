import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TMembershipCategoryGetAllParamType = {} & TPaginationCommonType;

export type TMembershipCategoryChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachMembershipCategory = {
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

//  Below Membership -------------------------------->

export type TMembershipGetAllParamType = {
  membershipCategoryId?: string;
  isFeatured?: Boolean;
} & TPaginationCommonType;

export type TMembershipChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachMembership = {
  _id: string;
  membershipCategoryId: string;
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
  category: TEachMembershipCategory;
  openGraphImageSize?: number | string;
  bannerImageSize?: number;
  thumbnailImageSize?: number;
  bannerImageTag?: string;
  thumbnailImageTag?: string;
};
