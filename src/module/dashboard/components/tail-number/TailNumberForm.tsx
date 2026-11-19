'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import WestIcon from '@mui/icons-material/West';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { ReactElement, UIEvent, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import PageLoader from '@/@core/components/others/PageLoader';
import { mainWebsiteUrl, mediaUrl } from '@/api/endpoints';
import { useAircraftGet, useAircraftInfinite } from '@/api/hooks/aircraft/hooks';
import {
  useTailNumberCreate,
  useTailNumberGet,
  useTailNumberUpdate,
} from '@/api/hooks/tail-number/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import MultipleImgMainComp from '@/components/Other/ImgMainComp/MultipleImgMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import { IMAGE_ASPECT_RATIO_DEFINE } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import {
  tailNumberSchema,
  toTailSlug,
  TTailNumberSchemaType,
} from '@/module/dashboard/validation/tail-number/index.zod';
import { GroupHeading } from '@/module/seo/components/SeoCompForm';
import { TEachAircraft } from '@/types/apps/aircraft/index.type';
import { TTailNumberAircraftRef } from '@/types/apps/tail-number/index.type';
import CKEditorRichText from '@/ui/CkEditor/Ckeditorrichtext';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomAutocomplete from '@/ui/CustomAutocomplete/CustomAutocomplete';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

type TTailNumberFormProps = {
  /** Present when editing */
  tailNumberId?: string;
  /** Pre-selected (and locked) aircraft when adding from an aircraft's tail list */
  aircraftId?: string;
  /** Where Back / save returns to */
  returnTo: string;
};

/** Existing gallery image (S3 key) or a newly picked file */
type TGalleryItem = { id: string; image: string | File; tag: string; size?: number };

const MAX_GALLERY_IMAGES = 20;
const labelSx = { color: '#FFFFFF' };
/** Dropdown label: the aircraft's name (e.g. "Challenger 604"), falling back to its title */
const aircraftLabel = (a: TTailNumberAircraftRef) => a.name || a.title || '';
const toStr = (v?: number | null) => (v === null || v === undefined ? '' : String(v));

const defaultValues: TTailNumberSchemaType = {
  aircraftId: '',
  tailNumber: '',
  slug: '',
  serialNumber: '',
  yearOfManufacture: '',
  seats: '',
  homeBase: '',
  avionics: '',
  airframeTotalTime: '',
  exteriorRefurbYear: '',
  interiorRefurbYear: '',
  wifi: '',
  notes: '',
  engines: '',
  registrationValidThrough: '',
  heroImage: null,
  heroImageTag: '',
  pageHeading: '',
  content: '',
  metaTitle: '',
  metaDescription: '',
  canonicalTag: '',
  metaRobotsIndex: 'index',
  metaRobotsFollow: 'follow',
  status: 'Draft',
  order: '0',
  isShowUpdatedAt: false,
};

const TailNumberForm = ({ tailNumberId, aircraftId, returnTo }: TTailNumberFormProps) => {
  const router = useRouter();
  const isEdit = !!tailNumberId;

  const [heroImage, setHeroImage] = useState<File | string | null>(null);
  const [heroImageSize, setHeroImageSize] = useState<number | null>(null);
  const [gallery, setGallery] = useState<TGalleryItem[]>([]);
  const [galleryError, setGalleryError] = useState('');
  // Auto-fill the slug from the tail number until the admin edits the slug by hand
  const [slugTouched, setSlugTouched] = useState(false);

  const form = useForm<TTailNumberSchemaType>({
    resolver: zodResolver(tailNumberSchema()),
    defaultValues: { ...defaultValues, aircraftId: aircraftId ?? '' },
  });
  const errors = form.formState.errors;

  const { data: details, isLoading: detailsLoading } = useTailNumberGet({
    id: tailNumberId ?? '',
  });
  // Aircraft dropdown: searched on the server (debounced) and paged on scroll
  const [aircraftSearchRaw, setAircraftSearchRaw] = useState('');
  const aircraftSearch = useDebounce(aircraftSearchRaw.trim(), 400);
  const [pickedAircraft, setPickedAircraft] = useState<TTailNumberAircraftRef | null>(null);
  const {
    data: aircraftList,
    isLoading: aircraftListLoading,
    isFetching: aircraftListFetching,
    isFetchingNextPage: aircraftListFetchingMore,
    hasNextPage: aircraftHasMore,
    fetchNextPage: fetchMoreAircraft,
  } = useAircraftInfinite({ search: aircraftSearch });
  // The pre-selected aircraft may be missing from the listing (inactive, or beyond its limit)
  const { data: lockedAircraft } = useAircraftGet({ id: !isEdit ? (aircraftId ?? '') : '' });

  // Active aircraft + the record's / pre-selected aircraft
  const aircraftOptions = useMemo<TTailNumberAircraftRef[]>(() => {
    const map = new Map<string, TTailNumberAircraftRef>();
    ((aircraftList as TEachAircraft[] | undefined) ?? []).forEach((a) =>
      map.set(a._id, { _id: a._id, title: a.title, name: a.name, slug: a.slug }),
    );
    if (details?.aircraft && !map.has(details.aircraft._id))
      map.set(details.aircraft._id, details.aircraft);
    // Keep the aircraft the admin just picked, even when a later search no longer returns it.
    // Otherwise the Autocomplete value becomes null and the typed text is wiped.
    if (pickedAircraft && !map.has(pickedAircraft._id)) map.set(pickedAircraft._id, pickedAircraft);
    if (lockedAircraft?._id && !map.has(lockedAircraft._id))
      map.set(lockedAircraft._id, {
        _id: lockedAircraft._id,
        title: lockedAircraft.title,
        name: lockedAircraft.name,
        slug: lockedAircraft.slug,
      });
    // Server already sorts A-Z by name; keep that order (no client re-sort across pages)
    return Array.from(map.values());
  }, [aircraftList, details, lockedAircraft, pickedAircraft]);

  const backToList = () => router.replace(returnTo);

  const { mutateAsync: createTail, isPending: createLoading } = useTailNumberCreate({
    optionalCallback: backToList,
    errorCallback: () => {},
  });
  const { mutateAsync: updateTail, isPending: updateLoading } = useTailNumberUpdate({
    optionalCallback: backToList,
    errorCallback: () => {},
  });
  const isSaving = createLoading || updateLoading;

  useEffect(() => {
    if (!details) return;
    form.reset({
      aircraftId: details.aircraftId ?? '',
      tailNumber: details.tailNumber ?? '',
      slug: details.slug ?? '',
      serialNumber: details.serialNumber ?? '',
      yearOfManufacture: toStr(details.yearOfManufacture),
      seats: toStr(details.seats),
      homeBase: details.homeBase ?? '',
      avionics: details.avionics ?? '',
      airframeTotalTime: details.airframeTotalTime ?? '',
      exteriorRefurbYear: toStr(details.exteriorRefurbYear),
      interiorRefurbYear: toStr(details.interiorRefurbYear),
      wifi: details.wifi === true ? 'true' : details.wifi === false ? 'false' : '',
      notes: details.notes ?? '',
      engines: details.engines ?? '',
      registrationValidThrough: details.registrationValidThrough ?? '',
      heroImage: details.heroImage || null,
      heroImageTag: details.heroImageTag ?? '',
      pageHeading: details.pageHeading ?? '',
      content: details.content ?? '',
      metaTitle: details.metaTitle ?? '',
      metaDescription: details.metaDescription ?? '',
      canonicalTag: details.canonicalTag ?? '',
      metaRobotsIndex: (details.metaRobotsIndex ?? 'index') as 'index' | 'noindex',
      metaRobotsFollow: (details.metaRobotsFollow ?? 'follow') as 'follow' | 'nofollow',
      status: details.status ?? 'Draft',
      order: toStr(details.order ?? 0),
      isShowUpdatedAt: details.isShowUpdatedAt ?? false,
    });
    setHeroImage(details.heroImage || null);
    setHeroImageSize(details.heroImageSize ?? null);
    setGallery(
      (details.galleryImages ?? []).map((g, i) => ({
        id: `existing-${i}-${g.image}`,
        image: g.image,
        tag: g.tag ?? '',
        size: g.size,
      })),
    );
    setSlugTouched(true);
  }, [form, details]);

  // One stable preview URL per selected hero (a new blob URL on every render breaks the preview)
  const heroSrc = useMemo(() => {
    if (!heroImage) return '';
    return typeof heroImage === 'string' ? mediaUrl(heroImage) : URL.createObjectURL(heroImage);
  }, [heroImage]);
  useEffect(() => {
    return () => {
      if (heroSrc.startsWith('blob:')) URL.revokeObjectURL(heroSrc);
    };
  }, [heroSrc]);

  const watchedAircraftId = form.watch('aircraftId');
  const watchedSlug = form.watch('slug');
  const watchedTail = form.watch('tailNumber');
  const selectedAircraft = aircraftOptions.find((a) => a._id === watchedAircraftId);
  const liveUrl = `${mainWebsiteUrl ?? ''}/aircraft/${selectedAircraft?.slug || '{aircraft}'}/${watchedSlug || '{tail}'}/`;

  const setHeroFile = (file: File) => {
    setHeroImage(file);
    setHeroImageSize(file.size);
    form.setValue('heroImage', file);
    form.clearErrors('heroImage');
  };

  const addGalleryFiles = (files: File[]) => {
    setGalleryError('');
    setGallery((prev) => {
      const room = MAX_GALLERY_IMAGES - prev.length;
      if (files.length > room)
        setGalleryError(`You can add up to ${MAX_GALLERY_IMAGES} gallery images.`);
      return [
        ...prev,
        ...files.slice(0, Math.max(room, 0)).map((file, i) => ({
          id: `new-${Date.now()}-${i}-${file.name}`,
          image: file,
          tag: '',
          size: file.size,
        })),
      ];
    });
  };

  const onSubmit = (data: TTailNumberSchemaType) => {
    const { heroImage: hero, ...rest } = data;
    const formData = new FormData();

    Object.entries(rest).forEach(([key, value]) => {
      if (value !== undefined && value !== null) formData.append(key, String(value));
    });

    // Hero: File → upload; string → keep current; empty → remove
    if (hero instanceof File) formData.append('heroImage', hero);
    else formData.append('heroImage', typeof hero === 'string' ? hero : '');

    // Gallery: kept images (JSON, in order) + new files with their alt texts
    const kept = gallery
      .filter((g) => typeof g.image === 'string')
      .map((g) => ({ image: g.image as string, tag: g.tag, size: g.size ?? 0 }));
    const added = gallery.filter((g) => g.image instanceof File);
    formData.append('galleryImages', JSON.stringify(kept));
    formData.append('galleryFileTags', JSON.stringify(added.map((g) => g.tag)));
    added.forEach((g) => formData.append('galleryFiles', g.image as File));

    if (tailNumberId) {
      formData.append('id', tailNumberId);
      updateTail(formData);
    } else {
      createTail(formData);
    }
  };

  if (isEdit && detailsLoading) return <PageLoader wrapperCls="page-loader-fix" />;

  const textField = (
    name: keyof TTailNumberSchemaType,
    label: string,
    placeholder: string,
    opts?: {
      multiline?: boolean;
      rows?: number;
      inputMode?: 'numeric' | 'text';
      onChangeExtra?: (value: string) => void;
    },
  ) => (
    <Controller
      control={form.control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <InputFieldCommon
          labelName={label}
          placeholder={placeholder}
          value={(value as string) ?? ''}
          onChange={(e) => {
            onChange(e);
            opts?.onChangeExtra?.(e.target.value);
          }}
          multiline={opts?.multiline}
          rows={opts?.rows}
          inputProps={opts?.inputMode ? { inputMode: opts.inputMode } : undefined}
          error={!!errors?.[name]}
          helperText={errors?.[name]?.message as string | undefined}
        />
      )}
    />
  );

  const field = (size: { xs: number; md?: number }, label: string, node: ReactElement) => (
    <Grid size={size}>
      <InputLabel sx={labelSx}>{label}</InputLabel>
      {node}
    </Grid>
  );

  return (
    <Grid container rowSpacing={3} columnSpacing={2}>
      {/* ------------------------------ Basics ------------------------------ */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>Tail Number</GroupHeading>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={labelSx}>Aircraft*</InputLabel>
        <Controller
          control={form.control}
          name="aircraftId"
          render={({ field: { onChange, value } }) => (
            <CustomAutocomplete<TTailNumberAircraftRef>
              id="tail-aircraft"
              options={aircraftOptions}
              disabled={!!aircraftId && !isEdit}
              getOptionLabel={(option) => (typeof option === 'string' ? option : aircraftLabel(option))}
              isOptionEqualToValue={(option, val) => option._id === val._id}
              labelName="Select Aircraft"
              noOptionsText="No Aircraft Found"
              loading={aircraftListLoading || aircraftListFetching || aircraftListFetchingMore}
              loadingText="Loading Aircraft..."
              // Search runs on the server, so don't filter the fetched options again in the browser
              filterOptions={(opts) => opts}
              onInputChange={(_e, val, reason) => {
                // 'input' = typing, 'clear' = cleared; ignore 'reset' (fires when a value is picked)
                if (reason === 'input' || reason === 'clear') setAircraftSearchRaw(val);
              }}
              onClose={() => setAircraftSearchRaw('')}
              slotProps={{
                listbox: {
                  // Load the next page when the list is scrolled near the bottom
                  onScroll: (e: UIEvent<HTMLElement>) => {
                    const el = e.currentTarget;
                    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 24;
                    if (nearBottom && aircraftHasMore && !aircraftListFetchingMore) {
                      fetchMoreAircraft();
                    }
                  },
                },
              }}
              value={aircraftOptions.find((a) => a._id === value) ?? null}
              onChange={(_e, selected) => {
                const picked = selected as TTailNumberAircraftRef | null;
                setPickedAircraft(picked);
                onChange(picked?._id ?? '');
              }}
              error={!!errors.aircraftId}
              helperText={errors.aircraftId?.message}
            />
          )}
        />
      </Grid>

      {field(
        { xs: 12, md: 6 },
        'Tail Number / Registration*',
        textField('tailNumber', 'Tail Number', 'e.g. N169TC', {
          onChangeExtra: (value) => {
            if (!slugTouched) form.setValue('slug', toTailSlug(value), { shouldValidate: false });
          },
        }),
      )}

      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>Slug* (lowercase, last part of the URL)</InputLabel>
        <Controller
          control={form.control}
          name="slug"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Slug"
              placeholder="e.g. n169tc"
              value={value ?? ''}
              onChange={(e) => {
                setSlugTouched(true);
                onChange(e.target.value.toLowerCase());
              }}
              error={!!errors.slug}
              helperText={errors.slug?.message ?? `Page URL: ${liveUrl}`}
            />
          )}
        />
        {slugTouched && !isEdit ? (
          <Typography
            component="button"
            type="button"
            onClick={() => {
              setSlugTouched(false);
              form.setValue('slug', toTailSlug(watchedTail), { shouldValidate: true });
            }}
            sx={{
              mt: 0.5,
              background: 'none',
              border: 0,
              p: 0,
              color: '#FFFFFF',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Generate from tail number
          </Typography>
        ) : null}
      </Grid>

      {/* ------------------------------ Facts ------------------------------ */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>Aircraft Details (only filled-in fields are shown on the page)</GroupHeading>
      </Grid>

      {field(
        { xs: 12, md: 6 },
        'Serial Number',
        textField('serialNumber', 'Serial Number', 'e.g. 4169'),
      )}
      {field(
        { xs: 12, md: 3 },
        'Year of Manufacture',
        textField('yearOfManufacture', 'Year', 'e.g. 2009', { inputMode: 'numeric' }),
      )}
      {field(
        { xs: 12, md: 3 },
        'Passengers / Seats',
        textField('seats', 'Seats', 'e.g. 14', { inputMode: 'numeric' }),
      )}
      {field(
        { xs: 12, md: 6 },
        'Engines',
        textField('engines', 'Engines', 'e.g. 2 x Honeywell HTF7000 (AS907-1-1A)'),
      )}
      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={labelSx}>Registration Valid Through</InputLabel>
        <Controller
          control={form.control}
          name="registrationValidThrough"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Registration Valid Through"
              type="date"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.registrationValidThrough}
              helperText={errors?.registrationValidThrough?.message as string | undefined}
            />
          )}
        />
      </Grid>
      {field(
        { xs: 12, md: 6 },
        'Home Base (city / airport)',
        textField('homeBase', 'Home Base', 'e.g. Teterboro, NJ (KTEB)'),
      )}
      {field(
        { xs: 12, md: 6 },
        'Avionics',
        textField('avionics', 'Avionics', 'e.g. Honeywell PlaneView'),
      )}
      {field(
        { xs: 12, md: 6 },
        'Airframe Total Time',
        textField('airframeTotalTime', 'Airframe Total Time', 'e.g. 8,450 hrs'),
      )}
      {field(
        { xs: 12, md: 3 },
        'Exterior Refurb Year',
        textField('exteriorRefurbYear', 'Exterior Refurb', 'e.g. 2021', { inputMode: 'numeric' }),
      )}
      {field(
        { xs: 12, md: 3 },
        'Interior Refurb Year',
        textField('interiorRefurbYear', 'Interior Refurb', 'e.g. 2022', { inputMode: 'numeric' }),
      )}

      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={labelSx}>Wi-Fi</InputLabel>
        <Controller
          control={form.control}
          name="wifi"
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              initialValue="Not specified"
              value={value ?? ''}
              textColor="#FFFFFF"
              onChange={(e) => onChange(e.target.value)}
              fullWidth
            >
              <MenuItem value="">Not specified</MenuItem>
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </CustomSelect>
          )}
        />
      </Grid>

      {field(
        { xs: 12 },
        'Intro Paragraph (shown right under the broker disclaimer)',
        textField('notes', 'Intro paragraph', 'e.g. N396JS is a 2014 Bombardier Challenger 300, serial number 20445, available for private charter worldwide...', {
          multiline: true,
          rows: 3,
        }),
      )}

      {/* ------------------------------ Images ------------------------------ */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>Images</GroupHeading>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ ...labelSx, fontSize: '14px', fontWeight: 500, mb: 1 }}>
          Hero Image (optional)
        </InputLabel>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', mb: 1 }}>
          Page heading image for this tail. If left empty, the aircraft class image is used, then
          the site-wide default from the Tail numbers list page.
        </Typography>
        {!heroImage ? (
          <SingleImgMainComp
            dataValueGetter={(file) => {
              if (file) setHeroFile(file as File);
            }}
            errorValueGetter={(message) => form.setError('heroImage', { message })}
          >
            <PlusIconUpload />
          </SingleImgMainComp>
        ) : (
          <ImgPreviewMainComp
            sx={{ width: '320px !important', height: '140px !important', mb: 1 }}
            src={heroSrc}
            isPreviewOnly={false}
            onDeleteHandler={(shouldDelete) => {
              if (!shouldDelete) return;
              setHeroImage(null);
              setHeroImageSize(null);
              form.setValue('heroImage', null, { shouldDirty: true });
            }}
            imageSize={heroImageSize}
          />
        )}
        {errors.heroImage ? (
          <Typography variant="body1" className="error_msg">
            {errors.heroImage.message as string}
          </Typography>
        ) : null}
      </Grid>
      {field(
        { xs: 12 },
        'Hero Image Alt Tag',
        textField('heroImageTag', 'Alt Tag', 'e.g. Private jet in flight'),
      )}

      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ ...labelSx, fontSize: '14px', fontWeight: 500, mb: 1 }}>
          Gallery (optional, up to {MAX_GALLERY_IMAGES} images)
        </InputLabel>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {gallery.map((item) => (
            <Box key={item.id} sx={{ width: '200px' }}>
              <ImgPreviewMainComp
                sx={{ width: '200px !important', height: '120px !important', mb: 1 }}
                src={
                  typeof item.image === 'string'
                    ? mediaUrl(item.image)
                    : URL.createObjectURL(item.image)
                }
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete) => {
                  if (shouldDelete) setGallery((prev) => prev.filter((g) => g.id !== item.id));
                }}
                imageSize={item.size ?? null}
              />
              <InputFieldCommon
                labelName="Alt text"
                placeholder="Alt text"
                value={item.tag}
                onChange={(e) =>
                  setGallery((prev) =>
                    prev.map((g) => (g.id === item.id ? { ...g, tag: e.target.value } : g)),
                  )
                }
              />
            </Box>
          ))}

          {gallery.length < MAX_GALLERY_IMAGES ? (
            <MultipleImgMainComp
              max={MAX_GALLERY_IMAGES - gallery.length}
              dataValueGetter={addGalleryFiles}
              errorValueGetter={setGalleryError}
            >
              <PlusIconUpload />
            </MultipleImgMainComp>
          ) : null}
        </Box>
        {galleryError ? (
          <Typography variant="body1" className="error_msg" sx={{ mt: 1 }}>
            {galleryError}
          </Typography>
        ) : null}
      </Grid>

      {/* ------------------------------ Content ------------------------------ */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>Page Content</GroupHeading>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>Page Heading (H1)</InputLabel>
        {textField(
          'pageHeading',
          'Page Heading',
          `Leave blank for "${(watchedTail || 'N169TC').toUpperCase()} ${selectedAircraft?.title ?? 'Aircraft name'}"`,
        )}
      </Grid>

      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>Content (optional)</InputLabel>
        <Controller
          control={form.control}
          name="content"
          render={({ field: { onChange, value } }) => (
            <CKEditorRichText
              placeholder="Write your content here..."
              content={value ?? ''}
              minHeight={300}
              onChange={onChange}
            />
          )}
        />
      </Grid>

      {/* ------------------------------ SEO ------------------------------ */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>SEO</GroupHeading>
      </Grid>
      {field(
        { xs: 12 },
        'Meta Title',
        textField('metaTitle', 'Meta Title', 'Enter meta title (50-60 characters recommended)'),
      )}
      {field(
        { xs: 12 },
        'Meta Description',
        textField(
          'metaDescription',
          'Meta Description',
          'Enter meta description (150-160 characters recommended)',
          { multiline: true, rows: 3 },
        ),
      )}
      {field(
        { xs: 12 },
        'Canonical URL (leave blank to use this page URL)',
        textField('canonicalTag', 'Canonical URL', liveUrl),
      )}

      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={labelSx}>Meta Robots Index</InputLabel>
        <Controller
          control={form.control}
          name="metaRobotsIndex"
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              initialValue="Select Index Directive"
              value={value ?? 'index'}
              textColor="#FFFFFF"
              onChange={(e) => onChange(e.target.value)}
              fullWidth
            >
              <MenuItem value="index">index</MenuItem>
              <MenuItem value="noindex">noindex</MenuItem>
            </CustomSelect>
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={labelSx}>Meta Robots Follow</InputLabel>
        <Controller
          control={form.control}
          name="metaRobotsFollow"
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              initialValue="Select Follow Directive"
              value={value ?? 'follow'}
              textColor="#FFFFFF"
              onChange={(e) => onChange(e.target.value)}
              fullWidth
            >
              <MenuItem value="follow">follow</MenuItem>
              <MenuItem value="nofollow">nofollow</MenuItem>
            </CustomSelect>
          )}
        />
      </Grid>

      {/* ------------------------------ Publishing ------------------------------ */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>Publishing</GroupHeading>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={labelSx}>Status</InputLabel>
        <Controller
          control={form.control}
          name="status"
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              initialValue="Select Status"
              value={value ?? 'Draft'}
              textColor="#FFFFFF"
              onChange={(e) => onChange(e.target.value)}
              fullWidth
            >
              <MenuItem value="Draft">Draft</MenuItem>
              <MenuItem value="Published">Published</MenuItem>
            </CustomSelect>
          )}
        />
      </Grid>
      {field(
        { xs: 12, md: 6 },
        'Sort Order (lower shows first)',
        textField('order', 'Sort Order', '0', { inputMode: 'numeric' }),
      )}

      <Grid size={{ xs: 12 }}>
        <Controller
          control={form.control}
          name="isShowUpdatedAt"
          render={({ field: { onChange, value } }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!value}
                  onChange={(e) => onChange(e.target.checked)}
                  sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' } }}
                />
              }
              label="Show Last Updated Date"
              sx={{ color: '#FFFFFF' }}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12 }} gap={2} display="flex">
        <CustomButtonPrimary
          variant="outlined"
          color="secondary"
          disableRipple
          disabled={isSaving}
          startIcon={<WestIcon />}
          onClick={backToList}
        >
          Back
        </CustomButtonPrimary>
        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={isSaving}
          loading={isSaving}
          onClick={form.handleSubmit(onSubmit)}
        >
          {isEdit ? 'Update' : 'Add'}
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default TailNumberForm;
