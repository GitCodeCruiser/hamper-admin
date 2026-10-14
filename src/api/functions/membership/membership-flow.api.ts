import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TMembershipCategoryChangeStatusParamType,
  TMembershipCategoryGetAllParamType,
  TMembershipChangeStatusParamType,
  TMembershipGetAllParamType,
} from '@/types/apps/membership/index.type';
import {
  IMembershipCategoryCreateResponse,
  IMembershipCategoryDeleteResponse,
  IMembershipCategoryGetAllResponse,
  IMembershipCategoryGetResponse,
  IMembershipCategoryStatusChangeResponse,
  IMembershipCategoryUpdateResponse,
  IMembershipCreateResponse,
  IMembershipDeleteResponse,
  IMembershipGetAllResponse,
  IMembershipGetResponse,
  IMembershipStatusChangeResponse,
  IMembershipUpdateResponse,
} from '@/types/interface/membership/membership-flow.interface';

export const membershipCategoryGetAllFn = async (body: TMembershipCategoryGetAllParamType) => {
  const res = await axiosInstance.post<IMembershipCategoryGetAllResponse>(
    endpoints.membership.category.getAll('v1'),
    body,
  );

  return res;
};

export const membershipCategoryGetFn = async (id: string) => {
  const res = await axiosInstance.get<IMembershipCategoryGetResponse>(
    `${endpoints.membership.category.get('v1')}/${id}`,
  );

  return res;
};

export const membershipCategoryCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IMembershipCategoryCreateResponse>(
    endpoints.membership.category.create('v1'),
    body,
  );

  return res;
};

export const membershipCategoryUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IMembershipCategoryUpdateResponse>(
    endpoints.membership.category.update('v1'),
    body,
  );

  return res;
};

export const membershipCategoryChangeStatusFn = async (
  body: TMembershipCategoryChangeStatusParamType,
) => {
  const res = await axiosInstance.post<IMembershipCategoryStatusChangeResponse>(
    endpoints.membership.category.statusChange('v1'),
    body,
  );

  return res;
};

export const membershipCategoryDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IMembershipCategoryDeleteResponse>(
    `${endpoints.membership.category.delete('v1')}/${id}`,
  );

  return res;
};

//  Below Membership --------------------------------------------------------->

export const membershipGetAllFn = async (body: TMembershipGetAllParamType) => {
  const res = await axiosInstance.post<IMembershipGetAllResponse>(
    endpoints.membership.getAll('v1'),
    body,
  );

  return res;
};

export const membershipGetFn = async (id: string) => {
  const res = await axiosInstance.get<IMembershipGetResponse>(
    `${endpoints.membership.get('v1')}/${id}`,
  );

  return res;
};

export const membershipCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IMembershipCreateResponse>(
    endpoints.membership.create('v1'),
    body,
  );

  return res;
};

export const membershipUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IMembershipUpdateResponse>(
    endpoints.membership.update('v1'),
    body,
  );

  return res;
};

export const membershipDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IMembershipDeleteResponse>(
    `${endpoints.membership.delete('v1')}/${id}`,
  );

  return res;
};

export const membershipChangeStatusFn = async (body: TMembershipChangeStatusParamType) => {
  const res = await axiosInstance.post<IMembershipStatusChangeResponse>(
    endpoints.membership.statusChange('v1'),
    body,
  );

  return res;
};

export const membershipReorderFn = async (body: { ids: string[] }) => {
  const res = await axiosInstance.post(endpoints.membership.reorder('v1'), body);

  return res;
};
