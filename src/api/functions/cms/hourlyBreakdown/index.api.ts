import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  THourlyBreakdownCreateType,
  THourlyBreakdownListingParamType,
  THourlyBreakdownUpdateType,
} from '@/types/apps/cms/hourlyBreakdown/index.type';
import {
  IHourlyBreakdownCreateResponse,
  IHourlyBreakdownDeleteResponse,
  IHourlyBreakdownGetResponse,
  IHourlyBreakdownListingResponse,
  IHourlyBreakdownUpdateResponse,
} from '@/types/interface/cms/hourlyBreakdown/index.interface';

export const hourlyBreakdownListingFn = async (body: THourlyBreakdownListingParamType) => {
  const res = await axiosInstance.post<IHourlyBreakdownListingResponse>(
    endpoints.cms.hourlyBreakdown.listing('v1'),
    body,
  );

  return res;
};

export const hourlyBreakdownGetFn = async (id: string) => {
  const res = await axiosInstance.get<IHourlyBreakdownGetResponse>(
    `${endpoints.cms.hourlyBreakdown.get('v1')}/${id}`,
  );

  return res;
};

export const hourlyBreakdownCreateFn = async (body: THourlyBreakdownCreateType) => {
  const res = await axiosInstance.post<IHourlyBreakdownCreateResponse>(
    endpoints.cms.hourlyBreakdown.create('v1'),
    body,
  );

  return res;
};

export const hourlyBreakdownUpdateFn = async (body: THourlyBreakdownUpdateType) => {
  const res = await axiosInstance.post<IHourlyBreakdownUpdateResponse>(
    endpoints.cms.hourlyBreakdown.update('v1'),
    body,
  );

  return res;
};

export const hourlyBreakdownDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IHourlyBreakdownDeleteResponse>(
    `${endpoints.cms.hourlyBreakdown.delete('v1')}/${id}`,
  );

  return res;
};
