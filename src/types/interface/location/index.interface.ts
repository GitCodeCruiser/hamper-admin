import { BaseApiResponse } from '../common.interface';

import {
  TEachLocationCity,
  TEachLocationCountry,
  TEachLocationState,
} from '@/types/apps/location/index.type';

export interface ILocationCountryResponse extends BaseApiResponse {
  data: TEachLocationCountry[];
}

export interface ILocationStateResponse extends BaseApiResponse {
  data: TEachLocationState[];
}

export interface ILocationCityResponse extends BaseApiResponse {
  data: TEachLocationCity[];
}
