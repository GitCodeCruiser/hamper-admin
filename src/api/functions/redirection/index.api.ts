import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TRedirectionAddSchemaType,
  TRedirectionEditSchemaType,
} from '@/module/dashboard/validation/redirection/index.zod';
import {
  TRedirectionChangeStatusParamType,
  TRedirectionGetAllParamType,
} from '@/types/apps/redirection/index.type';
import {
  IRedirectionCreateResponse,
  IRedirectionDeleteResponse,
  IRedirectionGetAllResponse,
  IRedirectionGetResponse,
  IRedirectionStatusChangeResponse,
  IRedirectionUpdateResponse,
} from '@/types/interface/redirection/index.interface';

export const redirectionGetAllFn = async (body: TRedirectionGetAllParamType) => {
  const res = await axiosInstance.post<IRedirectionGetAllResponse>(
    endpoints.redirection.getAll('v1'),
    body,
  );

  return res;
};

export const redirectionGetFn = async (id: string) => {
  const res = await axiosInstance.get<IRedirectionGetResponse>(
    `${endpoints.redirection.get('v1')}/${id}`,
  );

  return res;
};

export const redirectionCreateFn = async (body: TRedirectionAddSchemaType) => {
  const res = await axiosInstance.post<IRedirectionCreateResponse>(
    endpoints.redirection.create('v1'),
    body,
  );

  return res;
};

export const redirectionUpdateFn = async (body: TRedirectionEditSchemaType) => {
  const res = await axiosInstance.post<IRedirectionUpdateResponse>(
    endpoints.redirection.update('v1'),
    body,
  );

  return res;
};

export const redirectionChangeStatusFn = async (body: TRedirectionChangeStatusParamType) => {
  const res = await axiosInstance.post<IRedirectionStatusChangeResponse>(
    endpoints.redirection.statusChange('v1'),
    body,
  );

  return res;
};

export const redirectionDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IRedirectionDeleteResponse>(
    `${endpoints.redirection.delete('v1')}/${id}`,
  );

  return res;
};
