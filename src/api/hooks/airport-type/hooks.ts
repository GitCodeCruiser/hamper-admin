'use client';

import { useQuery } from '@tanstack/react-query';

import { AirportTypeEnum } from './key';

import { airportTypeListingFn } from '@/api/functions/airport-type/index.api';

const useAirportTypeListing = () => {
  return useQuery({
    queryKey: [AirportTypeEnum.AirportTypeListing],
    queryFn: airportTypeListingFn,
    select(data) {
      return data?.data?.data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });
};

export { useAirportTypeListing };
