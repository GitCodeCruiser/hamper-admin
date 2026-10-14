import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TTravelResourcesCategoryChangeStatusParamType,
  TTravelResourcesCategoryGetAllParamType,
  TTravelResourcesChangeStatusParamType,
  TTravelResourcesGetAllParamType,
} from '@/types/apps/travel-resources/index.type';
import {
  ITravelResourcesCategoryCreateResponse,
  ITravelResourcesCategoryDeleteResponse,
  ITravelResourcesCategoryGetAllResponse,
  ITravelResourcesCategoryGetResponse,
  ITravelResourcesCategoryStatusChangeResponse,
  ITravelResourcesCategoryUpdateResponse,
  ITravelResourcesCreateResponse,
  ITravelResourcesDeleteResponse,
  ITravelResourcesGetAllResponse,
  ITravelResourcesGetResponse,
  ITravelResourcesStatusChangeResponse,
  ITravelResourcesUpdateResponse,
} from '@/types/interface/travel-resources/travel-resources-flow.interface';

export const travelResourcesCategoryGetAllFn = async (
  body: TTravelResourcesCategoryGetAllParamType,
) => {
  const res = await axiosInstance.post<ITravelResourcesCategoryGetAllResponse>(
    endpoints.travelResources.category.getAll('v1'),
    body,
  );

  return res;
};

export const travelResourcesCategoryGetFn = async (id: string) => {
  const res = await axiosInstance.get<ITravelResourcesCategoryGetResponse>(
    `${endpoints.travelResources.category.get('v1')}/${id}`,
  );

  return res;
};

export const travelResourcesCategoryCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ITravelResourcesCategoryCreateResponse>(
    endpoints.travelResources.category.create('v1'),
    body,
  );

  return res;
};

export const travelResourcesCategoryUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ITravelResourcesCategoryUpdateResponse>(
    endpoints.travelResources.category.update('v1'),
    body,
  );

  return res;
};

export const travelResourcesCategoryChangeStatusFn = async (
  body: TTravelResourcesCategoryChangeStatusParamType,
) => {
  const res = await axiosInstance.post<ITravelResourcesCategoryStatusChangeResponse>(
    endpoints.travelResources.category.statusChange('v1'),
    body,
  );

  return res;
};

export const travelResourcesCategoryDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<ITravelResourcesCategoryDeleteResponse>(
    `${endpoints.travelResources.category.delete('v1')}/${id}`,
  );

  return res;
};

//  Below Travel Resources --------------------------------------------------------->

export const travelResourcesGetAllFn = async (body: TTravelResourcesGetAllParamType) => {
  const res = await axiosInstance.post<ITravelResourcesGetAllResponse>(
    endpoints.travelResources.getAll('v1'),
    body,
  );

  return res;
};

export const travelResourcesGetFn = async (id: string) => {
  const res = await axiosInstance.get<ITravelResourcesGetResponse>(
    `${endpoints.travelResources.get('v1')}/${id}`,
  );

  return res;
};

export const travelResourcesCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ITravelResourcesCreateResponse>(
    endpoints.travelResources.create('v1'),
    body,
  );

  return res;
};

export const travelResourcesUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ITravelResourcesUpdateResponse>(
    endpoints.travelResources.update('v1'),
    body,
  );

  return res;
};

export const travelResourcesDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<ITravelResourcesDeleteResponse>(
    `${endpoints.travelResources.delete('v1')}/${id}`,
  );

  return res;
};

export const travelResourcesChangeStatusFn = async (
  body: TTravelResourcesChangeStatusParamType,
) => {
  const res = await axiosInstance.post<ITravelResourcesStatusChangeResponse>(
    endpoints.travelResources.statusChange('v1'),
    body,
  );

  return res;
};

export const travelResourcesReorderFn = async (body: { ids: string[] }) => {
  const res = await axiosInstance.post(endpoints.travelResources.reorder('v1'), body);

  return res;
};
