'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { LegEnquiryEnum } from './key';

import {
  legEnquiryDeleteFn,
  legEnquiryGetAllFn,
  legEnquiryGetFn,
  legEnquirySendReplyFn,
} from '@/api/functions/leg-enquiry/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useLegEnquiryGetAll = ({
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
    queryKey: [LegEnquiryEnum.LegEnquiryGetAll, search, page, status, perPage],
    queryFn: () =>
      legEnquiryGetAllFn({
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

const useLegEnquiryGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [LegEnquiryEnum.LegEnquiryGet, id],
    queryFn: () => legEnquiryGetFn(id),
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

const useLegEnquiryDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [LegEnquiryEnum.LegEnquiryDelete],
    mutationFn: legEnquiryDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [LegEnquiryEnum.LegEnquiryGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useLegEnquirySendReply = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [LegEnquiryEnum.LegEnquirySendReply],
    mutationFn: legEnquirySendReplyFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [LegEnquiryEnum.LegEnquiryGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export { useLegEnquiryDelete, useLegEnquiryGet, useLegEnquiryGetAll, useLegEnquirySendReply };
