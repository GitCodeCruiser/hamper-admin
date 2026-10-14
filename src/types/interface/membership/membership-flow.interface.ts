import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachMembership, TEachMembershipCategory } from '@/types/apps/membership/index.type';

export interface IMembershipCategoryGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachMembershipCategory[];
  };
}

export interface IMembershipCategoryGetResponse extends BaseApiResponse {
  data: TEachMembershipCategory;
}

export interface IMembershipCategoryCreateResponse extends BaseApiResponse {
  data: TEachMembershipCategory;
}

export interface IMembershipCategoryUpdateResponse extends BaseApiResponse {
  data: TEachMembershipCategory;
}

export interface IMembershipCategoryDeleteResponse extends BaseApiResponse {
  data: TEachMembershipCategory;
}

export interface IMembershipCategoryStatusChangeResponse extends BaseApiResponse {
  data: TEachMembershipCategory;
}

export interface IMembershipCategoryListingResponse extends BaseApiResponse {
  data: TEachMembershipCategory[];
}

export interface IMembershipListingResponse extends BaseApiResponse {
  data: TEachMembership[];
}

//  Below Membership ------------------------------------->

export interface IMembershipGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachMembership[];
  };
}

export interface IMembershipGetResponse extends BaseApiResponse {
  data: TEachMembership;
}

export interface IMembershipCreateResponse extends BaseApiResponse {
  data: TEachMembership;
}

export interface IMembershipUpdateResponse extends BaseApiResponse {
  data: TEachMembership;
}

export interface IMembershipStatusChangeResponse extends BaseApiResponse {
  data: TEachMembership;
}

export interface IMembershipFeaturedResponse extends BaseApiResponse {
  data: TEachMembership;
}

export interface IMembershipDeleteResponse extends BaseApiResponse {
  data: TEachMembership;
}
