export type TDynamicFormCondition = {
  field: string;
  operator: string;
  value: unknown;
};

export type TDynamicFormValidationRule = {
  id: string;
  type: string;
  message?: string;
  value?: unknown;
};

export type TDynamicFormOption = {
  id: string;
  label: string;
  value: string;
  subcontent?: string;
  hint?: string;
};

export type TDynamicFormField = {
  fieldId: string;
  label: string;
  slug: string;
  type: string;
  placeholder: string;
  subcontent?: string;
  helperText?: string;
  defaultValue?: unknown | null;
  readonly: boolean;
  grid: number;
  order: number;
  id: string;
  key: string;
  questionContent: string;
  isCountryCodeEnabled?: boolean;
  isSwitchDesign?: boolean;
  radioDesign?: string;
  multiSelectDesign?: string;
  isInPreviousFieldBox?: boolean;
  locationCountry?: { id: string; name: string; slug: string };
  locationState?: { id: string; name: string; slug: string };
  country?: string;
  countryId?: string;
  countrySlug?: string;
  state?: string;
  stateId?: string;
  stateSlug?: string;
  validationRules: TDynamicFormValidationRule[];
  conditions: TDynamicFormCondition[];
  options: TDynamicFormOption[];
};

export type TDynamicFormAppearance = {
  preset: 'wide' | 'compact';
  pageBackground: string;
  showFormCard: boolean;
  inputVariant: 'underline' | 'outlined' | 'filled';
};

export type TDynamicFormHeader = {
  tag: string;
  heading: string;
  description: string;
};

export type TDynamicFormSection = {
  id: string;
  sectionId: string;
  sectionCode: string;
  title: string;
  name: string;
  subtitle?: string;
  showTitle: boolean;
  showBorder?: boolean;
  showCard?: boolean;
  cardIncludesHeader?: boolean;
  description?: string;
  order: number;
  fields: TDynamicFormField[];
  isRepeatable: boolean;
  conditions: TDynamicFormCondition[];
};

export type TDynamicFormStep = {
  id: string;
  stepId: string;
  stepCode: string;
  name: string;
  order: number;
  conditions: TDynamicFormCondition[];
  sections: TDynamicFormSection[];
};

export type TDynamicFormPayload = {
  title: string;
  name: string;
  version: number;
  slug: string;
  header?: TDynamicFormHeader;
  appearance?: TDynamicFormAppearance;
  steps: TDynamicFormStep[];
};

export type TDynamicFormDetails = TDynamicFormPayload & {
  _id: string;
  userId: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  isDeleted?: boolean;
};

export type TDynamicFormUpdatePayload = TDynamicFormPayload & {
  id: string;
};

export type TDynamicFormStatusChangePayload = {
  id: string;
  status: 'Active' | 'Inactive';
};
