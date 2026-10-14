'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AccordionDetails,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import NewFaqContent from '../cms/newFaqContent/NewFaqContent';

import PageLoader from '@/@core/components/others/PageLoader';
import { useTypesOfCharterGet } from '@/api/hooks/types-of-charter/hooks';
import { PageTypeValue } from '@/constant';
import {
  HeroSectionAccordion,
  HeroSectionAccordionSummary,
  HeroSectionSelectorWrap,
} from '@/styles/StyledComponents/HeroSectionStyled';

// ─── Section Config ─────────────────────────────────────────────────────────
type TSectionKey = 'faq';

const REQUIRED_SECTIONS: TSectionKey[] = ['faq'];

const ALL_SECTIONS: { key: TSectionKey; label: string }[] = [{ key: 'faq', label: 'FAQ' }];

type TTypesOfCharterFaqFormProps = {
  charterCatId: string;
  charterId: string;
};

// ─── Component ──────────────────────────────────────────────────────────────
const TypesOfCharterFaqForm = ({ charterCatId, charterId }: TTypesOfCharterFaqFormProps) => {
  const theme = useTheme();
  const router = useRouter();

  // Which sections are enabled (selected from dropdown)
  const [enabledSections, setEnabledSections] = useState<TSectionKey[]>(['faq']);

  // Which enabled sections are currently expanded
  const [expandedSections, setExpandedSections] = useState<Record<TSectionKey, boolean>>({
    faq: true,
  });

  // ── Section dropdown handlers ──────────────────────────────────
  const isRequired = (key: TSectionKey) => REQUIRED_SECTIONS.includes(key);

  const handleSectionChange = (event: SelectChangeEvent<TSectionKey[]>) => {
    let value = event.target.value as TSectionKey[];

    // Ensure required sections can never be removed
    REQUIRED_SECTIONS.forEach((req) => {
      if (!value.includes(req)) value = [req, ...value];
    });

    setEnabledSections(value);

    // Auto-expand newly added sections
    setExpandedSections((prev) => {
      const next = { ...prev };
      value.forEach((key) => {
        if (next[key] === undefined) next[key] = true;
      });
      return next;
    });
  };

  const handleAccordionToggle = (section: TSectionKey) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const isSectionEnabled = (key: TSectionKey) => enabledSections.includes(key);

  const { data: charterDetails, isLoading: charterDetailLoading } = useTypesOfCharterGet({
    id: charterId,
  });

  if (charterDetailLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  return (
    <Box className="mainContainer">
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 1,
          color: theme.palette.common.white,
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            router.back();
          }}
          sx={{
            color: theme.palette.common.white,
            textTransform: 'none',
            fontSize: '15px',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.08)',
            },
          }}
        >
          Back
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 600, m: 0 }}>
          {charterDetails?.title ?? '-'}
        </Typography>
      </Box>
      <Box className="grid-wrap">
        {/* ── Section Selector Dropdown ─────────────────────────── */}
        <HeroSectionSelectorWrap>
          <FormControl fullWidth>
            <Select
              multiple
              value={enabledSections}
              onChange={handleSectionChange}
              input={<OutlinedInput />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as TSectionKey[]).map((key) => {
                    const section = ALL_SECTIONS.find((s) => s.key === key);
                    return (
                      <Chip
                        key={key}
                        label={section?.label ?? key}
                        size="small"
                        sx={{
                          backgroundColor: theme.palette.customColors.textColor,
                          color: theme.palette.common.white,
                          fontWeight: 500,
                          fontSize: '12px',
                          '.MuiChip-icon': { color: theme.palette.common.white, ml: '6px' },
                        }}
                      />
                    );
                  })}
                </Box>
              )}
              MenuProps={{
                PaperProps: {
                  sx: {
                    background: theme.palette.customColors.textColor ?? '#1a1a2e',
                    border: `1px solid ${theme.palette.customColors.textColor ?? 'rgba(255,255,255,0.2)'}`,
                    borderRadius: '8px',
                    mt: 0.5,
                  },
                },
              }}
            >
              {ALL_SECTIONS.map((section) => {
                const locked = isRequired(section.key);
                return (
                  <MenuItem
                    key={section.key}
                    value={section.key}
                    disabled={locked}
                    sx={{
                      color: theme.palette.common.white,
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)' },
                      '&.Mui-selected': { backgroundColor: 'rgba(255,255,255,0.08)' },
                      '&.Mui-disabled': {
                        opacity: 0.7,
                        color: theme.palette.common.white,
                      },
                    }}
                  >
                    <Checkbox
                      checked={isSectionEnabled(section.key)}
                      disabled={locked}
                      sx={{
                        color: theme.palette.customColors?.colorB2535F ?? 'rgba(255,255,255,0.5)',
                        '&.Mui-checked': { color: theme.palette.error.main },
                        '&.Mui-disabled': { color: `${theme.palette.error.main} !important` },
                        p: 0,
                        mr: 1,
                      }}
                    />
                    <ListItemText
                      primary={locked ? `${section.label}` : section.label}
                      slotProps={{
                        primary: {
                          sx: { color: theme.palette.common.white, fontSize: '14px' },
                        },
                      }}
                    />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </HeroSectionSelectorWrap>

        {/* ── Render Enabled Sections ───────────────────────────── */}
        {ALL_SECTIONS.filter((s) => isSectionEnabled(s.key)).map((section) => {
          return (
            <HeroSectionAccordion
              key={section.key}
              disableGutters
              elevation={0}
              square
              expanded={expandedSections[section.key] ?? false}
              onChange={() => handleAccordionToggle(section.key)}
            >
              <HeroSectionAccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.common.white }} />}
              >
                <Typography
                  sx={{ color: theme.palette.common.white, fontWeight: 600, fontSize: '16px' }}
                >
                  {section.label}
                </Typography>
              </HeroSectionAccordionSummary>

              <AccordionDetails sx={{ px: 2.5, py: 3 }}>
                {section.key === 'faq' ? (
                  <NewFaqContent
                    purpose={`${PageTypeValue.cms.typesOfCharter.pageSlug}${charterDetails?._id}`}
                  />
                ) : null}
              </AccordionDetails>
            </HeroSectionAccordion>
          );
        })}

        {/* ── Empty State ───────────────────────────────────────── */}
        {enabledSections.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 6,
              border: `1px dashed ${theme.palette.customColors?.colorB2535F ?? 'rgba(255,255,255,0.2)'}`,
              borderRadius: '10px',
            }}
          >
            <Typography sx={{ color: theme.palette.text.primary, fontSize: '14px' }}>
              No sections selected. Use the dropdown above to enable sections.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TypesOfCharterFaqForm;
