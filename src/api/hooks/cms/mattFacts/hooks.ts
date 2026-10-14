'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { CmsMattFactsEnum } from './key';

import {
  mattFactsCreateFn,
  mattFactsDeleteFn,
  mattFactsGetFn,
  mattFactsListingFn,
  mattFactsUpdateFn,
} from '@/api/functions/cms/mattFacts/index.api';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';

const useMattFactsListing = ({
  pageSlug,
  purpose,
}: {
  pageSlug: TSeoStaticSlug;
  purpose: string;
}) => {
  return useQuery({
    queryKey: [CmsMattFactsEnum.MattFactsListing, pageSlug, purpose],
    queryFn: () =>
      mattFactsListingFn({
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

const useMattFactsGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [CmsMattFactsEnum.MattFactsGet],
    queryFn: () => mattFactsGetFn(id),
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

const useMattFactsCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsMattFactsEnum.MattFactsCreate],
    mutationFn: mattFactsCreateFn,
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

const useMattFactsUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsMattFactsEnum.MattFactsUpdate],
    mutationFn: mattFactsUpdateFn,
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

const useMattFactsDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [CmsMattFactsEnum.MattFactsDelete],
    mutationFn: mattFactsDeleteFn,
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
  useMattFactsCreate,
  useMattFactsDelete,
  useMattFactsGet,
  useMattFactsListing,
  useMattFactsUpdate,
};
