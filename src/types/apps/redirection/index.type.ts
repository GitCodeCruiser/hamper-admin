import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TRedirectionGetAllParamType = {} & TPaginationCommonType;

export type TRedirectionChangeStatusParamType = {
  id: string;
  status: TStatusChangeType | string;
};

export type TEachRedirect = {
  _id: string;
  source: string;
  destination: string;
  statusCode: number;
  status: string;
  createdAt: string;
  updatedAt?: string;
  isDeleted?: boolean;
};
