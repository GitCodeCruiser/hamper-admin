'use client';

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AddIcon from '@mui/icons-material/Add';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import TextField from './BuilderInput';
import FormPreview from './FormPreview';
import QuestionConfigurationDrawer from './QuestionConfigurationDrawer';
import { formBuilderSchema } from './schema';
import {
  FormBuilderField,
  FormBuilderSchema,
  FormBuilderSection,
  FormBuilderStep,
  FormFieldType,
} from './types';
import { useFormBuilder } from './useFormBuilder';

import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

const optionFieldTypes: FormFieldType[] = ['select', 'multiselect', 'radio'];
const uid = (prefix: string) =>
  `${prefix}_${typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now()}`;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');

interface SortableStepChipProps {
  step: FormBuilderStep;
  index: number;
  isActive: boolean;
  isInvalid: boolean;
  onClick: () => void;
}

function SortableStepChip({ step, index, isActive, isInvalid, onClick }: SortableStepChipProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: step.id,
  });

  return (
    <Chip
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      icon={<DragIndicatorIcon />}
      label={`${index + 1}. ${step.name || 'Untitled step'}`}
      color={isActive ? 'primary' : 'default'}
      variant={isActive ? 'filled' : 'outlined'}
      onClick={onClick}
      sx={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.55 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
        zIndex: isDragging ? 2 : 'auto',
        ...(isInvalid
          ? {
            border: '2px solid #ff6b6b',
            bgcolor: 'rgba(255,107,107,.18)',
            color: '#fff',
          }
          : {}),
      }}
    />
  );
}

const newField = (type: FormFieldType = 'text'): FormBuilderField => ({
  id: uid('field'),
  key: '',
  type,
  grid: 12,
  questionContent: '',
  placeholder: '',
  subcontent: '',
  hint: '',
  isCountryCodeEnabled: type === 'phone' ? false : undefined,
  isSwitchDesign: type === 'radio' ? false : undefined,
  radioDesign: type === 'radio' ? 'normal' : undefined,
  multiSelectDesign: type === 'multiselect' ? 'dropdown' : undefined,
  isInPreviousFieldBox: false,
  locationCountry: undefined,
  locationState: undefined,
  options: optionFieldTypes.includes(type) ? [] : undefined,
  validationRules: [],
  conditions: [],
});

const newSection = (): FormBuilderSection => ({
  id: uid('section'),
  title: 'Untitled section',
  subtitle: '',
  showTitle: true,
  showBorder: false,
  showCard: false,
  cardIncludesHeader: true,
  fields: [newField()],
});

const newStep = (number: number): FormBuilderStep => ({
  id: uid('step'),
  name: `Step ${number}`,
  sections: [newSection()],
});

export const createEmptyFormSchema = (): FormBuilderSchema => ({
  name: 'Hogani Jets enquiry form',
  version: 1,
  header: {
    tag: '',
    heading: '',
    description: '',
  },
  appearance: {
    preset: 'wide',
    pageBackground: '#fffdef',
    showFormCard: true,
    inputVariant: 'underline',
  },
  steps: [newStep(1)],
});

interface FormBuilderProps {
  initialValue?: FormBuilderSchema;
  onChange?: (schema: FormBuilderSchema) => void;
  onSave?: (schema: FormBuilderSchema) => void;
  isSaving?: boolean;
  statusControl?: ReactNode;
}

const compactSchema = (schema: FormBuilderSchema): FormBuilderSchema => ({
  ...schema,
  header: {
    tag: schema.header?.tag?.trim() ?? '',
    heading: schema.header?.heading?.trim() ?? '',
    description: schema.header?.description?.trim() ?? '',
  },
  appearance: schema.appearance ?? createEmptyFormSchema().appearance,
  steps: schema.steps.map((step) => ({
    ...step,
    sections: step.sections.map((section) => ({
      ...section,
      subtitle: section.subtitle || undefined,
      showBorder: Boolean(section.showBorder),
      showCard: Boolean(section.showCard),
      cardIncludesHeader: section.cardIncludesHeader !== false,
      fields: section.fields.map((field) => ({
        ...field,
        key: slugify(field.questionContent) || field.key || field.id,
        subcontent: field.subcontent || undefined,
        placeholder: field.placeholder || undefined,
        hint: field.hint || undefined,
        isCountryCodeEnabled:
          field.type === 'phone' ? Boolean(field.isCountryCodeEnabled) : undefined,
        isSwitchDesign: field.type === 'radio' ? Boolean(field.isSwitchDesign) : undefined,
        radioDesign: field.type === 'radio' ? (field.radioDesign ?? 'normal') : undefined,
        multiSelectDesign:
          field.type === 'multiselect' ? (field.multiSelectDesign ?? 'dropdown') : undefined,
        isInPreviousFieldBox: Boolean(field.isInPreviousFieldBox) || undefined,
        locationCountry: field.locationCountry,
        locationState: field.locationState,
        conditions: (field.conditions ?? []).map((condition) => ({
          ...condition,
          operator: 'eq',
        })),
        options: optionFieldTypes.includes(field.type)
          ? field.options?.map((option) => ({
            ...option,
            subcontent: option.subcontent || undefined,
            hint: option.hint || undefined,
          }))
          : undefined,
      })),
    })),
  })),
});

export default function FormBuilder({
  initialValue,
  onChange,
  onSave,
  isSaving = false,
  statusControl,
}: FormBuilderProps) {
  const initialSchema = useMemo(() => initialValue ?? createEmptyFormSchema(), [initialValue]);
  const { schema, commit, updateStep, updateSection, updateField } = useFormBuilder({
    initialValue: initialSchema,
    onChange,
    normalize: compactSchema,
  });
  const [activeStepId, setActiveStepId] = useState(schema.steps[0]?.id ?? '');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [isActionBarSticky, setIsActionBarSticky] = useState(true);
  const stepDragSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const [invalidItem, setInvalidItem] = useState<{
    stepId?: string;
    sectionId?: string;
    fieldId?: string;
  } | null>(null);

  const activeStep = useMemo(
    () => schema.steps.find((step) => step.id === activeStepId) ?? schema.steps[0],
    [activeStepId, schema.steps],
  );

  useEffect(() => {
    if (!editingFieldId) return;

    const fieldExists = schema.steps.some((step) =>
      step.sections.some((section) => section.fields.some((field) => field.id === editingFieldId)),
    );

    if (!fieldExists) setEditingFieldId(null);
  }, [editingFieldId, schema.steps]);

  const moveItem = <T,>(items: T[], index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return items;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    return next;
  };

  const getPreviousFields = (fieldId: string) => {
    const previousFields: FormBuilderField[] = [];
    for (const step of schema.steps) {
      for (const section of step.sections) {
        for (const item of section.fields) {
          if (item.id === fieldId) return previousFields;
          previousFields.push(item);
        }
      }
    }
    return [];
  };

  const addStep = () => {
    const step = newStep(schema.steps.length + 1);
    commit({ ...schema, steps: [...schema.steps, step] });
    setActiveStepId(step.id);
  };

  const reorderSteps = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const oldIndex = schema.steps.findIndex((step) => step.id === active.id);
    const newIndex = schema.steps.findIndex((step) => step.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    commit({ ...schema, steps: arrayMove(schema.steps, oldIndex, newIndex) });
  };

  const scrollToBuilderItem = (id: string) => {
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const save = () => {
    setInvalidItem(null);

    if (!schema.name.trim()) {
      toast.error('Form name is required. We moved you to the form name field.');
      scrollToBuilderItem('builder-form-name');
      return;
    }

    for (const [stepIndex, step] of schema.steps.entries()) {
      if (!step.name.trim()) {
        setActiveStepId(step.id);
        setInvalidItem({ stepId: step.id });
        toast.error(`Step ${stepIndex + 1} needs a name. It is highlighted in red.`);
        scrollToBuilderItem(`builder-step-${step.id}`);
        return;
      }

      for (const [sectionIndex, section] of step.sections.entries()) {
        if (!section.title.trim()) {
          setActiveStepId(step.id);
          setInvalidItem({ stepId: step.id, sectionId: section.id });
          toast.error(
            [
              `Section ${sectionIndex + 1} in “${step.name}” needs a title.`,
              'It is highlighted in red.',
            ].join(' '),
          );
          scrollToBuilderItem(`builder-section-${section.id}`);
          return;
        }

        for (const [fieldIndex, field] of section.fields.entries()) {
          if (!field.questionContent.trim()) {
            setActiveStepId(step.id);
            setInvalidItem({ stepId: step.id, sectionId: section.id, fieldId: field.id });
            toast.error(
              [
                `Question ${fieldIndex + 1} in “${section.title}” (${step.name})`,
                'needs question content. It is highlighted in red.',
              ].join(' '),
              { duration: 6000 },
            );
            scrollToBuilderItem(`builder-question-${field.id}`);
            return;
          }

          const missingOptionIndex =
            field.options?.findIndex((option) => !option.label.trim()) ?? -1;
          if (missingOptionIndex >= 0) {
            setActiveStepId(step.id);
            setInvalidItem({ stepId: step.id, sectionId: section.id, fieldId: field.id });
            toast.error(
              [
                `Option ${missingOptionIndex + 1} in question ${fieldIndex + 1},`,
                `“${field.questionContent}”, needs a label. The question is highlighted in red.`,
              ].join(' '),
              { duration: 6000 },
            );
            scrollToBuilderItem(`builder-question-${field.id}`);
            return;
          }
        }
      }
    }

    const normalizedSchema = compactSchema(schema);
    const validation = formBuilderSchema.safeParse(normalizedSchema);
    if (!validation.success) {
      const issue = validation.error.issues[0];
      const stepIndex = typeof issue.path[1] === 'number' ? issue.path[1] : undefined;
      const sectionIndex = typeof issue.path[3] === 'number' ? issue.path[3] : undefined;
      const fieldIndex = typeof issue.path[5] === 'number' ? issue.path[5] : undefined;
      const invalidStep = stepIndex === undefined ? undefined : schema.steps[stepIndex];
      const invalidSection =
        sectionIndex === undefined ? undefined : invalidStep?.sections[sectionIndex];
      const invalidField =
        fieldIndex === undefined ? undefined : invalidSection?.fields[fieldIndex];

      if (invalidStep) setActiveStepId(invalidStep.id);

      if (invalidField) {
        setInvalidItem({
          stepId: invalidStep?.id,
          sectionId: invalidSection?.id,
          fieldId: invalidField.id,
        });
        toast.error(
          [
            `${issue.message}.`,
            `Question ${(fieldIndex ?? 0) + 1}, “${invalidField.questionContent || 'Untitled'}”,`,
            `in section “${invalidSection?.title || 'Untitled'}” is highlighted in red.`,
          ].join(' '),
          { duration: 7000 },
        );
        scrollToBuilderItem(`builder-question-${invalidField.id}`);
        return;
      }

      if (invalidSection) {
        setInvalidItem({ stepId: invalidStep?.id, sectionId: invalidSection.id });
        toast.error(
          `${issue.message}. Check section ${(sectionIndex ?? 0) + 1} in “${invalidStep?.name}”.`,
          { duration: 7000 },
        );
        scrollToBuilderItem(`builder-section-${invalidSection.id}`);
        return;
      }

      if (invalidStep) {
        setInvalidItem({ stepId: invalidStep.id });
        toast.error(
          `${issue.message}. Check step ${(stepIndex ?? 0) + 1}, “${invalidStep.name}”.`,
          { duration: 7000 },
        );
        scrollToBuilderItem(`builder-step-${invalidStep.id}`);
        return;
      }

      if (issue.path[0] === 'appearance') {
        toast.error(`${issue.message}. Check the Form appearance section.`, { duration: 7000 });
        scrollToBuilderItem('builder-form-appearance');
        return;
      }

      toast.error(`${issue.message}. Check the form name.`, { duration: 7000 });
      scrollToBuilderItem('builder-form-name');
      return;
    }
    const payload = normalizedSchema;
    if (onSave) onSave(payload);
    else {
      console.log('Hogani Jets form builder JSON:', payload); // eslint-disable-line no-console
      toast.success('Form JSON logged to the browser console');
    }
  };

  return (
    <Box
      sx={{
        color: 'common.white',
        '& .MuiPaper-root': {
          color: 'common.white',
          bgcolor: 'transparent',
          borderColor: 'rgba(255,255,255,.28)',
        },
        '& .MuiTypography-root, & .MuiFormControlLabel-label': { color: 'common.white' },
        '& .MuiInputLabel-root, & .MuiInputLabel-root.Mui-focused': { color: 'common.white' },
        '& .MuiFormHelperText-root': { color: '#ffb4b4' },
        '& .MuiButton-text': { color: 'primary.main' },
        '& .MuiButton-text:hover': {
          color: 'primary.main',
          bgcolor: 'rgba(220,181,47,.1)',
        },
        '& .MuiButton-outlined': {
          color: 'primary.main',
          borderColor: 'primary.main',
          borderRadius: 0,
        },
        '& .MuiButton-outlined:hover': {
          color: 'primary.main',
          borderColor: 'primary.main',
          bgcolor: 'rgba(220,181,47,.1)',
        },
        '& .MuiIconButton-root': { color: 'common.white' },
        '& .MuiIconButton-colorError': { color: '#ff8f8f' },
        '& .Mui-disabled': { color: 'rgba(255,255,255,.3) !important' },
        '& .MuiSwitch-track': { bgcolor: 'rgba(255,255,255,.45)' },
        '& .MuiSwitch-switchBase.Mui-checked': { color: 'primary.main' },
        '& .MuiChip-root': { color: 'common.white', borderColor: 'rgba(255,255,255,.45)' },
        '& .MuiChip-filled': { bgcolor: 'primary.main', color: '#4b1017' },
      }}
    >
      <Paper
        elevation={isActionBarSticky ? 8 : 0}
        sx={{
          position: isActionBarSticky ? 'fixed' : 'relative',
          display: editingFieldId ? 'none' : 'block',
          right: isActionBarSticky ? { xs: 12, md: 28 } : 'auto',
          bottom: isActionBarSticky ? { xs: 12, md: 24 } : 'auto',
          zIndex: isActionBarSticky ? 1200 : 'auto',
          mb: isActionBarSticky ? 0 : 3,
          bgcolor: '#741722 !important',
          border: '1px solid rgba(255,255,255,.25)',
          borderRadius: '4px !important',
          p: 1.25,
          boxShadow: isActionBarSticky ? '0 8px 30px rgba(28,4,8,.35)' : 'none',
        }}
      >
        <Stack direction="row" spacing={1.25} alignItems="center" flexWrap="wrap" useFlexGap>
          {statusControl}
          <Button
            variant="text"
            startIcon={<PushPinOutlinedIcon />}
            onClick={() => setIsActionBarSticky((current) => !current)}
            sx={{
              minHeight: 40,
              px: 1.5,
              color: '#F0D263 !important',
              borderRight: { sm: '1px solid rgba(255,255,255,.2)' },
              borderRadius: '0 !important',
              whiteSpace: 'nowrap',
            }}
          >
            {isActionBarSticky ? 'Unpin toolbar' : 'Pin toolbar'}
          </Button>
          <CustomButtonPrimary
            variant="outlined"
            color="secondary"
            startIcon={<VisibilityOutlinedIcon />}
            onClick={() => setIsPreviewOpen(true)}
            sx={{ minHeight: 44, color: '#fff !important', whiteSpace: 'nowrap' }}
          >
            Preview
          </CustomButtonPrimary>
          <CustomButtonPrimary
            onClick={save}
            disabled={isSaving}
            sx={{
              minWidth: { xs: 120, sm: 180 },
              minHeight: 44,
              color: '#10212B !important',
              whiteSpace: 'nowrap',
            }}
          >
            {isSaving ? 'Saving...' : onSave ? 'Save form' : 'Save & log JSON'}
          </CustomButtonPrimary>
        </Stack>
      </Paper>

      <Stack spacing={3} sx={{ pb: 10 }}>
        {/* =====================================>
            UI for form header, name and step navigation
        ====================================== */}
        <Box>
          <Stack spacing={1.5}>
            <Paper
              id="builder-form-header"
              variant="outlined"
              sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 1.25 }}
            >
              <Typography fontWeight={700} mb={2}>
                Form header
              </Typography>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Yellow tag (optional)"
                  value={schema.header?.tag ?? ''}
                  placeholder="Leave empty to hide the yellow tag"
                  onChange={(event) =>
                    commit({
                      ...schema,
                      header: { ...schema.header, tag: event.target.value },
                    })
                  }
                />
                <TextField
                  fullWidth
                  label="Heading"
                  value={schema.header?.heading ?? ''}
                  placeholder="e.g. Join the Loyalty Program"
                  onChange={(event) =>
                    commit({
                      ...schema,
                      header: { ...schema.header, heading: event.target.value },
                    })
                  }
                />
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  label="Description"
                  value={schema.header?.description ?? ''}
                  onChange={(event) =>
                    commit({
                      ...schema,
                      header: { ...schema.header, description: event.target.value },
                    })
                  }
                />
              </Stack>
            </Paper>

            <Paper variant="outlined" sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 1.25 }}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                <TextField
                  id="builder-form-name"
                  fullWidth
                  label="Form name"
                  value={schema.name}
                  onChange={(event) => commit({ ...schema, name: event.target.value })}
                />
              </Stack>
            </Paper>

            <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 1.25 }}>
              <DndContext
                sensors={stepDragSensors}
                collisionDetection={closestCenter}
                onDragEnd={reorderSteps}
              >
                <SortableContext
                  items={schema.steps.map((step) => step.id)}
                  strategy={horizontalListSortingStrategy}
                >
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" alignItems="center">
                    {schema.steps.map((step, index) => (
                      <SortableStepChip
                        key={step.id}
                        step={step}
                        index={index}
                        isActive={activeStep?.id === step.id}
                        isInvalid={invalidItem?.stepId === step.id}
                        onClick={() => setActiveStepId(step.id)}
                      />
                    ))}
                    <Button startIcon={<AddIcon />} onClick={addStep}>
                      Add step
                    </Button>
                  </Stack>
                </SortableContext>
              </DndContext>
            </Paper>

            <Paper
              id="builder-form-appearance"
              variant="outlined"
              sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 1.25 }}
            >
              <Typography fontWeight={700} mb={2}>
                Form appearance
              </Typography>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-start">
                <TextField
                  select
                  label="Layout preset"
                  value={schema.appearance.preset}
                  sx={{ minWidth: 180 }}
                  onChange={(event) => {
                    const preset = event.target.value as 'wide' | 'compact';
                    commit({
                      ...schema,
                      appearance: {
                        ...schema.appearance,
                        preset,
                        showFormCard: true,
                      },
                    });
                  }}
                >
                  <MenuItem value="wide">Wide website</MenuItem>
                  <MenuItem value="compact">Compact card</MenuItem>
                </TextField>
                {/* <TextField
                  label="Page background"
                  value={schema.appearance.pageBackground}
                  placeholder="#fffdef"
                  sx={{ minWidth: 180 }}
                  onChange={(event) =>
                    commit({
                      ...schema,
                      appearance: { ...schema.appearance, pageBackground: event.target.value },
                    })
                  }
                /> */}
                <Stack direction="row" useFlexGap flexWrap="wrap">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={schema.appearance.showFormCard}
                        onChange={(event) =>
                          commit({
                            ...schema,
                            appearance: {
                              ...schema.appearance,
                              showFormCard: event.target.checked,
                            },
                          })
                        }
                      />
                    }
                    label="Form card"
                  />
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Box>

        {activeStep && (
          <Stack spacing={2}>
            {/* =====================================>
                UI for active step settings
            ====================================== */}
            <Paper
              id={`builder-step-${activeStep.id}`}
              variant="outlined"
              sx={{
                p: 2.5,
                borderRadius: 1.25,
                borderColor:
                  invalidItem?.stepId === activeStep.id ? '#ff6b6b !important' : undefined,
                borderWidth: invalidItem?.stepId === activeStep.id ? 2 : 1,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  fullWidth
                  label="Step name"
                  value={activeStep.name}
                  onChange={(event) =>
                    updateStep(activeStep.id, (step) => ({ ...step, name: event.target.value }))
                  }
                />
                <IconButton
                  aria-label="Delete step"
                  disabled={schema.steps.length === 1}
                  color="error"
                  onClick={() => {
                    const steps = schema.steps.filter((step) => step.id !== activeStep.id);
                    commit({ ...schema, steps });
                    setActiveStepId(steps[0]?.id ?? '');
                  }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Stack>
            </Paper>

            {activeStep.sections.map((section, sectionIndex) => (
              /* =====================================>
                 UI for section settings and questions
              ====================================== */
              <Paper
                key={section.id}
                id={`builder-section-${section.id}`}
                variant="outlined"
                sx={{
                  overflow: 'hidden',
                  borderRadius: 1.25,
                  borderColor:
                    invalidItem?.sectionId === section.id ? '#ff6b6b !important' : undefined,
                  borderWidth: invalidItem?.sectionId === section.id ? 2 : 1,
                  boxShadow:
                    invalidItem?.sectionId === section.id
                      ? '0 0 0 3px rgba(255,107,107,.16)'
                      : 'none',
                }}
              >
                <Box sx={{ p: 2.5, bgcolor: 'customColors.colorB2535F' }}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                    <TextField
                      fullWidth
                      required
                      label="Section title"
                      value={section.title}
                      onChange={(event) =>
                        updateSection(activeStep.id, section.id, (current) => ({
                          ...current,
                          title: event.target.value,
                        }))
                      }
                    />
                    <TextField
                      fullWidth
                      label="Section subtitle (optional)"
                      value={section.subtitle ?? ''}
                      onChange={(event) =>
                        updateSection(activeStep.id, section.id, (current) => ({
                          ...current,
                          subtitle: event.target.value,
                        }))
                      }
                    />
                    <Stack direction="row">
                      <IconButton
                        aria-label="Move section up"
                        disabled={sectionIndex === 0}
                        onClick={() =>
                          updateStep(activeStep.id, (step) => ({
                            ...step,
                            sections: moveItem(step.sections, sectionIndex, -1),
                          }))
                        }
                      >
                        <ArrowUpwardIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Move section down"
                        disabled={sectionIndex === activeStep.sections.length - 1}
                        onClick={() =>
                          updateStep(activeStep.id, (step) => ({
                            ...step,
                            sections: moveItem(step.sections, sectionIndex, 1),
                          }))
                        }
                      >
                        <ArrowDownwardIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Delete section"
                        color="error"
                        onClick={() =>
                          updateStep(activeStep.id, (step) => ({
                            ...step,
                            sections: step.sections.filter((item) => item.id !== section.id),
                          }))
                        }
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2.5 }}
                    useFlexGap
                    flexWrap="wrap"
                    alignItems={{ xs: 'stretch', sm: 'center' }}
                    sx={{ mt: 2, pt: 1.5, borderTop: '1px solid rgba(255,255,255,.2)' }}
                  >
                    <FormControlLabel
                      sx={{ m: 0, minWidth: 140 }}
                      control={
                        <Switch
                          checked={section.showTitle !== false}
                          onChange={(event) =>
                            updateSection(activeStep.id, section.id, (current) => ({
                              ...current,
                              showTitle: event.target.checked,
                            }))
                          }
                        />
                      }
                      label="Show title"
                    />
                    <FormControlLabel
                      sx={{ m: 0, minWidth: 155 }}
                      control={
                        <Switch
                          checked={section.showBorder}
                          onChange={(event) =>
                            updateSection(activeStep.id, section.id, (current) => ({
                              ...current,
                              showBorder: event.target.checked,
                            }))
                          }
                        />
                      }
                      label="Section border"
                    />
                    <FormControlLabel
                      sx={{ m: 0, minWidth: 180 }}
                      control={
                        <Switch
                          checked={section.showCard}
                          onChange={(event) =>
                            updateSection(activeStep.id, section.id, (current) => ({
                              ...current,
                              showCard: event.target.checked,
                            }))
                          }
                        />
                      }
                      label="Section card style"
                    />
                    {section.showCard && (
                      <ToggleButtonGroup
                        exclusive
                        size="small"
                        value={
                          section.cardIncludesHeader !== false ? 'with-heading' : 'fields-only'
                        }
                        onChange={(_, value: 'with-heading' | 'fields-only' | null) => {
                          if (!value) return;
                          updateSection(activeStep.id, section.id, (current) => ({
                            ...current,
                            cardIncludesHeader: value === 'with-heading',
                          }));
                        }}
                        aria-label="Section card content"
                        sx={{
                          width: { xs: '100%', sm: 'auto' },
                          bgcolor: 'rgba(118,13,25,.22)',
                          '& .MuiToggleButton-root': {
                            flex: { xs: 1, sm: 'initial' },
                            px: 1.5,
                            py: 0.75,
                            color: 'rgba(255,255,255,.72)',
                            borderColor: 'rgba(255,255,255,.32)',
                            fontSize: 11,
                            lineHeight: 1.25,
                            textTransform: 'none',
                            '&.Mui-selected': {
                              bgcolor: 'primary.main',
                              color: 'common.white',
                            },
                          },
                        }}
                      >
                        <ToggleButton value="with-heading">
                          Include title &amp; subtitle
                        </ToggleButton>
                        <ToggleButton value="fields-only">Questions only</ToggleButton>
                      </ToggleButtonGroup>
                    )}
                  </Stack>
                </Box>

                <Stack spacing={2} sx={{ p: 2.5 }}>
                  {section.fields.map((field, fieldIndex) => (
                    /* =====================================>
                       UI for individual question settings
                    ====================================== */
                    <Paper
                      key={field.id}
                      id={`builder-question-${field.id}`}
                      variant="outlined"
                      sx={{
                        p: 2.5,
                        borderRadius: 1.25,
                        borderWidth:
                          invalidItem?.fieldId === field.id || editingFieldId === field.id ? 2 : 1,
                        borderColor:
                          invalidItem?.fieldId === field.id
                            ? '#ff6b6b !important'
                            : editingFieldId === field.id
                              ? 'primary.main'
                              : 'rgba(255,255,255,.28)',
                        bgcolor:
                          invalidItem?.fieldId === field.id
                            ? 'rgba(255,107,107,.12) !important'
                            : editingFieldId === field.id
                              ? 'rgba(220,181,47,.1) !important'
                              : 'transparent',
                        boxShadow:
                          invalidItem?.fieldId === field.id
                            ? '0 0 0 3px rgba(255,107,107,.2)'
                            : editingFieldId === field.id
                              ? '0 0 0 3px rgba(220,181,47,.18)'
                              : 'none',
                      }}
                    >
                      <Stack spacing={2}>
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          spacing={1.5}
                          alignItems={{ xs: 'stretch', sm: 'center' }}
                          justifyContent="space-between"
                        >
                          <Box sx={{ minWidth: 0 }}>
                            <Typography fontWeight={700}>Question {fieldIndex + 1}</Typography>
                            <Typography
                              sx={{
                                fontSize: 13,
                                opacity: 0.75,
                                mt: 0.5,
                                overflowWrap: 'anywhere',
                              }}
                            >
                              {field.questionContent || `Untitled ${field.type} field`}
                            </Typography>
                            <Chip
                              label={field.type}
                              size="small"
                              variant="outlined"
                              sx={{ mt: 1, textTransform: 'capitalize' }}
                            />
                          </Box>
                          <Stack direction="row" useFlexGap flexWrap="wrap" alignItems="center">
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<EditOutlinedIcon />}
                              onClick={() => setEditingFieldId(field.id)}
                            >
                              Modify configuration
                            </Button>
                            <IconButton
                              aria-label="Move question up"
                              disabled={fieldIndex === 0}
                              onClick={() =>
                                updateSection(activeStep.id, section.id, (current) => ({
                                  ...current,
                                  fields: moveItem(current.fields, fieldIndex, -1),
                                }))
                              }
                            >
                              <ArrowUpwardIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              aria-label="Move question down"
                              disabled={fieldIndex === section.fields.length - 1}
                              onClick={() =>
                                updateSection(activeStep.id, section.id, (current) => ({
                                  ...current,
                                  fields: moveItem(current.fields, fieldIndex, 1),
                                }))
                              }
                            >
                              <ArrowDownwardIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              aria-label="Duplicate question"
                              onClick={() =>
                                updateSection(activeStep.id, section.id, (current) => {
                                  const clone = structuredClone(field);
                                  clone.id = uid('field');
                                  clone.key = `${field.key}_copy`;
                                  return { ...current, fields: [...current.fields, clone] };
                                })
                              }
                            >
                              <ContentCopyIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              aria-label="Delete question"
                              color="error"
                              onClick={() =>
                                updateSection(activeStep.id, section.id, (current) => ({
                                  ...current,
                                  fields: current.fields.filter((item) => item.id !== field.id),
                                }))
                              }
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Stack>

                        <QuestionConfigurationDrawer
                          field={field}
                          fieldIndex={fieldIndex}
                          open={editingFieldId === field.id}
                          onClose={() => setEditingFieldId(null)}
                          onChange={(nextField) =>
                            updateField(activeStep.id, section.id, field.id, () => nextField)
                          }
                          previousFields={getPreviousFields(field.id)}
                        />
                      </Stack>
                    </Paper>
                  ))}

                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      const field = newField();
                      updateSection(activeStep.id, section.id, (current) => ({
                        ...current,
                        fields: [...current.fields, field],
                      }));
                      setEditingFieldId(field.id);
                    }}
                  >
                    Add question
                  </Button>
                </Stack>
              </Paper>
            ))}

            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() =>
                updateStep(activeStep.id, (step) => ({
                  ...step,
                  sections: [...step.sections, newSection()],
                }))
              }
            >
              Add section
            </Button>
          </Stack>
        )}
      </Stack>

      {/* =====================================>
          UI for form preview dialog
      ====================================== */}
      <FormPreview
        open={isPreviewOpen}
        schema={compactSchema(schema)}
        onClose={() => setIsPreviewOpen(false)}
      />
    </Box>
  );
}
