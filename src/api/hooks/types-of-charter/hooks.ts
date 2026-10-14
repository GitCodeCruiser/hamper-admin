'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { TypesOfCharterEnum } from './key';

import {
  typesOfCharterCategoryChangeStatusFn,
  typesOfCharterCategoryCreateFn,
  typesOfCharterCategoryDeleteFn,
  typesOfCharterCategoryGetAllFn,
  typesOfCharterCategoryGetFn,
  typesOfCharterCategoryUpdateFn,
  typesOfCharterCategoryReorderFn,
  typesOfCharterChangeStatusFn,
  typesOfCharterCreateFn,
  typesOfCharterDeleteFn,
  typesOfCharterGetAllFn,
  typesOfCharterGetFn,
  typesOfCharterUpdateFn,
} from '@/api/functions/types-of-charter/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useTypesOfCharterCategoryGetAll = ({
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
    queryKey: [TypesOfCharterEnum.TypesOfCharterCategoryGetAll, search, page, status, perPage],
    queryFn: () =>
      typesOfCharterCategoryGetAllFn({
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

const useTypesOfCharterCategoryGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [TypesOfCharterEnum.TypesOfCharterCategoryGet, id],
    queryFn: () => typesOfCharterCategoryGetFn(id),
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

const useTypesOfCharterCategoryCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TypesOfCharterEnum.TypesOfCharterCategoryCreate],
    mutationFn: typesOfCharterCategoryCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [TypesOfCharterEnum.TypesOfCharterCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTypesOfCharterCategoryUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TypesOfCharterEnum.TypesOfCharterCategoryUpdate],
    mutationFn: typesOfCharterCategoryUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [TypesOfCharterEnum.TypesOfCharterCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTypesOfCharterCategoryChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TypesOfCharterEnum.TypesOfCharterCategoryStatus],
    mutationFn: typesOfCharterCategoryChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [TypesOfCharterEnum.TypesOfCharterCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTypesOfCharterCategoryDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TypesOfCharterEnum.TypesOfCharterCategoryDelete],
    mutationFn: typesOfCharterCategoryDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [TypesOfCharterEnum.TypesOfCharterCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

// Below Types Of Charter --------------------------------------------------------------->
const useTypesOfCharterGetAll = ({
  typesOfCharterCategoryId,
  page,
  search,
  sortOrder,
  sortField,
  status,
  isFeatured,
  perPage = PAGE_LIMIT_FOR_PAGINATION,
}: {
  typesOfCharterCategoryId: string;
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
      TypesOfCharterEnum.TypesOfCharterGetAll,
      typesOfCharterCategoryId,
      search,
      page,
      isFeatured,
      status,
      perPage,
    ],
    queryFn: () =>
      typesOfCharterGetAllFn({
        limit: perPage,
        page,
        search,
        ...(typesOfCharterCategoryId?.length > 0 ? { typesOfCharterCategoryId } : {}),
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

const useTypesOfCharterGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [TypesOfCharterEnum.TypesOfCharterGet, id],
    queryFn: () => typesOfCharterGetFn(id),
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

const useTypesOfCharterCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TypesOfCharterEnum.TypesOfCharterCreate],
    mutationFn: typesOfCharterCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [TypesOfCharterEnum.TypesOfCharterGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTypesOfCharterUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TypesOfCharterEnum.TypesOfCharterUpdate],
    mutationFn: typesOfCharterUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [TypesOfCharterEnum.TypesOfCharterGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTypesOfCharterChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TypesOfCharterEnum.TypesOfCharterStatus],
    mutationFn: typesOfCharterChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [TypesOfCharterEnum.TypesOfCharterGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTypesOfCharterDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TypesOfCharterEnum.TypesOfCharterDelete],
    mutationFn: typesOfCharterDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [TypesOfCharterEnum.TypesOfCharterGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTypesOfCharterCategoryReorder = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback?: () => void;
  errorCallback?: () => void;
}) => {
  return useMutation({
    mutationKey: [TypesOfCharterEnum.TypesOfCharterCategoryReorder],
    mutationFn: typesOfCharterCategoryReorderFn,
    onSuccess: async () => {
      if (optionalCallback) optionalCallback();

      queryClient.invalidateQueries({
        queryKey: [TypesOfCharterEnum.TypesOfCharterCategoryGetAll],
      });
    },
    onError: (error) => {
      if (errorCallback) errorCallback();
    },
  });
};

export {
  useTypesOfCharterCategoryChangeStatus,
  useTypesOfCharterCategoryCreate,
  useTypesOfCharterCategoryDelete,
  useTypesOfCharterCategoryGet,
  useTypesOfCharterCategoryGetAll,
  useTypesOfCharterCategoryUpdate,
  useTypesOfCharterCategoryReorder,
  useTypesOfCharterChangeStatus,
  useTypesOfCharterCreate,
  useTypesOfCharterDelete,
  useTypesOfCharterGet,
  useTypesOfCharterGetAll,
  useTypesOfCharterUpdate,
};
