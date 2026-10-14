import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachCity } from '@/types/apps/city/index.type';

export interface ICityGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachCity[];
  };
}

export interface ICityGetResponse extends BaseApiResponse {
  data: TEachCity;
}

export interface ICityCreateResponse extends BaseApiResponse {
  data: TEachCity;
}

export interface ICityUpdateResponse extends BaseApiResponse {
  data: TEachCity;
}

export interface ICityDeleteResponse extends BaseApiResponse {
  data: TEachCity;
}

export interface ICityStatusChangeResponse extends BaseApiResponse {
  data: TEachCity;
}

export interface ICityFeaturedResponse extends BaseApiResponse {
  data: TEachCity;
}
