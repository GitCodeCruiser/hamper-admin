'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { InsiderGuideEnum } from './key';

import {
  insiderGuideChangeStatusFn,
  insiderGuideCreateFn,
  insiderGuideDeleteFn,
  insiderGuideGetAllFn,
  insiderGuideGetFn,
  insiderGuideMakeFeaturedFn,
  insiderGuideUpdateFn,
} from '@/api/functions/insider-guide/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useInsiderGuideGetAll = ({
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
    queryKey: [InsiderGuideEnum.InsiderGuideGetAll, search, page, isFeatured, status, perPage],
    queryFn: () =>
      insiderGuideGetAllFn({
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

const useInsiderGuideGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [InsiderGuideEnum.InsiderGuideGet, id],
    queryFn: () => insiderGuideGetFn(id),
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

const useInsiderGuideCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [InsiderGuideEnum.InsiderGuideCreate],
    mutationFn: insiderGuideCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [InsiderGuideEnum.InsiderGuideGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useInsiderGuideUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [InsiderGuideEnum.InsiderGuideUpdate],
    mutationFn: insiderGuideUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [InsiderGuideEnum.InsiderGuideGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useInsiderGuideChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [InsiderGuideEnum.InsiderGuideChangeStatus],
    mutationFn: insiderGuideChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [InsiderGuideEnum.InsiderGuideGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useInsiderGuideDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [InsiderGuideEnum.InsiderGuideDelete],
    mutationFn: insiderGuideDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [InsiderGuideEnum.InsiderGuideGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useInsiderGuideMakeFeatured = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [InsiderGuideEnum.InsiderGuideMakeFeatured],
    mutationFn: insiderGuideMakeFeaturedFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [InsiderGuideEnum.InsiderGuideGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export {
  useInsiderGuideChangeStatus,
  useInsiderGuideCreate,
  useInsiderGuideDelete,
  useInsiderGuideGet,
  useInsiderGuideGetAll,
  useInsiderGuideMakeFeatured,
  useInsiderGuideUpdate,
};
