import { TSeoStaticSlug } from '../../seo/index.type';

import { TPaginationCommonType } from '@/types/common/common.type';

export type TMattFactsFeatureType = {
  label: string;
  value: string;
};

export type TMattFactsListingParamType = {
  pageSlug: TSeoStaticSlug;
  purpose: string;
};

export type TMattFactsCreateType = {
  pageSlug: TSeoStaticSlug;
  pageName: string;
  purpose: string;
  quoteTitle: string;
  headerTitle: string;
  title: string;
  features: TMattFactsFeatureType[];
  redirectUrl: string;
  image: string;
  imageSize?: number | null;
};

export type TMattFactsUpdateType = TMattFactsCreateType & {
  id: string;
};

export type TMattFactsGetAllParamType = {
  pageSlug?: TSeoStaticSlug;
  purpose?: string;
} & TPaginationCommonType;

export type TEachMattFacts = {
  _id: string;
  pageName: string;
  pageSlug: TSeoStaticSlug;
  purpose: string;
  quoteTitle: string;
  headerTitle: string;
  title: string;
  features: TMattFactsFeatureType[];
  redirectUrl: string;
  image: string;
  imageSize?: number | null;
  status: string;
  createdAt: string;
  isDeleted: boolean;
  updatedAt: string;
};
