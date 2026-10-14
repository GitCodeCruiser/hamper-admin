import { BaseApiResponse } from '../../common.interface';

import { TEachCmsMainContent } from '@/types/apps/cms/main/index.type';

export interface ICmsMainContentListingResponse extends BaseApiResponse {
  data: TEachCmsMainContent[];
}

export interface ICmsMainContentGetResponse extends BaseApiResponse {
  data: TEachCmsMainContent;
}

export interface ICmsMainContentCreateResponse extends BaseApiResponse {
  data: TEachCmsMainContent;
}

export interface ICmsMainContentUpdateResponse extends BaseApiResponse {
  data: TEachCmsMainContent;
}

export interface ICmsMainContentDeleteResponse extends BaseApiResponse {
  data: TEachCmsMainContent;
}
