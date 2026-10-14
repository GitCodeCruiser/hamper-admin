import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TTravelOfferAddSchemaType,
  TTravelOfferEditSchemaType,
} from '@/module/dashboard/validation/travel-offer/index.zod';
import { TTravelOfferGetAllParamType } from '@/types/apps/travel-offer/index.type';
import {
  ITravelOfferCreateResponse,
  ITravelOfferDeleteResponse,
  ITravelOfferGetAllResponse,
  ITravelOfferGetResponse,
  ITravelOfferStatusChangeResponse,
  ITravelOfferUpdateResponse,
} from '@/types/interface/travel-offer/index.interface';

export const travelOfferGetAllFn = async (body: TTravelOfferGetAllParamType) => {
  const res = await axiosInstance.post<ITravelOfferGetAllResponse>(
    endpoints.travelOffer.getAll('v1'),
    body,
  );

  return res;
};

export const travelOfferGetFn = async (id: string) => {
  const res = await axiosInstance.get<ITravelOfferGetResponse>(
    `${endpoints.travelOffer.get('v1')}/${id}`,
  );

  return res;
};

export const travelOfferCreateFn = async (body: TTravelOfferAddSchemaType) => {
  const res = await axiosInstance.post<ITravelOfferCreateResponse>(
    endpoints.travelOffer.create('v1'),
    body,
  );

  return res;
};

export const travelOfferUpdateFn = async (body: TTravelOfferEditSchemaType) => {
  const res = await axiosInstance.post<ITravelOfferUpdateResponse>(
    endpoints.travelOffer.update('v1'),
    body,
  );

  return res;
};

export const travelOfferDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<ITravelOfferDeleteResponse>(
    `${endpoints.travelOffer.delete('v1')}/${id}`,
  );

  return res;
};

export const travelOfferStatusChangeFn = async (body: { id: string; status: string }) => {
  const res = await axiosInstance.post<ITravelOfferStatusChangeResponse>(
    endpoints.travelOffer.statusChange('v1'),
    body,
  );

  return res;
};
