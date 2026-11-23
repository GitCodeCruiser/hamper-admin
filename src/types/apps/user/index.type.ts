import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TUserGetAllParamType = {} & TPaginationCommonType;

export type TUserChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachAdminUser = {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  profileImage?: string;
  status: TStatusChangeType;
  createdAt: string;
  isDeleted: boolean;
  updatedAt: string;
  role?: {
    _id: string;
    role: string;
    roleDisplayName: string;
  };
};
