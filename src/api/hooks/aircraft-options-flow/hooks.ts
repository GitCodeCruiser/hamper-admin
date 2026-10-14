'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { AircraftOptionsEnum } from './key';

import {
  aircraftOptionsCategoryChangeStatusFn,
  aircraftOptionsCategoryCreateFn,
  aircraftOptionsCategoryDeleteFn,
  aircraftOptionsCategoryGetAllFn,
  aircraftOptionsCategoryGetFn,
  aircraftOptionsCategoryUpdateFn,
  aircraftOptionsChangeStatusFn,
  aircraftOptionsCreateFn,
  aircraftOptionsDeleteFn,
  aircraftOptionsGetAllFn,
  aircraftOptionsGetFn,
  aircraftOptionsReorderFn,
  aircraftOptionsUpdateFn,
} from '@/api/functions/aircraft-options/aircraft-options-flow.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useAircraftOptionsCategoryGetAll = ({
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
    queryKey: [AircraftOptionsEnum.AircraftOptionsCategoryGetAll, search, page, status, perPage],
    queryFn: () =>
      aircraftOptionsCategoryGetAllFn({
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

const useAircraftOptionsCategoryGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [AircraftOptionsEnum.AircraftOptionsCategoryGet, id],
    queryFn: () => aircraftOptionsCategoryGetFn(id),
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

const useAircraftOptionsCategoryCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftOptionsEnum.AircraftOptionsCategoryCreate],
    mutationFn: aircraftOptionsCategoryCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [AircraftOptionsEnum.AircraftOptionsCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAircraftOptionsCategoryUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftOptionsEnum.AircraftOptionsCategoryUpdate],
    mutationFn: aircraftOptionsCategoryUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [AircraftOptionsEnum.AircraftOptionsCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAircraftOptionsCategoryChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftOptionsEnum.AircraftOptionsCategoryStatus],
    mutationFn: aircraftOptionsCategoryChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [AircraftOptionsEnum.AircraftOptionsCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAircraftOptionsCategoryDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftOptionsEnum.AircraftOptionsCategoryDelete],
    mutationFn: aircraftOptionsCategoryDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [AircraftOptionsEnum.AircraftOptionsCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

// Below Aircraft Options --------------------------------------------------------------->
const useAircraftOptionsGetAll = ({
  aircraftOptionsCategoryId,
  page,
  search,
  sortOrder,
  sortField,
  status,
  isFeatured,
  perPage = PAGE_LIMIT_FOR_PAGINATION,
}: {
  aircraftOptionsCategoryId: string;
  page: number;
  search: string;
  isFeatured?: boolean;
  perPage?: number;
  status?: string;
  sortOrder?: TPaginationSortOrderType;
  sortField?: string;
}) => {
  return useQuery({
    queryKey: [
      AircraftOptionsEnum.AircraftOptionsGetAll,
      aircraftOptionsCategoryId,
      search,
      page,
      isFeatured,
      status,
      perPage,
    ],
    queryFn: () =>
      aircraftOptionsGetAllFn({
        limit: perPage,
        page,
        search,
        ...(aircraftOptionsCategoryId?.length > 0 ? { aircraftOptionsCategoryId } : {}),
        ...(isFeatured ? { isFeatured } : {}),
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

const useAircraftOptionsGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [AircraftOptionsEnum.AircraftOptionsGet, id],
    queryFn: () => aircraftOptionsGetFn(id),
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

const useAircraftOptionsCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftOptionsEnum.AircraftOptionsCreate],
    mutationFn: aircraftOptionsCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AircraftOptionsEnum.AircraftOptionsGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAircraftOptionsUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftOptionsEnum.AircraftOptionsUpdate],
    mutationFn: aircraftOptionsUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AircraftOptionsEnum.AircraftOptionsGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAircraftOptionsChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftOptionsEnum.AircraftOptionsStatus],
    mutationFn: aircraftOptionsChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AircraftOptionsEnum.AircraftOptionsGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAircraftOptionsDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftOptionsEnum.AircraftOptionsDelete],
    mutationFn: aircraftOptionsDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AircraftOptionsEnum.AircraftOptionsGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAircraftOptionsReorder = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback?: () => void;
  errorCallback?: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftOptionsEnum.AircraftOptionsReorder],
    mutationFn: aircraftOptionsReorderFn,
    onSuccess: async () => {
      if (optionalCallback) optionalCallback();

      queryClient.invalidateQueries({ queryKey: [AircraftOptionsEnum.AircraftOptionsGetAll] });
    },
    onError: (error) => {
      if (errorCallback) errorCallback();
    },
  });
};

export {
  useAircraftOptionsCategoryChangeStatus,
  useAircraftOptionsCategoryCreate,
  useAircraftOptionsCategoryDelete,
  useAircraftOptionsCategoryGet,
  useAircraftOptionsCategoryGetAll,
  useAircraftOptionsCategoryUpdate,
  useAircraftOptionsChangeStatus,
  useAircraftOptionsCreate,
  useAircraftOptionsDelete,
  useAircraftOptionsGet,
  useAircraftOptionsGetAll,
  useAircraftOptionsReorder,
  useAircraftOptionsUpdate,
};
