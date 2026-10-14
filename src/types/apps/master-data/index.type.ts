export type TMasterDataFieldValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | { key?: string; value?: unknown }
  | unknown[];

export type TMasterDataField = {
  fieldId?: string;
  label: string;
  value: TMasterDataFieldValue;
  slug: string;
  type: string;
  required?: boolean;
};

export type TMasterDataListItem = {
  _id: string;
  currentStepIndex: number;
  currentStepId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  dynamicFields: TMasterDataField[];
};

export type TMasterDataSection = {
  sectionId: string;
  sectionName: string;
  sectionCode: string;
  sectionOrder: number;
  fields: TMasterDataField[];
};

export type TMasterDataStep = {
  stepIndex: number;
  stepId: string;
  stepName: string;
  stepCode: string;
  sections: TMasterDataSection[];
  updatedAt: string;
};

export type TMasterDataDetails = Omit<TMasterDataListItem, 'dynamicFields'> & {
  stepData: TMasterDataStep[];
  workflow: { _id: string; name: string; slug: string };
};

export type TMasterDataGetAllParams = {
  page: number;
  limit: number;
  workflowId: string;
};

export const formatMasterDataValue = (value: TMasterDataFieldValue): string => {
  if (value === null || value === undefined || value === '') return '—';
  if (Array.isArray(value))
    return value.map((item) => formatMasterDataValue(item as TMasterDataFieldValue)).join(', ');
  if (typeof value === 'object') return formatMasterDataValue(value.value ?? value.key);
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
};
