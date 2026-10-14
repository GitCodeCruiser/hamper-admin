import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { IAirportTypeListingResponse } from '@/types/interface/airport-type/index.interface';

export const airportTypeListingFn = async () => {
  const res = await axiosInstance.get<IAirportTypeListingResponse>(
    endpoints.airportType.listing('v1'),
  );

  return res;
};
