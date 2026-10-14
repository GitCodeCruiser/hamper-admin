'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { WhyHoganiEnum } from './key';

import {
  whyHoganiCategoryChangeStatusFn,
  whyHoganiCategoryCreateFn,
  whyHoganiCategoryDeleteFn,
  whyHoganiCategoryGetAllFn,
  whyHoganiCategoryGetFn,
  whyHoganiCategoryUpdateFn,
  whyHoganiChangeStatusFn,
  whyHoganiCreateFn,
  whyHoganiDeleteFn,
  whyHoganiGetAllFn,
  whyHoganiGetFn,
  whyHoganiReorderFn,
  whyHoganiUpdateFn,
} from '@/api/functions/why-hogani/why-hogani-flow.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useWhyHoganiCategoryGetAll = ({
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
    queryKey: [WhyHoganiEnum.WhyHoganiCategoryGetAll, search, page, status, perPage],
    queryFn: () =>
      whyHoganiCategoryGetAllFn({
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

const useWhyHoganiCategoryGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [WhyHoganiEnum.WhyHoganiCategoryGet, id],
    queryFn: () => whyHoganiCategoryGetFn(id),
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

const useWhyHoganiCategoryCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [WhyHoganiEnum.WhyHoganiCategoryCreate],
    mutationFn: whyHoganiCategoryCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [WhyHoganiEnum.WhyHoganiCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useWhyHoganiCategoryUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [WhyHoganiEnum.WhyHoganiCategoryUpdate],
    mutationFn: whyHoganiCategoryUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [WhyHoganiEnum.WhyHoganiCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useWhyHoganiCategoryChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [WhyHoganiEnum.WhyHoganiCategoryStatus],
    mutationFn: whyHoganiCategoryChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [WhyHoganiEnum.WhyHoganiCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useWhyHoganiCategoryDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [WhyHoganiEnum.WhyHoganiCategoryDelete],
    mutationFn: whyHoganiCategoryDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [WhyHoganiEnum.WhyHoganiCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

// Below Why Hogani --------------------------------------------------------------->
const useWhyHoganiGetAll = ({
  whyHoganiCategoryId,
  page,
  search,
  sortOrder,
  sortField,
  status,
  isFeatured,
  perPage = PAGE_LIMIT_FOR_PAGINATION,
}: {
  whyHoganiCategoryId: string;
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
      WhyHoganiEnum.WhyHoganiGetAll,
      whyHoganiCategoryId,
      search,
      page,
      isFeatured,
      status,
      perPage,
    ],
    queryFn: () =>
      whyHoganiGetAllFn({
        limit: perPage,
        page,
        search,
        ...(whyHoganiCategoryId?.length > 0 ? { whyHoganiCategoryId } : {}),
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

const useWhyHoganiGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [WhyHoganiEnum.WhyHoganiGet, id],
    queryFn: () => whyHoganiGetFn(id),
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

const useWhyHoganiCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [WhyHoganiEnum.WhyHoganiCreate],
    mutationFn: whyHoganiCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [WhyHoganiEnum.WhyHoganiGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useWhyHoganiUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [WhyHoganiEnum.WhyHoganiUpdate],
    mutationFn: whyHoganiUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [WhyHoganiEnum.WhyHoganiGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useWhyHoganiChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [WhyHoganiEnum.WhyHoganiStatus],
    mutationFn: whyHoganiChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [WhyHoganiEnum.WhyHoganiGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useWhyHoganiDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [WhyHoganiEnum.WhyHoganiDelete],
    mutationFn: whyHoganiDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [WhyHoganiEnum.WhyHoganiGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useWhyHoganiReorder = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback?: () => void;
  errorCallback?: () => void;
}) => {
  return useMutation({
    mutationKey: [WhyHoganiEnum.WhyHoganiReorder],
    mutationFn: whyHoganiReorderFn,
    onSuccess: async () => {
      if (optionalCallback) optionalCallback();

      queryClient.invalidateQueries({ queryKey: [WhyHoganiEnum.WhyHoganiGetAll] });
    },
    onError: (error) => {
      if (errorCallback) errorCallback();
    },
  });
};

export {
  useWhyHoganiCategoryChangeStatus,
  useWhyHoganiCategoryCreate,
  useWhyHoganiCategoryDelete,
  useWhyHoganiCategoryGet,
  useWhyHoganiCategoryGetAll,
  useWhyHoganiCategoryUpdate,
  useWhyHoganiChangeStatus,
  useWhyHoganiCreate,
  useWhyHoganiDelete,
  useWhyHoganiGet,
  useWhyHoganiGetAll,
  useWhyHoganiReorder,
  useWhyHoganiUpdate,
};
