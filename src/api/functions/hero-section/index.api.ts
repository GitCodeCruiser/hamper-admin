import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import {
  IHeroSectionDetailsResponse,
  IHeroSectionUpdateResponse,
} from '@/types/interface/hero-section/index.interface';

export const heroSectionDetailsFn = async (slug: TSeoStaticSlug) => {
  const res = await axiosInstance.get<IHeroSectionDetailsResponse>(
    `${endpoints.heroSectionCMS.heroDetails('v1')}/${slug}`,
  );

  return res;
};

export const heroSectionUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IHeroSectionUpdateResponse>(
    endpoints.heroSectionCMS.heroUpdate('v1'),
    body,
  );

  return res;
};
