'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { CmsSectionContentEnum } from './key';

import {
  cmsSectionContentCreateFn,
  cmsSectionContentDeleteFn,
  cmsSectionContentGetFn,
  cmsSectionContentListingFn,
  cmsSectionContentUpdateFn,
} from '@/api/functions/cms/sectionContent/index.api';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';

const useCmsSectionContentListing = ({
  pageSlug,
  purpose,
}: {
  pageSlug: TSeoStaticSlug;
  purpose: string;
}) => {
  return useQuery({
    queryKey: [CmsSectionContentEnum.SectionContentListing, pageSlug, purpose],
    queryFn: () =>
      cmsSectionContentListingFn({
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

const useCmsSectionContentGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [CmsSectionContentEnum.SectionContentGet],
    queryFn: () => cmsSectionContentGetFn(id),
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

const useCmsSectionContentCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsSectionContentEnum.SectionContentCreate],
    mutationFn: cmsSectionContentCreateFn,
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

const useCmsSectionContentUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsSectionContentEnum.SectionContentUpdate],
    mutationFn: cmsSectionContentUpdateFn,
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

const useCmsSectionContentDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsSectionContentEnum.SectionContentDelete],
    mutationFn: cmsSectionContentDeleteFn,
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
  useCmsSectionContentCreate,
  useCmsSectionContentDelete,
  useCmsSectionContentGet,
  useCmsSectionContentListing,
  useCmsSectionContentUpdate,
};
