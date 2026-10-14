import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TPartnershipChangeStatusParamType,
  TPartnershipGetAllParamType,
} from '@/types/apps/partnerships/index.type';
import {
  IPartnershipCreateResponse,
  IPartnershipDeleteResponse,
  IPartnershipFeaturedResponse,
  IPartnershipGetAllResponse,
  IPartnershipGetResponse,
  IPartnershipStatusChangeResponse,
  IPartnershipUpdateResponse,
} from '@/types/interface/partnerships/index.interface';

export const partnershipGetAllFn = async (body: TPartnershipGetAllParamType) => {
  const res = await axiosInstance.post<IPartnershipGetAllResponse>(
    endpoints.partnerships.getAll('v1'),
    body,
  );

  return res;
};

export const partnershipGetFn = async (id: string) => {
  const res = await axiosInstance.get<IPartnershipGetResponse>(
    `${endpoints.partnerships.get('v1')}/${id}`,
  );

  return res;
};

export const partnershipCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IPartnershipCreateResponse>(
    endpoints.partnerships.create('v1'),
    body,
  );

  return res;
};

export const partnershipUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IPartnershipUpdateResponse>(
    endpoints.partnerships.update('v1'),
    body,
  );

  return res;
};

export const partnershipDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IPartnershipDeleteResponse>(
    `${endpoints.partnerships.delete('v1')}/${id}`,
  );

  return res;
};

export const partnershipChangeStatusFn = async (body: TPartnershipChangeStatusParamType) => {
  const res = await axiosInstance.post<IPartnershipStatusChangeResponse>(
    endpoints.partnerships.statusChange('v1'),
    body,
  );

  return res;
};

export const partnershipMakeFeaturedFn = async (id: string) => {
  const res = await axiosInstance.get<IPartnershipFeaturedResponse>(
    `${endpoints.partnerships.makeFeature('v1')}/${id}`,
  );

  return res;
};
