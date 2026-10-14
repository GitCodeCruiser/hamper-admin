import { TEachCountryList } from '../country-list/index.type';
import { TEachStateList } from '../state-list/index.type';

import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type TCityListGetAllParamType = {} & TPaginationCommonType;

export type TCityListChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TEachCityList = {
  _id: string;
  name: string;
  slug: string;
  countryId: string;
  stateId: string;
  image: string;
  imageSize: number;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  country: TEachCountryList;
  state: TEachStateList;
};
