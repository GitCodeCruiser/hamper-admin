'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { CmsCategoryVsPremiumEnum } from './key';

import {
  categoryVsPremiumCreateFn,
  categoryVsPremiumDeleteFn,
  categoryVsPremiumGetFn,
  categoryVsPremiumListingFn,
  categoryVsPremiumUpdateFn,
} from '@/api/functions/cms/categoryVsPremium/index.api';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';

const useCategoryVsPremiumListing = ({
  pageSlug,
  purpose,
}: {
  pageSlug: TSeoStaticSlug;
  purpose: string;
}) => {
  return useQuery({
    queryKey: [CmsCategoryVsPremiumEnum.CategoryVsPremiumListing, pageSlug, purpose],
    queryFn: () =>
      categoryVsPremiumListingFn({
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

const useCategoryVsPremiumGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [CmsCategoryVsPremiumEnum.CategoryVsPremiumGet],
    queryFn: () => categoryVsPremiumGetFn(id),
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

const useCategoryVsPremiumCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsCategoryVsPremiumEnum.CategoryVsPremiumCreate],
    mutationFn: categoryVsPremiumCreateFn,
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

const useCategoryVsPremiumUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsCategoryVsPremiumEnum.CategoryVsPremiumUpdate],
    mutationFn: categoryVsPremiumUpdateFn,
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

const useCategoryVsPremiumDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsCategoryVsPremiumEnum.CategoryVsPremiumDelete],
    mutationFn: categoryVsPremiumDeleteFn,
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
  useCategoryVsPremiumCreate,
  useCategoryVsPremiumDelete,
  useCategoryVsPremiumGet,
  useCategoryVsPremiumListing,
  useCategoryVsPremiumUpdate,
};
