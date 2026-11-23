'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { UserEnum } from './key';

import {
  userChangeStatusFn,
  userCreateFn,
  userDeleteFn,
  userGetAllFn,
  userGetFn,
  userUpdateFn,
} from '@/api/functions/user/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

export const useUsersGetAll = ({
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
    queryKey: [UserEnum.UserGetAll, search, page, status, perPage],
    queryFn: () =>
      userGetAllFn({
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

export const useUsersGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [UserEnum.UserGet, id],
    queryFn: () => userGetFn(id),
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

export const useUsersCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [UserEnum.UserCreate],
    mutationFn: userCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
        queryClient.invalidateQueries({ queryKey: [UserEnum.UserGetAll] });
      }
    },
    onError: () => {
      errorCallback();
    },
  });
};

export const useUsersUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [UserEnum.UserUpdate],
    mutationFn: userUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
        queryClient.invalidateQueries({ queryKey: [UserEnum.UserGetAll] });
        queryClient.invalidateQueries({ queryKey: [UserEnum.UserGet] });
      }
    },
    onError: () => {
      errorCallback();
    },
  });
};

export const useUsersChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [UserEnum.UserStatusChange],
    mutationFn: userChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
        queryClient.invalidateQueries({ queryKey: [UserEnum.UserGetAll] });
        queryClient.invalidateQueries({ queryKey: [UserEnum.UserGet] });
      }
    },
    onError: () => {
      errorCallback();
    },
  });
};

export const useUsersDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [UserEnum.UserDelete],
    mutationFn: userDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
        queryClient.invalidateQueries({ queryKey: [UserEnum.UserGetAll] });
      }
    },
    onError: () => {
      errorCallback();
    },
  });
};
