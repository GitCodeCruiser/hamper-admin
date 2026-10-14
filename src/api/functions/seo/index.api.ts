import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import {
  ISeoDetailsBySlugResponse,
  ISeoDetailsUpdateResponse,
} from '@/types/interface/seo/index.interface';

export const seoDetailsBySlugFn = async (slug: TSeoStaticSlug) => {
  const res = await axiosInstance.get<ISeoDetailsBySlugResponse>(
    `${endpoints.seo.detailsBySlug('v1')}/${slug}`,
  );

  return res;
};

export const seoDetailsUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ISeoDetailsUpdateResponse>(
    endpoints.seo.detailsUpdate('v1'),
    body,
  );

  return res;
};
