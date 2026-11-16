import { BaseApiMetaResponse, BaseApiResponse } from '../../common.interface';

import { TEachRegionList } from '@/types/apps/master/region-list/index.type';

export interface IRegionListGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachRegionList[];
  };
}

export interface IRegionListGetResponse extends BaseApiResponse {
  data: TEachRegionList;
}

export interface IRegionListCreateResponse extends BaseApiResponse {
  data: TEachRegionList;
}

export interface IRegionListUpdateResponse extends BaseApiResponse {
  data: TEachRegionList;
}

export interface IRegionListStatusChangeResponse extends BaseApiResponse {
  data: TEachRegionList;
}

export interface IRegionListDeleteResponse extends BaseApiResponse {
  data: TEachRegionList;
}
