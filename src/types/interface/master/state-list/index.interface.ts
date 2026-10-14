import { BaseApiMetaResponse, BaseApiResponse } from '../../common.interface';

import { TEachStateList } from '@/types/apps/master/state-list/index.type';

export interface IStateListGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachStateList[];
  };
}

export interface IStateListGetResponse extends BaseApiResponse {
  data: TEachStateList;
}

export interface IStateListCreateResponse extends BaseApiResponse {
  data: TEachStateList;
}

export interface IStateListUpdateResponse extends BaseApiResponse {
  data: TEachStateList;
}

export interface IStateListStatusChangeResponse extends BaseApiResponse {
  data: TEachStateList;
}

export interface IStateListDeleteResponse extends BaseApiResponse {
  data: TEachStateList;
}
