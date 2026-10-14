import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { TCityChangeStatusParamType, TCityGetAllParamType } from '@/types/apps/city/index.type';
import {
  ICityCreateResponse,
  ICityDeleteResponse,
  ICityFeaturedResponse,
  ICityGetAllResponse,
  ICityGetResponse,
  ICityStatusChangeResponse,
  ICityUpdateResponse,
} from '@/types/interface/city/index.interface';

export const cityGetAllFn = async (body: TCityGetAllParamType) => {
  const res = await axiosInstance.post<ICityGetAllResponse>(endpoints.city.getAll('v1'), body);

  return res;
};

export const cityGetFn = async (id: string) => {
  const res = await axiosInstance.get<ICityGetResponse>(`${endpoints.city.get('v1')}/${id}`);

  return res;
};

export const cityCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ICityCreateResponse>(endpoints.city.create('v1'), body);

  return res;
};

export const cityUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ICityUpdateResponse>(endpoints.city.update('v1'), body);

  return res;
};

export const cityDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<ICityDeleteResponse>(`${endpoints.city.delete('v1')}/${id}`);

  return res;
};

export const cityChangeStatusFn = async (body: TCityChangeStatusParamType) => {
  const res = await axiosInstance.post<ICityStatusChangeResponse>(
    endpoints.city.statusChange('v1'),
    body,
  );

  return res;
};

export const cityMakeFeaturedFn = async (id: string) => {
  const res = await axiosInstance.get<ICityFeaturedResponse>(
    `${endpoints.city.makeFeature('v1')}/${id}`,
  );

  return res;
};

export const cityRestoreFn = async (id: string) => {
  const res = await axiosInstance.get<ICityGetResponse>(`${endpoints.city.restore('v1')}/${id}`);

  return res;
};

export const cityHardDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<ICityDeleteResponse>(
    `${endpoints.city.hardDelete('v1')}/${id}`,
  );

  return res;
};
