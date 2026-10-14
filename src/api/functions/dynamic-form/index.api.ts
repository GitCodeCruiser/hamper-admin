import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  TDynamicFormPayload,
  TDynamicFormStatusChangePayload,
  TDynamicFormUpdatePayload,
} from '@/types/apps/dynamic-form/index.type';
import {
  IDynamicFormDetailsResponse,
  IDynamicFormSaveResponse,
  IDynamicFormStatusChangeResponse,
  IDynamicFormUpdateResponse,
} from '@/types/interface/dynamic-form/index.interface';

export const dynamicFormDetailsFn = async (slug: string) => {
  const res = await axiosInstance.get<IDynamicFormDetailsResponse>(
    endpoints.dynamicForm.getBySlug('v1'),
    { params: { slug } },
  );

  return res;
};

export const dynamicFormSaveFn = async (body: TDynamicFormPayload) => {
  const res = await axiosInstance.post<IDynamicFormSaveResponse>(
    endpoints.dynamicForm.save('v1'),
    body,
  );

  return res;
};

export const dynamicFormUpdateFn = async (body: TDynamicFormUpdatePayload) => {
  const res = await axiosInstance.post<IDynamicFormUpdateResponse>(
    endpoints.dynamicForm.update('v1'),
    body,
  );

  return res;
};

export const dynamicFormStatusChangeFn = async (body: TDynamicFormStatusChangePayload) => {
  return axiosInstance.post<IDynamicFormStatusChangeResponse>(
    endpoints.dynamicForm.statusChange('v1'),
    body,
  );
};
