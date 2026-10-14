import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { TMenuFooterUpdateParamType } from '@/types/apps/menu-footer/index.type';
import {
  IMenuFooterDetailsResponse,
  IMenuFooterUpdateResponse,
} from '@/types/interface/menu-footer/index.interface';

export const authAdminMenuFooterDetailsFn = async () => {
  const res = await axiosInstance.get<IMenuFooterDetailsResponse>(
    endpoints.auth.admin.menuFooterDetails('v1'),
  );

  return res;
};

export const authAdminMenuFooterUpdateFn = async (body: TMenuFooterUpdateParamType) => {
  const res = await axiosInstance.post<IMenuFooterUpdateResponse>(
    endpoints.auth.admin.menuFooterUpdate('v1'),
    body,
  );

  return res;
};
