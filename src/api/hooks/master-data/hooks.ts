'use client';

import { useQuery } from '@tanstack/react-query';

import { MasterDataEnum } from './key';

import { masterDataGetAllFn, masterDataGetFn } from '@/api/functions/master-data/index.api';

export const useMasterDataGetAll = ({
  page,
  workflowId,
  perPage,
}: {
  page: number;
  workflowId: string;
  perPage: number;
}) =>
  useQuery({
    queryKey: [MasterDataEnum.GetAll, workflowId, page, perPage],
    queryFn: () => masterDataGetAllFn({ page, limit: perPage, workflowId }),
    select: (response) => response.data.data,
    enabled: Boolean(workflowId),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

export const useMasterDataGet = ({ id }: { id: string }) =>
  useQuery({
    queryKey: [MasterDataEnum.Get, id],
    queryFn: () => masterDataGetFn(id),
    select: (response) => response.data.data,
    enabled: Boolean(id),
    staleTime: 0,
  });
