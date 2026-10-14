'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { TravelResourcesEnum } from './key';

import {
  travelResourcesCategoryChangeStatusFn,
  travelResourcesCategoryCreateFn,
  travelResourcesCategoryDeleteFn,
  travelResourcesCategoryGetAllFn,
  travelResourcesCategoryGetFn,
  travelResourcesCategoryUpdateFn,
  travelResourcesChangeStatusFn,
  travelResourcesCreateFn,
  travelResourcesDeleteFn,
  travelResourcesGetAllFn,
  travelResourcesGetFn,
  travelResourcesReorderFn,
  travelResourcesUpdateFn,
} from '@/api/functions/travel-resources/travel-resources-flow.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useTravelResourcesCategoryGetAll = ({
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
    queryKey: [TravelResourcesEnum.TravelResourcesCategoryGetAll, search, page, status, perPage],
    queryFn: () =>
      travelResourcesCategoryGetAllFn({
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

const useTravelResourcesCategoryGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [TravelResourcesEnum.TravelResourcesCategoryGet, id],
    queryFn: () => travelResourcesCategoryGetFn(id),
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

const useTravelResourcesCategoryCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TravelResourcesEnum.TravelResourcesCategoryCreate],
    mutationFn: travelResourcesCategoryCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [TravelResourcesEnum.TravelResourcesCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTravelResourcesCategoryUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TravelResourcesEnum.TravelResourcesCategoryUpdate],
    mutationFn: travelResourcesCategoryUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [TravelResourcesEnum.TravelResourcesCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTravelResourcesCategoryChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TravelResourcesEnum.TravelResourcesCategoryStatus],
    mutationFn: travelResourcesCategoryChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [TravelResourcesEnum.TravelResourcesCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTravelResourcesCategoryDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TravelResourcesEnum.TravelResourcesCategoryDelete],
    mutationFn: travelResourcesCategoryDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [TravelResourcesEnum.TravelResourcesCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

// Below Travel Resources --------------------------------------------------------------->
const useTravelResourcesGetAll = ({
  travelResourcesCategoryId,
  page,
  search,
  sortOrder,
  sortField,
  status,
  isFeatured,
  perPage = PAGE_LIMIT_FOR_PAGINATION,
}: {
  travelResourcesCategoryId: string;
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
      TravelResourcesEnum.TravelResourcesGetAll,
      travelResourcesCategoryId,
      search,
      page,
      isFeatured,
      status,
      perPage,
    ],
    queryFn: () =>
      travelResourcesGetAllFn({
        limit: perPage,
        page,
        search,
        ...(travelResourcesCategoryId?.length > 0 ? { travelResourcesCategoryId } : {}),
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

const useTravelResourcesGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [TravelResourcesEnum.TravelResourcesGet, id],
    queryFn: () => travelResourcesGetFn(id),
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

const useTravelResourcesCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TravelResourcesEnum.TravelResourcesCreate],
    mutationFn: travelResourcesCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [TravelResourcesEnum.TravelResourcesGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTravelResourcesUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TravelResourcesEnum.TravelResourcesUpdate],
    mutationFn: travelResourcesUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [TravelResourcesEnum.TravelResourcesGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTravelResourcesChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TravelResourcesEnum.TravelResourcesStatus],
    mutationFn: travelResourcesChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [TravelResourcesEnum.TravelResourcesGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTravelResourcesDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TravelResourcesEnum.TravelResourcesDelete],
    mutationFn: travelResourcesDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [TravelResourcesEnum.TravelResourcesGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTravelResourcesReorder = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback?: () => void;
  errorCallback?: () => void;
}) => {
  return useMutation({
    mutationKey: [TravelResourcesEnum.TravelResourcesReorder],
    mutationFn: travelResourcesReorderFn,
    onSuccess: async () => {
      if (optionalCallback) optionalCallback();

      queryClient.invalidateQueries({ queryKey: [TravelResourcesEnum.TravelResourcesGetAll] });
    },
    onError: (error) => {
      if (errorCallback) errorCallback();
    },
  });
};

export {
  useTravelResourcesCategoryChangeStatus,
  useTravelResourcesCategoryCreate,
  useTravelResourcesCategoryDelete,
  useTravelResourcesCategoryGet,
  useTravelResourcesCategoryGetAll,
  useTravelResourcesCategoryUpdate,
  useTravelResourcesChangeStatus,
  useTravelResourcesCreate,
  useTravelResourcesDelete,
  useTravelResourcesGet,
  useTravelResourcesGetAll,
  useTravelResourcesReorder,
  useTravelResourcesUpdate,
};
