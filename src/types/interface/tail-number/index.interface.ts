import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachTailNumber } from '@/types/apps/tail-number/index.type';

export interface ITailNumberGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachTailNumber[];
  };
}

export interface ITailNumberResponse extends BaseApiResponse {
  data: TEachTailNumber;
}
