'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { ResourcesEnum } from './key';

import {
  resourcesCategoryChangeStatusFn,
  resourcesCategoryCreateFn,
  resourcesCategoryDeleteFn,
  resourcesCategoryGetAllFn,
  resourcesCategoryGetFn,
  resourcesCategoryUpdateFn,
  resourcesCategoryReorderFn,
  resourcesChangeStatusFn,
  resourcesCreateFn,
  resourcesDeleteFn,
  resourcesGetAllFn,
  resourcesGetFn,
  resourcesUpdateFn,
} from '@/api/functions/resources/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useResourcesCategoryGetAll = ({
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
    queryKey: [ResourcesEnum.ResourcesCategoryGetAll, search, page, status, perPage],
    queryFn: () =>
      resourcesCategoryGetAllFn({
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

const useResourcesCategoryGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [ResourcesEnum.ResourcesCategoryGet, id],
    queryFn: () => resourcesCategoryGetFn(id),
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

const useResourcesCategoryCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [ResourcesEnum.ResourcesCategoryCreate],
    mutationFn: resourcesCategoryCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [ResourcesEnum.ResourcesCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useResourcesCategoryUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [ResourcesEnum.ResourcesCategoryUpdate],
    mutationFn: resourcesCategoryUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [ResourcesEnum.ResourcesCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useResourcesCategoryChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [ResourcesEnum.ResourcesCategoryStatus],
    mutationFn: resourcesCategoryChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [ResourcesEnum.ResourcesCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useResourcesCategoryDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [ResourcesEnum.ResourcesCategoryDelete],
    mutationFn: resourcesCategoryDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [ResourcesEnum.ResourcesCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

// Below Resources --------------------------------------------------------------->
const useResourcesGetAll = ({
  resourcesCategoryId,
  page,
  search,
  sortOrder,
  sortField,
  status,
  isFeatured,
  perPage = PAGE_LIMIT_FOR_PAGINATION,
}: {
  resourcesCategoryId: string;
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
      ResourcesEnum.ResourcesGetAll,
      resourcesCategoryId,
      search,
      page,
      isFeatured,
      status,
      perPage,
    ],
    queryFn: () =>
      resourcesGetAllFn({
        limit: perPage,
        page,
        search,
        ...(resourcesCategoryId?.length > 0 ? { resourcesCategoryId } : {}),
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

const useResourcesGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [ResourcesEnum.ResourcesGet, id],
    queryFn: () => resourcesGetFn(id),
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

const useResourcesCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [ResourcesEnum.ResourcesCreate],
    mutationFn: resourcesCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [ResourcesEnum.ResourcesGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useResourcesUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [ResourcesEnum.ResourcesUpdate],
    mutationFn: resourcesUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [ResourcesEnum.ResourcesGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useResourcesChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [ResourcesEnum.ResourcesStatus],
    mutationFn: resourcesChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [ResourcesEnum.ResourcesGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useResourcesDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [ResourcesEnum.ResourcesDelete],
    mutationFn: resourcesDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [ResourcesEnum.ResourcesGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useResourcesCategoryReorder = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback?: () => void;
  errorCallback?: () => void;
}) => {
  return useMutation({
    mutationKey: [ResourcesEnum.ResourcesCategoryReorder],
    mutationFn: resourcesCategoryReorderFn,
    onSuccess: async () => {
      if (optionalCallback) optionalCallback();

      queryClient.invalidateQueries({
        queryKey: [ResourcesEnum.ResourcesCategoryGetAll],
      });
    },
    onError: (error) => {
      if (errorCallback) errorCallback();
    },
  });
};

export {
  useResourcesCategoryChangeStatus,
  useResourcesCategoryCreate,
  useResourcesCategoryDelete,
  useResourcesCategoryGet,
  useResourcesCategoryGetAll,
  useResourcesCategoryUpdate,
  useResourcesCategoryReorder,
  useResourcesChangeStatus,
  useResourcesCreate,
  useResourcesDelete,
  useResourcesGet,
  useResourcesGetAll,
  useResourcesUpdate,
};
