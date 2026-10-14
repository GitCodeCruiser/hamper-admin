'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { AirportDataEnum } from './key';

import {
  airportDataChangeStatusFn,
  airportDataCreateFn,
  airportDataDeleteFn,
  airportDataGetAllFn,
  airportDataGetFn,
  airportDataHardDeleteFn,
  airportDataListingFn,
  airportDataRestoreFn,
  airportDataUpdateFn,
} from '@/api/functions/airport-data/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useAirportDataGetAll = ({
  page,
  search,
  sortOrder,
  sortField,
  status,
  isDeleted,
  perPage = PAGE_LIMIT_FOR_PAGINATION,
}: {
  page: number;
  search: string;
  isDeleted?: boolean;
  perPage?: number;
  status?: string;
  sortOrder?: TPaginationSortOrderType;
  sortField?: string;
}) => {
  return useQuery({
    queryKey: [AirportDataEnum.AirportDataGetAll, search, page, isDeleted, status, perPage],
    queryFn: () =>
      airportDataGetAllFn({
        limit: perPage,
        page,
        search,
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

const useAirportDataGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [AirportDataEnum.AirportDataGet, id],
    queryFn: () => airportDataGetFn(id),
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

const useAirportDataCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AirportDataEnum.AirportDataCreate],
    mutationFn: airportDataCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AirportDataEnum.AirportDataGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAirportDataUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AirportDataEnum.AirportDataUpdate],
    mutationFn: airportDataUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AirportDataEnum.AirportDataGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAirportDataChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AirportDataEnum.AirportDataChangeStatus],
    mutationFn: airportDataChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AirportDataEnum.AirportDataGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAirportDataDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AirportDataEnum.AirportDataDelete],
    mutationFn: airportDataDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AirportDataEnum.AirportDataGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAirportDataRestore = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AirportDataEnum.AirportDataRestore],
    mutationFn: airportDataRestoreFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AirportDataEnum.AirportDataGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAirportDataHardDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AirportDataEnum.AirportDataHardDelete],
    mutationFn: airportDataHardDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AirportDataEnum.AirportDataGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAirportDataListing = ({ search }: { search: string }) => {
  return useQuery({
    queryKey: [AirportDataEnum.AirportDataListing, search],
    queryFn: () =>
      airportDataListingFn({
        ...(search ? { search } : {}),
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

export {
  useAirportDataChangeStatus,
  useAirportDataCreate,
  useAirportDataDelete,
  useAirportDataGet,
  useAirportDataGetAll,
  useAirportDataHardDelete,
  useAirportDataListing,
  useAirportDataRestore,
  useAirportDataUpdate,
};
