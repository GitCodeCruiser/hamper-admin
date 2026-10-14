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
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { aircraftEditSchema, TAircraftEditSchemaType } from '../../validation/aircraft/index.zod';

import { AircraftGroupHeading } from './AircraftAddForm';
import SlidingImageItemRow from './SlidingImageItemRow';

import PageLoader from '@/@core/components/others/PageLoader';
import { mediaUrl } from '@/api/endpoints';
import {
  useAircraftCategoryListing,
  useAircraftGet,
  useAircraftUpdate,
} from '@/api/hooks/aircraft/hooks';
import ImageCropperModal from '@/components/Other/ImgMainComp/ImageCropperModal';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import MultipleImgMainComp from '@/components/Other/ImgMainComp/MultipleImgMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import {
  DEFAULT_BANNERS,
  DEFAULT_OG_IMAGES,
  DEFAULT_THUMBNAILS,
  IMAGE_ASPECT_RATIO_DEFINE,
} from '@/constant';
import { handleAmountKeys } from '@/lib/functions/validation';
import { GroupHeading } from '@/module/seo/components/SeoCompForm';
import { PAGE_ROUTE } from '@/routes/index.route';
import { TSlidingImageFormItem } from '@/types/apps/aircraft/index.type';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

// Label defaults
const metaTitleLabel = 'Meta Title';
const metaTitlePlaceholder = 'Enter meta title (50-60 characters recommended)';
const metaDescriptionLabel = 'Meta Description';
const metaDescriptionPlaceholder = 'Enter meta description (150-160 characters recommended)';
const metaKeywordsLabel = 'Meta Keywords';
const metaKeywordsPlaceholder = 'Enter meta keywords (comma separated)';
// const slugLabel = 'Slug';
// const slugPlaceholder = 'e.g. about-us';
const canonicalUrlLabel = 'Canonical URL';
const canonicalUrlPlaceholder = 'Enter canonical URL';
const ogTitleLabel = 'OG Title';
const ogTitlePlaceholder = 'Enter Open Graph title';
const ogDescriptionLabel = 'OG Description';
const ogDescriptionPlaceholder = 'Enter Open Graph description';
const ogImageLabel = 'OG Image';
const schemaLabel = 'Schema (JSON-LD)';
const schemaPlaceholder = '{"@context":"https://schema.org",...}';

type TAircraftEditFormProps = {
  aircraftId: string;
};

const AircraftEditForm = ({ aircraftId }: TAircraftEditFormProps) => {
  const router = useRouter();
  const theme = useTheme();

  const [bannerImage, setBannerImage] = useState<File | string | null>(null);
  const [thumbnailImage, setThumbnailImage] = useState<File | string | null>(null);
  const [featureImage, setFeatureImage] = useState<File | string | null>(null);
  const [salesFeatureImage, setSalesFeatureImage] = useState<File | string | null>(null);
  const [seoOgImage, setSeoOgImage] = useState<File | string | null>(null);
  const [slidingImagesData, setSlidingImagesData] = useState<TSlidingImageFormItem[]>([]);
  const slidingImagesDataRef = useRef<TSlidingImageFormItem[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  // Cropper state for sliding images
  const [slidingCropperOpen, setSlidingCropperOpen] = useState(false);
  const [slidingCropQueue, setSlidingCropQueue] = useState<File[]>([]);
  const slidingCropQueueRef = useRef<File[]>([]);
  const [currentSlidingCropImage, setCurrentSlidingCropImage] = useState<string | null>(null);
  const [currentSlidingCropFileName, setCurrentSlidingCropFileName] = useState<string>('');
  const slidingCropCompleteGuardRef = useRef(false);

  const [bannerImageSize, setBannerImageSize] = useState<number | null>(null);
  const [thumbnailImageSize, setThumbnailImageSize] = useState<number | null>(null);
  const [openGraphImageSize, setOpenGraphImageSize] = useState<number | null>(null);
  const [featureImageSize, setFeatureImageSize] = useState<number | null>(null);
  const [salesFeatureImageSize, setSalesFeatureImageSize] = useState<number | null>(null);

  const form = useForm<TAircraftEditSchemaType>({
    resolver: zodResolver(aircraftEditSchema()),
    defaultValues: {
      id: aircraftId,
      categoryId: '',
      slug: '',
      cabinDimensionsHeight: 0,
      cabinDimensionsLength: 0,
      cabinDimensionsWidth: 0,
      // cabinPressureMax: 0,
      // cabinPressureMin: 0,
      cabinPressureAltitude: '',
      cabinNoise: 0,
      charterRatePerHrMax: 0,
      charterRatePerHrMin: 0,
      climbRate: 0,
      cruiseSpeed: 0,
      // landingDistance: 0,
      manufacturer: '',
      maxPassengers: '',
      range: 0,
      serviceCeiling: 0,
      takeoffDistance: 0,
      yomRangeEndDate: '',
      yomRangeStartDate: '',
      baggageCapacity: 0,
      title: '',
      aircraftName: '',
      description: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      canonicalTag: '',
      openGraphTitle: '',
      openGraphDescription: '',
      structuredData: '',
      slidingImages: [],
      slidingImagesData: [],
      bannerImageTag: '',
      thumbnailImageTag: '',
      redirectUrl: '',
      metaRobotsIndex: 'noindex' as const,
      metaRobotsFollow: 'nofollow' as const,
      isShowUpdatedAt: false,
    },
  });

  const errors = form.formState.errors;

  const { mutateAsync: aircraftUpdate, isPending: aircraftUpdateLoading } = useAircraftUpdate({
    optionalCallback: () => {
      // router.replace(PAGE_ROUTE.dashboard.aircraft.list);
    },
    errorCallback: () => {},
  });

  const { data: aircraftDetail, isLoading: aircraftDetailLoading } = useAircraftGet({
    id: aircraftId,
  });

  // Process the sliding crop queue — open the cropper for the next file
  const processNextSlidingCrop = useCallback((queue: File[]) => {
    if (queue.length === 0) {
      setSlidingCropperOpen(false);
      setCurrentSlidingCropImage(null);
      slidingCropQueueRef.current = [];
      setSlidingCropQueue([]);
      return;
    }

    const nextFile = queue[0];
    setCurrentSlidingCropFileName(nextFile.name);
    const reader = new FileReader();
    reader.onload = () => {
      setCurrentSlidingCropImage(reader.result as string);
      setSlidingCropperOpen(true);
    };
    reader.readAsDataURL(nextFile);
  }, []);

  // Handle files selected from MultipleImgMainComp
  const handleSlidingFilesSelected = useCallback(
    (selectedFiles: File[]) => {
      if (selectedFiles && selectedFiles.length > 0) {
        slidingCropQueueRef.current = selectedFiles;
        setSlidingCropQueue(selectedFiles);
        processNextSlidingCrop(selectedFiles);
      }
    },
    [processNextSlidingCrop],
  );

  // Handle a completed sliding crop
  const handleSlidingCropComplete = useCallback(
    (croppedFile: File) => {
      if (slidingCropCompleteGuardRef.current) return;
      slidingCropCompleteGuardRef.current = true;
      setTimeout(() => {
        slidingCropCompleteGuardRef.current = false;
      }, 0);

      const newItem: TSlidingImageFormItem = {
        id: `${croppedFile.name}-${croppedFile.size}-${Date.now()}`,
        image: croppedFile,
        size: croppedFile.size,
        tag: '',
        previewUrl: URL.createObjectURL(croppedFile),
      };
      setSlidingImagesData((prev) => {
        const updated = [...prev, newItem];
        slidingImagesDataRef.current = updated;
        form.setValue('slidingImagesData', updated, { shouldValidate: false });
        form.setValue(
          'slidingImages',
          updated.map((it) => it.image),
          { shouldValidate: false },
        );
        form.clearErrors('slidingImages');
        form.clearErrors('slidingImagesData');
        return updated;
      });

      // Move to the next file in the queue
      const remaining = slidingCropQueueRef.current.slice(1);
      slidingCropQueueRef.current = remaining;
      setSlidingCropQueue(remaining);
      processNextSlidingCrop(remaining);
    },
    [form, processNextSlidingCrop],
  );

  // Handle cropper close (skip current file)
  const handleSlidingCropperClose = useCallback(() => {
    setSlidingCropperOpen(false);
    setCurrentSlidingCropImage(null);

    // Move to the next file in the queue
    const remaining = slidingCropQueueRef.current.slice(1);
    slidingCropQueueRef.current = remaining;
    setSlidingCropQueue(remaining);
    if (remaining.length > 0) {
      processNextSlidingCrop(remaining);
    }
  }, [processNextSlidingCrop]);

  const handleRemoveSlidingImage = useCallback(
    (index: number) => {
      const deletedItem = slidingImagesDataRef.current[index];
      if (deletedItem && typeof deletedItem.image === 'string') {
        setDeletedImages((prev) => [...prev, deletedItem.image as string]);
      }
      setSlidingImagesData((prev) => {
        const updated = prev.filter((_, i) => i !== index);
        slidingImagesDataRef.current = updated;
        form.setValue('slidingImagesData', updated, { shouldValidate: false });
        form.setValue(
          'slidingImages',
          updated.map((imgItem) => imgItem.image),
          { shouldValidate: false },
        );
        return updated;
      });
    },
    [form],
  );

  const handleSlidingImageTagChange = useCallback(
    (index: number, newTag: string) => {
      if (slidingImagesDataRef.current[index]) {
        slidingImagesDataRef.current[index].tag = newTag;
      }
      form.setValue('slidingImagesData', slidingImagesDataRef.current, { shouldValidate: false });
    },
    [form],
  );

  const handleSelectDefaultBanner = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.split('/').pop() || 'banner.png';
      const file = new File([blob], filename, { type: blob.type });

      setBannerImage(() => file);
      setBannerImageSize(() => file.size);
      form.setValue('bannerImage', file);
      form.clearErrors('bannerImage');
    } catch (error) {
      console.error('Error setting default banner image:', error);
    }
  };

  const handleSelectDefaultThumbnail = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.split('/').pop() || 'thumbnail.png';
      const file = new File([blob], filename, { type: blob.type });

      setThumbnailImage(() => file);
      setThumbnailImageSize(() => file.size);
      form.setValue('thumbnailImage', file);
      form.clearErrors('thumbnailImage');
    } catch (error) {
      console.error('Error setting default thumbnail image:', error);
    }
  };

  const handleSelectDefaultOgImage = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.split('/').pop() || 'ogImage.png';
      const file = new File([blob], filename, { type: blob.type });

      setSeoOgImage(() => file);
      setOpenGraphImageSize(() => file.size);
      form.setValue('openGraphImage', file);
      form.clearErrors('openGraphImage');
    } catch (error) {
      console.error('Error setting default OG image:', error);
    }
  };

  const onSubmit = (data: TAircraftEditSchemaType) => {
    // console.log(data, '@TEST');

    const formData = new FormData();
    formData.append('id', aircraftId);
    formData.append('categoryId', data?.categoryId);
    formData.append('title', data?.title);
    formData.append('name', data?.aircraftName);
    // formData.append('description', data?.description);
    formData.append('slug', data?.slug);
    formData.append('bannerImage', data?.bannerImage);
    formData.append('thumbnailImage', data?.thumbnailImage);
    formData.append('featureImage', data?.featureImage);
    formData.append('salesFeatureImage', data?.salesFeatureImage);
    formData.append('bannerImageTag', data?.bannerImageTag ?? '');
    formData.append('thumbnailImageTag', data?.thumbnailImageTag ?? '');

    //
    formData.append('manufacturer', data?.manufacturer);
    formData.append(
      'yomRange',
      JSON.stringify({ start: data?.yomRangeStartDate, end: data?.yomRangeEndDate }),
    );

    formData.append('range', `${data?.range}`);
    formData.append('cruiseSpeed', `${data?.cruiseSpeed}`);
    formData.append('maxPassengers', `${data?.maxPassengers}`);

    formData.append('baggageCapacity', `${data?.baggageCapacity}`);
    formData.append('cabinNoise', `${data?.cabinNoise}`);
    formData.append('takeoffDistance', `${data?.takeoffDistance}`);
    // formData.append('landingDistance', `${data?.landingDistance}`);
    formData.append('serviceCeiling', `${data?.serviceCeiling}`);
    formData.append('climbRate', `${data?.climbRate}`);

    // --------------------------
    formData.append(
      'cabinDimensions',
      JSON.stringify({
        height: data?.cabinDimensionsHeight,
        width: data?.cabinDimensionsWidth,
        length: data?.cabinDimensionsLength,
      }),
    );

    // formData.append(
    //   'cabinPressure',
    //   JSON.stringify({ min: data?.cabinPressureMin, max: data?.cabinPressureMax }),
    // );
    formData.append('cabinPressureAltitude', `${data?.cabinPressureAltitude}`);

    formData.append(
      'charterRatePerHr',
      JSON.stringify({ min: data?.charterRatePerHrMin, max: data?.charterRatePerHrMax }),
    );

    //
    formData.append('metaTitle', data?.metaTitle);
    formData.append('metaDescription', data?.metaDescription);
    formData.append('metaKeywords', data?.metaKeywords);
    formData.append('canonicalTag', data?.canonicalTag);
    formData.append('openGraphTitle', data?.openGraphTitle);
    formData.append('openGraphDescription', data?.openGraphDescription);
    formData.append('structuredData', data?.structuredData);
    formData.append('redirectUrl', data?.redirectUrl ?? '');
    formData.append('metaRobotsIndex', data?.metaRobotsIndex);
    formData.append('metaRobotsFollow', data?.metaRobotsFollow);
    formData.append('isShowUpdatedAt', String(data?.isShowUpdatedAt ?? false));

    if (typeof data?.openGraphImage !== 'string') {
      formData.append('openGraphImage', data?.openGraphImage);
    }

    const currentSlidingData =
      slidingImagesDataRef.current.length > 0 ? slidingImagesDataRef.current : slidingImagesData;

    if (currentSlidingData && currentSlidingData.length > 0) {
      const slidingDataPayload = currentSlidingData.map((item) => {
        if (item.image instanceof File) {
          return {
            tag: item.tag ?? '',
            ...(item._id ? { _id: item._id } : {}),
          };
        }
        return {
          image: item.image,
          size: item.size,
          tag: item.tag ?? '',
          ...(item._id ? { _id: item._id } : {}),
        };
      });
      formData.append('slidingImagesData', JSON.stringify(slidingDataPayload));

      currentSlidingData.forEach((item, index) => {
        if (item.image instanceof File) {
          formData.append(`slidingImagesData[${index}][image]`, item.image);
        } else if (typeof item.image === 'string') {
          formData.append('slidingImages', item.image);
        }
      });
    } else {
      formData.append('slidingImagesData', JSON.stringify([]));
    }

    if (deletedImages && deletedImages.length > 0) {
      deletedImages.forEach((img) => {
        formData.append('deleteImages', img);
      });
    }

    aircraftUpdate(formData);
  };

  const { data: aircraftCategoryListRawData, isLoading: aircraftCategoryListRawDataLoading } =
    useAircraftCategoryListing();

  const { aircraftCategoryList } = useMemo(() => {
    const aircraftCategoryList = aircraftCategoryListRawData ?? [];

    return {
      aircraftCategoryList,
    };
  }, [aircraftCategoryListRawData]);

  useEffect(() => {
    if (aircraftDetail) {
      form.reset({
        id: aircraftDetail?._id,
        categoryId: aircraftDetail?.categoryId,
        title: aircraftDetail?.title ?? '',
        aircraftName: aircraftDetail?.name ?? '',
        // description: aircraftDetail?.description ?? '',
        slug: aircraftDetail?.slug ?? '',
        baggageCapacity: aircraftDetail?.baggageCapacity ?? 0,
        cabinDimensionsHeight: aircraftDetail?.cabinDimensions?.height ?? 0,
        cabinDimensionsWidth: aircraftDetail?.cabinDimensions?.width ?? 0,
        cabinDimensionsLength: aircraftDetail?.cabinDimensions?.length ?? 0,
        cabinNoise: aircraftDetail?.cabinNoise ?? 0,
        charterRatePerHrMax: aircraftDetail?.charterRatePerHr?.max ?? 0,
        charterRatePerHrMin: aircraftDetail?.charterRatePerHr?.min ?? 0,
        climbRate: aircraftDetail?.climbRate ?? 0,
        cruiseSpeed: aircraftDetail?.cruiseSpeed ?? 0,
        // landingDistance: aircraftDetail?.landingDistance ?? 0,
        manufacturer: aircraftDetail?.manufacturer ?? '',
        maxPassengers: aircraftDetail?.maxPassengers ?? '',
        range: aircraftDetail?.range ?? 0,
        serviceCeiling: aircraftDetail?.serviceCeiling ?? 0,
        takeoffDistance: aircraftDetail?.takeoffDistance ?? 0,
        yomRangeEndDate: aircraftDetail?.yomRange?.end ?? '',
        yomRangeStartDate: aircraftDetail?.yomRange?.start ?? '',
        cabinPressureAltitude: aircraftDetail?.cabinPressureAltitude ?? '',
        // cabinPressureMax: aircraftDetail?.cabinPressure?.max ?? 0,
        // cabinPressureMin: aircraftDetail?.cabinPressure?.min ?? 0,

        metaTitle: aircraftDetail?.metaTitle ?? '',
        metaDescription: aircraftDetail?.metaDescription ?? '',
        metaKeywords: aircraftDetail?.metaKeywords ?? '',
        canonicalTag: aircraftDetail?.canonicalTag ?? '',
        openGraphTitle: aircraftDetail?.openGraphTitle ?? '',
        openGraphDescription: aircraftDetail?.openGraphDescription ?? '',
        structuredData: aircraftDetail?.structuredData ?? '',
        bannerImageTag: aircraftDetail?.bannerImageTag ?? '',
        thumbnailImageTag: aircraftDetail?.thumbnailImageTag ?? '',
        redirectUrl: aircraftDetail?.redirectUrl ?? '',
        metaRobotsIndex: (aircraftDetail?.metaRobotsIndex ?? 'noindex') as 'noindex' | 'index',
        metaRobotsFollow: (aircraftDetail?.metaRobotsFollow ?? 'nofollow') as 'nofollow' | 'follow',
        isShowUpdatedAt: aircraftDetail?.isShowUpdatedAt ?? false,

        ...(aircraftDetail?.featureImage && aircraftDetail?.featureImage?.length > 0
          ? { featureImage: aircraftDetail?.featureImage ?? '' }
          : {}),
        ...(aircraftDetail?.salesFeatureImage && aircraftDetail?.salesFeatureImage?.length > 0
          ? { salesFeatureImage: aircraftDetail?.salesFeatureImage ?? '' }
          : {}),
        ...(aircraftDetail?.openGraphImage && aircraftDetail?.openGraphImage?.length > 0
          ? { openGraphImage: aircraftDetail?.openGraphImage ?? '' }
          : {}),
        ...(aircraftDetail?.bannerImage && aircraftDetail?.bannerImage?.length > 0
          ? { bannerImage: aircraftDetail?.bannerImage ?? '' }
          : {}),
        ...(aircraftDetail?.thumbnailImage && aircraftDetail?.thumbnailImage?.length > 0
          ? { thumbnailImage: aircraftDetail?.thumbnailImage ?? '' }
          : {}),
        slidingImages: aircraftDetail?.slidingImages ?? [],
        slidingImagesData: aircraftDetail?.slidingImagesData ?? [],
      });
    }

    setFeatureImage(() =>
      aircraftDetail?.featureImage && aircraftDetail?.featureImage?.length > 0
        ? aircraftDetail?.featureImage
        : null,
    );
    setBannerImage(() =>
      aircraftDetail?.bannerImage && aircraftDetail?.bannerImage?.length > 0
        ? aircraftDetail?.bannerImage
        : null,
    );
    setThumbnailImage(() =>
      aircraftDetail?.thumbnailImage && aircraftDetail?.thumbnailImage?.length > 0
        ? aircraftDetail?.thumbnailImage
        : null,
    );
    setSeoOgImage(() =>
      aircraftDetail?.openGraphImage && aircraftDetail?.openGraphImage?.length > 0
        ? aircraftDetail?.openGraphImage
        : null,
    );
    setBannerImageSize(aircraftDetail?.bannerImageSize ?? null);
    setThumbnailImageSize(aircraftDetail?.thumbnailImageSize ?? null);
    setFeatureImageSize(aircraftDetail?.featureImageSize ?? null);
    setSalesFeatureImage(() =>
      aircraftDetail?.salesFeatureImage && aircraftDetail?.salesFeatureImage?.length > 0
        ? aircraftDetail?.salesFeatureImage
        : null,
    );
    setSalesFeatureImageSize(aircraftDetail?.salesFeatureImageSize ?? null);
    setOpenGraphImageSize(() =>
      aircraftDetail?.openGraphImageSize ? Number(aircraftDetail.openGraphImageSize) : null,
    );
    if (aircraftDetail?.slidingImagesData && aircraftDetail.slidingImagesData.length > 0) {
      const initialData: TSlidingImageFormItem[] = aircraftDetail.slidingImagesData.map(
        (item, idx) => ({
          id: item._id || `existing-${idx}`,
          image: item.image,
          size: item.size ?? 0,
          tag: item.tag ?? '',
          _id: item._id,
          previewUrl: mediaUrl(item.image),
        }),
      );
      setSlidingImagesData(initialData);
      slidingImagesDataRef.current = initialData;
      form.setValue('slidingImagesData', initialData, { shouldValidate: false });
      form.setValue(
        'slidingImages',
        initialData.map((item) => item.image),
        { shouldValidate: false },
      );
    } else if (aircraftDetail?.slidingImages && aircraftDetail.slidingImages.length > 0) {
      const initialData: TSlidingImageFormItem[] = aircraftDetail.slidingImages.map(
        (img, index) => ({
          id: `existing-${index}`,
          image: img,
          size: aircraftDetail.slidingImagesSize?.[index] ?? 0,
          tag: '',
          previewUrl: mediaUrl(img),
        }),
      );
      setSlidingImagesData(initialData);
      slidingImagesDataRef.current = initialData;
      form.setValue('slidingImagesData', initialData, { shouldValidate: false });
      form.setValue(
        'slidingImages',
        initialData.map((item) => item.image),
        { shouldValidate: false },
      );
    } else {
      setSlidingImagesData([]);
      slidingImagesDataRef.current = [];
    }
    setDeletedImages([]);

    return () => {};
  }, [
    form.reset,
    aircraftDetail?._id,
    aircraftDetail?.title,
    aircraftDetail?.name,
    aircraftDetail?.description,
    aircraftDetail?.slug,
    aircraftDetail?.metaTitle,
    aircraftDetail?.metaDescription,
    aircraftDetail?.metaKeywords,
    aircraftDetail?.canonicalTag,
    aircraftDetail?.openGraphTitle,
    aircraftDetail?.openGraphDescription,
    aircraftDetail?.structuredData,
    aircraftDetail?.bannerImageTag,
    aircraftDetail?.thumbnailImageTag,
    aircraftDetail?.bannerImage,
    aircraftDetail?.thumbnailImage,
    aircraftDetail?.openGraphImage,
    aircraftDetail?.openGraphImageSize,
    aircraftDetail?.featureImage,
    aircraftDetail?.featureImageSize,
    aircraftDetail?.salesFeatureImage,
    aircraftDetail?.salesFeatureImageSize,
    aircraftDetail?.categoryId,
    aircraftDetail?.range,
    aircraftDetail?.cruiseSpeed,
    aircraftDetail?.maxPassengers,
    aircraftDetail?.baggageCapacity,
    aircraftDetail?.cabinNoise,
    aircraftDetail?.takeoffDistance,
    // aircraftDetail?.landingDistance,
    aircraftDetail?.serviceCeiling,
    aircraftDetail?.climbRate,
    aircraftDetail?.cabinDimensions?.height,
    aircraftDetail?.cabinDimensions?.width,
    aircraftDetail?.cabinDimensions?.length,
    aircraftDetail?.charterRatePerHr?.max,
    aircraftDetail?.charterRatePerHr?.min,
    aircraftDetail?.manufacturer,
    aircraftDetail?.yomRange?.end,
    aircraftDetail?.yomRange?.start,
    aircraftDetail?.cabinPressureAltitude,
    aircraftDetail?.redirectUrl,
    aircraftDetail?.metaRobotsIndex,
    aircraftDetail?.metaRobotsFollow,
    aircraftDetail?.isShowUpdatedAt,
    // aircraftDetail?.cabinPressure?.max,
    // aircraftDetail?.cabinPressure?.min,
    aircraftDetail?.slidingImages,
    aircraftDetail?.slidingImagesSize,
    aircraftDetail?.slidingImagesData,
    setFeatureImage,
    setFeatureImageSize,
    setSalesFeatureImage,
    setSalesFeatureImageSize,
    setBannerImage,
    setThumbnailImage,
    setSeoOgImage,
    setBannerImageSize,
    setThumbnailImageSize,
    setSlidingImagesData,
    setOpenGraphImageSize,
    aircraftDetail,
    form,
  ]);

  if (aircraftDetailLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  return (
    <Grid container rowSpacing={3}>
      {/* Aircraft Name */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Aircraft Name*</InputLabel>
        <Controller
          control={form.control}
          name="aircraftName"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Aircraft Name"
              placeholder="Enter Aircraft Name"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.aircraftName}
              helperText={errors?.aircraftName?.message}
            />
          )}
        />
      </Grid>

      {/* Title */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Title*</InputLabel>
        <Controller
          control={form.control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Title"
              placeholder="Enter title"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.title}
              helperText={errors?.title?.message}
            />
          )}
        />
      </Grid>

      {/* Slug */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Slug*</InputLabel>
        <Controller
          control={form.control}
          name="slug"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Slug"
              placeholder="Enter slug"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.slug}
              helperText={errors?.slug?.message}
            />
          )}
        />
      </Grid>

      {/* Thumbnail Image (Poster) Upload */}
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
            Thumbnail Image
          </InputLabel>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {thumbnailImage === null ? (
              <SingleImgMainComp
                needCrop
                aspectRatio={IMAGE_ASPECT_RATIO_DEFINE.thumbnailImage}
                sxForBox={{ width: '103px !important', height: '103px !important' }}
                dataValueGetter={(value) => {
                  if (value) {
                    setThumbnailImage(() => value);
                    setThumbnailImageSize(() => value.size);

                    form.setValue('thumbnailImage', value as File);
                    form.clearErrors('thumbnailImage');
                  }
                }}
                errorValueGetter={(errorMessage) => {
                  setThumbnailImageSize(() => null);
                  form.setError('thumbnailImage', { message: errorMessage });
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
                  typeof thumbnailImage === 'string'
                    ? mediaUrl(thumbnailImage)
                    : URL?.createObjectURL(thumbnailImage)
                }
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete) => {
                  if (shouldDelete) {
                    setThumbnailImage(() => null);
                    setThumbnailImageSize(() => null);
                    form.setValue('thumbnailImage', undefined as unknown as File);
                  }
                }}
                imageSize={thumbnailImageSize}
              />
            )}

            <Box sx={{ flexGrow: 1, minWidth: '280px' }}>
              <InputLabel sx={{ color: '#FFFFFF', mb: 1, fontSize: '13px' }}>
                Or select from default thumbnails
              </InputLabel>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {DEFAULT_THUMBNAILS?.map((thumb) => {
                  const isSelected =
                    thumbnailImage instanceof File
                      ? thumbnailImage.name === thumb.url.split('/').pop()
                      : typeof thumbnailImage === 'string' &&
                        (thumbnailImage.includes(thumb.url) || thumb.url.includes(thumbnailImage));

                  return (
                    <Box
                      key={thumb.id}
                      onClick={() => handleSelectDefaultThumbnail(thumb.url)}
                      sx={{
                        width: '100px',
                        height: '50px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        position: 'relative',
                        border: isSelected
                          ? `2px solid ${theme.palette.secondary.main}`
                          : '2px solid transparent',
                        boxShadow: isSelected ? `0 0 8px ${theme.palette.secondary.main}` : 'none',
                        transition: 'all 0.25s ease',
                        '&:hover': {
                          transform: 'scale(1.04)',
                          borderColor: theme.palette.secondary.light || '#D5A85A',
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={thumb.url}
                        alt={thumb.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>

          {errors.thumbnailImage ? (
            <Typography variant="body1" className="error_msg">
              {errors?.thumbnailImage.message}
            </Typography>
          ) : null}
        </Box>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Thumbnail Alt Tag*</InputLabel>
        <Controller
          control={form.control}
          name="thumbnailImageTag"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Thumbnail Alt Tag"
              placeholder="Enter thumbnail alt tag"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.thumbnailImageTag}
              helperText={errors?.thumbnailImageTag?.message}
            />
          )}
        />
      </Grid>

      {/* Hero Image (Banner) Upload */}
      <Grid size={{ xs: 12 }}>
        <Box className="uploadImgWrapper">
          <InputLabel
            sx={{
              color: theme.palette.common.white,
              fontSize: '14px',
              fontWeight: 500,
              mb: 1,
            }}
          >
            Hero Image
          </InputLabel>

          <Box
            className="allImgUploadWrap"
            sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-start' }}
          >
            {bannerImage === null ? (
              <SingleImgMainComp
                needCrop
                aspectRatio={IMAGE_ASPECT_RATIO_DEFINE.heroImage}
                sxForBox={{ width: '286px !important', height: '103px !important' }}
                dataValueGetter={(value) => {
                  if (value) {
                    setBannerImage(() => value);
                    setBannerImageSize(() => value.size);

                    form.setValue('bannerImage', value as File);
                    form.clearErrors('bannerImage');
                  }
                }}
                errorValueGetter={(errorMessage) => {
                  setBannerImageSize(() => null);
                  form.setError('bannerImage', { message: errorMessage });
                }}
              >
                <PlusIconUpload />
              </SingleImgMainComp>
            ) : (
              <ImgPreviewMainComp
                sx={{
                  width: '286px !important',
                  height: '103px !important',
                  marginBottom: '10px',
                }}
                src={
                  typeof bannerImage === 'string'
                    ? mediaUrl(bannerImage)
                    : URL?.createObjectURL(bannerImage)
                }
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete) => {
                  if (shouldDelete) {
                    setBannerImage(() => null);
                    setBannerImageSize(() => null);
                    form.setValue('bannerImage', undefined as unknown as File);
                  }
                }}
                imageSize={bannerImageSize}
              />
            )}

            <Box sx={{ flexGrow: 1, minWidth: '280px' }}>
              <InputLabel sx={{ color: '#FFFFFF', mb: 1, fontSize: '13px' }}>
                Or select from default banners
              </InputLabel>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {DEFAULT_BANNERS?.map((banner) => {
                  const isSelected =
                    bannerImage instanceof File
                      ? bannerImage.name === banner.url.split('/').pop()
                      : typeof bannerImage === 'string' &&
                        (bannerImage.includes(banner.url) || banner.url.includes(bannerImage));

                  return (
                    <Box
                      key={banner.id}
                      onClick={() => handleSelectDefaultBanner(banner.url)}
                      sx={{
                        width: '100px',
                        height: '50px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        position: 'relative',
                        border: isSelected
                          ? `2px solid ${theme.palette.secondary.main}`
                          : '2px solid transparent',
                        boxShadow: isSelected ? `0 0 8px ${theme.palette.secondary.main}` : 'none',
                        transition: 'all 0.25s ease',
                        '&:hover': {
                          transform: 'scale(1.04)',
                          borderColor: theme.palette.secondary.light || '#D5A85A',
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={banner.url}
                        alt={banner.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>

          {errors.bannerImage ? (
            <Typography variant="body1" className="error_msg" sx={{ mt: 1 }}>
              {errors?.bannerImage.message}
            </Typography>
          ) : null}
        </Box>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Hero Alt Tag*</InputLabel>
        <Controller
          control={form.control}
          name="bannerImageTag"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Hero Alt Tag"
              placeholder="Enter hero alt tag"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.bannerImageTag}
              helperText={errors?.bannerImageTag?.message}
            />
          )}
        />
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
            Feature Image
          </InputLabel>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            {featureImage === null ? (
              <SingleImgMainComp
                needCrop={true}
                aspectRatio={IMAGE_ASPECT_RATIO_DEFINE.featureImage}
                dataValueGetter={(value) => {
                  // console.log(value, '@TEST');

                  if (value) {
                    setFeatureImage(() => value);
                    setFeatureImageSize(() => value.size);

                    form.setValue('featureImage', value as File);
                    form.clearErrors('featureImage');
                  }
                }}
                errorValueGetter={(errorMessage) => {
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
                onDeleteHandler={(shouldDelete) => {
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
              {errors?.featureImage.message}
            </Typography>
          ) : null}
        </Box>
      </Grid>

      {/* Sales FeatureImage Image Upload */}
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
            Sales Feature Image
          </InputLabel>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            {salesFeatureImage === null ? (
              <SingleImgMainComp
                needCrop={true}
                aspectRatio={IMAGE_ASPECT_RATIO_DEFINE.salesFeatureImage}
                dataValueGetter={(value) => {
                  if (value) {
                    setSalesFeatureImage(() => value);
                    setSalesFeatureImageSize(() => value.size);

                    form.setValue('salesFeatureImage', value as File);
                    form.clearErrors('salesFeatureImage');
                  }
                }}
                errorValueGetter={(errorMessage) => {
                  setSalesFeatureImageSize(() => null);
                  form.setError('salesFeatureImage', { message: errorMessage });
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
                  typeof salesFeatureImage === 'string'
                    ? mediaUrl(salesFeatureImage)
                    : URL?.createObjectURL(salesFeatureImage)
                }
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete) => {
                  if (shouldDelete) {
                    setSalesFeatureImage(() => null);
                    setSalesFeatureImageSize(() => null);
                    form.setValue('salesFeatureImage', undefined as unknown as File);
                  }
                }}
                imageSize={salesFeatureImageSize}
              />
            )}
          </Box>

          {errors.salesFeatureImage ? (
            <Typography variant="body1" className="error_msg">
              {errors?.salesFeatureImage.message}
            </Typography>
          ) : null}
        </Box>
      </Grid>

      {/* Sliding Images Upload */}
      <Grid size={{ xs: 12 }}>
        <Box>
          <InputLabel
            sx={{
              color: theme.palette.common.white,
              fontSize: '14px',
              fontWeight: 500,
              mb: 1.5,
            }}
          >
            Sliding Images
          </InputLabel>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
            <MultipleImgMainComp
              sxForBox={{ width: '103px !important', height: '103px !important' }}
              dataValueGetter={handleSlidingFilesSelected}
              errorValueGetter={(errorMessage) => {
                form.setError('slidingImages', { message: errorMessage });
              }}
            >
              <PlusIconUpload />
            </MultipleImgMainComp>
          </Box>

          {errors.slidingImages ? (
            <Typography variant="body1" className="error_msg" sx={{ mb: 1 }}>
              {errors?.slidingImages.message}
            </Typography>
          ) : null}
          {errors.slidingImagesData ? (
            <Typography variant="body1" className="error_msg" sx={{ mb: 1 }}>
              {errors?.slidingImagesData.message}
            </Typography>
          ) : null}

          {slidingImagesData.length > 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 2 }}>
              {slidingImagesData.map((item, index) => (
                <SlidingImageItemRow
                  key={item.id || index}
                  item={item}
                  index={index}
                  onRemove={handleRemoveSlidingImage}
                  onTagChange={handleSlidingImageTagChange}
                />
              ))}
            </Box>
          )}
        </Box>
      </Grid>

      {/* Description */}
      {/* <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Description*</InputLabel>
        <Controller
          control={form.control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <CKEditorRichText
              placeholder="Write your aircraft content here..."
              content={value}
              onChange={onChange}
            />
          )}
        />

        {errors.description ? (
          <Typography variant="body1" className="error_msg">
            {errors?.description.message}
          </Typography>
        ) : null}
      </Grid> */}

      <Grid size={{ xs: 12 }} sx={{ marginTop: 5 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Aircraft Category*</InputLabel>
        <Controller
          control={form.control}
          name="categoryId"
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              initialValue="Select Category"
              value={value ?? ''}
              textColor="#FFFFFF"
              onChange={(e) => onChange(e.target.value)}
              fullWidth
            >
              <MenuItem value="" disabled>
                Select Category
              </MenuItem>
              {aircraftCategoryList?.map((eachAirCat) => (
                <MenuItem value={eachAirCat?._id} key={eachAirCat?._id}>
                  {eachAirCat?.title}
                </MenuItem>
              ))}
            </CustomSelect>
          )}
        />

        {errors.categoryId ? (
          <Typography variant="body1" className="error_msg">
            {errors?.categoryId.message}
          </Typography>
        ) : null}
      </Grid>

      <Grid size={{ xs: 12 }} sx={{ mt: 5 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Manufacturer*</InputLabel>
        <Controller
          control={form.control}
          name="manufacturer"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Manufacturer"
              placeholder="PiXXXXX"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.manufacturer}
              helperText={errors?.manufacturer?.message}
            />
          )}
        />
      </Grid>

      {/* Year Of Manufacturer */}
      <Grid size={{ xs: 12 }}>
        <AircraftGroupHeading>Year Of Manufacturer</AircraftGroupHeading>
      </Grid>

      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Start year*</InputLabel>
        <Controller
          control={form.control}
          name="yomRangeStartDate"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Start Year"
              placeholder="19XX"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.yomRangeStartDate}
              helperText={errors?.yomRangeStartDate?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>End Year*</InputLabel>
        <Controller
          control={form.control}
          name="yomRangeEndDate"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="End Year"
              placeholder="20XX or type Present"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.yomRangeEndDate}
              helperText={errors?.yomRangeEndDate?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Range (nm)*</InputLabel>
        <Controller
          control={form.control}
          name="range"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Range"
              placeholder="Range in nautical miles"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.range}
              helperText={errors?.range?.message}
              onKeyDown={handleAmountKeys}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Cruise Speed (ktas)*</InputLabel>
        <Controller
          control={form.control}
          name="cruiseSpeed"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Cruise Speed"
              placeholder="Cruise speed in ktas"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.cruiseSpeed}
              helperText={errors?.cruiseSpeed?.message}
              onKeyDown={handleAmountKeys}
            />
          )}
        />
      </Grid>

      {/* ---------------------------------------- */}

      <Grid size={{ xs: 12 }}>
        <AircraftGroupHeading>Cabin Dimensions (L x W x H ft)</AircraftGroupHeading>
      </Grid>

      <Grid size={{ xs: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Length*</InputLabel>
        <Controller
          control={form.control}
          name="cabinDimensionsLength"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Length"
              placeholder="Length"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.cabinDimensionsLength}
              helperText={errors?.cabinDimensionsLength?.message}
              onKeyDown={handleAmountKeys}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Height*</InputLabel>
        <Controller
          control={form.control}
          name="cabinDimensionsHeight"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Height"
              placeholder="Height"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.cabinDimensionsHeight}
              helperText={errors?.cabinDimensionsHeight?.message}
              onKeyDown={handleAmountKeys}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Width*</InputLabel>
        <Controller
          control={form.control}
          name="cabinDimensionsWidth"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Width"
              placeholder="Width"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.cabinDimensionsWidth}
              helperText={errors?.cabinDimensionsWidth?.message}
              onKeyDown={handleAmountKeys}
            />
          )}
        />
      </Grid>

      {/* ---------------------------------------- */}

      {/* <Grid size={{ xs: 12 }}>
        <AircraftGroupHeading>Cabin Pressure at Cruising Altitude</AircraftGroupHeading>
      </Grid>

      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Minimum*</InputLabel>
        <Controller
          control={form.control}
          name="cabinPressureMin"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Minimum"
              placeholder="Minimum"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.cabinPressureMin}
              helperText={errors?.cabinPressureMin?.message}
              onKeyDown={handleAmountKeys}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Maximum*</InputLabel>
        <Controller
          control={form.control}
          name="cabinPressureMax"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Maximum"
              placeholder="Maximum"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.cabinPressureMax}
              helperText={errors?.cabinPressureMax?.message}
              onKeyDown={handleAmountKeys}
            />
          )}
        />
      </Grid> */}

      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Cabin Pressure at Cruising Altitude*</InputLabel>
        <Controller
          control={form.control}
          name="cabinPressureAltitude"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Cabin Pressure at Cruising Altitude"
              placeholder="Cabin pressure at cruising altitude"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.cabinPressureAltitude}
              helperText={errors?.cabinPressureAltitude?.message}
              onKeyDown={handleAmountKeys}
            />
          )}
        />
      </Grid>

      {/* ------------------------------------------------------------------ */}

      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Maximum Passenger Capacity*</InputLabel>
        <Controller
          control={form.control}
          name="maxPassengers"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Maximum Passenger Capacity"
              placeholder="Enter Maximum passenger capacity"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.maxPassengers}
              helperText={errors?.maxPassengers?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Baggage Capacity (cu ft)*</InputLabel>
        <Controller
          control={form.control}
          name="baggageCapacity"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Baggage Capacity"
              placeholder="Baggage capacity in cubic feet"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.baggageCapacity}
              helperText={errors?.baggageCapacity?.message}
              onKeyDown={handleAmountKeys}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Cabin Noise (dBa)*</InputLabel>
        <Controller
          control={form.control}
          name="cabinNoise"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Cabin Noise"
              placeholder="Cabin noise level in dB"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.cabinNoise}
              helperText={errors?.cabinNoise?.message}
              onKeyDown={handleAmountKeys}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Max Take Off Weight (MTOW) (lbs)*</InputLabel>
        <Controller
          control={form.control}
          name="takeoffDistance"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Max Take Off Weight (MTOW)"
              placeholder="Max take off weight (mtow) in pounds"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.takeoffDistance}
              helperText={errors?.takeoffDistance?.message}
              onKeyDown={handleAmountKeys}
            />
          )}
        />
      </Grid>

      {/* <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Landing Distance (ft)*</InputLabel>
        <Controller
          control={form.control}
          name="landingDistance"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Landing Distance"
              placeholder="Landing distance in feet"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.landingDistance}
              helperText={errors?.landingDistance?.message}
              onKeyDown={handleAmountKeys}
            />
          )}
        />
      </Grid> */}

      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Service Ceiling (ft)*</InputLabel>
        <Controller
          control={form.control}
          name="serviceCeiling"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Service Ceiling"
              placeholder="Service ceiling in feet"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.serviceCeiling}
              helperText={errors?.serviceCeiling?.message}
              onKeyDown={handleAmountKeys}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Climb Rate (fpm)*</InputLabel>
        <Controller
          control={form.control}
          name="climbRate"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Climb Rate"
              placeholder="Climb rate in feet per minute"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.climbRate}
              helperText={errors?.climbRate?.message}
              onKeyDown={handleAmountKeys}
            />
          )}
        />
      </Grid>

      {/* ---------------------------------------- */}
      <Grid size={{ xs: 12 }}>
        <AircraftGroupHeading>Charter Rate (USD/hr)</AircraftGroupHeading>
      </Grid>

      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Minimum*</InputLabel>
        <Controller
          control={form.control}
          name="charterRatePerHrMin"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Minimum"
              placeholder="Minimum"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.charterRatePerHrMin}
              helperText={errors?.charterRatePerHrMin?.message}
              onKeyDown={handleAmountKeys}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Maximum*</InputLabel>
        <Controller
          control={form.control}
          name="charterRatePerHrMax"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Maximum"
              placeholder="Maximum"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.charterRatePerHrMax}
              helperText={errors?.charterRatePerHrMax?.message}
              onKeyDown={handleAmountKeys}
            />
          )}
        />
      </Grid>

      {/* ------------------------------------------------------------------ */}

      {/* Redirect URL */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Redirect URL</InputLabel>
        <Controller
          control={form.control}
          name="redirectUrl"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Redirect URL"
              placeholder="e.g. https://example.com/new-location"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.redirectUrl}
              helperText={errors?.redirectUrl?.message}
            />
          )}
        />
      </Grid>

      {/* ═══════════════════════════════════════════════════════════════════
          SEO PRIMARY META TAGS
         ═══════════════════════════════════════════════════════════════════ */}

      <Grid size={{ xs: 12 }} sx={{ mt: 10 }}>
        <AircraftGroupHeading>Seo Details</AircraftGroupHeading>
      </Grid>

      {/* Meta Title */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Meta Title*</InputLabel>
        <Controller
          control={form.control}
          name="metaTitle"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={metaTitleLabel}
              placeholder={metaTitlePlaceholder}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.metaTitle}
              helperText={errors?.metaTitle?.message}
            />
          )}
        />
      </Grid>

      {/* Meta Description */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Meta Description*</InputLabel>
        <Controller
          control={form.control}
          name="metaDescription"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={metaDescriptionLabel}
              placeholder={metaDescriptionPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              multiline
              rows={3}
              error={!!errors?.metaDescription}
              helperText={errors?.metaDescription?.message}
            />
          )}
        />
      </Grid>

      {/* Meta Keywords */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Meta Keywords*</InputLabel>
        <Controller
          control={form.control}
          name="metaKeywords"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={metaKeywordsLabel}
              placeholder={metaKeywordsPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.metaKeywords}
              helperText={errors?.metaKeywords?.message}
            />
          )}
        />
      </Grid>

      {/* ═══════════════════════════════════════════════════════════════════
          URL MANAGEMENT
         ═══════════════════════════════════════════════════════════════════ */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>URL Management</GroupHeading>
      </Grid>

      {/* Canonical URL */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Canonical URL*</InputLabel>
        <Controller
          control={form.control}
          name="canonicalTag"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={canonicalUrlLabel}
              placeholder={canonicalUrlPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.canonicalTag}
              helperText={errors?.canonicalTag?.message}
            />
          )}
        />
      </Grid>

      {/* ═══════════════════════════════════════════════════════════════════
          SOCIAL SHARING (OPEN GRAPH)
         ═══════════════════════════════════════════════════════════════════ */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>Social Sharing (Open Graph)</GroupHeading>
      </Grid>

      {/* OG Title */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>OG Title*</InputLabel>
        <Controller
          control={form.control}
          name="openGraphTitle"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={ogTitleLabel}
              placeholder={ogTitlePlaceholder}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.openGraphTitle}
              helperText={errors?.openGraphTitle?.message}
            />
          )}
        />
      </Grid>

      {/* OG Description */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>OG Description*</InputLabel>
        <Controller
          control={form.control}
          name="openGraphDescription"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={ogDescriptionLabel}
              placeholder={ogDescriptionPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              multiline
              rows={3}
              error={!!errors?.openGraphDescription}
              helperText={errors?.openGraphDescription?.message}
            />
          )}
        />
      </Grid>

      {/* OG Image Upload */}
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
            {ogImageLabel}
          </InputLabel>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {seoOgImage === null ? (
              <SingleImgMainComp
                dataValueGetter={(value) => {
                  // console.log(value, '@TEST');

                  if (value) {
                    setSeoOgImage(() => value);
                    setOpenGraphImageSize(() => value.size);

                    form.setValue('openGraphImage', value as File);
                    form.clearErrors('openGraphImage');
                  }
                }}
                errorValueGetter={(errorMessage) => {
                  setOpenGraphImageSize(() => null);
                  form.setError('openGraphImage', { message: errorMessage });
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
                  typeof seoOgImage === 'string'
                    ? mediaUrl(seoOgImage)
                    : URL?.createObjectURL(seoOgImage)
                }
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete) => {
                  if (shouldDelete) {
                    setSeoOgImage(() => null);
                    setOpenGraphImageSize(() => null);
                    form.setValue('openGraphImage', undefined as unknown as File);
                  }
                }}
                imageSize={openGraphImageSize}
              />
            )}

            <Box sx={{ flexGrow: 1, minWidth: '280px' }}>
              <InputLabel sx={{ color: '#FFFFFF', mb: 1, fontSize: '13px' }}>
                Or select from default OG images
              </InputLabel>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {DEFAULT_OG_IMAGES?.map((og) => {
                  const isSelected =
                    seoOgImage instanceof File
                      ? seoOgImage.name === og.url.split('/').pop()
                      : typeof seoOgImage === 'string' &&
                        (seoOgImage.includes(og.url) || og.url.includes(seoOgImage));

                  return (
                    <Box
                      key={og.id}
                      onClick={() => handleSelectDefaultOgImage(og.url)}
                      sx={{
                        width: '100px',
                        height: '50px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        position: 'relative',
                        border: isSelected
                          ? `2px solid ${theme.palette.secondary.main}`
                          : '2px solid transparent',
                        boxShadow: isSelected ? `0 0 8px ${theme.palette.secondary.main}` : 'none',
                        transition: 'all 0.25s ease',
                        '&:hover': {
                          transform: 'scale(1.04)',
                          borderColor: theme.palette.secondary.light || '#D5A85A',
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={og.url}
                        alt={og.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>

          {errors.openGraphImage ? (
            <Typography variant="body1" className="error_msg">
              {errors?.openGraphImage.message}
            </Typography>
          ) : null}
        </Box>
      </Grid>

      {/* ═══════════════════════════════════════════════════════════════════
          ROBOTS META DIRECTIVES
         ═══════════════════════════════════════════════════════════════════ */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>Robots Meta Directives</GroupHeading>
      </Grid>

      {/* Meta Robots Index */}
      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Meta Robots Index</InputLabel>
        <Controller
          control={form.control}
          name="metaRobotsIndex"
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              initialValue="Select Index Directive"
              value={value ?? 'noindex'}
              textColor="#FFFFFF"
              onChange={(e) => onChange(e.target.value)}
              fullWidth
            >
              <MenuItem value="noindex">noindex</MenuItem>
              <MenuItem value="index">index</MenuItem>
            </CustomSelect>
          )}
        />
      </Grid>

      {/* Meta Robots Follow */}
      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Meta Robots Follow</InputLabel>
        <Controller
          control={form.control}
          name="metaRobotsFollow"
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              initialValue="Select Follow Directive"
              value={value ?? 'nofollow'}
              textColor="#FFFFFF"
              onChange={(e) => onChange(e.target.value)}
              fullWidth
            >
              <MenuItem value="nofollow">nofollow</MenuItem>
              <MenuItem value="follow">follow</MenuItem>
            </CustomSelect>
          )}
        />
      </Grid>

      {/* ═══════════════════════════════════════════════════════════════════
          STRUCTURED DATA
         ═══════════════════════════════════════════════════════════════════ */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>Structured Data</GroupHeading>
      </Grid>

      {/* Schema (JSON-LD) */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Schema (JSON-LD)*</InputLabel>
        <Controller
          control={form.control}
          name="structuredData"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={schemaLabel}
              placeholder={schemaPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              multiline
              rows={5}
              error={!!errors?.structuredData}
              helperText={errors?.structuredData?.message}
            />
          )}
        />
      </Grid>

      {/* Show Last Updated Date Checkbox */}
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
                  sx={{
                    color: '#FFFFFF',
                    '&.Mui-checked': {
                      color: '#FFFFFF',
                    },
                  }}
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
          disabled={aircraftUpdateLoading}
          startIcon={<WestIcon />}
          onClick={() => {
            router.replace(PAGE_ROUTE.dashboard.availableAircraft.list);
          }}
        >
          Back
        </CustomButtonPrimary>

        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={aircraftUpdateLoading}
          loading={aircraftUpdateLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Update
        </CustomButtonPrimary>
      </Grid>

      {/* Image Cropper Modal for Sliding Images */}
      {currentSlidingCropImage && (
        <ImageCropperModal
          open={slidingCropperOpen}
          image={currentSlidingCropImage}
          fileName={currentSlidingCropFileName}
          aspectRatio={IMAGE_ASPECT_RATIO_DEFINE.slidingImage}
          onClose={handleSlidingCropperClose}
          onCropComplete={handleSlidingCropComplete}
        />
      )}
    </Grid>
  );
};

export default AircraftEditForm;
