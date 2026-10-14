import {
  TEachLocationCity,
  TEachLocationCountry,
  TEachLocationState,
} from '../location/index.type';

import { TEachAirport } from '@/types/apps/airport/index.type';
import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TRouteGetAllParamType = {
  isFeatured?: boolean;
  isDeleted?: boolean;
} & TPaginationCommonType;

export type TRouteChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachSrcDest = {
  countryId?: string;
  stateId?: string;
  cityId?: string;
  country?: TEachLocationCountry;
  state?: TEachLocationState;
  city?: TEachLocationCity;
};

export type TEachRoute = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  bannerImage: string;
  thumbnailImage: string;
  bannerImageTag: string;
  thumbnailImageTag: string;
  sourceAirportDetails: TEachAirport;
  destinationAirportDetails: TEachAirport;
  sourceAirport: TEachAirport;
  destinationAirport: TEachAirport;
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
  status: TStatusChangeType;
  isFeatured: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  source: TEachSrcDest;
  destination: TEachSrcDest;
  redirectUrl?: string;
  isShowUpdatedAt?: boolean;
  bannerImageSize?: number;
  thumbnailImageSize?: number;
  openGraphImageSize?: number | string;
};
