import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import {
  TEachTypesOfCharter,
  TEachTypesOfCharterCategory,
} from '@/types/apps/types-of-charter/index.type';

export interface ITypesOfCharterCategoryGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachTypesOfCharterCategory[];
  };
}

export interface ITypesOfCharterCategoryGetResponse extends BaseApiResponse {
  data: TEachTypesOfCharterCategory;
}

export interface ITypesOfCharterCategoryCreateResponse extends BaseApiResponse {
  data: TEachTypesOfCharterCategory;
}

export interface ITypesOfCharterCategoryUpdateResponse extends BaseApiResponse {
  data: TEachTypesOfCharterCategory;
}

export interface ITypesOfCharterCategoryDeleteResponse extends BaseApiResponse {
  data: TEachTypesOfCharterCategory;
}

export interface ITypesOfCharterCategoryStatusChangeResponse extends BaseApiResponse {
  data: TEachTypesOfCharterCategory;
}

export interface ITypesOfCharterCategoryListingResponse extends BaseApiResponse {
  data: TEachTypesOfCharterCategory[];
}

export interface ITypesOfCharterListingResponse extends BaseApiResponse {
  data: TEachTypesOfCharter[];
}

//  Below Type Of Charter ------------------------------------->

export interface ITypesOfCharterGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachTypesOfCharter[];
  };
}

export interface ITypesOfCharterGetResponse extends BaseApiResponse {
  data: TEachTypesOfCharter;
}

export interface ITypesOfCharterCreateResponse extends BaseApiResponse {
  data: TEachTypesOfCharter;
}

export interface ITypesOfCharterUpdateResponse extends BaseApiResponse {
  data: TEachTypesOfCharter;
}

export interface ITypesOfCharterStatusChangeResponse extends BaseApiResponse {
  data: TEachTypesOfCharter;
}

export interface ITypesOfCharterFeaturedResponse extends BaseApiResponse {
  data: TEachTypesOfCharter;
}

export interface ITypesOfCharterDeleteResponse extends BaseApiResponse {
  data: TEachTypesOfCharter;
}
