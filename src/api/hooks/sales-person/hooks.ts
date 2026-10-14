'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { SalesPersonEnum } from './key';

import {
  salesPersonChangeStatusFn,
  salesPersonCreateFn,
  salesPersonDeleteFn,
  salesPersonGetAllFn,
  salesPersonGetFn,
  salesPersonUpdateFn,
} from '@/api/functions/sales-person/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useSalesPersonGetAll = ({
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
    queryKey: [SalesPersonEnum.SalesPersonGetAll, search, page, status, perPage],
    queryFn: () =>
      salesPersonGetAllFn({
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

const useSalesPersonGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [SalesPersonEnum.SalesPersonGet, id],
    queryFn: () => salesPersonGetFn(id),
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

const useSalesPersonCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [SalesPersonEnum.SalesPersonCreate],
    mutationFn: salesPersonCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [SalesPersonEnum.SalesPersonGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useSalesPersonUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [SalesPersonEnum.SalesPersonUpdate],
    mutationFn: salesPersonUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [SalesPersonEnum.SalesPersonGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useSalesPersonChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [SalesPersonEnum.SalesPersonStatus],
    mutationFn: salesPersonChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [SalesPersonEnum.SalesPersonGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useSalesPersonDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [SalesPersonEnum.SalesPersonDelete],
    mutationFn: salesPersonDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [SalesPersonEnum.SalesPersonGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export {
  useSalesPersonChangeStatus,
  useSalesPersonCreate,
  useSalesPersonDelete,
  useSalesPersonGet,
  useSalesPersonGetAll,
  useSalesPersonUpdate,
};
