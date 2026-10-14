import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { TContactUsReplySchemaType } from '@/module/dashboard/validation/contact-us/index.zod';
import { TContactUsGetAllParamType } from '@/types/apps/contact-us/index.type';
import {
  IContactUsDeleteResponse,
  IContactUsGetAllResponse,
  IContactUsGetResponse,
  IContactUsSendReplyResponse,
} from '@/types/interface/contact-us/index.interface';

export const contactUsGetAllFn = async (body: TContactUsGetAllParamType) => {
  const res = await axiosInstance.post<IContactUsGetAllResponse>(
    endpoints.contactUs.getAll('v1'),
    body,
  );

  return res;
};

export const contactUsGetFn = async (id: string) => {
  const res = await axiosInstance.get<IContactUsGetResponse>(
    `${endpoints.contactUs.get('v1')}/${id}`,
  );

  return res;
};

export const contactUsDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IContactUsDeleteResponse>(
    `${endpoints.contactUs.delete('v1')}/${id}`,
  );

  return res;
};

export const contactUsSendReplyFn = async (body: TContactUsReplySchemaType) => {
  const res = await axiosInstance.post<IContactUsSendReplyResponse>(
    endpoints.contactUs.sendReply('v1'),
    body,
  );

  return res;
};
