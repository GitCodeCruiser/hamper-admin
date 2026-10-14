import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TCmsContentGetAllParamType,
  TCmsContentReorderParamType,
} from '@/types/apps/cms/content/index.type';
import {
  ICmsContentCreateResponse,
  ICmsContentDeleteResponse,
  ICmsContentGetAllResponse,
  ICmsContentGetResponse,
  ICmsContentReorderResponse,
  ICmsContentUpdateResponse,
} from '@/types/interface/cms/content/index.interface';

export const cmsContentGetAllFn = async (body: TCmsContentGetAllParamType) => {
  const res = await axiosInstance.post<ICmsContentGetAllResponse>(
    endpoints.cms.content.getAll('v1'),
    body,
  );

  return res;
};

export const cmsContentGetFn = async (id: string) => {
  const res = await axiosInstance.get<ICmsContentGetResponse>(
    `${endpoints.cms.content.get('v1')}/${id}`,
  );

  return res;
};

export const cmsContentCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ICmsContentCreateResponse>(
    endpoints.cms.content.create('v1'),
    body,
  );

  return res;
};

export const cmsContentUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ICmsContentUpdateResponse>(
    endpoints.cms.content.update('v1'),
    body,
  );

  return res;
};

export const cmsContentDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<ICmsContentDeleteResponse>(
    `${endpoints.cms.content.delete('v1')}/${id}`,
  );

  return res;
};

export const cmsContentReorderFn = async (body: TCmsContentReorderParamType) => {
  const res = await axiosInstance.post<ICmsContentReorderResponse>(
    endpoints.cms.content.reorder('v1'),
    body,
  );

  return res;
};
