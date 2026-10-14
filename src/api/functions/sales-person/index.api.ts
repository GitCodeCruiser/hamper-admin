import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TSalesPersonChangeStatusParamType,
  TSalesPersonGetAllParamType,
} from '@/types/apps/sales-person/index.type';
import {
  ISalesPersonCreateResponse,
  ISalesPersonDeleteResponse,
  ISalesPersonGetAllResponse,
  ISalesPersonGetResponse,
  ISalesPersonStatusChangeResponse,
  ISalesPersonUpdateResponse,
} from '@/types/interface/sales-person/index.interface';

export const salesPersonGetAllFn = async (body: TSalesPersonGetAllParamType) => {
  const res = await axiosInstance.post<ISalesPersonGetAllResponse>(
    endpoints.salesPerson.getAll('v1'),
    body,
  );

  return res;
};

export const salesPersonGetFn = async (id: string) => {
  const res = await axiosInstance.get<ISalesPersonGetResponse>(
    `${endpoints.salesPerson.get('v1')}/${id}`,
  );

  return res;
};

export const salesPersonCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ISalesPersonCreateResponse>(
    endpoints.salesPerson.create('v1'),
    body,
  );

  return res;
};

export const salesPersonUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ISalesPersonUpdateResponse>(
    endpoints.salesPerson.update('v1'),
    body,
  );

  return res;
};

export const salesPersonChangeStatusFn = async (body: TSalesPersonChangeStatusParamType) => {
  const res = await axiosInstance.post<ISalesPersonStatusChangeResponse>(
    endpoints.salesPerson.statusChange('v1'),
    body,
  );

  return res;
};

export const salesPersonDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<ISalesPersonDeleteResponse>(
    `${endpoints.salesPerson.delete('v1')}/${id}`,
  );

  return res;
};
