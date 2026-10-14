import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TCategoryVsPremiumCreateType,
  TCategoryVsPremiumListingParamType,
  TCategoryVsPremiumUpdateType,
} from '@/types/apps/cms/categoryVsPremium/index.type';
import {
  ICategoryVsPremiumCreateResponse,
  ICategoryVsPremiumDeleteResponse,
  ICategoryVsPremiumGetResponse,
  ICategoryVsPremiumListingResponse,
  ICategoryVsPremiumUpdateResponse,
} from '@/types/interface/cms/categoryVsPremium/index.interface';

export const categoryVsPremiumListingFn = async (body: TCategoryVsPremiumListingParamType) => {
  const res = await axiosInstance.post<ICategoryVsPremiumListingResponse>(
    endpoints.cms.categoryVsPremium.listing('v1'),
    body,
  );

  return res;
};

export const categoryVsPremiumGetFn = async (id: string) => {
  const res = await axiosInstance.get<ICategoryVsPremiumGetResponse>(
    `${endpoints.cms.categoryVsPremium.get('v1')}/${id}`,
  );

  return res;
};

export const categoryVsPremiumCreateFn = async (body: TCategoryVsPremiumCreateType) => {
  const res = await axiosInstance.post<ICategoryVsPremiumCreateResponse>(
    endpoints.cms.categoryVsPremium.create('v1'),
    body,
  );

  return res;
};

export const categoryVsPremiumUpdateFn = async (body: TCategoryVsPremiumUpdateType) => {
  const res = await axiosInstance.post<ICategoryVsPremiumUpdateResponse>(
    endpoints.cms.categoryVsPremium.update('v1'),
    body,
  );

  return res;
};

export const categoryVsPremiumDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<ICategoryVsPremiumDeleteResponse>(
    `${endpoints.cms.categoryVsPremium.delete('v1')}/${id}`,
  );

  return res;
};
