import { BaseApiResponse } from '../common.interface';

export interface ISubscriptionPlan {
  _id?: string;
  title: string;
  subTitle: string;
  redirectUrl?: string;
  billingCycle: string;
  price: number;
  image?: string;
  imageSize?: string;
  imageUrl?: string;
  features: (string | { title: string })[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ISubscriptionPlanListingResponse extends BaseApiResponse {
  data: ISubscriptionPlan[];
}

export interface ISubscriptionPlanDetailsResponse extends BaseApiResponse {
  data: ISubscriptionPlan;
}

export interface ISubscriptionPlanSaveUpdateResponse extends BaseApiResponse {
  data: ISubscriptionPlan;
}
