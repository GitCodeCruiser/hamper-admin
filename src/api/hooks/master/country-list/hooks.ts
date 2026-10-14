'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { CountryListEnum } from './key';

import {
  countryListChangeStatusFn,
  countryListCreateFn,
  countryListDeleteFn,
  countryListGetAllFn,
  countryListGetFn,
  countryListUpdateFn,
  countryListShowInCMSFn,
} from '@/api/functions/master/country-list/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useCountryListGetAll = ({
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
    queryKey: [CountryListEnum.CountryListGetAll, search, page, status, perPage],
    queryFn: () =>
      countryListGetAllFn({
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

const useCountryListGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [CountryListEnum.CountryListGet, id],
    queryFn: () => countryListGetFn(id),
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

const useCountryListCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CountryListEnum.CountryListCreate],
    mutationFn: countryListCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [CountryListEnum.CountryListGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useCountryListUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CountryListEnum.CountryListUpdate],
    mutationFn: countryListUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [CountryListEnum.CountryListGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useCountryListChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CountryListEnum.CountryListStatus],
    mutationFn: countryListChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [CountryListEnum.CountryListGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useCountryListDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CountryListEnum.CountryListDelete],
    mutationFn: countryListDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [CountryListEnum.CountryListGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useCountryListShowInCMS = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CountryListEnum.CountryListShowInCMS],
    mutationFn: countryListShowInCMSFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [CountryListEnum.CountryListGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export {
  useCountryListChangeStatus,
  useCountryListCreate,
  useCountryListDelete,
  useCountryListGet,
  useCountryListGetAll,
  useCountryListUpdate,
  useCountryListShowInCMS,
};
