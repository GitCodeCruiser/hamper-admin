import { BaseApiResponse } from '../../common.interface';

import { TEachMattFacts } from '@/types/apps/cms/mattFacts/index.type';

export interface IMattFactsListingResponse extends BaseApiResponse {
  data: TEachMattFacts[];
}

export interface IMattFactsGetResponse extends BaseApiResponse {
  data: TEachMattFacts;
}

export interface IMattFactsCreateResponse extends BaseApiResponse {
  data: TEachMattFacts;
}

export interface IMattFactsUpdateResponse extends BaseApiResponse {
  data: TEachMattFacts;
}

export interface IMattFactsDeleteResponse extends BaseApiResponse {
  data: TEachMattFacts;
}
