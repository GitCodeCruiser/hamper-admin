import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachLegEnquiry } from '@/types/apps/leg-enquiry/index.type';

export interface ILegEnquiryGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachLegEnquiry[];
  };
}

export interface ILegEnquiryGetResponse extends BaseApiResponse {
  data: TEachLegEnquiry;
}

export interface ILegEnquiryDeleteResponse extends BaseApiResponse {
  data: TEachLegEnquiry;
}

export interface ILegEnquirySendReplyResponse extends BaseApiResponse {
  data: TEachLegEnquiry;
}
