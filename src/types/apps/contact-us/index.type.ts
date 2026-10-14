import { TPaginationCommonType } from '@/types/common/common.type';

export type TContactUsGetAllParamType = {} & TPaginationCommonType;

export type TAdminReply = {
  _id: string;
  contactId: string;
  message: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TEachContactUs = {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  message: string;
  phone: string;
  countryCode: string;
  isReplied: boolean;
  createdAt: string;
  adminReplies: TAdminReply[];
};
