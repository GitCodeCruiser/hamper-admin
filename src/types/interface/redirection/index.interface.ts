import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachRedirect } from '@/types/apps/redirection/index.type';

export interface IRedirectionGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachRedirect[];
  };
}

export interface IRedirectionGetResponse extends BaseApiResponse {
  data: TEachRedirect;
}

export interface IRedirectionCreateResponse extends BaseApiResponse {
  data: TEachRedirect;
}

export interface IRedirectionUpdateResponse extends BaseApiResponse {
  data: TEachRedirect;
}

export interface IRedirectionStatusChangeResponse extends BaseApiResponse {
  data: TEachRedirect;
}

export interface IRedirectionDeleteResponse extends BaseApiResponse {
  data: TEachRedirect;
}
