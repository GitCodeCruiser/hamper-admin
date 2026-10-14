import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachTestimonial } from '@/types/apps/testimonial/index.type';

export interface ITestimonialGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachTestimonial[];
  };
}

export interface ITestimonialGetResponse extends BaseApiResponse {
  data: TEachTestimonial;
}

export interface ITestimonialCreateResponse extends BaseApiResponse {
  data: TEachTestimonial;
}

export interface ITestimonialUpdateResponse extends BaseApiResponse {
  data: TEachTestimonial;
}

export interface ITestimonialStatusChangeResponse extends BaseApiResponse {
  data: TEachTestimonial;
}

export interface ITestimonialDeleteResponse extends BaseApiResponse {
  data: TEachTestimonial;
}
