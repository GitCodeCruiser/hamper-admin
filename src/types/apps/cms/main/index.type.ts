import { TSeoStaticSlug } from '../../seo/index.type';

export type TCmsMainContentListingParamType = {
  pageSlug: TSeoStaticSlug;
  purpose: string;
};

export type TCmsMainContentCreateType = {
  pageSlug: TSeoStaticSlug;
  pageName: string;
  purpose: string;
  title?: string;
  subTitle?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  content?: string;
};

export type TCmsMainContentUpdateType = {
  id: string;
  pageSlug: TSeoStaticSlug;
  pageName: string;
  purpose: string;
  title?: string;
  subTitle?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  content?: string;
};

export type TEachCmsMainContent = {
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
  content: string;
  isDeleted: boolean;
  updatedAt: string;
};
