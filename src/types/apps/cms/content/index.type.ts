import { TSeoStaticSlug } from '../../seo/index.type';

import { TPaginationCommonType } from '@/types/common/common.type';

export type TCmsContentGetAllParamType = {
  pageSlug?: TSeoStaticSlug;
  purpose?: string;
} & TPaginationCommonType;

export type TCmsContentReorderParamType = {
  pageSlug: TSeoStaticSlug;
  purpose: string;
  ids: string[];
};

export type TEachCmsContent = {
  _id: string;
  pageName: string;
  image: string;
  imageTag?: string;
  pageSlug: TSeoStaticSlug;
  title: string;
  description: string;
  url: string;
  purpose: string;
  status: string;
  createdAt: string;
  images: string[];
  order: number;
  imagesSize: number[];
  imageSize: number;
  imagesData?: TCmsImageData[];
  showCTA?: boolean;
  hasFaq?: boolean;
};

export type TCmsImageData = {
  _id?: string;
  image: string;
  size?: number;
  tag?: string;
};
