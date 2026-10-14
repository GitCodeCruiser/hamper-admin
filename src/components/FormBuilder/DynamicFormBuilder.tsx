'use client';

import { Box, CircularProgress, FormControlLabel, Switch, Typography } from '@mui/material';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

import FormBuilder, { createEmptyFormSchema } from './FormBuilder';
import {
  FORM_FIELD_TYPES,
  FormBuilderField,
  FormBuilderSchema,
  FormFieldType,
  ValidationRuleType,
} from './types';

import {
  useDynamicFormDetails,
  useDynamicFormSave,
  useDynamicFormStatusChange,
  useDynamicFormUpdate,
} from '@/api/hooks/dynamic-form/hooks';
import { TDynamicFormDetails, TDynamicFormPayload } from '@/types/apps/dynamic-form/index.type';

interface DynamicFormBuilderProps {
  slug: string;
  title: string;
}

const createId = (prefix: string) =>
  `${prefix}_${typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now()}`;

const toCode = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');

const isFieldType = (type: string): type is FormFieldType =>
  FORM_FIELD_TYPES.includes(type as FormFieldType);

const validationRuleTypes: ValidationRuleType[] = [
  'required',
  'minLength',
  'maxLength',
  'min',
  'max',
  'pattern',
];

const isValidationRuleType = (type: string): type is ValidationRuleType =>
  validationRuleTypes.includes(type as ValidationRuleType);

const normalizeField = (
  field: TDynamicFormDetails['steps'][number]['sections'][number]['fields'][number],
  index: number,
): FormBuilderField => {
  const questionContent = field.questionContent || field.label || 'Untitled question';

  return {
    id: field.id || field.fieldId || createId('field'),
    key: field.key || field.slug || `field_${index + 1}`,
    type: isFieldType(field.type) ? field.type : 'text',
    grid: field.grid === 4 || field.grid === 6 ? field.grid : 12,
    questionContent,
    // Older payloads defaulted this value to the question content. Treat that as no placeholder.
    placeholder:
      field.placeholder && field.placeholder !== questionContent ? field.placeholder : undefined,
    subcontent: field.subcontent || field.helperText || undefined,
    isCountryCodeEnabled: field.type === 'phone' ? Boolean(field.isCountryCodeEnabled) : undefined,
    isSwitchDesign: field.isSwitchDesign,
    radioDesign:
      field.radioDesign === 'switch'
        ? 'separate-pill'
        : field.radioDesign === 'normal' ||
            field.radioDesign === 'combined-pill' ||
            field.radioDesign === 'separate-pill' ||
            field.radioDesign === 'card'
          ? field.radioDesign
          : undefined,
    multiSelectDesign:
      field.multiSelectDesign === 'card' || field.multiSelectDesign === 'dropdown'
        ? field.multiSelectDesign
        : undefined,
    isInPreviousFieldBox: field.isInPreviousFieldBox,
    locationCountry:
      field.locationCountry ??
      (field.countryId && field.country
        ? { id: field.countryId, name: field.country, slug: field.countrySlug ?? '' }
        : undefined),
    locationState:
      field.locationState ??
      (field.stateId && field.state
        ? { id: field.stateId, name: field.state, slug: field.stateSlug ?? '' }
        : undefined),
    options: field.options,
    validationRules: (field.validationRules ?? [])
      .filter((rule) => isValidationRuleType(rule.type))
      .map((rule) => ({
        id: rule.id,
        type: rule.type as ValidationRuleType,
        message: rule.message,
        value:
          typeof rule.value === 'string' || typeof rule.value === 'number' ? rule.value : undefined,
      })),
    conditions: (field.conditions ?? [])
      .filter(
        (condition) =>
          condition.field && (condition.operator === 'eq' || condition.operator === 'equals'),
      )
      .map((condition) => ({
        field: condition.field,
        operator: 'eq' as const,
        value: String(condition.value ?? ''),
      })),
  };
};

const toBuilderSchema = (form?: TDynamicFormDetails): FormBuilderSchema => {
  if (!form?.steps?.length) return createEmptyFormSchema();

  return {
    name: form.name || form.title || 'Hogani Jets enquiry form',
    version: form.version || 1,
    header: {
      tag: form.header?.tag ?? '',
      heading: form.header?.heading ?? '',
      description: form.header?.description ?? '',
    },
    appearance: {
      preset: form.appearance?.preset === 'compact' ? 'compact' : 'wide',
      pageBackground: form.appearance?.pageBackground || '#fffdef',
      showFormCard: form.appearance?.showFormCard !== false,
      inputVariant: form.appearance?.inputVariant || 'underline',
    },
    steps: form.steps.map((step, stepIndex) => ({
      id: step.id || step.stepId || createId('step'),
      name: step.name || `Step ${stepIndex + 1}`,
      sections: step.sections.map((section) => ({
        id: section.id || section.sectionId || createId('section'),
        title: section.title || section.name || 'Untitled section',
        subtitle: section.subtitle || section.description || undefined,
        showTitle: section.showTitle !== false,
        showBorder: Boolean(section.showBorder),
        showCard: Boolean(section.showCard),
        cardIncludesHeader: section.cardIncludesHeader !== false,
        fields: section.fields.map(normalizeField),
      })),
    })),
  };
};

const toApiPayload = (
  schema: FormBuilderSchema,
  slug: string,
  title: string,
): TDynamicFormPayload => ({
  title,
  name: schema.name,
  version: schema.version,
  slug,
  header: schema.header,
  appearance: schema.appearance,
  steps: schema.steps.map((step, stepIndex) => ({
    id: step.id,
    stepId: step.id,
    stepCode: toCode(step.name) || `step_${stepIndex + 1}`,
    name: step.name,
    order: stepIndex,
    conditions: [],
    sections: step.sections.map((section, sectionIndex) => ({
      id: section.id,
      sectionId: section.id,
      sectionCode: toCode(section.title) || `section_${sectionIndex + 1}`,
      title: section.title,
      name: section.title,
      subtitle: section.subtitle,
      showTitle: section.showTitle,
      showBorder: section.showBorder,
      showCard: section.showCard,
      cardIncludesHeader: section.cardIncludesHeader,
      description: section.subtitle,
      order: sectionIndex,
      fields: section.fields.map((field, fieldIndex) => ({
        fieldId: field.id,
        label: field.questionContent,
        slug: field.key,
        type: field.type,
        placeholder: field.placeholder || '',
        subcontent: field.subcontent,
        helperText: field.subcontent,
        defaultValue: {},
        readonly: false,
        grid: field.grid,
        order: fieldIndex,
        id: field.id,
        key: field.key,
        questionContent: field.questionContent,
        isCountryCodeEnabled:
          field.type === 'phone' ? Boolean(field.isCountryCodeEnabled) : undefined,
        isSwitchDesign: field.isSwitchDesign,
        radioDesign: field.radioDesign,
        multiSelectDesign: field.multiSelectDesign,
        isInPreviousFieldBox: field.isInPreviousFieldBox,
        locationCountry: field.locationCountry,
        locationState: field.locationState,
        country: field.locationCountry?.name,
        countryId: field.locationCountry?.id,
        countrySlug: field.locationCountry?.slug,
        state: field.locationState?.name,
        stateId: field.locationState?.id,
        stateSlug: field.locationState?.slug,
        validationRules: field.validationRules,
        conditions: (field.conditions ?? []).map((condition) => ({
          ...condition,
          operator: 'eq',
        })),
        options: field.options ?? [],
      })),
      isRepeatable: false,
      conditions: [],
    })),
  })),
});

export default function DynamicFormBuilder({ slug, title }: DynamicFormBuilderProps) {
  const { data, isLoading } = useDynamicFormDetails({ slug });
  const initialValue = useMemo(() => toBuilderSchema(data), [data]);
  const formId = data?._id;
  const { mutate: saveForm, isPending: isSaving } = useDynamicFormSave({
    slug,
    optionalCallback: () => toast.success('Enquiry form saved successfully'),
    errorCallback: () => toast.error('Unable to save the enquiry form'),
  });
  const { mutate: updateForm, isPending: isUpdating } = useDynamicFormUpdate({
    slug,
    optionalCallback: () => toast.success('Enquiry form updated successfully'),
    errorCallback: () => toast.error('Unable to update the enquiry form'),
  });
  const { mutate: changeStatus, isPending: isChangingStatus } = useDynamicFormStatusChange({
    slug,
    optionalCallback: () => toast.success('Form visibility updated successfully'),
    errorCallback: () => toast.error('Unable to update form visibility'),
  });

  const handleSave = (schema: FormBuilderSchema) => {
    const payload = toApiPayload(schema, slug, title);

    if (formId) {
      updateForm({ ...payload, id: formId });
      return;
    }

    saveForm(payload);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!slug) {
    return <Typography color="error">A page slug is required to configure this form.</Typography>;
  }

  return (
    <FormBuilder
      key={`${slug}-${data?._id ?? 'new'}`}
      initialValue={initialValue}
      isSaving={isSaving || isUpdating}
      statusControl={
        <FormControlLabel
          label={data?.status === 'Active' ? 'Live' : 'Not live'}
          control={
            <Switch
              checked={data?.status === 'Active'}
              disabled={!formId || isChangingStatus}
              onChange={(_, checked) => {
                if (!formId) return;
                changeStatus({ id: formId, status: checked ? 'Active' : 'Inactive' });
              }}
            />
          }
          sx={{ m: 0, whiteSpace: 'nowrap' }}
        />
      }
      onSave={handleSave}
    />
  );
}
