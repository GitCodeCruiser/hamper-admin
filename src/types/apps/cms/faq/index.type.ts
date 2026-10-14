import { TPaginationCommonType } from '@/types/common/common.type';

export type TCmsFaqGetAllParamType = {
  purpose?: string;
} & TPaginationCommonType;

export type TCmsFaqReorderParamType = {
  purpose: string;
  ids: string[];
};

export type TCmsFaqCreateParamType = {
  purpose: string;
  question: string;
  answer: string;
};

export type TCmsFaqUpdateParamType = {
  id: string;
  question: string;
  answer: string;
};

export type TEachCmsFaq = {
  _id: string;
  question: string;
  answer: string;
  purpose: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  order?: number;
};
