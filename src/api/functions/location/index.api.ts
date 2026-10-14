import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TLocationCityListParamType,
  TLocationCountryListParamType,
  TLocationStateListParamType,
} from '@/types/apps/location/index.type';
import {
  ILocationCityResponse,
  ILocationCountryResponse,
  ILocationStateResponse,
} from '@/types/interface/location/index.interface';

export const locationCountryListFn = async (body: TLocationCountryListParamType) => {
  const res = await axiosInstance.post<ILocationCountryResponse>(
    endpoints.location.countryList('v1'),
    body,
  );

  return res;
};

export const locationStateListFn = async (body: TLocationStateListParamType) => {
  const res = await axiosInstance.post<ILocationStateResponse>(
    endpoints.location.stateList('v1'),
    body,
  );

  return res;
};

export const locationCityListFn = async (body: TLocationCityListParamType) => {
  const res = await axiosInstance.post<ILocationCityResponse>(
    endpoints.location.cityList('v1'),
    body,
  );

  return res;
};
