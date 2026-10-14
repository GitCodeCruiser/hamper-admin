import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TCmsMainContentCreateType,
  TCmsMainContentListingParamType,
  TCmsMainContentUpdateType,
} from '@/types/apps/cms/main/index.type';
import {
  ICmsMainContentCreateResponse,
  ICmsMainContentGetResponse,
  ICmsMainContentListingResponse,
  ICmsMainContentUpdateResponse,
} from '@/types/interface/cms/main/index.interface';

export const cmsMainContentListingFn = async (body: TCmsMainContentListingParamType) => {
  const res = await axiosInstance.post<ICmsMainContentListingResponse>(
    endpoints.cms.main.listing('v1'),
    body,
  );

  return res;
};

export const cmsMainContentGetFn = async (id: string) => {
  const res = await axiosInstance.get<ICmsMainContentGetResponse>(
    `${endpoints.cms.main.get('v1')}/${id}`,
  );

  return res;
};

export const cmsMainContentCreateFn = async (body: TCmsMainContentCreateType) => {
  const res = await axiosInstance.post<ICmsMainContentCreateResponse>(
    endpoints.cms.main.create('v1'),
    body,
  );

  return res;
};

export const cmsMainContentUpdateFn = async (body: TCmsMainContentUpdateType) => {
  const res = await axiosInstance.post<ICmsMainContentUpdateResponse>(
    endpoints.cms.main.update('v1'),
    body,
  );

  return res;
};
