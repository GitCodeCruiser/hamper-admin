import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TSalesPersonGetAllParamType = {} & TPaginationCommonType;

export type TSalesPersonChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachSalesPerson = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  profileImage: string;
  status: TStatusChangeType;
  createdAt: string;
  isDeleted: boolean;
  updatedAt: string;
};
