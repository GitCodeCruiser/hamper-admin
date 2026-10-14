'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import WestIcon from '@mui/icons-material/West';
import {
  Box,
  FormControlLabel,
  Grid,
  InputLabel,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  aircraftCatEditSchema,
  TAircraftCatEditSchemaType,
} from '../../validation/aircraft/index.zod';

import PageLoader from '@/@core/components/others/PageLoader';
import { mediaUrl } from '@/api/endpoints';
import { useAircraftCategoryGet, useAircraftCategoryUpdate } from '@/api/hooks/aircraft/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import { IMAGE_ASPECT_RATIO_DEFINE } from '@/constant';
import { PAGE_ROUTE } from '@/routes/index.route';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

type TAircraftCatEditFormProps = {
  slug: TSeoStaticSlug;
  aircraftCategoryId: string;
};

const AircraftCatEditForm = ({ slug, aircraftCategoryId }: TAircraftCatEditFormProps) => {
  const router = useRouter();
  const theme = useTheme();

  const [featureImage, setFeatureImage] = useState<File | string | null>(null);
  const [featureImageSize, setFeatureImageSize] = useState<number | null>(null);

  const form = useForm<TAircraftCatEditSchemaType>({
    resolver: zodResolver(aircraftCatEditSchema()),
    defaultValues: {
      title: '',
      description: '',
      tierOne: undefined,
      tierTwo: undefined,
      tierThree: undefined,
      typicalSpeed: undefined,
      // runningSpeed: undefined,
      seat: '',
      maximumSeatingCapacity: undefined,
      minimumFlightHour: undefined,
      range: '',
      baggageCapacity: '',
      maxRange: undefined,
      routeRatio: undefined,
      oneWayCustomPriceShow: {
        show: true,
        value: '',
      },
      roundTripCustomPriceShow: {
        show: true,
        value: '',
      },
      multiLegCustomPriceShow: {
        show: true,
        value: '',
      },
      hourlyRunningSpeed: {
        zeroToThree: undefined,
        threeToSix: undefined,
        sixToNine: undefined,
        ninePlus: undefined,
      },
      speedBreakDownAsDistance: {
        oneBreak: undefined,
        twoBreak: undefined,
        threeBreak: undefined,
        fourBreak: undefined,
        fiveBreak: undefined,
        sixBreak: undefined,
        sevenBreak: undefined,
        otherBreak: undefined,
      },
    },
  });

  const errors = form.formState.errors;

  const { mutateAsync: aircraftCategoryUpdate, isPending: aircraftCategoryUpdateLoading } =
    useAircraftCategoryUpdate({
      optionalCallback: () => {
        // router.replace(PAGE_ROUTE.dashboard.aircraft.categoryList);
      },
      errorCallback: () => {},
    });

  const { data: aircraftCatDetail, isLoading: aircraftCatDetailLoading } = useAircraftCategoryGet({
    id: aircraftCategoryId,
  });

  const onSubmit = (data: TAircraftCatEditSchemaType) => {
    // console.log(data, '@TEST');
    const formData = new FormData();
    if (data?.id) formData.append('id', aircraftCategoryId);
    formData.append('title', data?.title);
    if (data?.description) formData.append('description', data?.description);

    if (data?.tierOne !== undefined) formData.append('tierOne', `${data?.tierOne}`);
    if (data?.tierTwo !== undefined) formData.append('tierTwo', `${data?.tierTwo}`);
    if (data?.tierThree !== undefined) formData.append('tierThree', `${data?.tierThree}`);
    if (data?.typicalSpeed !== undefined) formData.append('typicalSpeed', `${data?.typicalSpeed}`);
    // if (data?.runningSpeed !== undefined) formData.append('runningSpeed', `${data?.runningSpeed}`);

    if (data?.seat) formData.append('seat', data?.seat);
    if (data?.maximumSeatingCapacity !== undefined)
      formData.append('maximumSeatingCapacity', `${data?.maximumSeatingCapacity}`);
    if (data?.minimumFlightHour !== undefined)
      formData.append('minimumFlightHour', `${data?.minimumFlightHour}`);
    if (data?.range) formData.append('range', data?.range);
    if (data?.baggageCapacity) formData.append('baggageCapacity', data?.baggageCapacity);
    if (data?.maxRange !== undefined) formData.append('maxRange', `${data?.maxRange}`);
    if (data?.routeRatio !== undefined) formData.append('routeRatio', `${data?.routeRatio}`);
    if (data?.oneWayCustomPriceShow)
      formData.append('oneWayCustomPriceShow', JSON.stringify(data?.oneWayCustomPriceShow));
    if (data?.roundTripCustomPriceShow)
      formData.append('roundTripCustomPriceShow', JSON.stringify(data?.roundTripCustomPriceShow));
    if (data?.multiLegCustomPriceShow)
      formData.append('multiLegCustomPriceShow', JSON.stringify(data?.multiLegCustomPriceShow));
    if (data?.hourlyRunningSpeed)
      formData.append('hourlyRunningSpeed', JSON.stringify(data?.hourlyRunningSpeed));
    if (data?.speedBreakDownAsDistance)
      formData.append('speedBreakDownAsDistance', JSON.stringify(data?.speedBreakDownAsDistance));

    if (data?.featureImage) formData.append('featureImage', data?.featureImage);

    aircraftCategoryUpdate(formData);
  };

  useEffect(() => {
    if (aircraftCatDetail) {
      form.reset({
        id: aircraftCategoryId,
        title: aircraftCatDetail?.title ?? '',
        description: aircraftCatDetail?.description ?? '',
        tierOne: aircraftCatDetail?.tierOne ?? undefined,
        tierTwo: aircraftCatDetail?.tierTwo ?? undefined,
        tierThree: aircraftCatDetail?.tierThree ?? undefined,
        typicalSpeed: aircraftCatDetail?.typicalSpeed ?? undefined,
        runningSpeed: aircraftCatDetail?.runningSpeed ?? undefined,
        seat: aircraftCatDetail?.seat ?? '',
        maximumSeatingCapacity: aircraftCatDetail?.maximumSeatingCapacity ?? undefined,
        minimumFlightHour: aircraftCatDetail?.minimumFlightHour ?? undefined,
        range: aircraftCatDetail?.range ?? '',
        baggageCapacity: aircraftCatDetail?.baggageCapacity ?? '',
        maxRange: aircraftCatDetail?.maxRange ?? undefined,
        routeRatio: aircraftCatDetail?.routeRatio ?? undefined,
        oneWayCustomPriceShow: {
          show: aircraftCatDetail?.oneWayCustomPriceShow?.show ?? true,
          value: aircraftCatDetail?.oneWayCustomPriceShow?.value ?? '',
        },
        roundTripCustomPriceShow: {
          show: aircraftCatDetail?.roundTripCustomPriceShow?.show ?? true,
          value: aircraftCatDetail?.roundTripCustomPriceShow?.value ?? '',
        },
        multiLegCustomPriceShow: {
          show: aircraftCatDetail?.multiLegCustomPriceShow?.show ?? true,
          value: aircraftCatDetail?.multiLegCustomPriceShow?.value ?? '',
        },
        hourlyRunningSpeed: {
          zeroToThree: aircraftCatDetail?.hourlyRunningSpeed?.zeroToThree ?? undefined,
          threeToSix: aircraftCatDetail?.hourlyRunningSpeed?.threeToSix ?? undefined,
          sixToNine: aircraftCatDetail?.hourlyRunningSpeed?.sixToNine ?? undefined,
          ninePlus: aircraftCatDetail?.hourlyRunningSpeed?.ninePlus ?? undefined,
        },
        speedBreakDownAsDistance: {
          oneBreak: aircraftCatDetail?.speedBreakDownAsDistance?.oneBreak ?? undefined,
          twoBreak: aircraftCatDetail?.speedBreakDownAsDistance?.twoBreak ?? undefined,
          threeBreak: aircraftCatDetail?.speedBreakDownAsDistance?.threeBreak ?? undefined,
          fourBreak: aircraftCatDetail?.speedBreakDownAsDistance?.fourBreak ?? undefined,
          fiveBreak: aircraftCatDetail?.speedBreakDownAsDistance?.fiveBreak ?? undefined,
          sixBreak: aircraftCatDetail?.speedBreakDownAsDistance?.sixBreak ?? undefined,
          sevenBreak: aircraftCatDetail?.speedBreakDownAsDistance?.sevenBreak ?? undefined,
          otherBreak: aircraftCatDetail?.speedBreakDownAsDistance?.otherBreak ?? undefined,
        },
        ...(aircraftCatDetail?.featureImage && aircraftCatDetail?.featureImage?.length > 0
          ? { featureImage: aircraftCatDetail?.featureImage ?? '' }
          : {}),
      });
      setFeatureImage(() =>
        aircraftCatDetail?.featureImage && aircraftCatDetail?.featureImage?.length > 0
          ? aircraftCatDetail?.featureImage
          : null,
      );
      setFeatureImageSize(aircraftCatDetail?.featureImageSize ?? null);
    }

    return () => {};
  }, [
    form.reset,
    aircraftCatDetail?.title,
    aircraftCatDetail?.description,
    aircraftCatDetail?.tierOne,
    aircraftCatDetail?.tierTwo,
    aircraftCatDetail?.tierThree,
    aircraftCatDetail?.typicalSpeed,
    aircraftCatDetail?.runningSpeed,
    aircraftCatDetail?.seat,
    aircraftCatDetail?.maximumSeatingCapacity,
    aircraftCatDetail?.minimumFlightHour,
    aircraftCatDetail?.range,
    aircraftCatDetail?.baggageCapacity,
    aircraftCatDetail?.maxRange,
    aircraftCatDetail?.routeRatio,
    aircraftCatDetail?.oneWayCustomPriceShow?.show,
    aircraftCatDetail?.oneWayCustomPriceShow?.value,
    aircraftCatDetail?.roundTripCustomPriceShow?.show,
    aircraftCatDetail?.roundTripCustomPriceShow?.value,
    aircraftCatDetail?.multiLegCustomPriceShow?.show,
    aircraftCatDetail?.multiLegCustomPriceShow?.value,
    aircraftCatDetail?.hourlyRunningSpeed?.zeroToThree,
    aircraftCatDetail?.hourlyRunningSpeed?.threeToSix,
    aircraftCatDetail?.hourlyRunningSpeed?.sixToNine,
    aircraftCatDetail?.hourlyRunningSpeed?.ninePlus,
    aircraftCatDetail?.speedBreakDownAsDistance?.oneBreak,
    aircraftCatDetail?.speedBreakDownAsDistance?.twoBreak,
    aircraftCatDetail?.speedBreakDownAsDistance?.threeBreak,
    aircraftCatDetail?.speedBreakDownAsDistance?.fourBreak,
    aircraftCatDetail?.speedBreakDownAsDistance?.fiveBreak,
    aircraftCatDetail?.speedBreakDownAsDistance?.sixBreak,
    aircraftCatDetail?.speedBreakDownAsDistance?.sevenBreak,
    aircraftCatDetail?.speedBreakDownAsDistance?.otherBreak,
    aircraftCatDetail?.featureImage,
    aircraftCatDetail?.featureImageSize,
    setFeatureImageSize,
  ]);

  if (aircraftCatDetailLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  return (
    <Grid container rowSpacing={3}>
      {/* Title */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Aircraft Category*</InputLabel>
        <Controller
          control={form.control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Aircraft category title"
              placeholder="Enter aircraft category title"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.title}
              helperText={errors?.title?.message}
            />
          )}
        />
      </Grid>

      {/* Description */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Description</InputLabel>
        <Controller
          control={form.control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Description"
              placeholder="Enter description"
              multiline
              rows={2}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.description}
              helperText={errors?.description?.message}
            />
          )}
        />
      </Grid>

      {/* ── Pricing Tiers ──────────────────────────────────────── */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
          Pricing Tiers
        </InputLabel>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Tier One*</InputLabel>
        <Controller
          control={form.control}
          name="tierOne"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Tier One"
              placeholder="Enter tier one price"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.tierOne}
              helperText={errors?.tierOne?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Tier Two*</InputLabel>
        <Controller
          control={form.control}
          name="tierTwo"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Tier Two"
              placeholder="Enter tier two price"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.tierTwo}
              helperText={errors?.tierTwo?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Tier Three*</InputLabel>
        <Controller
          control={form.control}
          name="tierThree"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Tier Three"
              placeholder="Enter tier three price"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.tierThree}
              helperText={errors?.tierThree?.message}
            />
          )}
        />
      </Grid>

      {/* ── Specifications ─────────────────────────────────────── */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
          Specifications
        </InputLabel>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Typical Speed (ktas)*</InputLabel>
        <Controller
          control={form.control}
          name="typicalSpeed"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Typical Speed"
              placeholder="e.g. 850"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.typicalSpeed}
              helperText={errors?.typicalSpeed?.message}
            />
          )}
        />
      </Grid>

      {/* <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Running Speed (ktas)*</InputLabel>
        <Controller
          control={form.control}
          name="runningSpeed"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Running Speed"
              placeholder="e.g. 850"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.runningSpeed}
              helperText={errors?.runningSpeed?.message}
            />
          )}
        />
      </Grid> */}

      <Grid size={{ xs: 12, md: 3 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Seat*</InputLabel>
        <Controller
          control={form.control}
          name="seat"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Seat"
              placeholder="e.g. 8–12 passengers"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.seat}
              helperText={errors?.seat?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Max Seat*</InputLabel>
        <Controller
          control={form.control}
          name="maximumSeatingCapacity"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Max Seat"
              placeholder="e.g. 12"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.maximumSeatingCapacity}
              helperText={errors?.maximumSeatingCapacity?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Min Flight Hours*</InputLabel>
        <Controller
          control={form.control}
          name="minimumFlightHour"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Min Flight Hours"
              placeholder="e.g. 2"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.minimumFlightHour}
              helperText={errors?.minimumFlightHour?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Baggage Capacity*</InputLabel>
        <Controller
          control={form.control}
          name="baggageCapacity"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Baggage Capacity"
              placeholder="e.g. 50 cu ft"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.baggageCapacity}
              helperText={errors?.baggageCapacity?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Range*</InputLabel>
        <Controller
          control={form.control}
          name="range"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Range"
              placeholder="e.g. 4,000 nm"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.range}
              helperText={errors?.range?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Max Range*</InputLabel>
        <Controller
          control={form.control}
          name="maxRange"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Max Range"
              placeholder="e.g. 4000"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.maxRange}
              helperText={errors?.maxRange?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Route Ratio*</InputLabel>
        <Controller
          control={form.control}
          name="routeRatio"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Route Ratio"
              placeholder="e.g. 1.15"
              type="number"
              inputProps={{ min: 0, step: 'any' }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.routeRatio}
              helperText={errors?.routeRatio?.message}
            />
          )}
        />
      </Grid>

      {/* ── Hourly Running Speed ────────────────────────────────── */}
      {/* <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
          Hourly Running Speed (ktas)*
        </InputLabel>
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>0–3 Hours</InputLabel>
        <Controller
          control={form.control}
          name="hourlyRunningSpeed.zeroToThree"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="0–3 Hours"
              placeholder="e.g. 500"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.hourlyRunningSpeed?.zeroToThree}
              helperText={errors?.hourlyRunningSpeed?.zeroToThree?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>3–6 Hours</InputLabel>
        <Controller
          control={form.control}
          name="hourlyRunningSpeed.threeToSix"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="3–6 Hours"
              placeholder="e.g. 480"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.hourlyRunningSpeed?.threeToSix}
              helperText={errors?.hourlyRunningSpeed?.threeToSix?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>6–9 Hours</InputLabel>
        <Controller
          control={form.control}
          name="hourlyRunningSpeed.sixToNine"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="6–9 Hours"
              placeholder="e.g. 460"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.hourlyRunningSpeed?.sixToNine}
              helperText={errors?.hourlyRunningSpeed?.sixToNine?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>9+ Hours</InputLabel>
        <Controller
          control={form.control}
          name="hourlyRunningSpeed.ninePlus"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="9+ Hours"
              placeholder="e.g. 440"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.hourlyRunningSpeed?.ninePlus}
              helperText={errors?.hourlyRunningSpeed?.ninePlus?.message}
            />
          )}
        />
      </Grid> */}

      {/* ── Speed Breakdown As Distance ────────────────────────── */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
          Speed Breakdown As Distance (ktas)*
        </InputLabel>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>0–300nm (ktas)</InputLabel>
        <Controller
          control={form.control}
          name="speedBreakDownAsDistance.oneBreak"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="0–300nm (ktas)"
              placeholder="e.g. 500"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.speedBreakDownAsDistance?.oneBreak}
              helperText={errors?.speedBreakDownAsDistance?.oneBreak?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>300 - 600 nm (ktas)*</InputLabel>
        <Controller
          control={form.control}
          name="speedBreakDownAsDistance.twoBreak"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="300 - 600 nm (ktas)"
              placeholder="e.g. 480"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.speedBreakDownAsDistance?.twoBreak}
              helperText={errors?.speedBreakDownAsDistance?.twoBreak?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>600 - 900 nm (ktas)*</InputLabel>
        <Controller
          control={form.control}
          name="speedBreakDownAsDistance.threeBreak"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="600 - 900 nm (ktas)"
              placeholder="e.g. 460"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.speedBreakDownAsDistance?.threeBreak}
              helperText={errors?.speedBreakDownAsDistance?.threeBreak?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>900 - 1200 nm (ktas)*</InputLabel>
        <Controller
          control={form.control}
          name="speedBreakDownAsDistance.fourBreak"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="900 - 1200 nm (ktas)"
              placeholder="e.g. 440"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.speedBreakDownAsDistance?.fourBreak}
              helperText={errors?.speedBreakDownAsDistance?.fourBreak?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>1200 - 2400 nm (ktas)*</InputLabel>
        <Controller
          control={form.control}
          name="speedBreakDownAsDistance.fiveBreak"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="1200 - 2400 nm (ktas)"
              placeholder="e.g. 420"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.speedBreakDownAsDistance?.fiveBreak}
              helperText={errors?.speedBreakDownAsDistance?.fiveBreak?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>2400 - 3600 nm (ktas)*</InputLabel>
        <Controller
          control={form.control}
          name="speedBreakDownAsDistance.sixBreak"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="2400 - 3600 nm (ktas)"
              placeholder="e.g. 400"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.speedBreakDownAsDistance?.sixBreak}
              helperText={errors?.speedBreakDownAsDistance?.sixBreak?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>3600 - 5200 nm (ktas)*</InputLabel>
        <Controller
          control={form.control}
          name="speedBreakDownAsDistance.sevenBreak"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="3600 - 5200 nm (ktas)"
              placeholder="e.g. 450"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.speedBreakDownAsDistance?.sevenBreak}
              helperText={errors?.speedBreakDownAsDistance?.sevenBreak?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>5,200+ nm (ktas)*</InputLabel>
        <Controller
          control={form.control}
          name="speedBreakDownAsDistance.otherBreak"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="5,200+"
              placeholder="e.g. 380"
              type="number"
              inputProps={{ min: 0 }}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.speedBreakDownAsDistance?.otherBreak}
              helperText={errors?.speedBreakDownAsDistance?.otherBreak?.message}
            />
          )}
        />
      </Grid>

      {/* ── Graph Options ──────────────────────────────────────── */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1.5, fontSize: '0.9rem' }}>
          Custom Pricing Configuration
        </InputLabel>

        <Typography variant="body2" sx={{ color: '#ffffffff', fontWeight: 400, mb: 1.5 }}>
          Configure custom pricing to be displayed instead of graph-tier pricing.
        </Typography>

        <Box
          sx={{
            p: { xs: 2, sm: 2.5, md: 3 },
            borderRadius: '12px',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <Grid container spacing={2.5}>
            {/* One Way Graph */}
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pb: 1.5,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <Typography sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.95rem' }}>
                    One Way Custom Pricing
                  </Typography>
                  <Controller
                    control={form.control}
                    name="oneWayCustomPriceShow.show"
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        sx={{ m: 0 }}
                        control={
                          <Switch
                            checked={Boolean(value)}
                            onChange={(e) => onChange(e.target.checked)}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#D4AF37',
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#D4AF37 !important',
                              },
                              '& .MuiSwitch-track': {
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                              },
                            }}
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              color: value ? '#D4AF37' : 'rgba(255, 255, 255, 0.6)',
                              fontSize: '0.8rem',
                              fontWeight: 500,
                              minWidth: '55px',
                            }}
                          >
                            {value ? 'Showing' : 'Hidden'}
                          </Typography>
                        }
                        labelPlacement="start"
                      />
                    )}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <InputLabel sx={{ color: '#FFFFFF', mb: 0.5, fontSize: '0.85rem' }}>
                    Custom Pricing Showing Description
                  </InputLabel>
                  <Controller
                    control={form.control}
                    name="oneWayCustomPriceShow.value"
                    render={({ field: { onChange, value } }) => (
                      <InputFieldCommon
                        labelName="Custom Pricing Showing Description"
                        placeholder="Enter description to display when custom pricing is available"
                        multiline
                        minRows={1}
                        sx={{
                          '& textarea.MuiInputBase-input': {
                            minHeight: '36px !important',
                          },
                        }}
                        value={value ?? ''}
                        onChange={onChange}
                        error={!!errors?.oneWayCustomPriceShow?.value}
                        helperText={errors?.oneWayCustomPriceShow?.value?.message}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Grid>

            {/* Round Trip Graph */}
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pb: 1.5,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <Typography sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.95rem' }}>
                    Round Trip Custom Pricing
                  </Typography>
                  <Controller
                    control={form.control}
                    name="roundTripCustomPriceShow.show"
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        sx={{ m: 0 }}
                        control={
                          <Switch
                            checked={Boolean(value)}
                            onChange={(e) => onChange(e.target.checked)}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#D4AF37',
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#D4AF37 !important',
                              },
                              '& .MuiSwitch-track': {
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                              },
                            }}
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              color: value ? '#D4AF37' : 'rgba(255, 255, 255, 0.6)',
                              fontSize: '0.8rem',
                              fontWeight: 500,
                              minWidth: '55px',
                            }}
                          >
                            {value ? 'Showing' : 'Hidden'}
                          </Typography>
                        }
                        labelPlacement="start"
                      />
                    )}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <InputLabel sx={{ color: '#FFFFFF', mb: 0.5, fontSize: '0.85rem' }}>
                    Custom Pricing Showing Description
                  </InputLabel>
                  <Controller
                    control={form.control}
                    name="roundTripCustomPriceShow.value"
                    render={({ field: { onChange, value } }) => (
                      <InputFieldCommon
                        labelName="Custom Pricing Showing Description"
                        placeholder="Enter description to display when custom pricing is available"
                        multiline
                        minRows={1}
                        sx={{
                          '& textarea.MuiInputBase-input': {
                            minHeight: '36px !important',
                          },
                        }}
                        value={value ?? ''}
                        onChange={onChange}
                        error={!!errors?.roundTripCustomPriceShow?.value}
                        helperText={errors?.roundTripCustomPriceShow?.value?.message}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Grid>

            {/* Multi Leg Graph */}
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pb: 1.5,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <Typography sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.95rem' }}>
                    Multi Leg Custom Pricing
                  </Typography>
                  <Controller
                    control={form.control}
                    name="multiLegCustomPriceShow.show"
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        sx={{ m: 0 }}
                        control={
                          <Switch
                            checked={Boolean(value)}
                            onChange={(e) => onChange(e.target.checked)}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#D4AF37',
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#D4AF37 !important',
                              },
                              '& .MuiSwitch-track': {
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                              },
                            }}
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              color: value ? '#D4AF37' : 'rgba(255, 255, 255, 0.6)',
                              fontSize: '0.8rem',
                              fontWeight: 500,
                              minWidth: '55px',
                            }}
                          >
                            {value ? 'Showing' : 'Hidden'}
                          </Typography>
                        }
                        labelPlacement="start"
                      />
                    )}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <InputLabel sx={{ color: '#FFFFFF', mb: 0.5, fontSize: '0.85rem' }}>
                    Custom Pricing Showing Description
                  </InputLabel>
                  <Controller
                    control={form.control}
                    name="multiLegCustomPriceShow.value"
                    render={({ field: { onChange, value } }) => (
                      <InputFieldCommon
                        labelName="Custom Pricing Showing Description"
                        placeholder="Enter description to display when custom pricing is available"
                        multiline
                        minRows={1}
                        sx={{
                          '& textarea.MuiInputBase-input': {
                            minHeight: '36px !important',
                          },
                        }}
                        value={value ?? ''}
                        onChange={onChange}
                        error={!!errors?.multiLegCustomPriceShow?.value}
                        helperText={errors?.multiLegCustomPriceShow?.value?.message}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* FeatureImage Image Upload */}
      <Grid size={{ xs: 12 }}>
        <Box>
          <InputLabel
            sx={{
              color: theme.palette.common.white,
              fontSize: '14px',
              fontWeight: 500,
              mb: 1,
            }}
          >
            Feature Image*
          </InputLabel>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            {featureImage === null ? (
              <SingleImgMainComp
                needCrop={true}
                aspectRatio={IMAGE_ASPECT_RATIO_DEFINE.featureImage}
                dataValueGetter={(value: any) => {
                  // console.log(value, '@TEST');

                  if (value) {
                    setFeatureImage(() => value);
                    setFeatureImageSize(() => value.size);

                    form.setValue('featureImage', value as File);
                    form.clearErrors('featureImage');
                  }
                }}
                errorValueGetter={(errorMessage: string) => {
                  setFeatureImageSize(() => null);
                  form.setError('featureImage', { message: errorMessage });
                }}
              >
                <PlusIconUpload />
              </SingleImgMainComp>
            ) : (
              <ImgPreviewMainComp
                sx={{
                  width: '103px !important',
                  height: '103px !important',
                  marginBottom: '10px',
                }}
                src={
                  typeof featureImage === 'string'
                    ? mediaUrl(featureImage)
                    : URL?.createObjectURL(featureImage)
                }
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete: boolean) => {
                  if (shouldDelete) {
                    setFeatureImage(() => null);
                    setFeatureImageSize(() => null);
                    form.setValue('featureImage', undefined as unknown as File);
                  }
                }}
                imageSize={featureImageSize}
              />
            )}
          </Box>

          {errors.featureImage ? (
            <Typography variant="body1" className="error_msg">
              {errors?.featureImage.message as string}
            </Typography>
          ) : null}
        </Box>
      </Grid>

      <Grid size={{ xs: 12 }} gap={2} display="flex">
        <CustomButtonPrimary
          variant="outlined"
          color="secondary"
          disableRipple
          disabled={aircraftCatDetailLoading}
          startIcon={<WestIcon />}
          onClick={() => {
            router.replace(PAGE_ROUTE.dashboard.availableAircraft.categoryList);
          }}
        >
          Back
        </CustomButtonPrimary>

        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={aircraftCategoryUpdateLoading}
          loading={aircraftCategoryUpdateLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Update
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default AircraftCatEditForm;
