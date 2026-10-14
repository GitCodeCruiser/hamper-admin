import { BaseApiMetaResponse, BaseApiResponse } from '../../common.interface';

import { TEachCountryList } from '@/types/apps/master/country-list/index.type';

export interface ICountryListGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachCountryList[];
  };
}

export interface ICountryListGetResponse extends BaseApiResponse {
  data: TEachCountryList;
}

export interface ICountryListCreateResponse extends BaseApiResponse {
  data: TEachCountryList;
}

export interface ICountryListUpdateResponse extends BaseApiResponse {
  data: TEachCountryList;
}

export interface ICountryListStatusChangeResponse extends BaseApiResponse {
  data: TEachCountryList;
}

export interface ICountryListDeleteResponse extends BaseApiResponse {
  data: TEachCountryList;
}
