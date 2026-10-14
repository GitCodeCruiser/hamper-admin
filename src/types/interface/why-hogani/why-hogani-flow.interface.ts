import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachWhyHogani, TEachWhyHoganiCategory } from '@/types/apps/why-hogani/index.type';

export interface IWhyHoganiCategoryGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachWhyHoganiCategory[];
  };
}

export interface IWhyHoganiCategoryGetResponse extends BaseApiResponse {
  data: TEachWhyHoganiCategory;
}

export interface IWhyHoganiCategoryCreateResponse extends BaseApiResponse {
  data: TEachWhyHoganiCategory;
}

export interface IWhyHoganiCategoryUpdateResponse extends BaseApiResponse {
  data: TEachWhyHoganiCategory;
}

export interface IWhyHoganiCategoryDeleteResponse extends BaseApiResponse {
  data: TEachWhyHoganiCategory;
}

export interface IWhyHoganiCategoryStatusChangeResponse extends BaseApiResponse {
  data: TEachWhyHoganiCategory;
}

export interface IWhyHoganiCategoryListingResponse extends BaseApiResponse {
  data: TEachWhyHoganiCategory[];
}

export interface IWhyHoganiListingResponse extends BaseApiResponse {
  data: TEachWhyHogani[];
}

//  Below Why Hogani ------------------------------------->

export interface IWhyHoganiGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachWhyHogani[];
  };
}

export interface IWhyHoganiGetResponse extends BaseApiResponse {
  data: TEachWhyHogani;
}

export interface IWhyHoganiCreateResponse extends BaseApiResponse {
  data: TEachWhyHogani;
}

export interface IWhyHoganiUpdateResponse extends BaseApiResponse {
  data: TEachWhyHogani;
}

export interface IWhyHoganiStatusChangeResponse extends BaseApiResponse {
  data: TEachWhyHogani;
}

export interface IWhyHoganiFeaturedResponse extends BaseApiResponse {
  data: TEachWhyHogani;
}

export interface IWhyHoganiDeleteResponse extends BaseApiResponse {
  data: TEachWhyHogani;
}
