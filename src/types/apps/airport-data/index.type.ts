import {
  TEachLocationCity,
  TEachLocationCountry,
  TEachLocationState,
} from '../location/index.type';

import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TAirportDataGetAllParamType = {
  isFeatured?: boolean;
  isDeleted?: boolean;
} & TPaginationCommonType;

export type TAirportDataChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachAirportData = {
  _id: string;
  icao: string;
  iata: string;
  title: string;
  countryId: string | any;
  stateId?: string | any;
  cityId?: string | any;
  country?: string | any;
  state?: string | any;
  city?: string | any;
  countrySlug?: string;
  stateSlug?: string;
  citySlug?: string;
  latitude: string;
  longitude: string;
  elevation: number;
  timezone: string;
  status: TStatusChangeType;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TEachAirportDataListing = {
  _id: string;
  icao: string;
  iata: string;
  title: string;
  slug: string;
  countryId: string;
  stateId: any;
  cityId: string;
  latitude: string;
  longitude: string;
  elevation: number;
  timezone: string;
  createdAt: string;
  country: TEachLocationCountry;
  city: TEachLocationCity;
  state: TEachLocationState;
};
