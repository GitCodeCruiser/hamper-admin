'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { DynamicFormEnum } from './key';

import {
  dynamicFormDetailsFn,
  dynamicFormSaveFn,
  dynamicFormStatusChangeFn,
  dynamicFormUpdateFn,
} from '@/api/functions/dynamic-form/index.api';

//========================================================>
//   DYNAMIC FORM DETAILS BY SLUG
//========================================================>

export const useDynamicFormDetails = ({ slug }: { slug: string }) => {
  return useQuery({
    queryKey: [DynamicFormEnum.Details, slug],
    queryFn: () => dynamicFormDetailsFn(slug),
    select: (data) => data?.data?.data,
    enabled: Boolean(slug),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
    retry: false,
  });
};

export const useDynamicFormStatusChange = ({
  slug,
  optionalCallback,
  errorCallback,
}: {
  slug: string;
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [DynamicFormEnum.StatusChange, slug],
    mutationFn: dynamicFormStatusChangeFn,
    onSuccess: async (res) => {
      if (res?.data?.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
        await queryClient.invalidateQueries({ queryKey: [DynamicFormEnum.Details, slug] });
      }
    },
    onError: errorCallback,
  });
};

//========================================================>
//   DYNAMIC FORM SAVE
//========================================================>

export const useDynamicFormSave = ({
  slug,
  optionalCallback,
  errorCallback,
}: {
  slug: string;
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [DynamicFormEnum.Save, slug],
    mutationFn: dynamicFormSaveFn,
    onSuccess: async (res) => {
      if (res?.data?.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
        await queryClient.invalidateQueries({ queryKey: [DynamicFormEnum.Details, slug] });
      }
    },
    onError: errorCallback,
  });
};

//========================================================>
//   DYNAMIC FORM UPDATE
//========================================================>

export const useDynamicFormUpdate = ({
  slug,
  optionalCallback,
  errorCallback,
}: {
  slug: string;
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [DynamicFormEnum.Update, slug],
    mutationFn: dynamicFormUpdateFn,
    onSuccess: async (res) => {
      if (res?.data?.statusCode === HttpStatusCode.Ok) {
        optionalCallback();
        await queryClient.invalidateQueries({ queryKey: [DynamicFormEnum.Details, slug] });
      }
    },
    onError: errorCallback,
  });
};
