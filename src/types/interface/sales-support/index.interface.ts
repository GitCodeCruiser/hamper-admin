import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachSalesSupport } from '@/types/apps/sales-support/index.type';

export interface ISalesSupportGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachSalesSupport[];
  };
}

export interface ISalesSupportGetResponse extends BaseApiResponse {
  data: TEachSalesSupport;
}

export interface ISalesSupportDeleteResponse extends BaseApiResponse {
  data: TEachSalesSupport;
}

export interface ISalesSupportSendReplyResponse extends BaseApiResponse {
  data: TEachSalesSupport;
}
