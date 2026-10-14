import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachPartnership } from '@/types/apps/partnerships/index.type';

export interface IPartnershipGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachPartnership[];
  };
}

export interface IPartnershipGetResponse extends BaseApiResponse {
  data: TEachPartnership;
}

export interface IPartnershipCreateResponse extends BaseApiResponse {
  data: TEachPartnership;
}

export interface IPartnershipUpdateResponse extends BaseApiResponse {
  data: TEachPartnership;
}

export interface IPartnershipDeleteResponse extends BaseApiResponse {
  data: TEachPartnership;
}

export interface IPartnershipStatusChangeResponse extends BaseApiResponse {
  data: TEachPartnership;
}

export interface IPartnershipFeaturedResponse extends BaseApiResponse {
  data: TEachPartnership;
}
