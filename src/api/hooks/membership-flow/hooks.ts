'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { MembershipEnum } from './key';

import {
  membershipCategoryChangeStatusFn,
  membershipCategoryCreateFn,
  membershipCategoryDeleteFn,
  membershipCategoryGetAllFn,
  membershipCategoryGetFn,
  membershipCategoryUpdateFn,
  membershipChangeStatusFn,
  membershipCreateFn,
  membershipDeleteFn,
  membershipGetAllFn,
  membershipGetFn,
  membershipReorderFn,
  membershipUpdateFn,
} from '@/api/functions/membership/membership-flow.api';
import { queryClient } from '@/app/providers';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { TPaginationSortOrderType } from '@/types/common/common.type';

const useMembershipCategoryGetAll = ({
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
    queryKey: [MembershipEnum.MembershipCategoryGetAll, search, page, status, perPage],
    queryFn: () =>
      membershipCategoryGetAllFn({
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

const useMembershipCategoryGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [MembershipEnum.MembershipCategoryGet, id],
    queryFn: () => membershipCategoryGetFn(id),
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

const useMembershipCategoryCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [MembershipEnum.MembershipCategoryCreate],
    mutationFn: membershipCategoryCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [MembershipEnum.MembershipCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useMembershipCategoryUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [MembershipEnum.MembershipCategoryUpdate],
    mutationFn: membershipCategoryUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [MembershipEnum.MembershipCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useMembershipCategoryChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [MembershipEnum.MembershipCategoryStatus],
    mutationFn: membershipCategoryChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [MembershipEnum.MembershipCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useMembershipCategoryDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [MembershipEnum.MembershipCategoryDelete],
    mutationFn: membershipCategoryDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({
          queryKey: [MembershipEnum.MembershipCategoryGetAll],
        });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

// Below Membership --------------------------------------------------------------->
const useMembershipGetAll = ({
  membershipCategoryId,
  page,
  search,
  sortOrder,
  sortField,
  status,
  isFeatured,
  perPage = PAGE_LIMIT_FOR_PAGINATION,
}: {
  membershipCategoryId: string;
  page: number;
  search: string;
  isFeatured?: boolean;
  perPage?: number;
  status?: string;
  sortOrder?: TPaginationSortOrderType;
  sortField?: string;
}) => {
  return useQuery({
    queryKey: [
      MembershipEnum.MembershipGetAll,
      membershipCategoryId,
      search,
      page,
      isFeatured,
      status,
      perPage,
    ],
    queryFn: () =>
      membershipGetAllFn({
        limit: perPage,
        page,
        search,
        ...(membershipCategoryId?.length > 0 ? { membershipCategoryId } : {}),
        ...(isFeatured ? { isFeatured } : {}),
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

const useMembershipGet = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [MembershipEnum.MembershipGet, id],
    queryFn: () => membershipGetFn(id),
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

const useMembershipCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [MembershipEnum.MembershipCreate],
    mutationFn: membershipCreateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [MembershipEnum.MembershipGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useMembershipUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [MembershipEnum.MembershipUpdate],
    mutationFn: membershipUpdateFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [MembershipEnum.MembershipGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useMembershipChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [MembershipEnum.MembershipStatus],
    mutationFn: membershipChangeStatusFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [MembershipEnum.MembershipGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useMembershipDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [MembershipEnum.MembershipDelete],
    mutationFn: membershipDeleteFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        queryClient.invalidateQueries({ queryKey: [MembershipEnum.MembershipGetAll] });
      }
    },
    onError: (error) => {
      errorCallback();
    },
  });
};

const useMembershipReorder = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback?: () => void;
  errorCallback?: () => void;
}) => {
  return useMutation({
    mutationKey: [MembershipEnum.MembershipReorder],
    mutationFn: membershipReorderFn,
    onSuccess: async () => {
      if (optionalCallback) optionalCallback();

      queryClient.invalidateQueries({ queryKey: [MembershipEnum.MembershipGetAll] });
    },
    onError: (error) => {
      if (errorCallback) errorCallback();
    },
  });
};

export {
  useMembershipCategoryChangeStatus,
  useMembershipCategoryCreate,
  useMembershipCategoryDelete,
  useMembershipCategoryGet,
  useMembershipCategoryGetAll,
  useMembershipCategoryUpdate,
  useMembershipChangeStatus,
  useMembershipCreate,
  useMembershipDelete,
  useMembershipGet,
  useMembershipGetAll,
  useMembershipReorder,
  useMembershipUpdate,
};
