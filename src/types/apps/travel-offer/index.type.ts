import { TEachAircraft } from '../aircraft/index.type';
import { TEachAirportDataListing } from '../airport-data/index.type';

import { TStatusChangeType } from '@/types/common/common.type';

export type TTravelOfferGetAllParamType = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  type?: 'one-way' | 'two-way' | 'empty-leg';
};

export type TEachTravelOffer = {
  _id: string;
  sourceId?: string | null;
  destinationId?: string | null;
  source: TEachAirportDataListing | null;
  destination: TEachAirportDataListing | null;
  aircraftId: string | null;
  price: number;
  postedDate: string | null;
  type: 'one-way' | 'two-way' | 'empty-leg';
  status: TStatusChangeType;
  isDeleted: boolean;
  createdAt: string;
  aircraft: TEachAircraft;
};
