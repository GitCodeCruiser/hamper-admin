import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import {
  TEachGuideDownloads,
  TGuideDownloadSetting,
} from '@/types/apps/guide-downloads/index.type';

export interface IGuideDownloadsGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachGuideDownloads[];
  };
}

export interface IGuideDownloadsDeleteResponse extends BaseApiResponse {
  data: TEachGuideDownloads;
}

export interface IGuideDownloadsSettingDetailsResponse extends BaseApiResponse {
  data: TGuideDownloadSetting;
}

export interface IGuideDownloadsSettingUpdateResponse extends BaseApiResponse {
  data: TGuideDownloadSetting;
}
