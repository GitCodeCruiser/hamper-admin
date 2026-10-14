import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachAirportData, TEachAirportDataListing } from '@/types/apps/airport-data/index.type';

export interface IAirportDataGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachAirportData[];
  };
}

export interface IAirportDataGetResponse extends BaseApiResponse {
  data: TEachAirportData;
}

export interface IAirportDataCreateResponse extends BaseApiResponse {
  data: TEachAirportData;
}

export interface IAirportDataUpdateResponse extends BaseApiResponse {
  data: TEachAirportData;
}

export interface IAirportDataDeleteResponse extends BaseApiResponse {
  data: TEachAirportData;
}

export interface IAirportDataStatusChangeResponse extends BaseApiResponse {
  data: TEachAirportData;
}

export interface IAirportDataListingResponse extends BaseApiResponse {
  data: TEachAirportDataListing[];
}
