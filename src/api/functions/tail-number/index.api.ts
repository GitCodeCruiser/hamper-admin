import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TTailNumberChangeStatusParamType,
  TTailNumberGetAllParamType,
} from '@/types/apps/tail-number/index.type';
import {
  ITailNumberGetAllResponse,
  ITailNumberResponse,
} from '@/types/interface/tail-number/index.interface';

export const tailNumberGetAllFn = async (body: TTailNumberGetAllParamType) =>
  axiosInstance.post<ITailNumberGetAllResponse>(endpoints.tailNumber.getAll('v1'), body);

export const tailNumberGetFn = async (id: string) =>
  axiosInstance.get<ITailNumberResponse>(`${endpoints.tailNumber.get('v1')}/${id}`);

export const tailNumberCreateFn = async (body: FormData) =>
  axiosInstance.post<ITailNumberResponse>(endpoints.tailNumber.create('v1'), body);

export const tailNumberUpdateFn = async (body: FormData) =>
  axiosInstance.post<ITailNumberResponse>(endpoints.tailNumber.update('v1'), body);

export const tailNumberChangeStatusFn = async (body: TTailNumberChangeStatusParamType) =>
  axiosInstance.post<ITailNumberResponse>(endpoints.tailNumber.statusChange('v1'), body);

export const tailNumberDeleteFn = async (id: string) =>
  axiosInstance.get<ITailNumberResponse>(`${endpoints.tailNumber.delete('v1')}/${id}`);

export const tailNumberRestoreFn = async (id: string) =>
  axiosInstance.get<ITailNumberResponse>(`${endpoints.tailNumber.undoDelete('v1')}/${id}`);
