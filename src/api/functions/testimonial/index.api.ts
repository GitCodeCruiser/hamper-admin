import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TTestimonialAddSchemaType,
  TTestimonialEditSchemaType,
} from '@/module/dashboard/validation/testimonial/index.zod';
import {
  TTestimonialChangeStatusParamType,
  TTestimonialGetAllParamType,
} from '@/types/apps/testimonial/index.type';
import {
  ITestimonialCreateResponse,
  ITestimonialDeleteResponse,
  ITestimonialGetAllResponse,
  ITestimonialGetResponse,
  ITestimonialStatusChangeResponse,
  ITestimonialUpdateResponse,
} from '@/types/interface/testimonial/index.interface';

export const testimonialGetAllFn = async (body: TTestimonialGetAllParamType) => {
  const res = await axiosInstance.post<ITestimonialGetAllResponse>(
    endpoints.testimonial.getAll('v1'),
    body,
  );

  return res;
};

export const testimonialGetFn = async (id: string) => {
  const res = await axiosInstance.get<ITestimonialGetResponse>(
    `${endpoints.testimonial.get('v1')}/${id}`,
  );

  return res;
};

export const testimonialCreateFn = async (body: TTestimonialAddSchemaType) => {
  const res = await axiosInstance.post<ITestimonialCreateResponse>(
    endpoints.testimonial.create('v1'),
    body,
  );

  return res;
};

export const testimonialUpdateFn = async (body: TTestimonialEditSchemaType) => {
  const res = await axiosInstance.post<ITestimonialUpdateResponse>(
    endpoints.testimonial.update('v1'),
    body,
  );

  return res;
};

export const testimonialChangeStatusFn = async (body: TTestimonialChangeStatusParamType) => {
  const res = await axiosInstance.post<ITestimonialStatusChangeResponse>(
    endpoints.testimonial.statusChange('v1'),
    body,
  );

  return res;
};

export const testimonialDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<ITestimonialDeleteResponse>(
    `${endpoints.testimonial.delete('v1')}/${id}`,
  );

  return res;
};
