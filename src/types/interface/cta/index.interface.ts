import { BaseApiResponse } from '../common.interface';

import { TCTASetting } from '@/types/apps/cta/index.type';

export interface ICTASettingDetailsResponse extends BaseApiResponse {
  data: TCTASetting;
}

export interface ICTASettingUpdateResponse extends BaseApiResponse {
  data: TCTASetting;
}
