'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { TestimonialEnum } from './key';

import {
  testimonialChangeStatusFn,
  testimonialCreateFn,
  testimonialDeleteFn,
  testimonialGetAllFn,
  testimonialGetFn,
  testimonialUpdateFn,
} from '@/api/functions/testimonial/index.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useTestimonialGetAll = ({
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
    queryKey: [TestimonialEnum.TestimonialGetAll, search, page, status, perPage],
    queryFn: () =>
      testimonialGetAllFn({
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

const useTestimonialGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [TestimonialEnum.TestimonialGet, id],
    queryFn: () => testimonialGetFn(id),
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

const useTestimonialCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TestimonialEnum.TestimonialCreate],
    mutationFn: testimonialCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [TestimonialEnum.TestimonialGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTestimonialUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TestimonialEnum.TestimonialUpdate],
    mutationFn: testimonialUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [TestimonialEnum.TestimonialGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTestimonialChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TestimonialEnum.TestimonialStatus],
    mutationFn: testimonialChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [TestimonialEnum.TestimonialGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useTestimonialDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [TestimonialEnum.TestimonialDelete],
    mutationFn: testimonialDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [TestimonialEnum.TestimonialGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

export {
  useTestimonialChangeStatus,
  useTestimonialCreate,
  useTestimonialDelete,
  useTestimonialGet,
  useTestimonialGetAll,
  useTestimonialUpdate,
};
