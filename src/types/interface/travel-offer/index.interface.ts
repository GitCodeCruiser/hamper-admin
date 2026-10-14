import { BaseApiMetaResponse, BaseApiResponse } from '../common.interface';

import { TEachTravelOffer } from '@/types/apps/travel-offer/index.type';

export interface ITravelOfferGetAllResponse extends BaseApiResponse {
  data: {
    meta: BaseApiMetaResponse;
    docs: TEachTravelOffer[];
  };
}

export interface ITravelOfferGetResponse extends BaseApiResponse {
  data: TEachTravelOffer;
}

export interface ITravelOfferCreateResponse extends BaseApiResponse {
  data: TEachTravelOffer;
}

export interface ITravelOfferUpdateResponse extends BaseApiResponse {
  data: TEachTravelOffer;
}

export interface ITravelOfferDeleteResponse extends BaseApiResponse {
  data: TEachTravelOffer;
}

export interface ITravelOfferStatusChangeResponse extends BaseApiResponse {
  data: TEachTravelOffer;
}
