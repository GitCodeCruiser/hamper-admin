import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

import { membershipKeys } from './key';

import {
  subscriptionPlanDetailsFn,
  subscriptionPlanListingFn,
  subscriptionPlanReorderFn,
  subscriptionPlanSaveFn,
  subscriptionPlanUpdateFn,
} from '@/api/functions/membership/index.api';

export const useSubscriptionPlanListing = () => {
  return useQuery({
    queryKey: membershipKeys.listing(),
    queryFn: subscriptionPlanListingFn,
  });
};

export const useSubscriptionPlanDetails = (id: string) => {
  return useQuery({
    queryKey: membershipKeys.details(id),
    queryFn: () => subscriptionPlanDetailsFn(id),
    enabled: !!id,
  });
};

export const useSubscriptionPlanSave = (options?: {
  optionalCallback?: () => void;
  errorCallback?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subscriptionPlanSaveFn,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: membershipKeys.listing() });
      if (res?.statusCode === 200 || res?.statusCode === 201) {
        toast.success(res?.message || 'Plan saved successfully');
        options?.optionalCallback?.();
      } else {
        toast.error(res?.message || 'Something went wrong');
        options?.errorCallback?.();
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      options?.errorCallback?.();
    },
  });
};

export const useSubscriptionPlanUpdate = (options?: {
  optionalCallback?: () => void;
  errorCallback?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subscriptionPlanUpdateFn,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: membershipKeys.listing() });
      if (res?.statusCode === 200) {
        toast.success(res?.message || 'Plan updated successfully');
        options?.optionalCallback?.();
      } else {
        toast.error(res?.message || 'Something went wrong');
        options?.errorCallback?.();
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      options?.errorCallback?.();
    },
  });
};

export const useSubscriptionPlanReorder = (options?: {
  optionalCallback?: () => void;
  errorCallback?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subscriptionPlanReorderFn,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: membershipKeys.listing() });
      if (res?.statusCode === 200 || res?.statusCode === 201) {
        // toast.success(res?.message || 'Plans reordered successfully');
        options?.optionalCallback?.();
      } else {
        // toast.error(res?.message || 'Something went wrong');
        options?.errorCallback?.();
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      // toast.error(error?.response?.data?.message || 'Something went wrong');
      options?.errorCallback?.();
    },
  });
};
