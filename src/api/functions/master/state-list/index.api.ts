import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { TStateListGetAllParamType } from '@/types/apps/master/state-list/index.type';
import { TTestimonialChangeStatusParamType } from '@/types/apps/testimonial/index.type';
import {
  IStateListCreateResponse,
  IStateListGetAllResponse,
  IStateListGetResponse,
  IStateListUpdateResponse,
} from '@/types/interface/master/state-list/index.interface';
import {
  ITestimonialDeleteResponse,
  ITestimonialStatusChangeResponse,
} from '@/types/interface/testimonial/index.interface';

export const stateListGetAllFn = async (body: TStateListGetAllParamType) => {
  const res = await axiosInstance.post<IStateListGetAllResponse>(
    endpoints.master.state.getAll('v1'),
    body,
  );

  return res;
};

export const stateListGetFn = async (id: string) => {
  const res = await axiosInstance.get<IStateListGetResponse>(
    `${endpoints.master.state.get('v1')}/${id}`,
  );

  return res;
};

export const stateListCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IStateListCreateResponse>(
    endpoints.master.state.create('v1'),
    body,
  );

  return res;
};

export const stateListUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IStateListUpdateResponse>(
    endpoints.master.state.update('v1'),
    body,
  );

  return res;
};

export const stateListChangeStatusFn = async (body: TTestimonialChangeStatusParamType) => {
  const res = await axiosInstance.post<ITestimonialStatusChangeResponse>(
    endpoints.master.state.statusChange('v1'),
    body,
  );

  return res;
};

export const stateListDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<ITestimonialDeleteResponse>(
    `${endpoints.master.state.delete('v1')}/${id}`,
  );

  return res;
};
