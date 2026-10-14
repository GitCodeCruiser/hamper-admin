'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { SeoEnum } from './key';

import { seoDetailsBySlugFn, seoDetailsUpdateFn } from '@/api/functions/seo/index.api';
import { queryClient } from '@/app/providers';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';

const useSeoDetailsBySlug = ({ slug }: { slug: TSeoStaticSlug }) => {
  return useQuery({
    queryKey: [SeoEnum.DetailsBySlug, slug],
    queryFn: () => seoDetailsBySlugFn(slug),
    select(data) {
      return data?.data?.data;
    },
    enabled: !!slug,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });
};

const useSeoDetailsUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [SeoEnum.DetailsUpdate],
    mutationFn: seoDetailsUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [SeoEnum.DetailsBySlug] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export { useSeoDetailsBySlug, useSeoDetailsUpdate };
