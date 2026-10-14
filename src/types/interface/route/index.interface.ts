import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachRoute } from '@/types/apps/route/index.type';

export interface IRouteGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachRoute[];
  };
}

export interface IRouteGetResponse extends BaseApiResponse {
  data: TEachRoute;
}

export interface IRouteCreateResponse extends BaseApiResponse {
  data: TEachRoute;
}

export interface IRouteUpdateResponse extends BaseApiResponse {
  data: TEachRoute;
}

export interface IRouteDeleteResponse extends BaseApiResponse {
  data: TEachRoute;
}

export interface IRouteStatusChangeResponse extends BaseApiResponse {
  data: TEachRoute;
}

export interface IRouteFeaturedResponse extends BaseApiResponse {
  data: TEachRoute;
}
