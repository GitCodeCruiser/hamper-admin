'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Chip,
  FormControl,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import HeroSectionVideoBannerComp from '../../hero-section/HeroSectionVideoBannerComp';
import MembershipPlansForm from '../../membership/MembershipPlansForm';
import CmsCharterContent from '../charterContent/CmsCharterContent';
import CmsContent from '../content/CmsContent';

import CMSSectionFields from './CMSSectionFields';
import HomePageHowHoganWorks from './HomePageHowHoganWorks';
import HomePageTitleAndSubtitleComp from './HomePageTitleAndSubtitleComp';

import PageLoader from '@/@core/components/others/PageLoader';
import { PageTypeValue, PurposeTypeValue } from '@/constant';
import {
  homeBannerSchema,
  THomeBannerSchemaType,
} from '@/module/dashboard/validation/cms/homepage/homeBanner.zod';
import SeoCompForm from '@/module/seo/components/SeoCompForm';

// ─── Section Config ─────────────────────────────────────────────────────────
type TSectionKey =
  | 'banner'
  | 'story'
  | 'membership'
  | 'howHoganWorks'
  | 'seo'
  | 'charter'
  | 'compare'
  | 'aircraft'
  | 'emptyLegOffer'
  | 'testimonial';

const REQUIRED_SECTIONS: TSectionKey[] = ['seo'];

const ALL_SECTIONS: { key: TSectionKey; label: string }[] = [
  { key: 'banner', label: 'Banner' },
  { key: 'compare', label: 'Compare (Title & Subtitle)' },
  { key: 'story', label: 'Our Story' },
  { key: 'membership', label: 'Our Membership' },
  { key: 'howHoganWorks', label: 'How Hogani Jets Works' },
  { key: 'aircraft', label: 'Aircraft (Title & Subtitle)' },
  { key: 'charter', label: 'Charter Content' },
  { key: 'emptyLegOffer', label: 'Empty Leg Offer (Title & Subtitle)' },
  { key: 'testimonial', label: 'Testimonial (Title & Subtitle)' },
  { key: 'seo', label: 'SEO Settings' },
];

// ─── Styled Wrappers ─────────────────────────────────────────────────────────
const SectionSelectorWrap = styled(Box)`
  margin-bottom: 28px;

  .selector-label {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.common.white};
    margin-bottom: 8px;
  }

  .MuiOutlinedInput-root {
    background-color: ${({ theme }) => theme.palette.customColors?.colorB2535F};
    border-radius: 8px;
    color: ${({ theme }) => theme.palette.common.white};

    .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.customColors?.colorB2535F};
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.common.white};
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.error.main};
    }
  }

  .MuiSelect-icon {
    color: ${({ theme }) => theme.palette.common.white};
  }
`;

const SectionAccordion = styled(MuiAccordion)`
  background: transparent !important;
  border: 1px solid
    ${({ theme }) => theme.palette.customColors?.colorB2535F ?? 'rgba(255,255,255,0.2)'};
  border-radius: 10px !important;
  overflow: hidden;
  margin-bottom: 16px;

  &::before {
    display: none;
  }

  &.Mui-expanded {
    margin-bottom: 16px;
  }
`;

const SectionAccordionSummary = styled(AccordionSummary)`
  background-color: ${({ theme }) =>
    theme.palette.customColors?.colorB2535F ?? 'rgba(255,255,255,0.05)'};
  padding: 0 20px;
  min-height: 52px;

  .MuiAccordionSummary-content {
    margin: 14px 0;
  }
`;

// ─── Per-section field-name & label mapping ──────────────────────────────────
const SECTION_FIELD_CONFIG: Partial<
  Record<
    TSectionKey,
    {
      fieldNames: { image: string; title: string; subtitle: string };
      labels: {
        image: string;
        title: string;
        titlePlaceholder: string;
        subtitle: string;
        subtitlePlaceholder: string;
      };
    }
  >
> = {
  banner: {
    fieldNames: { image: 'bannerImage', title: 'bannerTitle', subtitle: 'bannerSubtitle' },
    labels: {
      image: 'Banner Image*',
      title: 'Title*',
      titlePlaceholder: 'Enter banner title',
      subtitle: 'Subtitle*',
      subtitlePlaceholder: 'Enter banner subtitle',
    },
  },
  // features: {
  //   fieldNames: { image: 'featuresImage', title: 'featuresTitle', subtitle: 'featuresSubtitle' },
  //   labels: {
  //     image: 'Features Image*',
  //     title: 'Title*',
  //     titlePlaceholder: 'Enter features section title',
  //     subtitle: 'Subtitle*',
  //     subtitlePlaceholder: 'Enter features section subtitle',
  //   },
  // },
  // about: {
  //   fieldNames: { image: 'aboutImage', title: 'aboutTitle', subtitle: 'aboutSubtitle' },
  //   labels: {
  //     image: 'About Us Image*',
  //     title: 'Title*',
  //     titlePlaceholder: 'Enter about us title',
  //     subtitle: 'Subtitle*',
  //     subtitlePlaceholder: 'Enter about us subtitle',
  //   },
  // },
};

// ─── Component ──────────────────────────────────────────────────────────────
const HomeBannerForm = () => {
  const theme = useTheme();

  // Which sections are enabled (selected from dropdown)
  const [enabledSections, setEnabledSections] = useState<TSectionKey[]>(['banner', 'seo']);

  // Which enabled sections are currently expanded
  const [expandedSections, setExpandedSections] = useState<Record<TSectionKey, boolean>>({
    banner: true,
    seo: true,
    story: false,
    membership: false,
    howHoganWorks: false,
    charter: false,
    aircraft: false,
    compare: false,
    emptyLegOffer: false,
    testimonial: false,
  });

  // Uploaded image state per section
  const [sectionImages, setSectionImages] = useState<Record<TSectionKey, string | null>>({
    banner: null,
    story: null,
    membership: null,
    howHoganWorks: null,
    seo: null,
    charter: null,
    aircraft: null,
    compare: null,
    emptyLegOffer: null,
    testimonial: null,
  });

  const form = useForm<THomeBannerSchemaType>({
    resolver: zodResolver(homeBannerSchema()),
    defaultValues: {
      bannerTitle: '',
      bannerSubtitle: '',
    },
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

  // ── Image handlers (per-section) ───────────────────────────────
  const handleImageUploaded = (section: TSectionKey, url: string, path: string) => {
    setSectionImages((prev) => ({ ...prev, [section]: url }));
    const config = SECTION_FIELD_CONFIG[section];
    if (config) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      form.setValue(config.fieldNames.image as any, path);
    }
  };

  const handleImageDeleted = (section: TSectionKey) => {
    setSectionImages((prev) => ({ ...prev, [section]: null }));
    const config = SECTION_FIELD_CONFIG[section];
    if (config) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      form.resetField(config.fieldNames.image as any);
    }
  };

  // ── Form submit ────────────────────────────────────────────────
  const onSubmit = (data: THomeBannerSchemaType) => {
    console.log(data, '@CMS_HOMEPAGE_SUBMIT');
  };

  const isSectionEnabled = (key: TSectionKey) => enabledSections.includes(key);

  const x = false;
  if (x) {
    // throw new Error("");
    return (
      // <Box className="mainContainer">
      <PageLoader wrapperCls="page-loader" />
      // </Box>
    );
  }

  return (
    <Box className="mainContainer">
      <Box className="grid-wrap">
        {/* ── Section Selector Dropdown ─────────────────────────── */}
        <SectionSelectorWrap>
          <Typography className="selector-label">Select Sections to Configure</Typography>
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
                    const locked = isRequired(key);
                    return (
                      <Chip
                        key={key}
                        label={section?.label ?? key}
                        size="small"
                        // icon={
                        //   locked ? (
                        //     <LockIcon sx={{ fontSize: '12px !important', color: 'inherit' }} />
                        //   ) : undefined
                        // }
                        sx={{
                          backgroundColor: theme.palette.customColors.textColor,
                          color: theme.palette.common.white,
                          fontWeight: 500,
                          fontSize: '12px',
                          '.MuiChip-icon': { color: theme.palette.common.white, ml: '6px' },
                          // backgroundColor: locked
                          //   ? theme.palette.error.dark
                          //   : theme.palette.error.main,
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
        </SectionSelectorWrap>

        {/* ── Render Enabled Sections ───────────────────────────── */}
        {ALL_SECTIONS.filter((s) => isSectionEnabled(s.key)).map((section) => {
          const config = SECTION_FIELD_CONFIG[section.key];

          return (
            <SectionAccordion
              key={section.key}
              disableGutters
              elevation={0}
              square
              expanded={expandedSections[section.key] ?? false}
              onChange={() => handleAccordionToggle(section.key)}
            >
              <SectionAccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.common.white }} />}
              >
                <Typography
                  sx={{ color: theme.palette.common.white, fontWeight: 600, fontSize: '16px' }}
                >
                  {section.label}
                </Typography>
              </SectionAccordionSummary>

              <AccordionDetails sx={{ px: 2.5, py: 3 }}>
                {section.key === 'banner' ? (
                  // <HeroSectionBannerComp slug={PageTypeValue.cms.homepage.pageSlug} />
                  <HeroSectionVideoBannerComp slug={PageTypeValue.cms.homepage.pageSlug} />
                ) : section.key === 'compare' ? (
                  <HomePageTitleAndSubtitleComp
                    labelName="Compare"
                    slug={PageTypeValue.cms.homepage.pageSlug}
                    pageName={PageTypeValue.cms.homepage.pageName}
                    purpose={PurposeTypeValue.cms.homepage.homepageCompare}
                  />
                ) : section.key === 'story' ? (
                  <CmsContent
                    slug={PageTypeValue.cms.homepage.pageSlug}
                    pageName={PageTypeValue.cms.homepage.pageName}
                    purpose={PurposeTypeValue.cms.homepage.homepageTopContent}
                  />
                ) : section.key === 'membership' ? (
                  <>
                    <HomePageTitleAndSubtitleComp
                      labelName="Membership"
                      slug={PageTypeValue.cms.homepage.pageSlug}
                      pageName={PageTypeValue.cms.homepage.pageName}
                      purpose={PurposeTypeValue.cms.homepage.homepageMembershipData}
                    />

                    <MembershipPlansForm slug={PageTypeValue.cms.homepage.pageSlug} />
                  </>
                ) : section.key === 'howHoganWorks' ? (
                  <HomePageHowHoganWorks slug={PageTypeValue.cms.homepage.pageSlug} />
                ) : section.key === 'aircraft' ? (
                  <HomePageTitleAndSubtitleComp
                    labelName="Aircraft"
                    slug={PageTypeValue.cms.homepage.pageSlug}
                    pageName={PageTypeValue.cms.homepage.pageName}
                    purpose={PurposeTypeValue.cms.homepage.homepageFeaturedAircraftData}
                  />
                ) : section.key === 'charter' ? (
                  <CmsCharterContent slug={PageTypeValue.cms.homepage.pageSlug} />
                ) : section.key === 'emptyLegOffer' ? (
                  <HomePageTitleAndSubtitleComp
                    labelName="Empty Leg Offer"
                    slug={PageTypeValue.cms.homepage.pageSlug}
                    pageName={PageTypeValue.cms.homepage.pageName}
                    purpose={PurposeTypeValue.cms.homepage.homepageLegOfferData}
                  />
                ) : section.key === 'testimonial' ? (
                  <HomePageTitleAndSubtitleComp
                    labelName="Testimonial"
                    slug={PageTypeValue.cms.homepage.pageSlug}
                    pageName={PageTypeValue.cms.homepage.pageName}
                    purpose={PurposeTypeValue.cms.homepage.homepageTestimonialData}
                  />
                ) : section.key === 'seo' ? (
                  <SeoCompForm slug={PageTypeValue.cms.homepage.pageSlug} />
                ) : config ? (
                  <CMSSectionFields
                    form={form}
                    fieldNames={config.fieldNames}
                    labels={config.labels}
                    uploadedImage={sectionImages[section.key]}
                    onImageUploaded={(url, path) => handleImageUploaded(section.key, url, path)}
                    onImageDeleted={() => handleImageDeleted(section.key)}
                  />
                ) : null}
              </AccordionDetails>
            </SectionAccordion>
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

        {/* ── Submit ────────────────────────────────────────────── */}
        {/* {enabledSections.length > 0 && (
          <CustomButtonPrimary
            fullWidth
            variant="contained"
            color="error"
            disableRipple
            sx={{ margin: '30px 0' }}
            onClick={form.handleSubmit(onSubmit)}
          >
            Submit
          </CustomButtonPrimary>
        )} */}
      </Box>
    </Box>
  );
};

export default HomeBannerForm;
