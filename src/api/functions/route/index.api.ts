import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { TRouteChangeStatusParamType, TRouteGetAllParamType } from '@/types/apps/route/index.type';
import {
  IRouteCreateResponse,
  IRouteDeleteResponse,
  IRouteFeaturedResponse,
  IRouteGetAllResponse,
  IRouteGetResponse,
  IRouteStatusChangeResponse,
  IRouteUpdateResponse,
} from '@/types/interface/route/index.interface';

export const routeGetAllFn = async (body: TRouteGetAllParamType) => {
  const res = await axiosInstance.post<IRouteGetAllResponse>(endpoints.route.getAll('v1'), body);

  return res;
};

export const routeGetFn = async (id: string) => {
  const res = await axiosInstance.get<IRouteGetResponse>(`${endpoints.route.get('v1')}/${id}`);

  return res;
};

export const routeCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IRouteCreateResponse>(endpoints.route.create('v1'), body);

  return res;
};

export const routeUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IRouteUpdateResponse>(endpoints.route.update('v1'), body);

  return res;
};

export const routeDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IRouteDeleteResponse>(
    `${endpoints.route.delete('v1')}/${id}`,
  );

  return res;
};

export const routeChangeStatusFn = async (body: TRouteChangeStatusParamType) => {
  const res = await axiosInstance.post<IRouteStatusChangeResponse>(
    endpoints.route.statusChange('v1'),
    body,
  );

  return res;
};

export const routeMakeFeaturedFn = async (id: string) => {
  const res = await axiosInstance.get<IRouteFeaturedResponse>(
    `${endpoints.route.makeFeature('v1')}/${id}`,
  );

  return res;
};

export const routeRestoreFn = async (id: string) => {
  const res = await axiosInstance.get<IRouteGetResponse>(`${endpoints.route.restore('v1')}/${id}`);

  return res;
};

export const routeHardDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IRouteDeleteResponse>(
    `${endpoints.route.hardDelete('v1')}/${id}`,
  );

  return res;
};
