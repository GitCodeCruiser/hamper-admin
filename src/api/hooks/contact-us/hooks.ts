'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { ContactUsEnum } from './key';

import {
  contactUsDeleteFn,
  contactUsGetAllFn,
  contactUsGetFn,
  contactUsSendReplyFn,
} from '@/api/functions/contact-us/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useContactUsGetAll = ({
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
    queryKey: [ContactUsEnum.ContactUsGetAll, search, page, status, perPage],
    queryFn: () =>
      contactUsGetAllFn({
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

const useContactUsGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [ContactUsEnum.ContactUsGet, id],
    queryFn: () => contactUsGetFn(id),
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

const useContactUsDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [ContactUsEnum.ContactUsDelete],
    mutationFn: contactUsDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [ContactUsEnum.ContactUsGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useContactUsSendReply = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [ContactUsEnum.ContactUsSendReply],
    mutationFn: contactUsSendReplyFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [ContactUsEnum.ContactUsGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export { useContactUsDelete, useContactUsGet, useContactUsGetAll, useContactUsSendReply };
