import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TAircraftOptionsCategoryChangeStatusParamType,
  TAircraftOptionsCategoryGetAllParamType,
  TAircraftOptionsChangeStatusParamType,
  TAircraftOptionsGetAllParamType,
} from '@/types/apps/aircraft-options/index.type';
import {
  IAircraftOptionsCategoryCreateResponse,
  IAircraftOptionsCategoryDeleteResponse,
  IAircraftOptionsCategoryGetAllResponse,
  IAircraftOptionsCategoryGetResponse,
  IAircraftOptionsCategoryStatusChangeResponse,
  IAircraftOptionsCategoryUpdateResponse,
  IAircraftOptionsCreateResponse,
  IAircraftOptionsDeleteResponse,
  IAircraftOptionsGetAllResponse,
  IAircraftOptionsGetResponse,
  IAircraftOptionsStatusChangeResponse,
  IAircraftOptionsUpdateResponse,
} from '@/types/interface/aircraft-options/aircraft-options-flow.interface';

export const aircraftOptionsCategoryGetAllFn = async (
  body: TAircraftOptionsCategoryGetAllParamType,
) => {
  const res = await axiosInstance.post<IAircraftOptionsCategoryGetAllResponse>(
    endpoints.aircraftOptions.category.getAll('v1'),
    body,
  );

  return res;
};

export const aircraftOptionsCategoryGetFn = async (id: string) => {
  const res = await axiosInstance.get<IAircraftOptionsCategoryGetResponse>(
    `${endpoints.aircraftOptions.category.get('v1')}/${id}`,
  );

  return res;
};

export const aircraftOptionsCategoryCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IAircraftOptionsCategoryCreateResponse>(
    endpoints.aircraftOptions.category.create('v1'),
    body,
  );

  return res;
};

export const aircraftOptionsCategoryUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IAircraftOptionsCategoryUpdateResponse>(
    endpoints.aircraftOptions.category.update('v1'),
    body,
  );

  return res;
};

export const aircraftOptionsCategoryChangeStatusFn = async (
  body: TAircraftOptionsCategoryChangeStatusParamType,
) => {
  const res = await axiosInstance.post<IAircraftOptionsCategoryStatusChangeResponse>(
    endpoints.aircraftOptions.category.statusChange('v1'),
    body,
  );

  return res;
};

export const aircraftOptionsCategoryDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IAircraftOptionsCategoryDeleteResponse>(
    `${endpoints.aircraftOptions.category.delete('v1')}/${id}`,
  );

  return res;
};

//  Below Aircraft Options --------------------------------------------------------->

export const aircraftOptionsGetAllFn = async (body: TAircraftOptionsGetAllParamType) => {
  const res = await axiosInstance.post<IAircraftOptionsGetAllResponse>(
    endpoints.aircraftOptions.getAll('v1'),
    body,
  );

  return res;
};

export const aircraftOptionsGetFn = async (id: string) => {
  const res = await axiosInstance.get<IAircraftOptionsGetResponse>(
    `${endpoints.aircraftOptions.get('v1')}/${id}`,
  );

  return res;
};

export const aircraftOptionsCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IAircraftOptionsCreateResponse>(
    endpoints.aircraftOptions.create('v1'),
    body,
  );

  return res;
};

export const aircraftOptionsUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IAircraftOptionsUpdateResponse>(
    endpoints.aircraftOptions.update('v1'),
    body,
  );

  return res;
};

export const aircraftOptionsDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IAircraftOptionsDeleteResponse>(
    `${endpoints.aircraftOptions.delete('v1')}/${id}`,
  );

  return res;
};

export const aircraftOptionsChangeStatusFn = async (
  body: TAircraftOptionsChangeStatusParamType,
) => {
  const res = await axiosInstance.post<IAircraftOptionsStatusChangeResponse>(
    endpoints.aircraftOptions.statusChange('v1'),
    body,
  );

  return res;
};

export const aircraftOptionsReorderFn = async (body: { ids: string[] }) => {
  const res = await axiosInstance.post(endpoints.aircraftOptions.reorder('v1'), body);

  return res;
};
