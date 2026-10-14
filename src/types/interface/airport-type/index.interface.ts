import { BaseApiResponse } from '../common.interface';

import { TEachAirportType } from '@/types/apps/airport-type/index.type';

export interface IAirportTypeListingResponse extends BaseApiResponse {
  data: TEachAirportType[];
}
