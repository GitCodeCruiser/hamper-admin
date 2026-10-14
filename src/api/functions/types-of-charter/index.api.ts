import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TTypesOfCharterCategoryChangeStatusParamType,
  TTypesOfCharterCategoryGetAllParamType,
  TTypesOfCharterChangeStatusParamType,
  TTypesOfCharterGetAllParamType,
} from '@/types/apps/types-of-charter/index.type';
import {
  ITypesOfCharterCategoryCreateResponse,
  ITypesOfCharterCategoryDeleteResponse,
  ITypesOfCharterCategoryGetAllResponse,
  ITypesOfCharterCategoryGetResponse,
  ITypesOfCharterCategoryStatusChangeResponse,
  ITypesOfCharterCategoryUpdateResponse,
  ITypesOfCharterCreateResponse,
  ITypesOfCharterDeleteResponse,
  ITypesOfCharterGetAllResponse,
  ITypesOfCharterGetResponse,
  ITypesOfCharterStatusChangeResponse,
  ITypesOfCharterUpdateResponse,
} from '@/types/interface/types-of-charter/index.interface';

export const typesOfCharterCategoryGetAllFn = async (
  body: TTypesOfCharterCategoryGetAllParamType,
) => {
  const res = await axiosInstance.post<ITypesOfCharterCategoryGetAllResponse>(
    endpoints.typesOfCharter.category.getAll('v1'),
    body,
  );

  return res;
};

export const typesOfCharterCategoryGetFn = async (id: string) => {
  const res = await axiosInstance.get<ITypesOfCharterCategoryGetResponse>(
    `${endpoints.typesOfCharter.category.get('v1')}/${id}`,
  );

  return res;
};

export const typesOfCharterCategoryCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ITypesOfCharterCategoryCreateResponse>(
    endpoints.typesOfCharter.category.create('v1'),
    body,
  );

  return res;
};

export const typesOfCharterCategoryUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ITypesOfCharterCategoryUpdateResponse>(
    endpoints.typesOfCharter.category.update('v1'),
    body,
  );

  return res;
};

export const typesOfCharterCategoryChangeStatusFn = async (
  body: TTypesOfCharterCategoryChangeStatusParamType,
) => {
  const res = await axiosInstance.post<ITypesOfCharterCategoryStatusChangeResponse>(
    endpoints.typesOfCharter.category.statusChange('v1'),
    body,
  );

  return res;
};

export const typesOfCharterCategoryDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<ITypesOfCharterCategoryDeleteResponse>(
    `${endpoints.typesOfCharter.category.delete('v1')}/${id}`,
  );

  return res;
};

export const typesOfCharterCategoryReorderFn = async (body: { ids: string[] }) => {
  const res = await axiosInstance.post(endpoints.typesOfCharter.category.reorder('v1'), body);

  return res;
};

//  Below Types Of Charter --------------------------------------------------------->

export const typesOfCharterGetAllFn = async (body: TTypesOfCharterGetAllParamType) => {
  const res = await axiosInstance.post<ITypesOfCharterGetAllResponse>(
    endpoints.typesOfCharter.getAll('v1'),
    body,
  );

  return res;
};

export const typesOfCharterGetFn = async (id: string) => {
  const res = await axiosInstance.get<ITypesOfCharterGetResponse>(
    `${endpoints.typesOfCharter.get('v1')}/${id}`,
  );

  return res;
};

export const typesOfCharterCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ITypesOfCharterCreateResponse>(
    endpoints.typesOfCharter.create('v1'),
    body,
  );

  return res;
};

export const typesOfCharterUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ITypesOfCharterUpdateResponse>(
    endpoints.typesOfCharter.update('v1'),
    body,
  );

  return res;
};

export const typesOfCharterDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<ITypesOfCharterDeleteResponse>(
    `${endpoints.typesOfCharter.delete('v1')}/${id}`,
  );

  return res;
};

export const typesOfCharterChangeStatusFn = async (body: TTypesOfCharterChangeStatusParamType) => {
  const res = await axiosInstance.post<ITypesOfCharterStatusChangeResponse>(
    endpoints.typesOfCharter.statusChange('v1'),
    body,
  );

  return res;
};
