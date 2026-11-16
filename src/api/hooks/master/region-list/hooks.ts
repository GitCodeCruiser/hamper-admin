'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { RegionListEnum } from './key';

import {
  regionListChangeStatusFn,
  regionListCreateFn,
  regionListDeleteFn,
  regionListGetAllFn,
  regionListGetFn,
  regionListUpdateFn,
} from '@/api/functions/master/region-list/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useRegionListGetAll = ({
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
    queryKey: [RegionListEnum.RegionListGetAll, search, page, status, perPage],
    queryFn: () =>
      regionListGetAllFn({
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

const useRegionListGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [RegionListEnum.RegionListGet, id],
    queryFn: () => regionListGetFn(id),
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

const useRegionListCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [RegionListEnum.RegionListCreate],
    mutationFn: regionListCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [RegionListEnum.RegionListGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useRegionListUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [RegionListEnum.RegionListUpdate],
    mutationFn: regionListUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [RegionListEnum.RegionListGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useRegionListChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [RegionListEnum.RegionListStatus],
    mutationFn: regionListChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [RegionListEnum.RegionListGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useRegionListDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [RegionListEnum.RegionListDelete],
    mutationFn: regionListDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [RegionListEnum.RegionListGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export {
  useRegionListChangeStatus,
  useRegionListCreate,
  useRegionListDelete,
  useRegionListGet,
  useRegionListGetAll,
  useRegionListUpdate,
};
