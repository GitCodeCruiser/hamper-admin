import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachAdminUser } from '@/types/apps/user/index.type';

export interface IUserGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachAdminUser[];
  };
}

export interface IUserGetResponse extends BaseApiResponse {
  data: TEachAdminUser;
}

export interface IUserCreateResponse extends BaseApiResponse {
  data: TEachAdminUser;
}

export interface IUserUpdateResponse extends BaseApiResponse {
  data: TEachAdminUser;
}

export interface IUserStatusChangeResponse extends BaseApiResponse {
  data: TEachAdminUser;
}

export interface IUserDeleteResponse extends BaseApiResponse {
  data: TEachAdminUser;
}
