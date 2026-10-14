'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { CharterEnquiryEnum } from './key';

import {
  charterEnquiryAssignSalesPersonFn,
  charterEnquiryGetAllFn,
  charterEnquiryGetFn,
} from '@/api/functions/charter-enquiry/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TCharterEnquiryTripType } from '@/types/apps/charter-enquiry/index.type';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useCharterEnquiryGetAll = ({
  page,
  search,
  sortOrder,
  sortField,
  status,
  tripType,
  perPage = PAGE_LIMIT_FOR_PAGINATION,
}: {
  page: number;
  search: string;
  perPage?: number;
  status?: string;
  tripType?: TCharterEnquiryTripType | '';
  sortOrder?: TPaginationSortOrderType;
  sortField?: string;
}) => {
  return useQuery({
    queryKey: [CharterEnquiryEnum.CharterEnquiryGetAll, search, page, status, perPage, tripType],
    queryFn: () =>
      charterEnquiryGetAllFn({
        limit: perPage,
        page,
        search,
        ...(status ? { status } : {}),
        ...(tripType ? { tripType } : {}),
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

const useCharterEnquiryGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [CharterEnquiryEnum.CharterEnquiryGet, id],
    queryFn: () => charterEnquiryGetFn(id),
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

const useCharterEnquiryAssignSalesPerson = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CharterEnquiryEnum.CharterEnquiryAssignSalesPerson],
    mutationFn: charterEnquiryAssignSalesPersonFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
        queryClient.invalidateQueries({ queryKey: [CharterEnquiryEnum.CharterEnquiryGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export { useCharterEnquiryAssignSalesPerson, useCharterEnquiryGet, useCharterEnquiryGetAll };
