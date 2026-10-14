'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { RedirectionEnum } from './key';

import {
  redirectionChangeStatusFn,
  redirectionCreateFn,
  redirectionDeleteFn,
  redirectionGetAllFn,
  redirectionGetFn,
  redirectionUpdateFn,
} from '@/api/functions/redirection/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useRedirectionGetAll = ({
  page,
  search,
  sortOrder,
  sortField,
  status,
  perPage = PAGE_LIMIT_FOR_PAGINATION,
}: {
  page: number;
  search: string;
  perPage?: number;
  status?: string;
  sortOrder?: TPaginationSortOrderType;
  sortField?: string;
}) => {
  return useQuery({
    queryKey: [
      RedirectionEnum.RedirectionGetAll,
      search,
      page,
      status,
      perPage,
      sortField,
      sortOrder,
    ],
    queryFn: () =>
      redirectionGetAllFn({
        limit: perPage,
        page,
        search,
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

const useRedirectionGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [RedirectionEnum.RedirectionGet, id],
    queryFn: () => redirectionGetFn(id),
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

const useRedirectionCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback?: () => void;
}) => {
  return useMutation({
    mutationKey: [RedirectionEnum.RedirectionCreate],
    mutationFn: redirectionCreateFn,
    onSuccess: async (res) => {
      if (
        res?.data?.statusCode === HttpStatusCode.Ok ||
        res?.status === HttpStatusCode.Ok ||
        res?.status === HttpStatusCode.Created
      ) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [RedirectionEnum.RedirectionGetAll] });
      }
    },
    onError: (error) => {
      if (errorCallback) {
        errorCallback();
      }
    },
  });
};

const useRedirectionUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback?: () => void;
}) => {
  return useMutation({
    mutationKey: [RedirectionEnum.RedirectionUpdate],
    mutationFn: redirectionUpdateFn,
    onSuccess: async (res) => {
      if (res?.data?.statusCode === HttpStatusCode.Ok || res?.status === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [RedirectionEnum.RedirectionGetAll] });
      }
    },
    onError: (error) => {
      if (errorCallback) {
        errorCallback();
      }
    },
  });
};

const useRedirectionChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback?: () => void;
}) => {
  return useMutation({
    mutationKey: [RedirectionEnum.RedirectionStatus],
    mutationFn: redirectionChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data?.statusCode === HttpStatusCode.Ok || res?.status === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [RedirectionEnum.RedirectionGetAll] });
      }
    },
    onError: (error) => {
      if (errorCallback) {
        errorCallback();
      }
    },
  });
};

const useRedirectionDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback?: () => void;
}) => {
  return useMutation({
    mutationKey: [RedirectionEnum.RedirectionDelete],
    mutationFn: redirectionDeleteFn,
    onSuccess: async (res) => {
      if (res?.data?.statusCode === HttpStatusCode.Ok || res?.status === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [RedirectionEnum.RedirectionGetAll] });
      }
    },
    onError: (error) => {
      if (errorCallback) {
        errorCallback();
      }
    },
  });
};

export {
  useRedirectionChangeStatus,
  useRedirectionCreate,
  useRedirectionDelete,
  useRedirectionGet,
  useRedirectionGetAll,
  useRedirectionUpdate
};

