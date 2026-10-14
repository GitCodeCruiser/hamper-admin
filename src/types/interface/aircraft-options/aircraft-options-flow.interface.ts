import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import {
  TEachAircraftOptions,
  TEachAircraftOptionsCategory,
} from '@/types/apps/aircraft-options/index.type';

export interface IAircraftOptionsCategoryGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachAircraftOptionsCategory[];
  };
}

export interface IAircraftOptionsCategoryGetResponse extends BaseApiResponse {
  data: TEachAircraftOptionsCategory;
}

export interface IAircraftOptionsCategoryCreateResponse extends BaseApiResponse {
  data: TEachAircraftOptionsCategory;
}

export interface IAircraftOptionsCategoryUpdateResponse extends BaseApiResponse {
  data: TEachAircraftOptionsCategory;
}

export interface IAircraftOptionsCategoryDeleteResponse extends BaseApiResponse {
  data: TEachAircraftOptionsCategory;
}

export interface IAircraftOptionsCategoryStatusChangeResponse extends BaseApiResponse {
  data: TEachAircraftOptionsCategory;
}

export interface IAircraftOptionsCategoryListingResponse extends BaseApiResponse {
  data: TEachAircraftOptionsCategory[];
}

export interface IAircraftOptionsListingResponse extends BaseApiResponse {
  data: TEachAircraftOptions[];
}

//  Below Aircraft Options ------------------------------------->

export interface IAircraftOptionsGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachAircraftOptions[];
  };
}

export interface IAircraftOptionsGetResponse extends BaseApiResponse {
  data: TEachAircraftOptions;
}

export interface IAircraftOptionsCreateResponse extends BaseApiResponse {
  data: TEachAircraftOptions;
}

export interface IAircraftOptionsUpdateResponse extends BaseApiResponse {
  data: TEachAircraftOptions;
}

export interface IAircraftOptionsStatusChangeResponse extends BaseApiResponse {
  data: TEachAircraftOptions;
}

export interface IAircraftOptionsFeaturedResponse extends BaseApiResponse {
  data: TEachAircraftOptions;
}

export interface IAircraftOptionsDeleteResponse extends BaseApiResponse {
  data: TEachAircraftOptions;
}
