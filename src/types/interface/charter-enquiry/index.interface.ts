import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachCharterEnquiry } from '@/types/apps/charter-enquiry/index.type';

export interface ICharterEnquiryGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachCharterEnquiry[];
  };
}

export interface ICharterEnquiryGetResponse extends BaseApiResponse {
  data: TEachCharterEnquiry;
}

export interface ICharterEnquiryCreateResponse extends BaseApiResponse {
  data: TEachCharterEnquiry;
}

export interface ICharterEnquiryUpdateResponse extends BaseApiResponse {
  data: TEachCharterEnquiry;
}

export interface ICharterEnquiryStatusChangeResponse extends BaseApiResponse {
  data: TEachCharterEnquiry;
}

export interface ICharterEnquiryDeleteResponse extends BaseApiResponse {
  data: TEachCharterEnquiry;
}
