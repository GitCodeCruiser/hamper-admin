import { TEachCityList } from '../master/city-list/index.type';
import { TEachCountryList } from '../master/country-list/index.type';

import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TCityGetAllParamType = {
  isFeatured?: boolean;
  isDeleted?: boolean;
} & TPaginationCommonType;

export type TCityChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachCity = {
  _id: string;
  title: string;
  slug: string;
  countrySlug: string;
  stateSlug: string;
  citySlug: string;
  bannerImage: string;
  thumbnailImage: string;
  bannerImageTag: string;
  thumbnailImageTag: string;
  status: TStatusChangeType;
  createdAt: string;
  description: string;
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
  countryId: string;
  stateId: string;
  cityId: string;
  country: TEachCountryList;
  state: TEachCountryList;
  city: TEachCityList;
  redirectUrl?: string;
  isShowUpdatedAt?: boolean;
  bannerImageSize?: number;
  thumbnailImageSize?: number;
  openGraphImageSize?: number | string;
};
