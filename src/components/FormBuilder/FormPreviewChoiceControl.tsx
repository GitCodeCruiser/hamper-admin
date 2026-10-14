'use client';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { FormBuilderField, FormInputVariant } from './types';

export function ChoiceControl({
  field,
  inputVariant = 'underline',
}: {
  field: FormBuilderField;
  inputVariant?: FormInputVariant;
}) {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    field.type === 'radio' && field.options?.[0] ? [field.options[0].value] : [],
  );
  const selectedOptions = (field.options ?? []).filter((option) =>
    selectedValues.includes(option.value),
  );

  if (field.type === 'multiselect' && field.multiSelectDesign === 'card') {
    return <MultiSelectCards field={field} />;
  }

  if (field.type === 'select' || field.type === 'multiselect') {
    return (
      <>
        <Select
          fullWidth
          multiple={field.type === 'multiselect'}
          value={field.type === 'multiselect' ? selectedValues : (selectedValues[0] ?? '')}
          onChange={(event) => {
            const value = event.target.value;
            setSelectedValues(Array.isArray(value) ? value : [value]);
          }}
          displayEmpty
          IconComponent={KeyboardArrowDownIcon}
          renderValue={(value) => (value.length ? String(value) : 'Select an option')}
          sx={{
            mt: field.subcontent ? 0 : 2.5,
            borderRadius: inputVariant === 'underline' ? 0 : '4px',
            borderBottom: inputVariant === 'underline' ? '1px solid #10212b' : 'none',
            bgcolor: inputVariant === 'filled' ? '#f5f3ed' : undefined,
            '& fieldset': {
              display:
                inputVariant === 'underline' || inputVariant === 'filled' ? 'none' : undefined,
              borderColor: '#c9ccce',
            },
            '& .MuiSelect-select': {
              px: inputVariant === 'underline' ? 0 : 1.75,
              py: 1.5,
            },
          }}
        >
          {(field.options ?? []).map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <OptionHintCallouts options={selectedOptions} />
      </>
    );
  }

  if (field.radioDesign === 'combined-pill') {
    return (
      <>
        <Box
          role="radiogroup"
          mt={field.subcontent ? 0 : 2.5}
          sx={{
            display: 'inline-flex',
            maxWidth: '100%',
            border: '1px solid #d8dadd',
            borderRadius: '50px',
            overflow: 'hidden',
          }}
        >
          {(field.options ?? []).map((option, index) => {
            const selected = selectedValues.includes(option.value);

            return (
              <Button
                key={option.id}
                role="radio"
                aria-checked={selected}
                onClick={() => setSelectedValues([option.value])}
                sx={{
                  px: { xs: 1.5, sm: 2.5 },
                  py: 1,
                  minWidth: { xs: 0, sm: 120 },
                  borderLeft: index ? '1px solid #d8dadd' : 'none',
                  borderRadius: 0,
                  bgcolor: selected ? '#760d19' : 'common.white',
                  color: selected ? 'common.white' : '#10212b',
                  textTransform: 'none',
                  fontSize: 15,
                  whiteSpace: 'nowrap',
                  '&:hover': { bgcolor: selected ? '#760d19' : '#f7f4ed' },
                }}
              >
                {option.label}
              </Button>
            );
          })}
        </Box>
        <OptionHintCallouts options={selectedOptions} />
      </>
    );
  }

  if (
    field.radioDesign === 'separate-pill' ||
    field.radioDesign === 'switch' ||
    field.isSwitchDesign
  ) {
    return (
      <>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          useFlexGap
          flexWrap="wrap"
          gap={1}
          mt={field.subcontent ? 0 : 2.5}
        >
          {(field.options ?? []).map((option) => (
            <Button
              key={option.id}
              onClick={() => setSelectedValues([option.value])}
              aria-pressed={selectedValues.includes(option.value)}
              sx={{
                px: 2.5,
                py: 1,
                minWidth: 130,
                width: { xs: '100%', sm: 'auto' },
                border: '1px solid',
                borderColor: selectedValues.includes(option.value) ? '#760d19' : '#d8dadd',
                borderRadius: '50px',
                bgcolor: selectedValues.includes(option.value) ? '#760d19' : 'transparent',
                color: selectedValues.includes(option.value) ? 'common.white' : '#10212b',
                textTransform: 'none',
                fontSize: 15,
              }}
            >
              {option.label}
            </Button>
          ))}
        </Stack>
        <OptionHintCallouts options={selectedOptions} />
      </>
    );
  }

  if (!field.radioDesign || field.radioDesign === 'normal') {
    return (
      <>
        <RadioGroup
          row
          value={selectedValues[0] ?? ''}
          onChange={(event) => setSelectedValues([event.target.value])}
          sx={{
            gap: { xs: 0.5, sm: 2.5 },
            mt: field.subcontent ? 0 : 2.5,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          {(field.options ?? []).map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.value}
              control={
                <Radio
                  size="small"
                  sx={{ color: '#b5b8ba', '&.Mui-checked': { color: '#760d19' } }}
                />
              }
              label={option.label}
              sx={{ '& .MuiFormControlLabel-label': { color: '#10212b', fontSize: 16 } }}
            />
          ))}
        </RadioGroup>
        <OptionHintCallouts options={selectedOptions} />
      </>
    );
  }

  return (
    <>
      <Box
        mt={field.subcontent ? 0 : 2.5}
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            md: `repeat(${Math.min(field.options?.length || 1, 4)}, minmax(0, 1fr))`,
          },
          gap: 1.5,
        }}
      >
        {(field.options ?? []).map((option) => (
          <Box
            key={option.id}
            role="radio"
            aria-checked={selectedValues.includes(option.value)}
            tabIndex={0}
            onClick={() => setSelectedValues([option.value])}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') setSelectedValues([option.value]);
            }}
            sx={{
              p: 2,
              textAlign: 'center',
              border: '1px solid',
              borderColor: selectedValues.includes(option.value) ? '#760d19' : '#d8dadd',
              borderRadius: '6px',
              bgcolor: selectedValues.includes(option.value)
                ? 'rgba(118,13,25,.04)'
                : 'transparent',
              cursor: 'pointer',
              overflowWrap: 'anywhere',
            }}
          >
            <Typography
              sx={{
                color: selectedValues.includes(option.value) ? '#760d19' : '#10212b',
                fontSize: 20,
              }}
            >
              {option.label}
            </Typography>
            {option.subcontent && (
              <Typography
                sx={{ color: '#50656e', fontSize: 12, textTransform: 'uppercase', mt: 0.5 }}
              >
                {option.subcontent}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
      <OptionHintCallouts options={selectedOptions} />
    </>
  );
}

/* =====================================>
   UI and selection state for multiselect cards
====================================== */
function MultiSelectCards({ field }: { field: FormBuilderField }) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const toggleOption = (value: string) => {
    setSelectedValues((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  };

  const selectedOptions = (field.options ?? []).filter((option) =>
    selectedValues.includes(option.value),
  );

  return (
    <>
      <Box
        mt={field.subcontent ? 0 : 2.5}
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            md: 'repeat(3, minmax(0, 1fr))',
          },
          gap: 1.5,
        }}
      >
        {(field.options ?? []).map((option) => {
          const selected = selectedValues.includes(option.value);

          return (
            <Box
              key={option.id}
              role="checkbox"
              aria-checked={selected}
              tabIndex={0}
              onClick={() => toggleOption(option.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') toggleOption(option.value);
              }}
              sx={{
                minHeight: 86,
                px: 2.5,
                py: 1.75,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1.5,
                cursor: 'pointer',
                bgcolor: 'common.white',
                border: '1px solid',
                borderColor: selected ? '#760d19' : '#d8dadd',
                borderRadius: '6px',
                transition: 'border-color .2s ease, box-shadow .2s ease',
                '&:hover': { borderColor: '#760d19' },
                '&:focus-visible': { outline: '2px solid #dcb52f', outlineOffset: 2 },
              }}
            >
              <Box>
                <Typography sx={{ color: '#10212b', fontSize: 15, fontWeight: 700 }}>
                  {option.label}
                </Typography>
                {option.subcontent && (
                  <Typography
                    sx={{
                      color: '#d2a916',
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      mt: 0.5,
                    }}
                  >
                    {option.subcontent}
                  </Typography>
                )}
              </Box>
              <Checkbox
                checked={selected}
                tabIndex={-1}
                sx={{
                  p: 0,
                  color: '#b8babc',
                  '&.Mui-checked': { color: '#760d19' },
                }}
              />
            </Box>
          );
        })}
      </Box>
      <OptionHintCallouts options={selectedOptions} />
    </>
  );
}

/* =====================================>
   UI for hints belonging to selected options
====================================== */
function OptionHintCallouts({ options }: { options: NonNullable<FormBuilderField['options']> }) {
  return (
    <>
      {options.map((option) => (
        <HintCallout key={option.id} hint={option.hint} />
      ))}
    </>
  );
}

/* =====================================>
   UI for a formatted hint callout
====================================== */
export function HintCallout({ hint }: { hint?: string }) {
  if (!hint?.trim()) return null;

  const [heading, ...descriptionLines] = hint.trim().split('\n');
  const description = descriptionLines.join('\n').trim();

  return (
    <Box
      sx={{
        mt: 3,
        px: { xs: 2, md: 3 },
        py: 2.25,
        bgcolor: '#f1e3df',
        borderLeft: '2px solid #760d19',
      }}
    >
      <Typography
        sx={{
          color: '#760d19',
          fontSize: 16,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '.02em',
          whiteSpace: 'pre-line',
          overflowWrap: 'anywhere',
        }}
      >
        {heading}
      </Typography>
      {description && (
        <Typography
          sx={{
            color: '#10212b',
            fontSize: { xs: 14, sm: 15 },
            lineHeight: 1.55,
            mt: 0.5,
            whiteSpace: 'pre-line',
            overflowWrap: 'anywhere',
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}
