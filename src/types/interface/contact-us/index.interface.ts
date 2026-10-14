import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachContactUs } from '@/types/apps/contact-us/index.type';

export interface IContactUsGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachContactUs[];
  };
}

export interface IContactUsGetResponse extends BaseApiResponse {
  data: TEachContactUs;
}

export interface IContactUsDeleteResponse extends BaseApiResponse {
  data: TEachContactUs;
}

export interface IContactUsSendReplyResponse extends BaseApiResponse {
  data: TEachContactUs;
}
