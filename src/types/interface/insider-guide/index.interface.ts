import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachInsiderGuide } from '@/types/apps/insider-guide/index.type';

export interface IInsiderGuideGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachInsiderGuide[];
  };
}

export interface IInsiderGuideGetResponse extends BaseApiResponse {
  data: TEachInsiderGuide;
}

export interface IInsiderGuideCreateResponse extends BaseApiResponse {
  data: TEachInsiderGuide;
}

export interface IInsiderGuideUpdateResponse extends BaseApiResponse {
  data: TEachInsiderGuide;
}

export interface IInsiderGuideDeleteResponse extends BaseApiResponse {
  data: TEachInsiderGuide;
}

export interface IInsiderGuideStatusChangeResponse extends BaseApiResponse {
  data: TEachInsiderGuide;
}

export interface IInsiderGuideFeaturedResponse extends BaseApiResponse {
  data: TEachInsiderGuide;
}
