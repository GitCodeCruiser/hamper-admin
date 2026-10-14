import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { TMattFactsListingParamType } from '@/types/apps/cms/mattFacts/index.type';
import {
  IMattFactsCreateResponse,
  IMattFactsDeleteResponse,
  IMattFactsGetResponse,
  IMattFactsListingResponse,
  IMattFactsUpdateResponse,
} from '@/types/interface/cms/mattFacts/index.interface';

export const mattFactsListingFn = async (body: TMattFactsListingParamType) => {
  const res = await axiosInstance.post<IMattFactsListingResponse>(
    endpoints.cms.mattFacts.listing('v1'),
    body,
  );

  return res;
};

export const mattFactsGetFn = async (id: string) => {
  const res = await axiosInstance.get<IMattFactsGetResponse>(
    `${endpoints.cms.mattFacts.get('v1')}/${id}`,
  );

  return res;
};

export const mattFactsCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IMattFactsCreateResponse>(
    endpoints.cms.mattFacts.create('v1'),
    body,
  );

  return res;
};

export const mattFactsUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IMattFactsUpdateResponse>(
    endpoints.cms.mattFacts.update('v1'),
    body,
  );

  return res;
};

export const mattFactsDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IMattFactsDeleteResponse>(
    `${endpoints.cms.mattFacts.delete('v1')}/${id}`,
  );

  return res;
};
