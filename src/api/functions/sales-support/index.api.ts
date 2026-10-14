import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { TSalesSupportReplySchemaType } from '@/module/dashboard/validation/sales-support/index.zod';
import { TSalesSupportGetAllParamType } from '@/types/apps/sales-support/index.type';
import {
  ISalesSupportDeleteResponse,
  ISalesSupportGetAllResponse,
  ISalesSupportGetResponse,
  ISalesSupportSendReplyResponse,
} from '@/types/interface/sales-support/index.interface';

export const salesSupportGetAllFn = async (body: TSalesSupportGetAllParamType) => {
  const res = await axiosInstance.post<ISalesSupportGetAllResponse>(
    endpoints.supportTicket.getAll('v1'),
    body,
  );

  return res;
};

export const salesSupportGetFn = async (id: string) => {
  const res = await axiosInstance.get<ISalesSupportGetResponse>(
    `${endpoints.supportTicket.get('v1')}/${id}`,
  );

  return res;
};

export const salesSupportDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<ISalesSupportDeleteResponse>(
    `${endpoints.supportTicket.delete('v1')}/${id}`,
  );

  return res;
};

export const salesSupportSendReplyFn = async (body: TSalesSupportReplySchemaType) => {
  const res = await axiosInstance.post<ISalesSupportSendReplyResponse>(
    endpoints.supportTicket.sendReply('v1'),
    body,
  );

  return res;
};
