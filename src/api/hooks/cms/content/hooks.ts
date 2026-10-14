'use client';

import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { CmsContentEnum } from './key';

import {
  cmsContentCreateFn,
  cmsContentDeleteFn,
  cmsContentGetAllFn,
  cmsContentGetFn,
  cmsContentReorderFn,
  cmsContentUpdateFn,
} from '@/api/functions/cms/content/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TEachCmsContent } from '@/types/apps/cms/content/index.type';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useCmsContentGetAllInfinite = ({
  page,
  pageSlug,
  purpose,
  search,
  sortOrder,
  sortField,
  status,
  perPage = PAGE_LIMIT_FOR_PAGINATION,
}: {
  pageSlug?: TSeoStaticSlug;
  purpose?: string;
  page: number;
  search: string;
  perPage?: number;
  status?: string;
  sortOrder?: TPaginationSortOrderType;
  sortField?: string;
}) => {
  return useInfiniteQuery({
    queryKey: [CmsContentEnum.ContentGetAll, search, page, pageSlug, purpose],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
      cmsContentGetAllFn({
        limit: perPage,
        page: pageParam,
        search,
        ...(pageSlug ? { pageSlug } : {}),
        ...(purpose ? { purpose } : {}),
        ...(status ? { status } : {}),
        ...(sortOrder ? { sortOrder } : {}),
        ...(sortField ? { sortField } : {}),
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      const nextPage = lastPage?.data?.data?.meta?.hasNextPage ? lastPageParam + 1 : undefined;

      return nextPage;
    },
    getPreviousPageParam: () => {
      return undefined;
    },
    staleTime: 0,
    gcTime: 0,
    select(data) {
      return ((
        data?.pages
          ?.flatMap((eachPage) => eachPage?.data?.data?.docs?.map((eachDoc) => eachDoc))
          .filter(Boolean) || []
      ).length as number) > 0
        ? (data?.pages?.flatMap((eachPage) =>
          eachPage?.data?.data?.docs?.map((eachDoc) => eachDoc),
        ) as TEachCmsContent[])
        : [];
    },
  });
};

const useCmsContentGetAll = ({
  page,
  pageSlug,
  purpose,
  search,
  sortOrder,
  sortField,
  status,
  perPage = PAGE_LIMIT_FOR_PAGINATION,
}: {
  pageSlug?: TSeoStaticSlug;
  purpose?: string;
  page: number;
  search: string;
  perPage?: number;
  status?: string;
  sortOrder?: TPaginationSortOrderType;
  sortField?: string;
}) => {
  return useQuery({
    queryKey: [CmsContentEnum.ContentGetAll, search, page, pageSlug, purpose],
    queryFn: () =>
      cmsContentGetAllFn({
        limit: perPage,
        page,
        search,
        ...(pageSlug ? { pageSlug } : {}),
        ...(purpose ? { purpose } : {}),
        ...(status ? { status } : {}),
        ...(sortOrder ? { sortOrder } : {}),
        ...(sortField ? { sortField } : {}),
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

const useCmsContentGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [CmsContentEnum.ContentGet],
    queryFn: () => cmsContentGetFn(id),
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

const useCmsContentCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsContentEnum.ContentCreate],
    mutationFn: cmsContentCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [CmsContentEnum.ContentGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useCmsContentUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsContentEnum.ContentUpdate],
    mutationFn: cmsContentUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        // queryClient.invalidateQueries({ queryKey: [CmsContentEnum.ContentGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useCmsContentDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsContentEnum.ContentDelete],
    mutationFn: cmsContentDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        // queryClient.invalidateQueries({ queryKey: [CmsContentEnum.ContentGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useCmsContentReorder = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback?: () => void;
  errorCallback?: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsContentEnum.ContentReorder],
    mutationFn: cmsContentReorderFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        if (optionalCallback) optionalCallback();

        queryClient.invalidateQueries({ queryKey: [CmsContentEnum.ContentGetAll] });
      }
    },
    onError: (error) => {
      if (errorCallback) errorCallback();
    },
  });
};

export {
  useCmsContentCreate,
  useCmsContentDelete,
  useCmsContentGet,
  useCmsContentGetAll,
  useCmsContentGetAllInfinite,
  useCmsContentReorder,
  useCmsContentUpdate,
};
