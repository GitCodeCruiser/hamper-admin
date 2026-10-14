'use client';

import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { CmsFaqEnum } from './key';

import {
  cmsFaqCreateFn,
  cmsFaqDeleteFn,
  cmsFaqGetAllFn,
  cmsFaqGetFn,
  cmsFaqReorderFn,
  cmsFaqUpdateFn,
} from '@/api/functions/cms/faq/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TEachCmsFaq } from '@/types/apps/cms/faq/index.type';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useCmsFaqGetAllInfinite = ({
  page,
  purpose,
  search,
  sortOrder,
  sortField,
  status,
  perPage = PAGE_LIMIT_FOR_PAGINATION,
}: {
  purpose?: string;
  page: number;
  search: string;
  perPage?: number;
  status?: string;
  sortOrder?: TPaginationSortOrderType;
  sortField?: string;
}) => {
  return useInfiniteQuery({
    queryKey: [CmsFaqEnum.FaqGetAll, search, page, purpose],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
      cmsFaqGetAllFn({
        limit: perPage,
        page: pageParam,
        search,
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
        ) as TEachCmsFaq[])
        : [];
    },
  });
};

const useCmsFaqGetAll = ({
  page,
  purpose,
  search,
  sortOrder,
  sortField,
  status,
  perPage = PAGE_LIMIT_FOR_PAGINATION,
}: {
  purpose?: string;
  page: number;
  search: string;
  perPage?: number;
  status?: string;
  sortOrder?: TPaginationSortOrderType;
  sortField?: string;
}) => {
  return useQuery({
    queryKey: [CmsFaqEnum.FaqGetAll, search, page, purpose],
    queryFn: () =>
      cmsFaqGetAllFn({
        limit: perPage,
        page,
        search,
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

const useCmsFaqGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [CmsFaqEnum.FaqGet],
    queryFn: () => cmsFaqGetFn(id),
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

const useCmsFaqCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsFaqEnum.FaqCreate],
    mutationFn: cmsFaqCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [CmsFaqEnum.FaqGetAll] });
      }
    },
    onError: (_error) => {
      errorCallback();
    },
  });
};

const useCmsFaqUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsFaqEnum.FaqUpdate],
    mutationFn: cmsFaqUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
      }
    },
    onError: (_error) => {
      errorCallback();
    },
  });
};

const useCmsFaqDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsFaqEnum.FaqDelete],
    mutationFn: cmsFaqDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
      }
    },
    onError: (_error) => {
      errorCallback();
    },
  });
};

const useCmsFaqReorder = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback?: () => void;
  errorCallback?: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsFaqEnum.FaqReorder],
    mutationFn: cmsFaqReorderFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        if (optionalCallback) optionalCallback();

        queryClient.invalidateQueries({ queryKey: [CmsFaqEnum.FaqGetAll] });
      }
    },
    onError: (_error) => {
      if (errorCallback) errorCallback();
    },
  });
};

export {
  useCmsFaqCreate,
  useCmsFaqDelete,
  useCmsFaqGet,
  useCmsFaqGetAll,
  useCmsFaqGetAllInfinite,
  useCmsFaqReorder,
  useCmsFaqUpdate
};

