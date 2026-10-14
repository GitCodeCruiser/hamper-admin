import { TSeoStaticSlug } from '../../seo/index.type';

import { TPaginationCommonType } from '@/types/common/common.type';

export type THourlyBreakdownListingParamType = {
  pageSlug: TSeoStaticSlug;
  purpose: string;
};

export type THourlyFeatureType = {
  text: string;
  icon: string;
};

export type THourlyRateItemType = {
  headerTitle: string;
  title: string;
  isPopular?: boolean;
  features: THourlyFeatureType[];
};

export type THourlyBreakdownCreateType = {
  pageSlug: TSeoStaticSlug;
  pageName: string;
  purpose: string;
  headerTitle: string;
  title: string;
  smallDescription: string;
  hourlyRate: THourlyRateItemType[];
  redirectUrl: string;
  redirectUrlText: string;
};

export type THourlyBreakdownUpdateType = THourlyBreakdownCreateType & {
  id: string;
};

export type THourlyBreakdownGetAllParamType = {
  pageSlug?: TSeoStaticSlug;
  purpose?: string;
} & TPaginationCommonType;

export type TEachHourlyBreakdown = {
  _id: string;
  pageName: string;
  pageSlug: TSeoStaticSlug;
  purpose: string;
  headerTitle: string;
  title: string;
  smallDescription: string;
  hourlyRate: THourlyRateItemType[];
  redirectUrl: string;
  redirectUrlText: string;
  status: string;
  createdAt: string;
  isDeleted: boolean;
  updatedAt: string;
};
