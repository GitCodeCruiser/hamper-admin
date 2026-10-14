import { BaseApiMetaResponse, BaseApiResponse } from '../../common.interface';

import { TEachCityList } from '@/types/apps/master/city-list/index.type';

export interface ICityListGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachCityList[];
  };
}

export interface ICityListGetResponse extends BaseApiResponse {
  data: TEachCityList;
}

export interface ICityListCreateResponse extends BaseApiResponse {
  data: TEachCityList;
}

export interface ICityListUpdateResponse extends BaseApiResponse {
  data: TEachCityList;
}

export interface ICityListStatusChangeResponse extends BaseApiResponse {
  data: TEachCityList;
}

export interface ICityListDeleteResponse extends BaseApiResponse {
  data: TEachCityList;
}
