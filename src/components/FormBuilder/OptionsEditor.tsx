import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  Box,
  Button,
  Collapse,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import TextField from './BuilderInput';
import { FormBuilderOption } from './types';

const createId = () =>
  `option_${typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now()}`;

interface OptionsEditorProps {
  options: FormBuilderOption[];
  onChange: (options: FormBuilderOption[]) => void;
}

export default function OptionsEditor({ options, onChange }: OptionsEditorProps) {
  const [expandedHintIds, setExpandedHintIds] = useState<Set<string>>(
    () =>
      new Set(options.filter((option) => Boolean(option.hint?.trim())).map((option) => option.id)),
  );

  const updateOption = (id: string, updates: Partial<FormBuilderOption>) => {
    onChange(options.map((option) => (option.id === id ? { ...option, ...updates } : option)));
  };

  return (
    <Box
      sx={{
        p: 2,
        border: '1px dashed',
        borderColor: 'rgba(255,255,255,.28)',
        borderRadius: 1.25,
      }}
    >
      <Typography variant="subtitle2" fontWeight={700} mb={1.5}>
        Options
      </Typography>
      <Stack spacing={1.5}>
        {options.map((option) => {
          const isHintExpanded = expandedHintIds.has(option.id);

          return (
            <Box
              key={option.id}
              sx={{
                p: 1.5,
                border: '1px solid rgba(255,255,255,.14)',
                borderRadius: 1,
              }}
            >
              <Stack direction={{ xs: 'column', lg: 'row' }} spacing={1.5} alignItems="center">
                <TextField
                  fullWidth
                  label="Option label"
                  value={option.label}
                  sx={{ flex: 2 }}
                  onChange={(event) => updateOption(option.id, { label: event.target.value })}
                />
                <TextField
                  fullWidth
                  label="Value"
                  value={option.value}
                  sx={{ flex: 1.5, minWidth: { lg: 220 } }}
                  onChange={(event) => updateOption(option.id, { value: event.target.value })}
                />
                <TextField
                  fullWidth
                  label="Option subcontent (optional)"
                  value={option.subcontent ?? ''}
                  sx={{ flex: 2 }}
                  onChange={(event) => updateOption(option.id, { subcontent: event.target.value })}
                />
                <FormControlLabel
                  sx={{ flexShrink: 0, mr: 0 }}
                  control={
                    <Switch
                      size="small"
                      checked={isHintExpanded}
                      onChange={(event) =>
                        setExpandedHintIds((current) => {
                          const next = new Set(current);
                          if (event.target.checked) next.add(option.id);
                          else next.delete(option.id);
                          return next;
                        })
                      }
                    />
                  }
                  label="Selection hint"
                />
                <IconButton
                  aria-label="Delete option"
                  color="error"
                  onClick={() => onChange(options.filter((item) => item.id !== option.id))}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Stack>

              <Collapse in={isHintExpanded} unmountOnExit>
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  label="Hint shown when this option is selected"
                  value={option.hint ?? ''}
                  placeholder={'HINT HEADING\nAdd the helpful description here.'}
                  sx={{
                    mt: 2,
                    '&&& .MuiInputBase-root .MuiInputBase-input::placeholder': {
                      color: 'rgba(255,255,255,.3) !important',
                      WebkitTextFillColor: 'rgba(255,255,255,.3) !important',
                      opacity: '1 !important',
                    },
                    '&&& .MuiInputBase-root .MuiInputBase-input::-ms-input-placeholder': {
                      color: 'rgba(255,255,255,.3) !important',
                      WebkitTextFillColor: 'rgba(255,255,255,.3) !important',
                    },
                  }}
                  onChange={(event) => updateOption(option.id, { hint: event.target.value })}
                />
              </Collapse>
            </Box>
          );
        })}
        <Button
          startIcon={<AddIcon />}
          sx={{ alignSelf: 'flex-start' }}
          onClick={() =>
            onChange([
              ...options,
              { id: createId(), label: `Option ${options.length + 1}`, value: '' },
            ])
          }
        >
          Add option
        </Button>
      </Stack>
    </Box>
  );
}
