import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  ISubscriptionPlanListingResponse,
  ISubscriptionPlanDetailsResponse,
  ISubscriptionPlanSaveUpdateResponse,
  ISubscriptionPlan,
} from '@/types/interface/membership/index.interface';

export const subscriptionPlanListingFn = async () => {
  const res = await axiosInstance.get<ISubscriptionPlanListingResponse>(
    endpoints.cms.membership.listing('v1'),
  );
  return res.data;
};

export const subscriptionPlanDetailsFn = async (id: string) => {
  const res = await axiosInstance.get<ISubscriptionPlanDetailsResponse>(
    endpoints.cms.membership.details('v1', id),
  );
  return res.data;
};

export const subscriptionPlanSaveFn = async (body: FormData) => {
  const res = await axiosInstance.post<ISubscriptionPlanSaveUpdateResponse>(
    endpoints.cms.membership.save('v1'),
    body,
  );
  return res.data;
};

export const subscriptionPlanUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<ISubscriptionPlanSaveUpdateResponse>(
    endpoints.cms.membership.update('v1'),
    body,
  );
  return res.data;
};

export const subscriptionPlanReorderFn = async (body: { ids: string[] }) => {
  const res = await axiosInstance.post<ISubscriptionPlanSaveUpdateResponse>(
    endpoints.cms.membership.reorder('v1'),
    body,
  );
  return res.data;
};
