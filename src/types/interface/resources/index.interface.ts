import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachResources, TEachResourcesCategory } from '@/types/apps/resources/index.type';

export interface IResourcesCategoryGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachResourcesCategory[];
  };
}

export interface IResourcesCategoryGetResponse extends BaseApiResponse {
  data: TEachResourcesCategory;
}

export interface IResourcesCategoryCreateResponse extends BaseApiResponse {
  data: TEachResourcesCategory;
}

export interface IResourcesCategoryUpdateResponse extends BaseApiResponse {
  data: TEachResourcesCategory;
}

export interface IResourcesCategoryDeleteResponse extends BaseApiResponse {
  data: TEachResourcesCategory;
}

export interface IResourcesCategoryStatusChangeResponse extends BaseApiResponse {
  data: TEachResourcesCategory;
}

export interface IResourcesCategoryListingResponse extends BaseApiResponse {
  data: TEachResourcesCategory[];
}

export interface IResourcesListingResponse extends BaseApiResponse {
  data: TEachResources[];
}

//  Below Resources ------------------------------------->

export interface IResourcesGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachResources[];
  };
}

export interface IResourcesGetResponse extends BaseApiResponse {
  data: TEachResources;
}

export interface IResourcesCreateResponse extends BaseApiResponse {
  data: TEachResources;
}

export interface IResourcesUpdateResponse extends BaseApiResponse {
  data: TEachResources;
}

export interface IResourcesStatusChangeResponse extends BaseApiResponse {
  data: TEachResources;
}

export interface IResourcesFeaturedResponse extends BaseApiResponse {
  data: TEachResources;
}

export interface IResourcesDeleteResponse extends BaseApiResponse {
  data: TEachResources;
}
