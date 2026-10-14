import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { TCharterEnquiryGetAllParamType } from '@/types/apps/charter-enquiry/index.type';
import {
  ICharterEnquiryGetAllResponse,
  ICharterEnquiryGetResponse,
} from '@/types/interface/charter-enquiry/index.interface';

export const charterEnquiryGetAllFn = async (body: TCharterEnquiryGetAllParamType) => {
  const res = await axiosInstance.post<ICharterEnquiryGetAllResponse>(
    endpoints.charterEnquiry.getAll('v1'),
    body,
  );

  return res;
};

export const charterEnquiryGetFn = async (id: string) => {
  const res = await axiosInstance.get<ICharterEnquiryGetResponse>(
    `${endpoints.charterEnquiry.get('v1')}/${id}`,
  );

  return res;
};

export const charterEnquiryAssignSalesPersonFn = async ({
  enquiryId,
  userId,
}: {
  enquiryId: string;
  userId: string;
}) => {
  const res = await axiosInstance.patch<ICharterEnquiryGetResponse>(
    `${endpoints.charterEnquiry.assignSalesPerson('v1')}/${enquiryId}`,
    { userId },
  );

  return res;
};
