import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TCountryListGetAllParamType,
  TCountryListShowInCMSParamType,
} from '@/types/apps/master/country-list/index.type';
import { TTestimonialChangeStatusParamType } from '@/types/apps/testimonial/index.type';
import {
  ICountryListCreateResponse,
  ICountryListGetAllResponse,
  ICountryListGetResponse,
  ICountryListUpdateResponse,
  ICountryListStatusChangeResponse,
} from '@/types/interface/master/country-list/index.interface';
import {
  ITestimonialDeleteResponse,
  ITestimonialStatusChangeResponse,
} from '@/types/interface/testimonial/index.interface';

export const countryListGetAllFn = async (body: TCountryListGetAllParamType) => {
  const res = await axiosInstance.post<ICountryListGetAllResponse>(
    endpoints.master.country.getAll('v1'),
    body,
  );

  return res;
};

export const countryListGetFn = async (id: string) => {
  const res = await axiosInstance.get<ICountryListGetResponse>(
    `${endpoints.master.country.get('v1')}/${id}`,
  );

  return res;
};

export const countryListCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ICountryListCreateResponse>(
    endpoints.master.country.create('v1'),
    body,
  );

  return res;
};

export const countryListUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ICountryListUpdateResponse>(
    endpoints.master.country.update('v1'),
    body,
  );

  return res;
};

export const countryListChangeStatusFn = async (body: TTestimonialChangeStatusParamType) => {
  const res = await axiosInstance.post<ITestimonialStatusChangeResponse>(
    endpoints.master.country.statusChange('v1'),
    body,
  );

  return res;
};

export const countryListShowInCMSFn = async (body: TCountryListShowInCMSParamType) => {
  const res = await axiosInstance.post<ICountryListStatusChangeResponse>(
    endpoints.master.country.showInCMS('v1'),
    body,
  );

  return res;
};

export const countryListDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<ITestimonialDeleteResponse>(
    `${endpoints.master.country.delete('v1')}/${id}`,
  );

  return res;
};
