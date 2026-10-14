import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { TBlogChangeStatusParamType, TBlogGetAllParamType } from '@/types/apps/blog/index.type';
import {
  IBlogCreateResponse,
  IBlogDeleteResponse,
  IBlogFeaturedResponse,
  IBlogGetAllResponse,
  IBlogGetResponse,
  IBlogStatusChangeResponse,
  IBlogUpdateResponse,
} from '@/types/interface/blog/index.interface';

export const blogGetAllFn = async (body: TBlogGetAllParamType) => {
  const res = await axiosInstance.post<IBlogGetAllResponse>(endpoints.blog.getAll('v1'), body);

  return res;
};

export const blogGetFn = async (id: string) => {
  const res = await axiosInstance.get<IBlogGetResponse>(`${endpoints.blog.get('v1')}/${id}`);

  return res;
};

export const blogCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IBlogCreateResponse>(endpoints.blog.create('v1'), body);

  return res;
};

export const blogUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IBlogUpdateResponse>(endpoints.blog.update('v1'), body);

  return res;
};

export const blogDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IBlogDeleteResponse>(`${endpoints.blog.delete('v1')}/${id}`);

  return res;
};

export const blogChangeStatusFn = async (body: TBlogChangeStatusParamType) => {
  const res = await axiosInstance.post<IBlogStatusChangeResponse>(
    endpoints.blog.statusChange('v1'),
    body,
  );

  return res;
};

export const blogMakeFeaturedFn = async (id: string) => {
  const res = await axiosInstance.get<IBlogFeaturedResponse>(
    `${endpoints.blog.makeFeature('v1')}/${id}`,
  );

  return res;
};
