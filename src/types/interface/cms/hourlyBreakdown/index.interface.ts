import { BaseApiResponse } from '../../common.interface';

import { TEachHourlyBreakdown } from '@/types/apps/cms/hourlyBreakdown/index.type';

export interface IHourlyBreakdownListingResponse extends BaseApiResponse {
  data: TEachHourlyBreakdown[];
}

export interface IHourlyBreakdownGetResponse extends BaseApiResponse {
  data: TEachHourlyBreakdown;
}

export interface IHourlyBreakdownCreateResponse extends BaseApiResponse {
  data: TEachHourlyBreakdown;
}

export interface IHourlyBreakdownUpdateResponse extends BaseApiResponse {
  data: TEachHourlyBreakdown;
}

export interface IHourlyBreakdownDeleteResponse extends BaseApiResponse {
  data: TEachHourlyBreakdown;
}
