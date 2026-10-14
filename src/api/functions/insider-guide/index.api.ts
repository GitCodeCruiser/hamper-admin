import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TInsiderGuideChangeStatusParamType,
  TInsiderGuideGetAllParamType,
} from '@/types/apps/insider-guide/index.type';
import {
  IInsiderGuideCreateResponse,
  IInsiderGuideDeleteResponse,
  IInsiderGuideFeaturedResponse,
  IInsiderGuideGetAllResponse,
  IInsiderGuideGetResponse,
  IInsiderGuideStatusChangeResponse,
  IInsiderGuideUpdateResponse,
} from '@/types/interface/insider-guide/index.interface';

export const insiderGuideGetAllFn = async (body: TInsiderGuideGetAllParamType) => {
  const res = await axiosInstance.post<IInsiderGuideGetAllResponse>(
    endpoints.insiderGuide.getAll('v1'),
    body,
  );

  return res;
};

export const insiderGuideGetFn = async (id: string) => {
  const res = await axiosInstance.get<IInsiderGuideGetResponse>(
    `${endpoints.insiderGuide.get('v1')}/${id}`,
  );

  return res;
};

export const insiderGuideCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IInsiderGuideCreateResponse>(
    endpoints.insiderGuide.create('v1'),
    body,
  );

  return res;
};

export const insiderGuideUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IInsiderGuideUpdateResponse>(
    endpoints.insiderGuide.update('v1'),
    body,
  );

  return res;
};

export const insiderGuideDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IInsiderGuideDeleteResponse>(
    `${endpoints.insiderGuide.delete('v1')}/${id}`,
  );

  return res;
};

export const insiderGuideChangeStatusFn = async (body: TInsiderGuideChangeStatusParamType) => {
  const res = await axiosInstance.post<IInsiderGuideStatusChangeResponse>(
    endpoints.insiderGuide.statusChange('v1'),
    body,
  );

  return res;
};

export const insiderGuideMakeFeaturedFn = async (id: string) => {
  const res = await axiosInstance.get<IInsiderGuideFeaturedResponse>(
    `${endpoints.insiderGuide.makeFeature('v1')}/${id}`,
  );

  return res;
};
