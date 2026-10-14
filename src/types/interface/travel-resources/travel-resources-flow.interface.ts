import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import {
  TEachTravelResources,
  TEachTravelResourcesCategory,
} from '@/types/apps/travel-resources/index.type';

export interface ITravelResourcesCategoryGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachTravelResourcesCategory[];
  };
}

export interface ITravelResourcesCategoryGetResponse extends BaseApiResponse {
  data: TEachTravelResourcesCategory;
}

export interface ITravelResourcesCategoryCreateResponse extends BaseApiResponse {
  data: TEachTravelResourcesCategory;
}

export interface ITravelResourcesCategoryUpdateResponse extends BaseApiResponse {
  data: TEachTravelResourcesCategory;
}

export interface ITravelResourcesCategoryDeleteResponse extends BaseApiResponse {
  data: TEachTravelResourcesCategory;
}

export interface ITravelResourcesCategoryStatusChangeResponse extends BaseApiResponse {
  data: TEachTravelResourcesCategory;
}

export interface ITravelResourcesCategoryListingResponse extends BaseApiResponse {
  data: TEachTravelResourcesCategory[];
}

export interface ITravelResourcesListingResponse extends BaseApiResponse {
  data: TEachTravelResources[];
}

//  Below Travel Resources ------------------------------------->

export interface ITravelResourcesGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachTravelResources[];
  };
}

export interface ITravelResourcesGetResponse extends BaseApiResponse {
  data: TEachTravelResources;
}

export interface ITravelResourcesCreateResponse extends BaseApiResponse {
  data: TEachTravelResources;
}

export interface ITravelResourcesUpdateResponse extends BaseApiResponse {
  data: TEachTravelResources;
}

export interface ITravelResourcesStatusChangeResponse extends BaseApiResponse {
  data: TEachTravelResources;
}

export interface ITravelResourcesFeaturedResponse extends BaseApiResponse {
  data: TEachTravelResources;
}

export interface ITravelResourcesDeleteResponse extends BaseApiResponse {
  data: TEachTravelResources;
}
