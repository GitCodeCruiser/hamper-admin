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

import CmsContent from '../cms/content/CmsContent';
import NewCmsContent from '../cms/newContent/NewCmsContent';

import HourlyBreakdownComp from './HourlyBreakdownComp';

import PageLoader from '@/@core/components/others/PageLoader';
import { useAircraftOptionsGet } from '@/api/hooks/aircraft-options-flow/hooks';
import { PageTypeValue, PurposeTypeValue } from '@/constant';
import {
  HeroSectionAccordion,
  HeroSectionAccordionSummary,
  HeroSectionSelectorWrap,
} from '@/styles/StyledComponents/HeroSectionStyled';

// ─── Section Config ─────────────────────────────────────────────────────────
type TSectionKey =
  | 'aircraftOptionsTop' | 'content' | 'aircraftOptionsBottom' | 'hourlyBreakDownComp';

const REQUIRED_SECTIONS: TSectionKey[] = ['content'];

const ALL_SECTIONS: { key: TSectionKey; label: string }[] = [
  { key: 'aircraftOptionsTop', label: 'Aircraft Options Top Content' },
  { key: 'content', label: 'Content' },
  { key: 'aircraftOptionsBottom', label: 'Aircraft Options Bottom Content' },
  { key: 'hourlyBreakDownComp', label: 'Hourly Breakdown' },
];

type TAircraftOptionsContentFormProps = {
  aircraftOptionsId: string;
};

// ─── Component ──────────────────────────────────────────────────────────────
const AircraftOptionsContentForm = ({ aircraftOptionsId }: TAircraftOptionsContentFormProps) => {
  const theme = useTheme();
  const router = useRouter();

  const [enabledSections, setEnabledSections] = useState<TSectionKey[]>([
    'aircraftOptionsTop',
    'content',
    'aircraftOptionsBottom',
    'hourlyBreakDownComp',
  ]);

  const [expandedSections, setExpandedSections] = useState<Record<TSectionKey, boolean>>({
    content: true,
    aircraftOptionsTop: true,
    aircraftOptionsBottom: true,
    hourlyBreakDownComp: true,
  });

  const isRequired = (key: TSectionKey) => REQUIRED_SECTIONS.includes(key);

  const handleSectionChange = (event: SelectChangeEvent<TSectionKey[]>) => {
    let value = event.target.value as TSectionKey[];

    REQUIRED_SECTIONS.forEach((req) => {
      if (!value.includes(req)) value = [req, ...value];
    });

    setEnabledSections(value);

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

  const { data: aircraftOptionsDetails, isLoading: aircraftOptionsDetailLoading } =
    useAircraftOptionsGet({
      id: aircraftOptionsId,
    });

  if (aircraftOptionsDetailLoading) {
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
          {aircraftOptionsDetails?.title ?? '-'}
        </Typography>
      </Box>
      <Box className="grid-wrap">
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
                {section.key === 'content' ? (
                  <NewCmsContent
                    slug={PageTypeValue.cms.aircraftOptions.pageSlug}
                    pageName={PageTypeValue.cms.aircraftOptions.pageName}
                    purpose={`${PageTypeValue.cms.aircraftOptions.pageSlug}${aircraftOptionsDetails?._id}`}
                  />
                ) : section.key === 'aircraftOptionsTop' ? (
                  <CmsContent
                    slug={PageTypeValue.cms.aircraftOptions.pageSlug}
                    pageName={PageTypeValue.cms.aircraftOptions.pageName}
                    purpose={`${PurposeTypeValue.cms.aircraftOptions.aircraftOptionsTop}${aircraftOptionsDetails?._id}`}
                  />
                ) : section.key === 'aircraftOptionsBottom' ? (
                  <CmsContent
                    slug={PageTypeValue.cms.aircraftOptions.pageSlug}
                    pageName={PageTypeValue.cms.aircraftOptions.pageName}
                    purpose={`${PurposeTypeValue.cms.aircraftOptions.aircraftOptionsBottom}${aircraftOptionsDetails?._id}`}
                  />
                ) : section.key === 'hourlyBreakDownComp' ? (
                  <HourlyBreakdownComp
                    slug={PageTypeValue.cms.aircraftOptions.pageSlug}
                    pageName={PageTypeValue.cms.aircraftOptions.pageName}
                    purpose={`${PurposeTypeValue.cms.aircraftOptions.aircraftOptionsHourlyBreakdown}${aircraftOptionsDetails?._id}`}
                  />
                ) : null}
              </AccordionDetails>
            </HeroSectionAccordion>
          );
        })}

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

export default AircraftOptionsContentForm;
