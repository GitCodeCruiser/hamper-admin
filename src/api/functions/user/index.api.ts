import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TUserChangeStatusParamType,
  TUserGetAllParamType,
} from '@/types/apps/user/index.type';
import {
  IUserCreateResponse,
  IUserDeleteResponse,
  IUserGetAllResponse,
  IUserGetResponse,
  IUserStatusChangeResponse,
  IUserUpdateResponse,
} from '@/types/interface/user/index.interface';

export const userGetAllFn = async (body: TUserGetAllParamType) => {
  const res = await axiosInstance.post<IUserGetAllResponse>(
    endpoints.users.getAll('v1'),
    body,
  );

  return res;
};

export const userGetFn = async (id: string) => {
  const res = await axiosInstance.get<IUserGetResponse>(
    `${endpoints.users.get('v1')}/${id}`,
  );

  return res;
};

export const userCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IUserCreateResponse>(
    endpoints.users.create('v1'),
    body,
  );

  return res;
};

export const userUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IUserUpdateResponse>(
    endpoints.users.update('v1'),
    body,
  );

  return res;
};

export const userChangeStatusFn = async (body: TUserChangeStatusParamType) => {
  const res = await axiosInstance.post<IUserStatusChangeResponse>(
    endpoints.users.statusChange('v1'),
    body,
  );

  return res;
};

export const userDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IUserDeleteResponse>(
    `${endpoints.users.delete('v1')}/${id}`,
  );

  return res;
};
