import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TTestimonialGetAllParamType = {} & TPaginationCommonType;

export type TTestimonialChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachTestimonial = {
  _id: string;
  pageName: string;
  pageSlug: string;
  title: string;
  description: string;
  company: string;
  status: string;
  createdAt: string;
  isDeleted: boolean;
  updatedAt: string;
};
