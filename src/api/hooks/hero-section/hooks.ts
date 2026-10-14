'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { HeroSectionPageEnum } from './key';

import { heroSectionDetailsFn, heroSectionUpdateFn } from '@/api/functions/hero-section/index.api';
import { queryClient } from '@/app/providers';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';

const useHeroSectionDetails = ({ slug }: { slug: TSeoStaticSlug }) => {
  return useQuery({
    queryKey: [HeroSectionPageEnum.HeroSectionDetails, slug],
    queryFn: () => heroSectionDetailsFn(slug),
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

const useHeroSectionUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [HeroSectionPageEnum.HeroSectionUpdate],
    mutationFn: heroSectionUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [HeroSectionPageEnum.HeroSectionDetails] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export { useHeroSectionDetails, useHeroSectionUpdate };
