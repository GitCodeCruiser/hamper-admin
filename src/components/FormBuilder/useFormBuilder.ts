import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { formBuilderSchema } from './schema';
import { FormBuilderField, FormBuilderSchema, FormBuilderSection, FormBuilderStep } from './types';

interface UseFormBuilderOptions {
  initialValue: FormBuilderSchema;
  onChange?: (schema: FormBuilderSchema) => void;
  normalize: (schema: FormBuilderSchema) => FormBuilderSchema;
}

export function useFormBuilder({ initialValue, onChange, normalize }: UseFormBuilderOptions) {
  const form = useForm<FormBuilderSchema>({
    resolver: zodResolver(formBuilderSchema),
    defaultValues: initialValue,
    mode: 'onChange',
  });
  const schema = useWatch({ control: form.control }) as FormBuilderSchema;

  useEffect(() => {
    onChange?.(normalize(schema));
  }, [normalize, onChange, schema]);

  const commit = useCallback(
    (next: FormBuilderSchema) => {
      form.reset(next, { keepDirty: true, keepTouched: true });
    },
    [form],
  );

  const updateStep = useCallback(
    (stepId: string, updater: (step: FormBuilderStep) => FormBuilderStep) => {
      commit({
        ...schema,
        steps: schema.steps.map((step) => (step.id === stepId ? updater(step) : step)),
      });
    },
    [commit, schema],
  );

  const updateSection = useCallback(
    (
      stepId: string,
      sectionId: string,
      updater: (section: FormBuilderSection) => FormBuilderSection,
    ) => {
      updateStep(stepId, (step) => ({
        ...step,
        sections: step.sections.map((section) =>
          section.id === sectionId ? updater(section) : section,
        ),
      }));
    },
    [updateStep],
  );

  const updateField = useCallback(
    (
      stepId: string,
      sectionId: string,
      fieldId: string,
      updater: (field: FormBuilderField) => FormBuilderField,
    ) => {
      updateSection(stepId, sectionId, (section) => ({
        ...section,
        fields: section.fields.map((field) => (field.id === fieldId ? updater(field) : field)),
      }));
    },
    [updateSection],
  );

  return { form, schema, commit, updateStep, updateSection, updateField };
}
