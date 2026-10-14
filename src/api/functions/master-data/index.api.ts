import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { TMasterDataGetAllParams } from '@/types/apps/master-data/index.type';
import {
  IMasterDataGetAllResponse,
  IMasterDataGetResponse,
} from '@/types/interface/master-data/index.interface';

export const masterDataGetAllFn = async (body: TMasterDataGetAllParams) => {
  return axiosInstance.post<IMasterDataGetAllResponse>(endpoints.masterData.getAll('v1'), body);
};

export const masterDataGetFn = async (id: string) => {
  return axiosInstance.get<IMasterDataGetResponse>(`${endpoints.masterData.get('v1')}/${id}`);
};
