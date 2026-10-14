import { TEachTravelOffer } from '../travel-offer/index.type';

import { TPaginationCommonType } from '@/types/common/common.type';

export type TLegEnquiryGetAllParamType = {} & TPaginationCommonType;

export type TLegEnquiryAdminReply = {
  _id: string;
  legEnquiryId?: string;
  legEnquireId?: string;
  contactId?: string;
  message: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TEachLegEnquiry = {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  message: string;
  isReplied: boolean;
  createdAt: string;
  legEnquireFormReplies?: TLegEnquiryAdminReply[];
  travelOfferId: string;
  travelOffer: TEachTravelOffer;
};
