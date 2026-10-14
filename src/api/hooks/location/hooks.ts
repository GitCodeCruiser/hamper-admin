'use client';

import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

import { LocationEnum } from './key';

import {
  locationCityListFn,
  locationCountryListFn,
  locationStateListFn,
} from '@/api/functions/location/index.api';
import { useDebounce } from '@/hooks/utils/useDebounce';

type TUseLocationHierarchyProps = {
  countrySearch?: string;
  stateSearch?: string;
  citySearch?: string;
};

/**
 *
 *
 */
export const useLocationHierarchy = ({
  countrySearch,
  stateSearch,
  citySearch,
}: TUseLocationHierarchyProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const debouncedCountry = useDebounce(selectedCountry, 500);
  const [selectedState, setSelectedState] = useState<string>('');
  const debouncedState = useDebounce(selectedState, 500);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const debouncedCity = useDebounce(selectedCity, 500);

  const {
    data: countryListRaw,
    isLoading: countryListRawLoading,
    refetch: countryListRefetch,
  } = useLocationCountryList({});

  const {
    data: stateListRaw,
    isLoading: stateListRawLoading,
    refetch: stateListRefetch,
  } = useLocationStateList({
    country: debouncedCountry,
  });

  const {
    data: cityListRaw,
    isLoading: cityListRawLoading,
    refetch: cityListRefetch,
  } = useLocationCityList({
    country: debouncedCountry,
    state: debouncedState,
  });

  const onCountryChange = useCallback(
    (country: string) => {
      setSelectedCountry(() => country);
      setSelectedState(() => '');
      setSelectedCity(() => '');
    },
    [setSelectedCountry, setSelectedState, setSelectedCity],
  );

  const onStateChange = useCallback(
    (state: string) => {
      setSelectedState(() => state);
      setSelectedCity(() => '');
    },
    [setSelectedState, setSelectedCity],
  );

  const onCityChange = useCallback(
    (city: string) => {
      setSelectedCity(() => city);
    },
    [setSelectedCity],
  );

  useEffect(() => {
    if (countrySearch) {
      setSelectedCountry(() => countrySearch);
    }
    if (stateSearch) {
      setSelectedState(() => stateSearch);
    }
    if (citySearch) {
      setSelectedCity(() => citySearch);
    }

    return () => {};
  }, [countrySearch, stateSearch, citySearch]);

  return {
    debouncedCountry: selectedCountry,
    debouncedState: selectedState,
    debouncedCity: selectedCity,
    countryListRaw,
    countryListRawLoading,
    countryListRefetch,
    stateListRaw,
    stateListRawLoading,
    stateListRefetch,
    cityListRaw,
    cityListRawLoading,
    cityListRefetch,
    onCountryChange,
    onStateChange,
    onCityChange,
  };
};

export const useLocationCountryList = ({ search }: { search?: string }) => {
  return useQuery({
    queryKey: [LocationEnum.LocationCountryList, search],
    queryFn: () =>
      locationCountryListFn({
        ...(search ? { search } : {}),
      }),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
    select(data) {
      return data?.data?.data;
    },
  });
};

export const useLocationStateList = ({ search, country }: { search?: string; country: string }) => {
  return useQuery({
    queryKey: [LocationEnum.LocationStateList, search, country],
    queryFn: () =>
      locationStateListFn({
        country: country as string,
        ...(search ? { search } : {}),
      }),
    enabled: !!country,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
    select(data) {
      return data?.data?.data;
    },
  });
};

export const useLocationCityList = ({
  search,
  country,
  state,
}: {
  search?: string;
  country: string;
  state?: string;
}) => {
  return useQuery({
    queryKey: [LocationEnum.LocationCityList, search, country, state],
    queryFn: () =>
      locationCityListFn({
        country: country as string,
        ...(state ? { state: state as string } : {}),
        ...(search ? { search } : {}),
      }),
    enabled: !!country,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
    select(data) {
      return data?.data?.data;
    },
  });
};
