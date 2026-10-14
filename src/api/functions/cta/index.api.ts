import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  ICTASettingDetailsResponse,
  ICTASettingUpdateResponse,
} from '@/types/interface/cta/index.interface';

export const ctaSettingDetailsFn = async () => {
  const res = await axiosInstance.get<ICTASettingDetailsResponse>(endpoints.ctaSetting.get('v1'));

  return res;
};

export const ctaSettingUpdateFn = async (body: FormData | Record<string, unknown>) => {
  const res = await axiosInstance.post<ICTASettingUpdateResponse>(
    endpoints.ctaSetting.update('v1'),
    body,
  );

  return res;
};
