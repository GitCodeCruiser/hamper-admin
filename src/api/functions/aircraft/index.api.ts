import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TAircraftCategoryChangeStatusParamType,
  TAircraftCategoryGetAllParamType,
  TAircraftChangeStatusParamType,
  TAircraftGetAllParamType,
} from '@/types/apps/aircraft/index.type';
import {
  IAircraftCategoryCreateResponse,
  IAircraftCategoryDeleteResponse,
  IAircraftCategoryGetAllResponse,
  IAircraftCategoryGetResponse,
  IAircraftCategoryListingResponse,
  IAircraftCategoryStatusChangeResponse,
  IAircraftCategoryUpdateResponse,
  IAircraftCreateResponse,
  IAircraftDeleteResponse,
  IAircraftFeaturedResponse,
  IAircraftGetAllResponse,
  IAircraftGetResponse,
  IAircraftListingResponse,
  IAircraftMakeBookableResponse,
  IAircraftStatusChangeResponse,
  IAircraftUpdateResponse,
  ITypicalAircraftListingResponse,
} from '@/types/interface/aircraft/index.interface';

export const aircraftCategoryGetAllFn = async (body: TAircraftCategoryGetAllParamType) => {
  const res = await axiosInstance.post<IAircraftCategoryGetAllResponse>(
    endpoints.aircraft.category.getAll('v1'),
    body,
  );

  return res;
};

export const aircraftCategoryGetFn = async (id: string) => {
  const res = await axiosInstance.get<IAircraftCategoryGetResponse>(
    `${endpoints.aircraft.category.get('v1')}/${id}`,
  );

  return res;
};

export const aircraftCategoryCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IAircraftCategoryCreateResponse>(
    endpoints.aircraft.category.create('v1'),
    body,
  );

  return res;
};

export const aircraftCategoryUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IAircraftCategoryUpdateResponse>(
    endpoints.aircraft.category.update('v1'),
    body,
  );

  return res;
};

export const aircraftCategoryChangeStatusFn = async (
  body: TAircraftCategoryChangeStatusParamType,
) => {
  const res = await axiosInstance.post<IAircraftCategoryStatusChangeResponse>(
    endpoints.aircraft.category.statusChange('v1'),
    body,
  );

  return res;
};

export const aircraftCategoryDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IAircraftCategoryDeleteResponse>(
    `${endpoints.aircraft.category.delete('v1')}/${id}`,
  );

  return res;
};

export const aircraftCategoryListingFn = async () => {
  const res = await axiosInstance.get<IAircraftCategoryListingResponse>(
    endpoints.aircraft.category.listing('v1'),
  );

  return res;
};

//  Below Aircraft

export const aircraftGetAllFn = async (body: TAircraftGetAllParamType) => {
  const res = await axiosInstance.post<IAircraftGetAllResponse>(
    endpoints.aircraft.main.getAll('v1'),
    body,
  );

  return res;
};

export const aircraftGetFn = async (id: string) => {
  const res = await axiosInstance.get<IAircraftGetResponse>(
    `${endpoints.aircraft.main.get('v1')}/${id}`,
  );

  return res;
};

export const aircraftCreateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IAircraftCreateResponse>(
    endpoints.aircraft.main.create('v1'),
    body,
  );

  return res;
};

export const aircraftUpdateFn = async (body: FormData) => {
  const res = await axiosInstance.post<IAircraftUpdateResponse>(
    endpoints.aircraft.main.update('v1'),
    body,
  );

  return res;
};

export const aircraftDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IAircraftDeleteResponse>(
    `${endpoints.aircraft.main.delete('v1')}/${id}`,
  );

  return res;
};

export const aircraftChangeStatusFn = async (body: TAircraftChangeStatusParamType) => {
  const res = await axiosInstance.post<IAircraftStatusChangeResponse>(
    endpoints.aircraft.main.statusChange('v1'),
    body,
  );

  return res;
};

export const aircraftMakeFeaturedFn = async (id: string) => {
  const res = await axiosInstance.get<IAircraftFeaturedResponse>(
    `${endpoints.aircraft.main.makeFeature('v1')}/${id}`,
  );

  return res;
};

export const aircraftMakeBookableFn = async (id: string) => {
  const res = await axiosInstance.get<IAircraftMakeBookableResponse>(
    `${endpoints.aircraft.main.makeBookable('v1')}/${id}`,
  );

  return res;
};

export const aircraftListingFn = async ({
  search,
  isBookable,
}: {
  isBookable?: boolean;
  search?: string;
}) => {
  const params = new URLSearchParams();
  if (search && search.trim().length > 0) {
    params.append('search', search.trim());
  }
  if (isBookable !== undefined) {
    params.append('isBookable', String(isBookable));
  }

  const queryString = params.toString();
  const url = `${endpoints.aircraft.main.listing('v1')}${queryString ? `?${queryString}` : ''}`;
  const res = await axiosInstance.get<IAircraftListingResponse>(url);

  return res;
};

export const aircraftRestoreFn = async (id: string) => {
  const res = await axiosInstance.get<IAircraftGetResponse>(
    `${endpoints.aircraft.main.restore('v1')}/${id}`,
  );

  return res;
};

export const aircraftHardDeleteFn = async (id: string) => {
  const res = await axiosInstance.get<IAircraftDeleteResponse>(
    `${endpoints.aircraft.main.hardDelete('v1')}/${id}`,
  );

  return res;
};

export const typicalAircraftGetFn = async (categoryId: string) => {
  const res = await axiosInstance.get<ITypicalAircraftListingResponse>(
    endpoints.aircraft.category.typicalAircraft('v1', categoryId),
  );

  return res;
};

export const typicalAircraftReorderFn = async (body: { ids: string[] }) => {
  const res = await axiosInstance.post(
    endpoints.aircraft.category.typicalAircraftReorder('v1'),
    body,
  );

  return res;
};
