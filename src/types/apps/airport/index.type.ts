import { TEachAirportType } from '../airport-type/index.type';

import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TAirportGetAllParamType = {
  isFeatured?: boolean;
  isDeleted?: boolean;
} & TPaginationCommonType;

export type TAirportChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachAirport = {
  _id: string;
  title: string;
  slug: string;
  country: string | any;
  countryId?: string;
  countrySlug?: string;
  state: string | any;
  stateId?: string;
  stateSlug?: string;
  city: string | any;
  cityId?: string;
  citySlug?: string;
  ratio: string;
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
  airportTypeId: string;
  elevation: number;
  iata: string;
  icao: string;
  airportType: TEachAirportType;
  latitude?: string;
  longitude?: string;
  redirectUrl?: string;
  isShowUpdatedAt?: boolean;
  bannerImageSize?: number;
  thumbnailImageSize?: number;
  openGraphImageSize?: number | string;
};
