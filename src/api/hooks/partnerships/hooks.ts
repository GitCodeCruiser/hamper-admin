import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { PartnershipEnum } from './key';

import {
  partnershipChangeStatusFn,
  partnershipCreateFn,
  partnershipDeleteFn,
  partnershipGetAllFn,
  partnershipGetFn,
  partnershipMakeFeaturedFn,
  partnershipUpdateFn,
} from '@/api/functions/partnerships/index.api';
import { TPartnershipGetAllParamType } from '@/types/apps/partnerships/index.type';

// Get All Partnerships
export const usePartnershipGetAll = (body: TPartnershipGetAllParamType) => {
  return useQuery({
    queryKey: [PartnershipEnum.PARTNERSHIP_GET_ALL, body],
    queryFn: () => partnershipGetAllFn(body).then((res) => res.data.data),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

// Get Single Partnership by ID
export const usePartnershipGet = ({ id, enabled = true }: { id: string; enabled?: boolean }) => {
  return useQuery({
    queryKey: [PartnershipEnum.PARTNERSHIP_GET_BY_ID, id],
    queryFn: () => partnershipGetFn(id).then((res) => res.data.data),
    enabled: !!id && enabled,
  });
};

// Create Partnership
export const usePartnershipCreate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback?: () => void;
  errorCallback?: () => void;
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: partnershipCreateFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PartnershipEnum.PARTNERSHIP_GET_ALL] });
      if (optionalCallback) optionalCallback();
    },
    onError: () => {
      if (errorCallback) errorCallback();
    },
  });
};

// Update Partnership
export const usePartnershipUpdate = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback?: () => void;
  errorCallback?: () => void;
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: partnershipUpdateFn,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [PartnershipEnum.PARTNERSHIP_GET_ALL] });
      queryClient.invalidateQueries({ queryKey: [PartnershipEnum.PARTNERSHIP_GET_BY_ID] });
      if (optionalCallback) optionalCallback();
    },
    onError: () => {
      if (errorCallback) errorCallback();
    },
  });
};

// Delete Partnership
export const usePartnershipDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback?: () => void;
  errorCallback?: () => void;
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: partnershipDeleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PartnershipEnum.PARTNERSHIP_GET_ALL] });
      if (optionalCallback) optionalCallback();
    },
    onError: () => {
      if (errorCallback) errorCallback();
    },
  });
};

// Change Status
export const usePartnershipChangeStatus = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback?: () => void;
  errorCallback?: () => void;
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: partnershipChangeStatusFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PartnershipEnum.PARTNERSHIP_GET_ALL] });
      queryClient.invalidateQueries({ queryKey: [PartnershipEnum.PARTNERSHIP_GET_BY_ID] });
      if (optionalCallback) optionalCallback();
    },
    onError: () => {
      if (errorCallback) errorCallback();
    },
  });
};

// Make Featured
export const usePartnershipMakeFeatured = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback?: () => void;
  errorCallback?: () => void;
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: partnershipMakeFeaturedFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PartnershipEnum.PARTNERSHIP_GET_ALL] });
      queryClient.invalidateQueries({ queryKey: [PartnershipEnum.PARTNERSHIP_GET_BY_ID] });
      if (optionalCallback) optionalCallback();
    },
    onError: () => {
      if (errorCallback) errorCallback();
    },
  });
};
