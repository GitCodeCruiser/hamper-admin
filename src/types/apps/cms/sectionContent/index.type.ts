import { TSeoStaticSlug } from '../../seo/index.type';

import { TPaginationCommonType } from '@/types/common/common.type';

export type TCmsSectionContentListingParamType = {
  pageSlug: TSeoStaticSlug;
  purpose: string;
};

export type TCmsSectionContentSubType = {
  title: string;
  description: string;
  imageUrl: string;
  _id?: string;
  imageUrlSize: number;
};

export type TCmsSectionContentCreateType = {
  pageSlug: TSeoStaticSlug;
  pageName: string;
  purpose: string;
  title?: string;
  subTitle?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  contents?: TCmsSectionContentSubType[];
};

export type TCmsSectionContentUpdateType = {
  id: string;
  pageSlug: TSeoStaticSlug;
  pageName: string;
  purpose: string;
  title?: string;
  subTitle?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  contents?: TCmsSectionContentSubType[];
};

export type TCmsSectionContentGetAllParamType = {
  pageSlug?: TSeoStaticSlug;
  purpose?: string;
} & TPaginationCommonType;

export type TEachCmsSectionContent = {
  _id: string;
  pageName: string;
  image: string;
  pageSlug: TSeoStaticSlug;
  title: string;
  description: string;
  purpose: string;
  status: string;
  createdAt: string;
  subTitle: string;
  imageUrl: string;
  url: string;
  contents: TCmsSectionContentSubType[];
  isDeleted: boolean;
  updatedAt: string;
  imageUrlSize: number;
};
