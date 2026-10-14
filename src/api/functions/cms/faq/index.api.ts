import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TCmsFaqCreateParamType,
  TCmsFaqGetAllParamType,
  TCmsFaqReorderParamType,
  TCmsFaqUpdateParamType,
} from '@/types/apps/cms/faq/index.type';
import {
  ICmsFaqCreateResponse,
  ICmsFaqDeleteResponse,
  ICmsFaqGetAllResponse,
  ICmsFaqGetResponse,
  ICmsFaqReorderResponse,
  ICmsFaqUpdateResponse,
} from '@/types/interface/cms/faq/index.interface';

export const cmsFaqGetAllFn = async (body: TCmsFaqGetAllParamType) => {
  const res = await axiosInstance.post<ICmsFaqGetAllResponse>(endpoints.cms.faq.getAll('v1'), body);

  return res;
};

export const cmsFaqGetFn = async (id: string) => {
  const res = await axiosInstance.get<ICmsFaqGetResponse>(`${endpoints.cms.faq.get('v1')}/${id}`);

  return res;
};

export const cmsFaqCreateFn = async (body: TCmsFaqCreateParamType) => {
  const res = await axiosInstance.post<ICmsFaqCreateResponse>(endpoints.cms.faq.create('v1'), body);

  return res;
};

export const cmsFaqUpdateFn = async (body: TCmsFaqUpdateParamType) => {
  const res = await axiosInstance.post<ICmsFaqUpdateResponse>(endpoints.cms.faq.update('v1'), body);

  return res;
};

export const cmsFaqDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<ICmsFaqDeleteResponse>(
    `${endpoints.cms.faq.delete('v1')}/${id}`,
  );

  return res;
};

export const cmsFaqReorderFn = async (body: TCmsFaqReorderParamType) => {
  const res = await axiosInstance.post<ICmsFaqReorderResponse>(
    endpoints.cms.faq.reorder('v1'),
    body,
  );

  return res;
};
