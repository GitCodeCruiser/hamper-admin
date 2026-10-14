import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { TLegEnquiryReplySchemaType } from '@/module/dashboard/validation/leg-enquiry/index.zod';
import { TLegEnquiryGetAllParamType } from '@/types/apps/leg-enquiry/index.type';
import {
  ILegEnquiryDeleteResponse,
  ILegEnquiryGetAllResponse,
  ILegEnquiryGetResponse,
  ILegEnquirySendReplyResponse,
} from '@/types/interface/leg-enquiry/index.interface';

export const legEnquiryGetAllFn = async (body: TLegEnquiryGetAllParamType) => {
  const res = await axiosInstance.post<ILegEnquiryGetAllResponse>(
    endpoints.legEnquiry.getAll('v1'),
    body,
  );

  return res;
};

export const legEnquiryGetFn = async (id: string) => {
  const res = await axiosInstance.get<ILegEnquiryGetResponse>(
    `${endpoints.legEnquiry.get('v1')}/${id}`,
  );

  return res;
};

export const legEnquiryDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<ILegEnquiryDeleteResponse>(
    `${endpoints.legEnquiry.delete('v1')}/${id}`,
  );

  return res;
};

export const legEnquirySendReplyFn = async (body: TLegEnquiryReplySchemaType) => {
  const res = await axiosInstance.post<ILegEnquirySendReplyResponse>(
    endpoints.legEnquiry.sendReply('v1'),
    body,
  );

  return res;
};
