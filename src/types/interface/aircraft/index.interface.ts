import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachAircraft, TEachAircraftCategory } from '@/types/apps/aircraft/index.type';

export interface IAircraftCategoryGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachAircraftCategory[];
  };
}

export interface IAircraftCategoryGetResponse extends BaseApiResponse {
  data: TEachAircraftCategory;
}

export interface IAircraftCategoryCreateResponse extends BaseApiResponse {
  data: TEachAircraftCategory;
}

export interface IAircraftCategoryUpdateResponse extends BaseApiResponse {
  data: TEachAircraftCategory;
}

export interface IAircraftCategoryDeleteResponse extends BaseApiResponse {
  data: TEachAircraftCategory;
}

export interface IAircraftCategoryStatusChangeResponse extends BaseApiResponse {
  data: TEachAircraftCategory;
}

export interface IAircraftCategoryListingResponse extends BaseApiResponse {
  data: TEachAircraftCategory[];
}

export interface ITypicalAircraftListingResponse extends BaseApiResponse {
  data: TEachAircraft[];
}

export interface IAircraftListingResponse extends BaseApiResponse {
  data: TEachAircraft[];
}

//  Below Aircraft

export interface IAircraftGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachAircraft[];
  };
}

export interface IAircraftGetResponse extends BaseApiResponse {
  data: TEachAircraft;
}

export interface IAircraftCreateResponse extends BaseApiResponse {
  data: TEachAircraft;
}

export interface IAircraftUpdateResponse extends BaseApiResponse {
  data: TEachAircraft;
}

export interface IAircraftStatusChangeResponse extends BaseApiResponse {
  data: TEachAircraft;
}

export interface IAircraftFeaturedResponse extends BaseApiResponse {
  data: TEachAircraft;
}

export interface IAircraftMakeBookableResponse extends BaseApiResponse {
  data: TEachAircraft;
}

export interface IAircraftDeleteResponse extends BaseApiResponse {
  data: TEachAircraft;
}
