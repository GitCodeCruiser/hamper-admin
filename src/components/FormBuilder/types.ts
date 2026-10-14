export const FORM_FIELD_TYPES = [
  'text',
  'textarea',
  'number',
  'email',
  'phone',
  'date',
  'time',
  'select',
  'multiselect',
  'radio',
  'checkbox',
  'file',
  'country',
  'state',
  'city',
] as const;

export type FormFieldType = (typeof FORM_FIELD_TYPES)[number];
export type RadioDesign = 'normal' | 'combined-pill' | 'separate-pill' | 'switch' | 'card';
export type MultiSelectDesign = 'dropdown' | 'card';
export type FormLayoutPreset = 'wide' | 'compact';
export type FormInputVariant = 'underline' | 'outlined' | 'filled';

export interface FormBuilderAppearance {
  preset: FormLayoutPreset;
  pageBackground: string;
  showFormCard: boolean;
  inputVariant: FormInputVariant;
}

export interface FormBuilderHeader {
  tag: string;
  heading: string;
  description: string;
}

export type ValidationRuleType = 'required' | 'minLength' | 'maxLength' | 'min' | 'max' | 'pattern';

export interface FormBuilderOption {
  id: string;
  label: string;
  value: string;
  subcontent?: string;
  hint?: string;
}

export interface FormBuilderValidationRule {
  id: string;
  type: ValidationRuleType;
  value?: string | number;
  message?: string;
}

export interface FormBuilderCondition {
  field: string;
  operator: 'eq';
  value: string;
}

export interface FormBuilderLocationOption {
  id: string;
  name: string;
  slug: string;
}

export interface FormBuilderField {
  id: string;
  key: string;
  type: FormFieldType;
  grid: 4 | 6 | 12;
  questionContent: string;
  placeholder?: string;
  subcontent?: string;
  hint?: string;
  isCountryCodeEnabled?: boolean;
  isSwitchDesign?: boolean;
  radioDesign?: RadioDesign;
  multiSelectDesign?: MultiSelectDesign;
  isInPreviousFieldBox?: boolean;
  locationCountry?: FormBuilderLocationOption;
  locationState?: FormBuilderLocationOption;
  options?: FormBuilderOption[];
  validationRules: FormBuilderValidationRule[];
  conditions?: FormBuilderCondition[];
}

export interface FormBuilderSection {
  id: string;
  title: string;
  subtitle?: string;
  showTitle: boolean;
  showBorder: boolean;
  showCard: boolean;
  cardIncludesHeader: boolean;
  fields: FormBuilderField[];
}

export interface FormBuilderStep {
  id: string;
  name: string;
  sections: FormBuilderSection[];
}

export interface FormBuilderSchema {
  name: string;
  version: number;
  header: FormBuilderHeader;
  appearance: FormBuilderAppearance;
  steps: FormBuilderStep[];
}
