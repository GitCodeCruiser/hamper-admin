import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TCmsSectionContentCreateType,
  TCmsSectionContentListingParamType,
  TCmsSectionContentUpdateType,
} from '@/types/apps/cms/sectionContent/index.type';
import {
  ICmsSectionContentCreateResponse,
  ICmsSectionContentDeleteResponse,
  ICmsSectionContentGetResponse,
  ICmsSectionContentListingResponse,
  ICmsSectionContentUpdateResponse,
} from '@/types/interface/cms/sectionContent/index.interface';

export const cmsSectionContentListingFn = async (body: TCmsSectionContentListingParamType) => {
  const res = await axiosInstance.post<ICmsSectionContentListingResponse>(
    endpoints.cms.sectionContent.listing('v1'),
    body,
  );

  return res;
};

export const cmsSectionContentGetFn = async (id: string) => {
  const res = await axiosInstance.get<ICmsSectionContentGetResponse>(
    `${endpoints.cms.sectionContent.get('v1')}/${id}`,
  );

  return res;
};

export const cmsSectionContentCreateFn = async (body: TCmsSectionContentCreateType) => {
  const res = await axiosInstance.post<ICmsSectionContentCreateResponse>(
    endpoints.cms.sectionContent.create('v1'),
    body,
  );

  return res;
};

export const cmsSectionContentUpdateFn = async (body: TCmsSectionContentUpdateType) => {
  const res = await axiosInstance.post<ICmsSectionContentUpdateResponse>(
    endpoints.cms.sectionContent.update('v1'),
    body,
  );

  return res;
};

export const cmsSectionContentDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<ICmsSectionContentDeleteResponse>(
    `${endpoints.cms.sectionContent.delete('v1')}/${id}`,
  );

  return res;
};
