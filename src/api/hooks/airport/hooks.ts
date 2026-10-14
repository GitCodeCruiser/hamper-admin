'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { AirportEnum } from './key';

import {
  airportChangeStatusFn,
  airportCreateFn,
  airportDeleteFn,
  airportGetAllFn,
  airportGetFn,
  airportMakeFeaturedFn,
  airportRestoreFn,
  airportHardDeleteFn,
  airportUpdateFn,
} from '@/api/functions/airport/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useAirportGetAll = ({
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
    queryKey: [AirportEnum.AirportGetAll, search, page, isFeatured, isDeleted, status, perPage],
    queryFn: () =>
      airportGetAllFn({
        limit: perPage,
        page,
        search,
        ...(isFeatured ? { isFeatured } : {}),
        ...(isDeleted !== undefined ? { isDeleted } : {}),
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

const useAirportGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [AirportEnum.AirportGet, id],
    queryFn: () => airportGetFn(id),
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

const useAirportCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AirportEnum.AirportCreate],
    mutationFn: airportCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AirportEnum.AirportGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAirportUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AirportEnum.AirportUpdate],
    mutationFn: airportUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AirportEnum.AirportGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAirportChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AirportEnum.AirportChangeStatus],
    mutationFn: airportChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AirportEnum.AirportGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAirportDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AirportEnum.AirportDelete],
    mutationFn: airportDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AirportEnum.AirportGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAirportMakeFeatured = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AirportEnum.AirportMakeFeatured],
    mutationFn: airportMakeFeaturedFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AirportEnum.AirportGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export {
  useAirportChangeStatus,
  useAirportCreate,
  useAirportDelete,
  useAirportGet,
  useAirportGetAll,
  useAirportMakeFeatured,
  useAirportRestore,
  useAirportHardDelete,
  useAirportUpdate,
};

const useAirportRestore = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AirportEnum.AirportRestore],
    mutationFn: airportRestoreFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AirportEnum.AirportGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAirportHardDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AirportEnum.AirportHardDelete],
    mutationFn: airportHardDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AirportEnum.AirportGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};
