import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { TCityListGetAllParamType } from '@/types/apps/master/city-list/index.type';
import { TTestimonialChangeStatusParamType } from '@/types/apps/testimonial/index.type';
import {
  ICityListCreateResponse,
  ICityListGetAllResponse,
  ICityListGetResponse,
  ICityListUpdateResponse,
} from '@/types/interface/master/city-list/index.interface';
import {
  ITestimonialDeleteResponse,
  ITestimonialStatusChangeResponse,
} from '@/types/interface/testimonial/index.interface';

export const cityListGetAllFn = async (body: TCityListGetAllParamType) => {
  const res = await axiosInstance.post<ICityListGetAllResponse>(
    endpoints.master.city.getAll('v1'),
    body,
  );

  return res;
};

export const cityListGetFn = async (id: string) => {
  const res = await axiosInstance.get<ICityListGetResponse>(
    `${endpoints.master.city.get('v1')}/${id}`,
  );

  return res;
};

export const cityListCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ICityListCreateResponse>(
    endpoints.master.city.create('v1'),
    body,
  );

  return res;
};

export const cityListUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ICityListUpdateResponse>(
    endpoints.master.city.update('v1'),
    body,
  );

  return res;
};

export const cityListChangeStatusFn = async (body: TTestimonialChangeStatusParamType) => {
  const res = await axiosInstance.post<ITestimonialStatusChangeResponse>(
    endpoints.master.city.statusChange('v1'),
    body,
  );

  return res;
};

export const cityListDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<ITestimonialDeleteResponse>(
    `${endpoints.master.city.delete('v1')}/${id}`,
  );

  return res;
};
