import { BaseApiResponse } from '../../common.interface';

import { TEachCategoryVsPremium } from '@/types/apps/cms/categoryVsPremium/index.type';

export interface ICategoryVsPremiumListingResponse extends BaseApiResponse {
  data: TEachCategoryVsPremium[];
}

export interface ICategoryVsPremiumGetResponse extends BaseApiResponse {
  data: TEachCategoryVsPremium;
}

export interface ICategoryVsPremiumCreateResponse extends BaseApiResponse {
  data: TEachCategoryVsPremium;
}

export interface ICategoryVsPremiumUpdateResponse extends BaseApiResponse {
  data: TEachCategoryVsPremium;
}

export interface ICategoryVsPremiumDeleteResponse extends BaseApiResponse {
  data: TEachCategoryVsPremium;
}
