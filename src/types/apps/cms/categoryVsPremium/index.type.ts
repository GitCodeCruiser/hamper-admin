import { TSeoStaticSlug } from '../../seo/index.type';

import { TPaginationCommonType } from '@/types/common/common.type';

export type TCategoryVsPremiumListingParamType = {
  pageSlug: TSeoStaticSlug;
  purpose: string;
};

export type TCardFeatureType = {
  title: string;
  smallDescription: string;
};

export type TCardTypeItemType = {
  headerTitle: string;
  title: string;
  isPopular?: boolean;
  cardFeatures: TCardFeatureType[];
};

export type TCategoryVsPremiumCreateType = {
  pageSlug: TSeoStaticSlug;
  pageName: string;
  purpose: string;
  headerTitle: string;
  title: string;
  smallDescription?: string;
  cardType: TCardTypeItemType[];
  redirectUrl: string;
  redirectUrlText: string;
};

export type TCategoryVsPremiumUpdateType = TCategoryVsPremiumCreateType & {
  id: string;
};

export type TCategoryVsPremiumGetAllParamType = {
  pageSlug?: TSeoStaticSlug;
  purpose?: string;
} & TPaginationCommonType;

export type TEachCategoryVsPremium = {
  _id: string;
  pageName: string;
  pageSlug: TSeoStaticSlug;
  purpose: string;
  headerTitle: string;
  title: string;
  smallDescription?: string;
  cardType: TCardTypeItemType[];
  redirectUrl: string;
  redirectUrlText: string;
  status: string;
  createdAt: string;
  isDeleted: boolean;
  updatedAt: string;
};
