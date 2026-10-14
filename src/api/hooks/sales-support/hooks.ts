'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { SalesSupportEnum } from './key';

import {
  salesSupportDeleteFn,
  salesSupportGetAllFn,
  salesSupportGetFn,
  salesSupportSendReplyFn,
} from '@/api/functions/sales-support/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useSalesSupportGetAll = ({
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
    queryKey: [SalesSupportEnum.SalesSupportGetAll, search, page, status, perPage],
    queryFn: () =>
      salesSupportGetAllFn({
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

const useSalesSupportGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [SalesSupportEnum.SalesSupportGet, id],
    queryFn: () => salesSupportGetFn(id),
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

const useSalesSupportDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [SalesSupportEnum.SalesSupportDelete],
    mutationFn: salesSupportDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [SalesSupportEnum.SalesSupportGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useSalesSupportSendReply = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [SalesSupportEnum.SalesSupportSendReply],
    mutationFn: salesSupportSendReplyFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [SalesSupportEnum.SalesSupportGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export {
  useSalesSupportDelete,
  useSalesSupportGet,
  useSalesSupportGetAll,
  useSalesSupportSendReply,
};
