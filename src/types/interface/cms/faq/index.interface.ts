import { BaseApiMetaResponse, BaseApiResponse } from '../../common.interface';

import { TEachCmsFaq } from '@/types/apps/cms/faq/index.type';

export interface ICmsFaqGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachCmsFaq[];
  };
}

export interface ICmsFaqGetResponse extends BaseApiResponse {
  data: TEachCmsFaq;
}

export interface ICmsFaqCreateResponse extends BaseApiResponse {
  data: TEachCmsFaq;
}

export interface ICmsFaqUpdateResponse extends BaseApiResponse {
  data: TEachCmsFaq;
}

export interface ICmsFaqDeleteResponse extends BaseApiResponse {
  data: TEachCmsFaq;
}

export interface ICmsFaqReorderResponse extends BaseApiResponse {
  data: TEachCmsFaq[];
}
