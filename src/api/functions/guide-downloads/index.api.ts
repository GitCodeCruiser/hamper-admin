import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { TGuideDownloadsGetAllParamType } from '@/types/apps/guide-downloads/index.type';
import {
  IGuideDownloadsDeleteResponse,
  IGuideDownloadsGetAllResponse,
  IGuideDownloadsSettingDetailsResponse,
  IGuideDownloadsSettingUpdateResponse,
} from '@/types/interface/guide-downloads/index.interface';

export const guideDownloadsGetAllFn = async (body: TGuideDownloadsGetAllParamType) => {
  const res = await axiosInstance.post<IGuideDownloadsGetAllResponse>(
    endpoints.insiderGuideDownload.getAll('v1'),
    body,
  );

  return res;
};

export const guideDownloadsDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IGuideDownloadsDeleteResponse>(
    `${endpoints.insiderGuideDownload.delete('v1')}/${id}`,
  );

  return res;
};

export const insiderGuideDownloadSettingDetailsFn = async () => {
  const res = await axiosInstance.get<IGuideDownloadsSettingDetailsResponse>(
    endpoints.insiderGuideDownloadSetting.get('v1'),
  );

  return res;
};

export const insiderGuideDownloadSettingUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IGuideDownloadsSettingUpdateResponse>(
    endpoints.insiderGuideDownloadSetting.update('v1'),
    body,
  );

  return res;
};
