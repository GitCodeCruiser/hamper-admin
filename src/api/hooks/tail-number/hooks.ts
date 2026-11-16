'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosResponse, HttpStatusCode } from 'axios';

import { TailNumberEnum } from './key';

import {
  tailNumberChangeStatusFn,
  tailNumberCreateFn,
  tailNumberDeleteFn,
  tailNumberGetAllFn,
  tailNumberGetFn,
  tailNumberRestoreFn,
  tailNumberUpdateFn,
} from '@/api/functions/tail-number/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TTailNumberGetAllParamType } from '@/types/apps/tail-number/index.type';
import { BaseApiResponse } from '@/types/interface/common.interface';

type TMutationCallbacks = {
  optionalCallback: () => void;
  errorCallback: () => void;
};

const useTailNumberGetAll = ({
  page,
  search,
  aircraftId,
  status,
  isDeleted,
  sortField,
  sortOrder,
  perPage = PAGE_LIMIT_FOR_PAGINATION,
}: Omit<TTailNumberGetAllParamType, 'limit'> & { perPage?: number }) => {
  return useQuery({
    queryKey: [
      TailNumberEnum.TailNumberGetAll,
      search,
      page,
      perPage,
      aircraftId,
      status,
      isDeleted,
      sortField,
      sortOrder,
    ],
    queryFn: () =>
      tailNumberGetAllFn({
        page,
        limit: perPage,
        search,
        ...(aircraftId ? { aircraftId } : {}),
        ...(status ? { status } : {}),
        ...(isDeleted ? { isDeleted } : {}),
        ...(sortField ? { sortField } : {}),
        ...(sortOrder ? { sortOrder } : {}),
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

const useTailNumberGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [TailNumberEnum.TailNumberGet, id],
    queryFn: () => tailNumberGetFn(id),
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

/** All tail-number mutations share the same success / error handling. */
function useTailNumberMutation<TVariables>(
  key: TailNumberEnum,
  mutationFn: (variables: TVariables) => Promise<AxiosResponse<BaseApiResponse>>,
  { optionalCallback, errorCallback }: TMutationCallbacks,
) {
  return useMutation({
    mutationKey: [key],
    mutationFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
        queryClient.invalidateQueries({ queryKey: [TailNumberEnum.TailNumberGetAll] });
      }
    },
    onError: () => {
      errorCallback();
    },
  });
}

const useTailNumberCreate = (callbacks: TMutationCallbacks) =>
  useTailNumberMutation(TailNumberEnum.TailNumberCreate, tailNumberCreateFn, callbacks);

const useTailNumberUpdate = (callbacks: TMutationCallbacks) =>
  useTailNumberMutation(TailNumberEnum.TailNumberUpdate, tailNumberUpdateFn, callbacks);

const useTailNumberChangeStatus = (callbacks: TMutationCallbacks) =>
  useTailNumberMutation(TailNumberEnum.TailNumberStatus, tailNumberChangeStatusFn, callbacks);

const useTailNumberDelete = (callbacks: TMutationCallbacks) =>
  useTailNumberMutation(TailNumberEnum.TailNumberDelete, tailNumberDeleteFn, callbacks);

const useTailNumberRestore = (callbacks: TMutationCallbacks) =>
  useTailNumberMutation(TailNumberEnum.TailNumberRestore, tailNumberRestoreFn, callbacks);

export {
  useTailNumberChangeStatus,
  useTailNumberCreate,
  useTailNumberDelete,
  useTailNumberGet,
  useTailNumberGetAll,
  useTailNumberRestore,
  useTailNumberUpdate,
};
