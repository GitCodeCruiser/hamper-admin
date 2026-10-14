import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachAirport } from '@/types/apps/airport/index.type';

export interface IAirportGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachAirport[];
  };
}

export interface IAirportGetResponse extends BaseApiResponse {
  data: TEachAirport;
}

export interface IAirportCreateResponse extends BaseApiResponse {
  data: TEachAirport;
}

export interface IAirportUpdateResponse extends BaseApiResponse {
  data: TEachAirport;
}

export interface IAirportDeleteResponse extends BaseApiResponse {
  data: TEachAirport;
}

export interface IAirportStatusChangeResponse extends BaseApiResponse {
  data: TEachAirport;
}

export interface IAirportFeaturedResponse extends BaseApiResponse {
  data: TEachAirport;
}
