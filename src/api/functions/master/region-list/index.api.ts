import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TRegionListChangeStatusParamType,
  TRegionListGetAllParamType,
} from '@/types/apps/master/region-list/index.type';
import {
  IRegionListCreateResponse,
  IRegionListDeleteResponse,
  IRegionListGetAllResponse,
  IRegionListGetResponse,
  IRegionListStatusChangeResponse,
  IRegionListUpdateResponse,
} from '@/types/interface/master/region-list/index.interface';

export const regionListGetAllFn = async (body: TRegionListGetAllParamType) => {
  const res = await axiosInstance.post<IRegionListGetAllResponse>(
    endpoints.master.region.getAll('v1'),
    body,
  );

  return res;
};

export const regionListGetFn = async (id: string) => {
  const res = await axiosInstance.get<IRegionListGetResponse>(
    `${endpoints.master.region.get('v1')}/${id}`,
  );

  return res;
};

export const regionListCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IRegionListCreateResponse>(
    endpoints.master.region.create('v1'),
    body,
  );

  return res;
};

export const regionListUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IRegionListUpdateResponse>(
    endpoints.master.region.update('v1'),
    body,
  );

  return res;
};

export const regionListChangeStatusFn = async (body: TRegionListChangeStatusParamType) => {
  const res = await axiosInstance.post<IRegionListStatusChangeResponse>(
    endpoints.master.region.statusChange('v1'),
    body,
  );

  return res;
};

export const regionListDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IRegionListDeleteResponse>(
    `${endpoints.master.region.delete('v1')}/${id}`,
  );

  return res;
};
