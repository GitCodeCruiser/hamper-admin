import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TAirportChangeStatusParamType,
  TAirportGetAllParamType,
} from '@/types/apps/airport/index.type';
import {
  IAirportCreateResponse,
  IAirportDeleteResponse,
  IAirportFeaturedResponse,
  IAirportGetAllResponse,
  IAirportGetResponse,
  IAirportStatusChangeResponse,
  IAirportUpdateResponse,
} from '@/types/interface/airport/index.interface';

export const airportGetAllFn = async (body: TAirportGetAllParamType) => {
  const res = await axiosInstance.post<IAirportGetAllResponse>(
    endpoints.airport.getAll('v1'),
    body,
  );

  return res;
};

export const airportGetFn = async (id: string) => {
  const res = await axiosInstance.get<IAirportGetResponse>(`${endpoints.airport.get('v1')}/${id}`);

  return res;
};

export const airportCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IAirportCreateResponse>(
    endpoints.airport.create('v1'),
    body,
  );

  return res;
};

export const airportUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IAirportUpdateResponse>(
    endpoints.airport.update('v1'),
    body,
  );

  return res;
};

export const airportDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IAirportDeleteResponse>(
    `${endpoints.airport.delete('v1')}/${id}`,
  );

  return res;
};

export const airportChangeStatusFn = async (body: TAirportChangeStatusParamType) => {
  const res = await axiosInstance.post<IAirportStatusChangeResponse>(
    endpoints.airport.statusChange('v1'),
    body,
  );

  return res;
};

export const airportMakeFeaturedFn = async (id: string) => {
  const res = await axiosInstance.get<IAirportFeaturedResponse>(
    `${endpoints.airport.makeFeature('v1')}/${id}`,
  );

  return res;
};

export const airportRestoreFn = async (id: string) => {
  const res = await axiosInstance.get<IAirportGetResponse>(
    `${endpoints.airport.restore('v1')}/${id}`,
  );

  return res;
};

export const airportHardDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IAirportDeleteResponse>(
    `${endpoints.airport.hardDelete('v1')}/${id}`,
  );

  return res;
};
