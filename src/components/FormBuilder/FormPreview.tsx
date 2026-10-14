'use client';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import PreviewField, { groupPreviewFields } from './FormPreviewField';
import { FormBuilderSchema } from './types';

interface FormPreviewProps {
  open: boolean;
  schema: FormBuilderSchema;
  onClose: () => void;
}

export default function FormPreview({ open, schema, onClose }: FormPreviewProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (open) setStepIndex(0);
  }, [open]);

  const step = schema.steps[stepIndex];
  const appearance = schema.appearance ?? {
    preset: 'wide' as const,
    pageBackground: '#fffdef',
    showFormCard: true,
    inputVariant: 'underline' as const,
  };
  const isCompact = appearance.preset === 'compact';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xl"
      slotProps={{
        paper: {
          sx: {
            bgcolor: appearance.pageBackground,
            backgroundImage: 'none',
            borderRadius: 0,
            width: { xs: '100%', sm: 'calc(100% - 64px)' },
            height: { xs: '100dvh', sm: 'auto' },
            maxHeight: { xs: '100dvh', sm: '94vh' },
            m: { xs: 0, sm: 2 },
          },
        },
      }}
    >
      {/* =====================================>
          UI for preview header
      ====================================== */}
      <Box
        sx={{
          minHeight: { xs: 60, sm: 68 },
          px: { xs: 2, md: 4 },
          py: { xs: 1, sm: 0 },
          bgcolor: '#760d19',
          color: 'common.white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 11, color: '#dcb52f', letterSpacing: '.14em' }}>
            FORM PREVIEW
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 15, sm: 18 },
              fontWeight: 500,
              overflowWrap: 'anywhere',
            }}
          >
            {schema.name || 'Untitled form'}
          </Typography>
        </Box>
        <IconButton onClick={onClose} aria-label="Close preview" sx={{ color: 'common.white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* =====================================>
          UI for preview content
      ====================================== */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          px: { xs: 1.5, sm: 2, md: 4 },
          py: { xs: 2, sm: 3, md: 5 },
          bgcolor: appearance.pageBackground,
        }}
      >
        {(schema.header?.tag || schema.header?.heading || schema.header?.description) && (
          <Box
            sx={{
              maxWidth: 1100,
              mx: 'auto',
              mb: { xs: 3, md: 5 },
              px: { xs: 1, sm: 2 },
              textAlign: 'center',
            }}
          >
            {schema.header.tag && (
              <Typography
                sx={{
                  color: '#d3a91f',
                  fontSize: { xs: 13, sm: 16 },
                  fontWeight: 700,
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  mb: 1.5,
                }}
              >
                {schema.header.tag}
              </Typography>
            )}
            {schema.header.heading && (
              <Typography
                sx={{
                  color: '#760d19',
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: { xs: 34, sm: 48, md: 58 },
                  fontWeight: 400,
                  lineHeight: 1.12,
                  mb: schema.header.description ? { xs: 2, md: 3 } : 0,
                  overflowWrap: 'anywhere',
                }}
              >
                {schema.header.heading}
              </Typography>
            )}
            {schema.header.description && (
              <Typography
                sx={{
                  maxWidth: 1000,
                  mx: 'auto',
                  color: '#50656e',
                  fontSize: { xs: 15, sm: 18 },
                  lineHeight: 1.55,
                  overflowWrap: 'anywhere',
                }}
              >
                {schema.header.description}
              </Typography>
            )}
          </Box>
        )}

        <Box
          sx={{
            maxWidth: isCompact ? 820 : 1100,
            mx: 'auto',
            bgcolor: appearance.showFormCard ? 'common.white' : 'transparent',
            border: appearance.showFormCard ? '1px solid #e4e1d8' : 'none',
            borderRadius: appearance.showFormCard ? { xs: '4px', sm: '8px' } : 0,
            boxShadow: appearance.showFormCard ? '0 12px 50px rgba(49,35,18,.08)' : 'none',
            px: appearance.showFormCard ? { xs: 1.5, sm: 4, md: isCompact ? 4 : 6 } : 0,
            py: appearance.showFormCard ? { xs: 2.5, sm: 3, md: isCompact ? 4 : 5 } : 0,
          }}
        >
          {/* =====================================>
              UI for step navigation
          ====================================== */}
          {schema.steps.length > 1 && (
            <Stack
              direction="row"
              mb={{ xs: 3, md: 5 }}
              sx={{
                overflowX: 'auto',
                borderBottom: '1px solid #d8dadd',
                scrollbarWidth: 'thin',
              }}
            >
              {schema.steps.map((item, index) => (
                <Button
                  key={item.id}
                  onClick={() => setStepIndex(index)}
                  sx={{
                    flex: 1,
                    minWidth: { xs: 120, sm: 0 },
                    py: 1.5,
                    color: index === stepIndex ? '#760d19' : '#607079',
                    borderRadius: 0,
                    borderBottom:
                      index === stepIndex ? '3px solid #760d19' : '3px solid transparent',
                  }}
                >
                  {item.name || `Step ${index + 1}`}
                </Button>
              ))}
            </Stack>
          )}

          {step ? (
            <Stack spacing={{ xs: 3.5, md: 5 }}>
              {/* =====================================>
                  UI for form sections
              ====================================== */}
              {step.sections.map((section) => {
                const heading = (
                  <Box>
                    {/* =====================================>
                        UI for section heading
                    ====================================== */}
                    {section.showTitle !== false && (
                      <Typography
                        sx={{
                          color: '#760d19',
                          fontSize: { xs: 15, sm: 18 },
                          fontWeight: 700,
                          letterSpacing: '.1em',
                          textTransform: 'uppercase',
                          pb: 2,
                          mb: section.subtitle ? 1 : { xs: 2.5, md: 4 },
                          overflowWrap: 'anywhere',
                          borderBottom:
                            section.showBorder && section.cardIncludesHeader !== false
                              ? '1px solid #d8dadd'
                              : 'none',
                        }}
                      >
                        {section.title || 'Untitled section'}
                      </Typography>
                    )}
                    {section.subtitle && (
                      <Typography
                        sx={{
                          color: '#50656e',
                          fontSize: { xs: 14, sm: 15 },
                          mb: { xs: 2.5, md: 4 },
                          lineHeight: 1.6,
                          overflowWrap: 'anywhere',
                        }}
                      >
                        {section.subtitle}
                      </Typography>
                    )}
                  </Box>
                );

                const fields = (
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                      gap: { xs: 2.5, md: 4 },
                    }}
                  >
                    {groupPreviewFields(section.fields).map(({ field, nestedFields }) => (
                      <Box
                        key={field.id}
                        sx={{
                          gridColumn: { xs: 'span 12', md: `span ${field.grid ?? 12}` },
                          minWidth: 0,
                        }}
                      >
                        <PreviewField
                          field={field}
                          nestedFields={nestedFields}
                          inputVariant={appearance.inputVariant}
                        />
                      </Box>
                    ))}
                  </Box>
                );

                const headingOutsideCard = section.showCard && section.cardIncludesHeader === false;

                return (
                  <Box key={section.id}>
                    {headingOutsideCard && heading}
                    <Box
                      sx={{
                        border: section.showBorder ? '1px solid #760d19' : 'none',
                        borderRadius: section.showBorder || section.showCard ? '8px' : 0,
                        bgcolor: section.showCard ? 'common.white' : 'transparent',
                        boxShadow: section.showCard ? '0 8px 28px rgba(49,35,18,.07)' : 'none',
                        p: section.showBorder || section.showCard ? { xs: 2, md: 3 } : 0,
                      }}
                    >
                      {!headingOutsideCard && heading}
                      {fields}
                    </Box>
                  </Box>
                );
              })}

              {/* =====================================>
                  UI for previous and continue actions
              ====================================== */}
              {schema.steps.length > 1 && (
                <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={1.5}>
                  {stepIndex > 0 && (
                    <Button
                      variant="outlined"
                      onClick={() => setStepIndex((value) => value - 1)}
                      sx={{
                        borderColor: '#760d19',
                        color: '#760d19',
                        borderRadius: 0,
                        px: 3,
                        width: { xs: '100%', sm: 'auto' },
                      }}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    disabled={stepIndex === schema.steps.length - 1}
                    onClick={() => setStepIndex((value) => value + 1)}
                    sx={{
                      bgcolor: '#760d19',
                      color: '#dcb52f',
                      borderRadius: 0,
                      px: 3,
                      width: { xs: '100%', sm: 'auto' },
                      '&:hover': { bgcolor: '#5b0912' },
                    }}
                  >
                    Continue
                  </Button>
                </Stack>
              )}
            </Stack>
          ) : (
            <Typography color="text.secondary">Add a step to preview the form.</Typography>
          )}
        </Box>
      </Box>
    </Dialog>
  );
}
