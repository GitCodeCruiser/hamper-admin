import { BaseApiResponse } from '../common.interface';

import { THeroSectionDetail } from '@/types/apps/hero-section/index.type';

export interface IHeroSectionDetailsResponse extends BaseApiResponse {
  data: THeroSectionDetail;
}

export interface IHeroSectionUpdateResponse extends BaseApiResponse {
  data: THeroSectionDetail;
}
