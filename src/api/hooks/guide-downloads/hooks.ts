'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { GuideDownloadsEnum } from './key';

import {
  guideDownloadsDeleteFn,
  guideDownloadsGetAllFn,
  insiderGuideDownloadSettingDetailsFn,
  insiderGuideDownloadSettingUpdateFn,
} from '@/api/functions/guide-downloads/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useGuideDownloadsGetAll = ({
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
    queryKey: [GuideDownloadsEnum.GuideDownloadsGetAll, search, page, status, perPage],
    queryFn: () =>
      guideDownloadsGetAllFn({
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

const useGuideDownloadsDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [GuideDownloadsEnum.GuideDownloadsDelete],
    mutationFn: guideDownloadsDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [GuideDownloadsEnum.GuideDownloadsGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useInsiderGuideDownloadSettingDetails = () => {
  return useQuery({
    queryKey: [GuideDownloadsEnum.InsiderGuideDownloadSettingDetails],
    queryFn: insiderGuideDownloadSettingDetailsFn,
    select(data) {
      return data?.data?.data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });
};

const useInsiderGuideDownloadSettingUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [GuideDownloadsEnum.InsiderGuideDownloadSettingUpdate],
    mutationFn: insiderGuideDownloadSettingUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [GuideDownloadsEnum.InsiderGuideDownloadSettingDetails],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export {
  useGuideDownloadsDelete,
  useGuideDownloadsGetAll,
  useInsiderGuideDownloadSettingDetails,
  useInsiderGuideDownloadSettingUpdate,
};
