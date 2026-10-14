'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { CmsMainContentEnum } from './key';

import {
  cmsMainContentCreateFn,
  cmsMainContentGetFn,
  cmsMainContentListingFn,
  cmsMainContentUpdateFn,
} from '@/api/functions/cms/main/index.api';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';

const useCmsMainContentListing = ({
  pageSlug,
  purpose,
}: {
  pageSlug: TSeoStaticSlug;
  purpose: string;
}) => {
  return useQuery({
    queryKey: [CmsMainContentEnum.MainContentListing, pageSlug, purpose],
    queryFn: () =>
      cmsMainContentListingFn({
        pageSlug,
        purpose,
      }),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
    select(data) {
      return data?.data?.data;
    },
  });
};

const useCmsMainContentGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [CmsMainContentEnum.MainContentGet],
    queryFn: () => cmsMainContentGetFn(id),
    select(data) {
      return data?.data?.data;
    },
    enabled: !!id,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });
};

const useCmsMainContentCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsMainContentEnum.MainContentCreate],
    mutationFn: cmsMainContentCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useCmsMainContentUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsMainContentEnum.MainContentUpdate],
    mutationFn: cmsMainContentUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export {
  useCmsMainContentCreate,
  useCmsMainContentGet,
  useCmsMainContentListing,
  useCmsMainContentUpdate,
};
