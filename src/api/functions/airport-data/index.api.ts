import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TAirportDataChangeStatusParamType,
  TAirportDataGetAllParamType,
} from '@/types/apps/airport-data/index.type';
import {
  IAirportDataCreateResponse,
  IAirportDataDeleteResponse,
  IAirportDataGetAllResponse,
  IAirportDataGetResponse,
  IAirportDataListingResponse,
  IAirportDataStatusChangeResponse,
  IAirportDataUpdateResponse,
} from '@/types/interface/airport-data/index.interface';

export const airportDataGetAllFn = async (body: TAirportDataGetAllParamType) => {
  const res = await axiosInstance.post<IAirportDataGetAllResponse>(
    endpoints.airportData.getAll('v1'),
    body,
  );

  return res;
};

export const airportDataGetFn = async (id: string) => {
  const res = await axiosInstance.get<IAirportDataGetResponse>(
    `${endpoints.airportData.get('v1')}/${id}`,
  );

  return res;
};

export const airportDataCreateFn = async (body: Record<string, any>) => {
  const res = await axiosInstance.post<IAirportDataCreateResponse>(
    endpoints.airportData.create('v1'),
    body,
  );

  return res;
};

export const airportDataUpdateFn = async (body: Record<string, any>) => {
  const res = await axiosInstance.post<IAirportDataUpdateResponse>(
    endpoints.airportData.update('v1'),
    body,
  );

  return res;
};

export const airportDataDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IAirportDataDeleteResponse>(
    `${endpoints.airportData.delete('v1')}/${id}`,
  );

  return res;
};

export const airportDataChangeStatusFn = async (body: TAirportDataChangeStatusParamType) => {
  const res = await axiosInstance.post<IAirportDataStatusChangeResponse>(
    endpoints.airportData.statusChange('v1'),
    body,
  );

  return res;
};

export const airportDataRestoreFn = async (id: string) => {
  const res = await axiosInstance.get<IAirportDataGetResponse>(
    `${endpoints.airportData.restore('v1')}/${id}`,
  );

  return res;
};

export const airportDataHardDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IAirportDataDeleteResponse>(
    `${endpoints.airportData.hardDelete('v1')}/${id}`,
  );

  return res;
};

export const airportDataListingFn = async (body: { search?: string }) => {
  const res = await axiosInstance.post<IAirportDataListingResponse>(
    endpoints.airportData.listing('v1'),
    body,
  );

  return res;
};
