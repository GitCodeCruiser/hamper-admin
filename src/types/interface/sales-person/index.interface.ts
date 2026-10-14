import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachSalesPerson } from '@/types/apps/sales-person/index.type';

export interface ISalesPersonGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachSalesPerson[];
  };
}

export interface ISalesPersonGetResponse extends BaseApiResponse {
  data: TEachSalesPerson;
}

export interface ISalesPersonCreateResponse extends BaseApiResponse {
  data: TEachSalesPerson;
}

export interface ISalesPersonUpdateResponse extends BaseApiResponse {
  data: TEachSalesPerson;
}

export interface ISalesPersonStatusChangeResponse extends BaseApiResponse {
  data: TEachSalesPerson;
}

export interface ISalesPersonDeleteResponse extends BaseApiResponse {
  data: TEachSalesPerson;
}
