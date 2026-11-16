import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TRegionListGetAllParamType = {} & TPaginationCommonType;

export type TRegionListChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TRegionListCountryOption = {
  _id: string;
  name: string;
  slug: string;
};

export type TEachRegionList = {
  _id: string;
  name: string;
  slug: string;
  pageHeading?: string;
  description?: string;
  bannerImage?: string;
  bannerImageSize?: number;
  bannerImageTag?: string;
  image?: string;
  imageSize?: number;
  imageTag?: string;
  /** Listing returns only the count, the detail API returns the ordered country objects. */
  countriesCount?: number;
  countries?: TRegionListCountryOption[];
  sortOrder?: number;
  /** Position among countries on the public listing. null = alphabetical after numbered ones. */
  priority?: number | null;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  isShowUpdatedAt?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalTag?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  structuredData?: string;
  metaRobotsIndex?: string;
  metaRobotsFollow?: string;
};
