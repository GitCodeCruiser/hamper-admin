import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachBlog } from '@/types/apps/blog/index.type';

export interface IBlogGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachBlog[];
  };
}

export interface IBlogGetResponse extends BaseApiResponse {
  data: TEachBlog;
}

export interface IBlogCreateResponse extends BaseApiResponse {
  data: TEachBlog;
}

export interface IBlogUpdateResponse extends BaseApiResponse {
  data: TEachBlog;
}

export interface IBlogDeleteResponse extends BaseApiResponse {
  data: TEachBlog;
}

export interface IBlogStatusChangeResponse extends BaseApiResponse {
  data: TEachBlog;
}

export interface IBlogFeaturedResponse extends BaseApiResponse {
  data: TEachBlog;
}
