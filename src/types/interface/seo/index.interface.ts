import { BaseApiResponse } from '../common.interface';

import { TEachSeoData } from '@/types/apps/seo/index.type';

export interface ISeoDetailsBySlugResponse extends BaseApiResponse {
  data: TEachSeoData;
}

export interface ISeoDetailsUpdateResponse extends BaseApiResponse {
  data: TEachSeoData;
}
