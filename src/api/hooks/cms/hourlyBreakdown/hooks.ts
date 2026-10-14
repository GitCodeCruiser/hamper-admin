'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { CmsHourlyBreakdownEnum } from './key';

import {
  hourlyBreakdownCreateFn,
  hourlyBreakdownDeleteFn,
  hourlyBreakdownGetFn,
  hourlyBreakdownListingFn,
  hourlyBreakdownUpdateFn,
} from '@/api/functions/cms/hourlyBreakdown/index.api';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';

const useHourlyBreakdownListing = ({
  pageSlug,
  purpose,
}: {
  pageSlug: TSeoStaticSlug;
  purpose: string;
}) => {
  return useQuery({
    queryKey: [CmsHourlyBreakdownEnum.HourlyBreakdownListing, pageSlug, purpose],
    queryFn: () =>
      hourlyBreakdownListingFn({
        pageSlug,
        purpose,
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

const useHourlyBreakdownGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [CmsHourlyBreakdownEnum.HourlyBreakdownGet],
    queryFn: () => hourlyBreakdownGetFn(id),
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

const useHourlyBreakdownCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsHourlyBreakdownEnum.HourlyBreakdownCreate],
    mutationFn: hourlyBreakdownCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useHourlyBreakdownUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsHourlyBreakdownEnum.HourlyBreakdownUpdate],
    mutationFn: hourlyBreakdownUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useHourlyBreakdownDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsHourlyBreakdownEnum.HourlyBreakdownDelete],
    mutationFn: hourlyBreakdownDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export {
  useHourlyBreakdownCreate,
  useHourlyBreakdownDelete,
  useHourlyBreakdownGet,
  useHourlyBreakdownListing,
  useHourlyBreakdownUpdate,
};
