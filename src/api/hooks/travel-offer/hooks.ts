'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { TravelOfferEnum } from './key';

import {
  travelOfferCreateFn,
  travelOfferDeleteFn,
  travelOfferGetAllFn,
  travelOfferGetFn,
  travelOfferStatusChangeFn,
  travelOfferUpdateFn,
} from '@/api/functions/travel-offer/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';

const useTravelOfferGetAll = ({
  page,
  search,
  status,
  type,
  limit = PAGE_LIMIT_FOR_PAGINATION,
}: {
  page: number;
  search: string;
  limit?: number;
  status?: string;
  type?: 'one-way' | 'two-way' | 'empty-leg';
}) => {
  return useQuery({
    queryKey: [TravelOfferEnum.TravelOfferGetAll, search, page, status, type, limit],
    queryFn: () =>
      travelOfferGetAllFn({
        limit,
        page,
        search,
        status: status || undefined,
        type: type || undefined,
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

const useTravelOfferGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [TravelOfferEnum.TravelOfferGet, id],
    queryFn: () => travelOfferGetFn(id),
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

const useTravelOfferCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TravelOfferEnum.TravelOfferCreate],
    mutationFn: travelOfferCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [TravelOfferEnum.TravelOfferGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTravelOfferUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TravelOfferEnum.TravelOfferUpdate],
    mutationFn: travelOfferUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [TravelOfferEnum.TravelOfferGetAll] });
        queryClient.invalidateQueries({ queryKey: [TravelOfferEnum.TravelOfferGet] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTravelOfferDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TravelOfferEnum.TravelOfferDelete],
    mutationFn: travelOfferDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [TravelOfferEnum.TravelOfferGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTravelOfferStatusChange = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TravelOfferEnum.TravelOfferStatusChange],
    mutationFn: travelOfferStatusChangeFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [TravelOfferEnum.TravelOfferGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export {
  useTravelOfferCreate,
  useTravelOfferDelete,
  useTravelOfferGet,
  useTravelOfferGetAll,
  useTravelOfferStatusChange,
  useTravelOfferUpdate,
};
