import { TStatusChangeType } from '@/types/common/common.type';

export type TEachPartnership = {
  _id: string;
  title: string;
  description?: string;
  url?: string;
  backgroundImage?: string;
  companyLogo?: string;
  postedDate?: string;
  status: TStatusChangeType;
  isFeatured: boolean;
  metaTitle: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalTag?: string;
  structuredData?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: string;
  metaRobotsIndex?: string;
  metaRobotsFollow?: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  isDeleted: boolean;
  backgroundImageSize: number;
  companyLogoSize: number;
  openGraphImageSize?: number | string;
};

export type TPartnershipGetAllParamType = {
  page: number;
  limit: number;
  search: string;
  status: TStatusChangeType | '';
};

export type TPartnershipChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};
