import { BaseApiResponse } from '../common.interface';

import { TEachMediaFile } from '@/types/apps/media/index.type';

export interface IMediaUploadSingleFileResponse extends BaseApiResponse {
  data: TEachMediaFile;
}

export interface IMediaUploadMultipleFileResponse extends BaseApiResponse {
  data: TEachMediaFile[];
}

export interface IMediaDeleteFileResponse extends BaseApiResponse {
  data: TEachMediaFile;
}
