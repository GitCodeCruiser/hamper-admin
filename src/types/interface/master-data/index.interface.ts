import { TMasterDataDetails, TMasterDataListItem } from '@/types/apps/master-data/index.type';
import { BaseApiMetaResponse, BaseApiResponse } from '@/types/interface/common.interface';

export interface IMasterDataGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TMasterDataListItem[];
  };
}

export interface IMasterDataGetResponse extends BaseApiResponse {
  data: TMasterDataDetails;
}
