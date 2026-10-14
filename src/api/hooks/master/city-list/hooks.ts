'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { CityListEnum } from './key';

import {
  cityListChangeStatusFn,
  cityListCreateFn,
  cityListDeleteFn,
  cityListGetAllFn,
  cityListGetFn,
  cityListUpdateFn,
} from '@/api/functions/master/city-list/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useCityListGetAll = ({
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
    queryKey: [CityListEnum.CityListGetAll, search, page, status, perPage],
    queryFn: () =>
      cityListGetAllFn({
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

const useCityListGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [CityListEnum.CityListGet, id],
    queryFn: () => cityListGetFn(id),
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

const useCityListCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CityListEnum.CityListCreate],
    mutationFn: cityListCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
        queryClient.invalidateQueries({ queryKey: [CityListEnum.CityListGetAll] });
      }
    },
    onError: () => {
      errorCallback();
    },
  });
};

const useCityListUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CityListEnum.CityListUpdate],
    mutationFn: cityListUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
        queryClient.invalidateQueries({ queryKey: [CityListEnum.CityListGetAll] });
      }
    },
    onError: () => {
      errorCallback();
    },
  });
};

const useCityListChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CityListEnum.CityListStatus],
    mutationFn: cityListChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
        queryClient.invalidateQueries({ queryKey: [CityListEnum.CityListGetAll] });
      }
    },
    onError: () => {
      errorCallback();
    },
  });
};

const useCityListDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CityListEnum.CityListDelete],
    mutationFn: cityListDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
        queryClient.invalidateQueries({ queryKey: [CityListEnum.CityListGetAll] });
      }
    },
    onError: () => {
      errorCallback();
    },
  });
};

export {
  useCityListChangeStatus,
  useCityListCreate,
  useCityListDelete,
  useCityListGet,
  useCityListGetAll,
  useCityListUpdate,
};
