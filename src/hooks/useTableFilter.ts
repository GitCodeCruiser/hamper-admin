'use client';

import { useDebounce } from 'ahooks';
import { useState } from 'react';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfigItem {
  label: string;
  default?: string;
  options: readonly FilterOption[] | FilterOption[];
}

type FiltersConfig = Record<string, FilterConfigItem>;

// Infer filter type from config
type InferFiltersType<T extends FiltersConfig> = {
  [K in keyof T]: string | undefined;
};

const useTableFilters = <
  TConfig extends FiltersConfig,
  TExtra extends object = Record<string, never>,
>(
    filtersConfig: TConfig,
    extraPayload?: TExtra,
  ) => {
  const [search, setSearch] = useState('');

  // Build initial filter state using config defaults
  const getInitialFilters = (): InferFiltersType<TConfig> => {
    const result: Record<string, string | undefined> = {};
    Object.keys(filtersConfig).forEach((key) => {
      const defaultValue = filtersConfig[key].default;
      result[key] = defaultValue === '' ? undefined : defaultValue?.toLowerCase();
    });
    return result as InferFiltersType<TConfig>;
  };

  const [filters, setFilters] = useState<InferFiltersType<TConfig>>(getInitialFilters);

  const debouncedSearch = useDebounce(search.trim(), { wait: 500 });

  const [payload, setPayload] = useState({
    page: 1,
    limit: 10,
    search: '',
    sortOrder: 'desc' as const,
    ...extraPayload,
  });

  const handleSearch = (v: string) => setSearch(v.toLowerCase());

  const handleFilterChange = <K extends keyof InferFiltersType<TConfig>>(
    key: K,
    value: InferFiltersType<TConfig>[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPayload((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (val: string) => {
    setPayload((prev) => ({ ...prev, limit: Number(val), page: 1 }));
  };

  // Create clean filters object for API payload (only include defined values)
  const cleanFilters = Object.entries(filters).reduce(
    (acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  const finalPayload = {
    ...payload,
    search: debouncedSearch,
    ...cleanFilters, // Spread filters directly as top-level keys
  };

  return {
    search,
    filters,
    payload: finalPayload,
    handleSearch,
    handleFilterChange,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};

export default useTableFilters;
