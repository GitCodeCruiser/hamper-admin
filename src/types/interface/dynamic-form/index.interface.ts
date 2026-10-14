import { TDynamicFormDetails } from '@/types/apps/dynamic-form/index.type';

interface IDynamicFormResponse {
  statusCode: number;
  message: string;
  data: TDynamicFormDetails;
}

export type IDynamicFormDetailsResponse = IDynamicFormResponse;
export type IDynamicFormSaveResponse = IDynamicFormResponse;
export type IDynamicFormUpdateResponse = IDynamicFormResponse;
export type IDynamicFormStatusChangeResponse = IDynamicFormResponse;
