import { TEachCountryList } from '../country-list/index.type';

import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TStateListGetAllParamType = {} & TPaginationCommonType;

export type TStateListChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachStateList = {
  _id: string;
  name: string;
  slug: string;
  countryId: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  image?: string;
  imageSize: number;
  country: TEachCountryList;
};
