import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TWhyHoganiCategoryChangeStatusParamType,
  TWhyHoganiCategoryGetAllParamType,
  TWhyHoganiChangeStatusParamType,
  TWhyHoganiGetAllParamType,
} from '@/types/apps/why-hogani/index.type';
import {
  IWhyHoganiCategoryCreateResponse,
  IWhyHoganiCategoryDeleteResponse,
  IWhyHoganiCategoryGetAllResponse,
  IWhyHoganiCategoryGetResponse,
  IWhyHoganiCategoryStatusChangeResponse,
  IWhyHoganiCategoryUpdateResponse,
  IWhyHoganiCreateResponse,
  IWhyHoganiDeleteResponse,
  IWhyHoganiGetAllResponse,
  IWhyHoganiGetResponse,
  IWhyHoganiStatusChangeResponse,
  IWhyHoganiUpdateResponse,
} from '@/types/interface/why-hogani/why-hogani-flow.interface';

export const whyHoganiCategoryGetAllFn = async (body: TWhyHoganiCategoryGetAllParamType) => {
  const res = await axiosInstance.post<IWhyHoganiCategoryGetAllResponse>(
    endpoints.whyHogani.category.getAll('v1'),
    body,
  );

  return res;
};

export const whyHoganiCategoryGetFn = async (id: string) => {
  const res = await axiosInstance.get<IWhyHoganiCategoryGetResponse>(
    `${endpoints.whyHogani.category.get('v1')}/${id}`,
  );

  return res;
};

export const whyHoganiCategoryCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IWhyHoganiCategoryCreateResponse>(
    endpoints.whyHogani.category.create('v1'),
    body,
  );

  return res;
};

export const whyHoganiCategoryUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IWhyHoganiCategoryUpdateResponse>(
    endpoints.whyHogani.category.update('v1'),
    body,
  );

  return res;
};

export const whyHoganiCategoryChangeStatusFn = async (
  body: TWhyHoganiCategoryChangeStatusParamType,
) => {
  const res = await axiosInstance.post<IWhyHoganiCategoryStatusChangeResponse>(
    endpoints.whyHogani.category.statusChange('v1'),
    body,
  );

  return res;
};

export const whyHoganiCategoryDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IWhyHoganiCategoryDeleteResponse>(
    `${endpoints.whyHogani.category.delete('v1')}/${id}`,
  );

  return res;
};

//  Below Why Hogani --------------------------------------------------------->

export const whyHoganiGetAllFn = async (body: TWhyHoganiGetAllParamType) => {
  const res = await axiosInstance.post<IWhyHoganiGetAllResponse>(
    endpoints.whyHogani.getAll('v1'),
    body,
  );

  return res;
};

export const whyHoganiGetFn = async (id: string) => {
  const res = await axiosInstance.get<IWhyHoganiGetResponse>(
    `${endpoints.whyHogani.get('v1')}/${id}`,
  );

  return res;
};

export const whyHoganiCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IWhyHoganiCreateResponse>(
    endpoints.whyHogani.create('v1'),
    body,
  );

  return res;
};

export const whyHoganiUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IWhyHoganiUpdateResponse>(
    endpoints.whyHogani.update('v1'),
    body,
  );

  return res;
};

export const whyHoganiDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IWhyHoganiDeleteResponse>(
    `${endpoints.whyHogani.delete('v1')}/${id}`,
  );

  return res;
};

export const whyHoganiChangeStatusFn = async (body: TWhyHoganiChangeStatusParamType) => {
  const res = await axiosInstance.post<IWhyHoganiStatusChangeResponse>(
    endpoints.whyHogani.statusChange('v1'),
    body,
  );

  return res;
};

export const whyHoganiReorderFn = async (body: { ids: string[] }) => {
  const res = await axiosInstance.post(endpoints.whyHogani.reorder('v1'), body);

  return res;
};
