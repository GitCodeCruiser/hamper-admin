'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { BlogEnum } from './key';

import {
  blogChangeStatusFn,
  blogCreateFn,
  blogDeleteFn,
  blogGetAllFn,
  blogGetFn,
  blogMakeFeaturedFn,
  blogUpdateFn,
} from '@/api/functions/blog/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useBlogGetAll = ({
  page,
  search,
  sortOrder,
  sortField,
  status,
  isFeatured,
  perPage = PAGE_LIMIT_FOR_PAGINATION,
}: {
  page: number;
  search: string;
  isFeatured?: boolean;
  perPage?: number;
  status?: string;
  sortOrder?: TPaginationSortOrderType;
  sortField?: string;
}) => {
  return useQuery({
    queryKey: [BlogEnum.BlogGetAll, search, page, isFeatured, status, perPage],
    queryFn: () =>
      blogGetAllFn({
        limit: perPage,
        page,
        search,
        ...(isFeatured ? { isFeatured } : {}),
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

const useBlogGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [BlogEnum.BlogGet, id],
    queryFn: () => blogGetFn(id),
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

const useBlogCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [BlogEnum.BlogCreate],
    mutationFn: blogCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [BlogEnum.BlogGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useBlogUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [BlogEnum.BlogUpdate],
    mutationFn: blogUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [BlogEnum.BlogGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useBlogChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [BlogEnum.BlogChangeStatus],
    mutationFn: blogChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [BlogEnum.BlogGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useBlogDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [BlogEnum.BlogDelete],
    mutationFn: blogDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [BlogEnum.BlogGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useBlogMakeFeatured = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [BlogEnum.BlogMakeFeatured],
    mutationFn: blogMakeFeaturedFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [BlogEnum.BlogGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export {
  useBlogChangeStatus,
  useBlogCreate,
  useBlogDelete,
  useBlogGet,
  useBlogGetAll,
  useBlogMakeFeatured,
  useBlogUpdate,
};
