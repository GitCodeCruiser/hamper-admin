import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TResourcesCategoryChangeStatusParamType,
  TResourcesCategoryGetAllParamType,
  TResourcesChangeStatusParamType,
  TResourcesGetAllParamType,
} from '@/types/apps/resources/index.type';
import {
  IResourcesCategoryCreateResponse,
  IResourcesCategoryDeleteResponse,
  IResourcesCategoryGetAllResponse,
  IResourcesCategoryGetResponse,
  IResourcesCategoryStatusChangeResponse,
  IResourcesCategoryUpdateResponse,
  IResourcesCreateResponse,
  IResourcesDeleteResponse,
  IResourcesGetAllResponse,
  IResourcesGetResponse,
  IResourcesStatusChangeResponse,
  IResourcesUpdateResponse,
} from '@/types/interface/resources/index.interface';

export const resourcesCategoryGetAllFn = async (body: TResourcesCategoryGetAllParamType) => {
  const res = await axiosInstance.post<IResourcesCategoryGetAllResponse>(
    endpoints.resources.category.getAll('v1'),
    body,
  );

  return res;
};

export const resourcesCategoryGetFn = async (id: string) => {
  const res = await axiosInstance.get<IResourcesCategoryGetResponse>(
    `${endpoints.resources.category.get('v1')}/${id}`,
  );

  return res;
};

export const resourcesCategoryCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IResourcesCategoryCreateResponse>(
    endpoints.resources.category.create('v1'),
    body,
  );

  return res;
};

export const resourcesCategoryUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IResourcesCategoryUpdateResponse>(
    endpoints.resources.category.update('v1'),
    body,
  );

  return res;
};

export const resourcesCategoryChangeStatusFn = async (
  body: TResourcesCategoryChangeStatusParamType,
) => {
  const res = await axiosInstance.post<IResourcesCategoryStatusChangeResponse>(
    endpoints.resources.category.statusChange('v1'),
    body,
  );

  return res;
};

export const resourcesCategoryDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IResourcesCategoryDeleteResponse>(
    `${endpoints.resources.category.delete('v1')}/${id}`,
  );

  return res;
};

export const resourcesCategoryReorderFn = async (body: { ids: string[] }) => {
  const res = await axiosInstance.post(endpoints.resources.category.reorder('v1'), body);

  return res;
};

//  Below Resources --------------------------------------------------------->

export const resourcesGetAllFn = async (body: TResourcesGetAllParamType) => {
  const res = await axiosInstance.post<IResourcesGetAllResponse>(
    endpoints.resources.getAll('v1'),
    body,
  );

  return res;
};

export const resourcesGetFn = async (id: string) => {
  const res = await axiosInstance.get<IResourcesGetResponse>(
    `${endpoints.resources.get('v1')}/${id}`,
  );

  return res;
};

export const resourcesCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IResourcesCreateResponse>(
    endpoints.resources.create('v1'),
    body,
  );

  return res;
};

export const resourcesUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IResourcesUpdateResponse>(
    endpoints.resources.update('v1'),
    body,
  );

  return res;
};

export const resourcesDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IResourcesDeleteResponse>(
    `${endpoints.resources.delete('v1')}/${id}`,
  );

  return res;
};

export const resourcesChangeStatusFn = async (body: TResourcesChangeStatusParamType) => {
  const res = await axiosInstance.post<IResourcesStatusChangeResponse>(
    endpoints.resources.statusChange('v1'),
    body,
  );

  return res;
};
