'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { MenuFooterEnum } from './key';

import {
  authAdminMenuFooterDetailsFn,
  authAdminMenuFooterUpdateFn,
} from '@/api/functions/menu-footer/index.api';
import { queryClient } from '@/app/providers';

const useMenuFooterDetails = () => {
  return useQuery({
    queryKey: [MenuFooterEnum.Details],
    queryFn: authAdminMenuFooterDetailsFn,
    select(data) {
      return data?.data?.data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });
};

const useMenuFooterUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [MenuFooterEnum.Update],
    mutationFn: authAdminMenuFooterUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [MenuFooterEnum.Details] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export { useMenuFooterDetails, useMenuFooterUpdate };
