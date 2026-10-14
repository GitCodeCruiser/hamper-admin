'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { RouteEnum } from './key';

import {
  routeChangeStatusFn,
  routeCreateFn,
  routeDeleteFn,
  routeGetAllFn,
  routeGetFn,
  routeMakeFeaturedFn,
  routeRestoreFn,
  routeHardDeleteFn,
  routeUpdateFn,
} from '@/api/functions/route/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useRouteGetAll = ({
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
    queryKey: [RouteEnum.RouteGetAll, search, page, isFeatured, isDeleted, status, perPage],
    queryFn: () =>
      routeGetAllFn({
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

const useRouteGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [RouteEnum.RouteGet, id],
    queryFn: () => routeGetFn(id),
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

const useRouteCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [RouteEnum.RouteCreate],
    mutationFn: routeCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [RouteEnum.RouteGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useRouteUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [RouteEnum.RouteUpdate],
    mutationFn: routeUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [RouteEnum.RouteGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useRouteChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [RouteEnum.RouteChangeStatus],
    mutationFn: routeChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [RouteEnum.RouteGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useRouteDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [RouteEnum.RouteDelete],
    mutationFn: routeDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [RouteEnum.RouteGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useRouteMakeFeatured = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [RouteEnum.RouteMakeFeatured],
    mutationFn: routeMakeFeaturedFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [RouteEnum.RouteGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export {
  useRouteChangeStatus,
  useRouteCreate,
  useRouteDelete,
  useRouteGet,
  useRouteGetAll,
  useRouteMakeFeatured,
  useRouteRestore,
  useRouteHardDelete,
  useRouteUpdate,
};

const useRouteRestore = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [RouteEnum.RouteRestore],
    mutationFn: routeRestoreFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [RouteEnum.RouteGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useRouteHardDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [RouteEnum.RouteHardDelete],
    mutationFn: routeHardDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [RouteEnum.RouteGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};
