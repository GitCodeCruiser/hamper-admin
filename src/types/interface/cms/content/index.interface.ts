import { BaseApiMetaResponse, BaseApiResponse } from '../../common.interface';

import { TEachCmsContent } from '@/types/apps/cms/content/index.type';

export interface ICmsContentGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachCmsContent[];
  };
}

export interface ICmsContentGetResponse extends BaseApiResponse {
  data: TEachCmsContent;
}

export interface ICmsContentCreateResponse extends BaseApiResponse {
  data: TEachCmsContent;
}

export interface ICmsContentUpdateResponse extends BaseApiResponse {
  data: TEachCmsContent;
}

export interface ICmsContentDeleteResponse extends BaseApiResponse {
  data: TEachCmsContent;
}

export interface ICmsContentReorderResponse extends BaseApiResponse {
  data: TEachCmsContent[];
}
