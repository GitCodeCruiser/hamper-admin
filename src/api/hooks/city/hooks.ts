'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { CityEnum } from './key';

import {
  cityChangeStatusFn,
  cityCreateFn,
  cityDeleteFn,
  cityGetAllFn,
  cityGetFn,
  cityHardDeleteFn,
  cityMakeFeaturedFn,
  cityRestoreFn,
  cityUpdateFn,
} from '@/api/functions/city/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useCityGetAll = ({
  page,
  search,
  sortOrder,
  sortField,
  status,
  isFeatured,
  isDeleted,
  perPage = PAGE_LIMIT_FOR_PAGINATION,
}: {
  page: number;
  search: string;
  isFeatured?: boolean;
  isDeleted?: boolean;
  perPage?: number;
  status?: string;
  sortOrder?: TPaginationSortOrderType;
  sortField?: string;
}) => {
  return useQuery({
    queryKey: [CityEnum.CityGetAll, search, page, isDeleted, isFeatured, status, perPage],
    queryFn: () =>
      cityGetAllFn({
        limit: perPage,
        page,
        search,
        ...(isFeatured ? { isFeatured } : {}),
        ...(isDeleted ? { isDeleted } : {}),
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

const useCityGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [CityEnum.CityGet, id],
    queryFn: () => cityGetFn(id),
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

const useCityCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CityEnum.CityCreate],
    mutationFn: cityCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [CityEnum.CityGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useCityUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CityEnum.CityUpdate],
    mutationFn: cityUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [CityEnum.CityGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useCityChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CityEnum.CityChangeStatus],
    mutationFn: cityChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [CityEnum.CityGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useCityDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CityEnum.CityDelete],
    mutationFn: cityDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [CityEnum.CityGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useCityMakeFeatured = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CityEnum.CityMakeFeatured],
    mutationFn: cityMakeFeaturedFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [CityEnum.CityGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useCityRestore = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CityEnum.CityRestore],
    mutationFn: cityRestoreFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [CityEnum.CityGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useCityHardDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CityEnum.CityHardDelete],
    mutationFn: cityHardDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [CityEnum.CityGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export {
  useCityChangeStatus,
  useCityCreate,
  useCityDelete,
  useCityGet,
  useCityGetAll,
  useCityHardDelete,
  useCityMakeFeatured,
  useCityRestore,
  useCityUpdate,
};
