import { BaseApiResponse } from '../common.interface';

import { TMenuFooterSetting } from '@/types/apps/menu-footer/index.type';

export interface IMenuFooterDetailsResponse extends BaseApiResponse {
  data: TMenuFooterSetting;
}

export interface IMenuFooterUpdateResponse extends BaseApiResponse {
  data: TMenuFooterSetting;
}
