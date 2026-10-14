import zod from 'zod';

const optionSchema = zod.object({
  id: zod.string(),
  label: zod.string().trim().min(1, 'Option label is required'),
  value: zod.string(),
  subcontent: zod.string().optional(),
  hint: zod.string().optional(),
});

const validationRuleSchema = zod.object({
  id: zod.string(),
  type: zod.enum(['required', 'minLength', 'maxLength', 'min', 'max', 'pattern']),
  value: zod.union([zod.string(), zod.number()]).optional(),
  message: zod.string().optional(),
});

const conditionSchema = zod.object({
  field: zod.string(),
  operator: zod.literal('eq'),
  value: zod.string(),
});

const fieldSchema = zod
  .object({
    id: zod.string(),
    key: zod.string(),
    type: zod.enum([
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
    ]),
    grid: zod.union([zod.literal(4), zod.literal(6), zod.literal(12)]),
    questionContent: zod.string().trim().min(1, 'Question content is required'),
    placeholder: zod.string().optional(),
    subcontent: zod.string().optional(),
    hint: zod.string().optional(),
    isCountryCodeEnabled: zod.boolean().optional(),
    isSwitchDesign: zod.boolean().optional(),
    radioDesign: zod
      .enum(['normal', 'combined-pill', 'separate-pill', 'switch', 'card'])
      .optional(),
    multiSelectDesign: zod.enum(['dropdown', 'card']).optional(),
    isInPreviousFieldBox: zod.boolean().optional(),
    locationCountry: zod
      .object({ id: zod.string(), name: zod.string(), slug: zod.string() })
      .optional(),
    locationState: zod
      .object({ id: zod.string(), name: zod.string(), slug: zod.string() })
      .optional(),
    options: zod.array(optionSchema).optional(),
    validationRules: zod.array(validationRuleSchema),
    conditions: zod.array(conditionSchema).optional(),
  })
  .superRefine((field, context) => {
    if ((field.type === 'state' || field.type === 'city') && !field.locationCountry?.id) {
      context.addIssue({
        code: 'custom',
        path: ['locationCountry'],
        message: 'Select a country for this location field',
      });
    }
    if (field.type === 'city' && !field.locationState?.id) {
      context.addIssue({
        code: 'custom',
        path: ['locationState'],
        message: 'Select a state for this city field',
      });
    }
  });

const sectionSchema = zod.object({
  id: zod.string(),
  title: zod.string().trim().min(1, 'Section title is required'),
  subtitle: zod.string().optional(),
  showTitle: zod.boolean(),
  showBorder: zod.boolean(),
  showCard: zod.boolean(),
  cardIncludesHeader: zod.boolean(),
  fields: zod.array(fieldSchema),
});

const stepSchema = zod.object({
  id: zod.string(),
  name: zod.string().trim().min(1, 'Step name is required'),
  sections: zod.array(sectionSchema),
});

export const formBuilderSchema = zod.object({
  name: zod.string().trim().min(1, 'Form name is required'),
  version: zod.number().int().positive(),
  header: zod.object({
    tag: zod.string(),
    heading: zod.string(),
    description: zod.string(),
  }),
  appearance: zod.object({
    preset: zod.enum(['wide', 'compact']),
    pageBackground: zod.string().trim(),
    showFormCard: zod.boolean(),
    inputVariant: zod.enum(['underline', 'outlined', 'filled']),
  }),
  steps: zod.array(stepSchema).min(1, 'At least one step is required'),
});
