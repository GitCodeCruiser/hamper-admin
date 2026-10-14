'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { CTAEnum } from './key';

import { ctaSettingDetailsFn, ctaSettingUpdateFn } from '@/api/functions/cta/index.api';
import { queryClient } from '@/app/providers';

const useCTASettingDetails = () => {
  return useQuery({
    queryKey: [CTAEnum.CTASettingDetails],
    queryFn: ctaSettingDetailsFn,
    select(data) {
      return data?.data?.data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });
};

const useCTASettingUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CTAEnum.CTASettingUpdate],
    mutationFn: ctaSettingUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [CTAEnum.CTASettingDetails],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export { useCTASettingDetails, useCTASettingUpdate };
