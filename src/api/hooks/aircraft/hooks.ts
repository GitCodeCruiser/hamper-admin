'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { AircraftEnum } from './key';

import {
  aircraftCategoryChangeStatusFn,
  aircraftCategoryCreateFn,
  aircraftCategoryDeleteFn,
  aircraftCategoryGetAllFn,
  aircraftCategoryGetFn,
  aircraftCategoryListingFn,
  aircraftCategoryUpdateFn,
  aircraftChangeStatusFn,
  aircraftCreateFn,
  aircraftDeleteFn,
  aircraftGetAllFn,
  aircraftGetFn,
  aircraftHardDeleteFn,
  aircraftListingFn,
  aircraftMakeBookableFn,
  aircraftMakeFeaturedFn,
  aircraftRestoreFn,
  aircraftUpdateFn,
  typicalAircraftGetFn,
  typicalAircraftReorderFn,
} from '@/api/functions/aircraft/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useAircraftCategoryGetAll = ({
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
    queryKey: [AircraftEnum.AircraftCategoryGetAll, search, page, status, perPage],
    queryFn: () =>
      aircraftCategoryGetAllFn({
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

const useAircraftCategoryGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [AircraftEnum.AircraftCategoryGet, id],
    queryFn: () => aircraftCategoryGetFn(id),
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

const useAircraftCategoryCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftEnum.AircraftCategoryCreate],
    mutationFn: aircraftCategoryCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AircraftEnum.AircraftCategoryGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAircraftCategoryUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftEnum.AircraftCategoryUpdate],
    mutationFn: aircraftCategoryUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AircraftEnum.AircraftCategoryGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAircraftCategoryChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftEnum.AircraftCategoryStatus],
    mutationFn: aircraftCategoryChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AircraftEnum.AircraftCategoryGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAircraftCategoryDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftEnum.AircraftCategoryDelete],
    mutationFn: aircraftCategoryDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AircraftEnum.AircraftCategoryGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAircraftCategoryListing = () => {
  return useQuery({
    queryKey: [AircraftEnum.AircraftCategoryListing],
    queryFn: aircraftCategoryListingFn,
    select(data) {
      return data?.data?.data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });
};

const useAircraftGetAll = ({
  categoryId,
  page,
  search,
  sortOrder,
  sortField,
  status,
  isFeatured,
  isDeleted,
  perPage = PAGE_LIMIT_FOR_PAGINATION,
}: {
  categoryId: string;
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
    queryKey: [
      AircraftEnum.AircraftGetAll,
      categoryId,
      search,
      page,
      isFeatured,
      isDeleted,
      status,
      perPage,
    ],
    queryFn: () =>
      aircraftGetAllFn({
        limit: perPage,
        page,
        search,
        ...(categoryId?.length > 0 ? { categoryId } : {}),
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

const useAircraftGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [AircraftEnum.AircraftGet, id],
    queryFn: () => aircraftGetFn(id),
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

const useAircraftCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftEnum.AircraftCreate],
    mutationFn: aircraftCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AircraftEnum.AircraftGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAircraftUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftEnum.AircraftUpdate],
    mutationFn: aircraftUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AircraftEnum.AircraftGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAircraftChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftEnum.AircraftStatus],
    mutationFn: aircraftChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AircraftEnum.AircraftGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAircraftDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftEnum.AircraftDelete],
    mutationFn: aircraftDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AircraftEnum.AircraftGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAircraftMakeFeatured = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftEnum.AircraftMakeFeatured],
    mutationFn: aircraftMakeFeaturedFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AircraftEnum.AircraftGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAircraftMakeBookable = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftEnum.AircraftMakeBookable],
    mutationFn: aircraftMakeBookableFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AircraftEnum.AircraftGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAircraftListing = ({
  search,
  isBookable,
}: {
  search?: string;
  isBookable?: boolean;
} = {}) => {
  return useQuery({
    queryKey: [AircraftEnum.AircraftListing, search, isBookable],
    queryFn: () =>
      aircraftListingFn({
        ...(search ? { search } : {}),
        ...(isBookable !== undefined ? { isBookable } : {}),
      }),
    select(data) {
      return data?.data?.data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });
};

export {
  useAircraftCategoryChangeStatus,
  useAircraftCategoryCreate,
  useAircraftCategoryDelete,
  useAircraftCategoryGet,
  useAircraftCategoryGetAll,
  useAircraftCategoryListing,
  useAircraftCategoryUpdate,
  useAircraftChangeStatus,
  useAircraftCreate,
  useAircraftDelete,
  useAircraftGet,
  useAircraftGetAll,
  useAircraftHardDelete,
  useAircraftListing,
  useAircraftMakeBookable,
  useAircraftMakeFeatured,
  useAircraftRestore,
  useAircraftUpdate,
  useGetTypicalAircraft,
  useReorderTypicalAircraft,
};

const useAircraftRestore = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftEnum.AircraftRestore],
    mutationFn: aircraftRestoreFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AircraftEnum.AircraftGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useAircraftHardDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftEnum.AircraftHardDelete],
    mutationFn: aircraftHardDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [AircraftEnum.AircraftGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useGetTypicalAircraft = (categoryId: string) => {
  return useQuery({
    queryKey: [AircraftEnum.TypicalAircraftGet, categoryId],
    queryFn: () => typicalAircraftGetFn(categoryId),
    enabled: !!categoryId,
    select(data) {
      return data?.data?.data;
    },
  });
};

const useReorderTypicalAircraft = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [AircraftEnum.TypicalAircraftReorder],
    mutationFn: typicalAircraftReorderFn,
    onSuccess: async (res) => {
      if (res?.data?.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
      } else {
        errorCallback();
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};
