import { TPaginationCommonType } from '@/types/common/common.type';

export type TSalesSupportGetAllParamType = {} & TPaginationCommonType;

export type TSalesSupportAdminReply = {
  _id: string;
  supportId: string;
  message: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TEachSalesSupport = {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  message: string;
  isReplied: boolean;
  createdAt: string;
  supportReplies: TSalesSupportAdminReply[];
};
