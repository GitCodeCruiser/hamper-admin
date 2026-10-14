'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { StateListEnum } from './key';

import {
  stateListChangeStatusFn,
  stateListCreateFn,
  stateListDeleteFn,
  stateListGetAllFn,
  stateListGetFn,
  stateListUpdateFn,
} from '@/api/functions/master/state-list/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useStateListGetAll = ({
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
    queryKey: [StateListEnum.StateListGetAll, search, page, status, perPage],
    queryFn: () =>
      stateListGetAllFn({
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

const useStateListGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [StateListEnum.StateListGet, id],
    queryFn: () => stateListGetFn(id),
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

const useStateListCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [StateListEnum.StateListCreate],
    mutationFn: stateListCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
        queryClient.invalidateQueries({ queryKey: [StateListEnum.StateListGetAll] });
      }
    },
    onError: () => {
      errorCallback();
    },
  });
};

const useStateListUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [StateListEnum.StateListUpdate],
    mutationFn: stateListUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
        queryClient.invalidateQueries({ queryKey: [StateListEnum.StateListGetAll] });
      }
    },
    onError: () => {
      errorCallback();
    },
  });
};

const useStateListChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [StateListEnum.StateListStatus],
    mutationFn: stateListChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
        queryClient.invalidateQueries({ queryKey: [StateListEnum.StateListGetAll] });
      }
    },
    onError: () => {
      errorCallback();
    },
  });
};

const useStateListDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [StateListEnum.StateListDelete],
    mutationFn: stateListDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
        queryClient.invalidateQueries({ queryKey: [StateListEnum.StateListGetAll] });
      }
    },
    onError: () => {
      errorCallback();
    },
  });
};

export {
  useStateListChangeStatus,
  useStateListCreate,
  useStateListDelete,
  useStateListGet,
  useStateListGetAll,
  useStateListUpdate,
};
