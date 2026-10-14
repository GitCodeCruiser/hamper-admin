import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid, InputLabel, Typography, useTheme } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useCmsContentCreate } from '@/api/hooks/cms/content/hooks';
import ImageCropperModal from '@/components/Other/ImgMainComp/ImageCropperModal';
import MultipleImgMainComp from '@/components/Other/ImgMainComp/MultipleImgMainComp';
import { IMAGE_ASPECT_RATIO_DEFINE } from '@/constant';
import SlidingImageItemRow from '@/module/dashboard/components/aircraft/SlidingImageItemRow';
import {
  cmsNewContentAdd,
  TCmsNewContentAddType,
} from '@/module/dashboard/validation/cms/newContent/cmsContentSchema.zod';
import { GroupHeading } from '@/module/seo/components/SeoCompForm';
import { TSlidingImageFormItem } from '@/types/apps/aircraft/index.type';
import CKEditorRichText from '@/ui/CkEditor/Ckeditorrichtext';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

type TNewCmsContentAddProps = {
  pageName: string;
  pageSlug: string;
  purpose: string;
  onSuccess?: () => void;
};

const NewCmsContentAdd = ({ pageName, pageSlug, purpose, onSuccess }: TNewCmsContentAddProps) => {
  const theme = useTheme();
  const [imagesData, setImagesData] = useState<TSlidingImageFormItem[]>([]);
  const imagesDataRef = useRef<TSlidingImageFormItem[]>([]);

  // Cropper state
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropQueue, setCropQueue] = useState<File[]>([]);
  const cropQueueRef = useRef<File[]>([]);
  const [currentCropImage, setCurrentCropImage] = useState<string | null>(null);
  const [currentCropFileName, setCurrentCropFileName] = useState<string>('');
  const cropCompleteGuardRef = useRef(false);
  const [isInsertingCta, setIsInsertingCta] = useState(false);
  const isCtaInsertingRef = useRef(false);

  const form = useForm<TCmsNewContentAddType>({
    resolver: zodResolver(cmsNewContentAdd()),
    defaultValues: {
      title: '',
      description: '',
      images: [],
      imagesData: [],
    },
  });

  const errors = form.formState.errors;

  const { mutateAsync: cmsContentSave, isPending: cmsContentSaveLoading } = useCmsContentCreate({
    optionalCallback: () => {
      form.reset({
        title: '',
        description: '',
        images: [],
        imagesData: [],
      });
      setImagesData([]);
      imagesDataRef.current = [];
      cropQueueRef.current = [];
      setCropQueue([]);
      setCurrentCropImage(null);
      setCropperOpen(false);
      if (onSuccess) onSuccess();
    },
    errorCallback: () => {},
  });

  // Process the crop queue — open the cropper for the next file
  const processNextCrop = useCallback((queue: File[]) => {
    if (queue.length === 0) {
      setCropperOpen(false);
      setCurrentCropImage(null);
      cropQueueRef.current = [];
      setCropQueue([]);
      return;
    }

    const nextFile = queue[0];
    setCurrentCropFileName(nextFile.name);
    const reader = new FileReader();
    reader.onload = () => {
      setCurrentCropImage(reader.result as string);
      setCropperOpen(true);
    };
    reader.readAsDataURL(nextFile);
  }, []);

  // Handle files selected from MultipleImgMainComp
  const handleFilesSelected = useCallback(
    (selectedFiles: File[]) => {
      if (selectedFiles && selectedFiles.length > 0) {
        cropQueueRef.current = selectedFiles;
        setCropQueue(selectedFiles);
        processNextCrop(selectedFiles);
      }
    },
    [processNextCrop],
  );

  // Handle a completed crop
  const handleCropComplete = useCallback(
    (croppedFile: File) => {
      if (cropCompleteGuardRef.current) return;
      cropCompleteGuardRef.current = true;
      setTimeout(() => {
        cropCompleteGuardRef.current = false;
      }, 0);

      const newItem: TSlidingImageFormItem = {
        id: `${croppedFile.name}-${croppedFile.size}-${Date.now()}`,
        image: croppedFile,
        size: croppedFile.size,
        tag: '',
        previewUrl: URL.createObjectURL(croppedFile),
      };
      setImagesData((prev) => {
        const updated = [...prev, newItem];
        imagesDataRef.current = updated;
        form.setValue('imagesData', updated, { shouldValidate: false });
        form.setValue(
          'images',
          updated.map((it) => it.image),
          { shouldValidate: false },
        );
        form.clearErrors('images');
        form.clearErrors('imagesData');
        return updated;
      });

      // Move to the next file in the queue
      const remaining = cropQueueRef.current.slice(1);
      cropQueueRef.current = remaining;
      setCropQueue(remaining);
      processNextCrop(remaining);
    },
    [form, processNextCrop],
  );

  // Handle cropper close (skip current file)
  const handleCropperClose = useCallback(() => {
    setCropperOpen(false);
    setCurrentCropImage(null);

    // Move to the next file in the queue
    const remaining = cropQueueRef.current.slice(1);
    cropQueueRef.current = remaining;
    setCropQueue(remaining);
    if (remaining.length > 0) {
      processNextCrop(remaining);
    }
  }, [processNextCrop]);

  const handleRemoveImage = useCallback(
    (index: number) => {
      setImagesData((prev) => {
        const updated = prev.filter((_, i) => i !== index);
        imagesDataRef.current = updated;
        form.setValue('imagesData', updated, { shouldValidate: false });
        form.setValue(
          'images',
          updated.map((imgItem) => imgItem.image),
          { shouldValidate: false },
        );
        return updated;
      });
    },
    [form],
  );

  const handleImageTagChange = useCallback(
    (index: number, newTag: string) => {
      if (imagesDataRef.current[index]) {
        imagesDataRef.current[index].tag = newTag;
      }
      form.setValue('imagesData', imagesDataRef.current, { shouldValidate: false });
    },
    [form],
  );

  const onSubmit = (data: TCmsNewContentAddType) => {
    const formData = new FormData();
    formData.append('pageName', pageName);
    formData.append('pageSlug', pageSlug);
    formData.append('purpose', purpose);
    formData.append('description', data?.description);
    formData.append('title', data?.title ?? '');
    formData.append('showCTA', String(data?.showCTA ?? false));

    const currentImagesData = imagesDataRef.current.length > 0 ? imagesDataRef.current : imagesData;

    if (currentImagesData && currentImagesData.length > 0) {
      const imagesDataPayload = currentImagesData.map((item) => {
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
      formData.append('imagesData', JSON.stringify(imagesDataPayload));

      currentImagesData.forEach((item, index) => {
        if (item.image instanceof File) {
          formData.append(`imagesData[${index}][image]`, item.image);
        } else if (typeof item.image === 'string') {
          formData.append('images', item.image);
        }
      });
    }

    cmsContentSave(formData);
  };

  const handleInsertCTA = async () => {
    if (isCtaInsertingRef.current || cmsContentSaveLoading) return;
    isCtaInsertingRef.current = true;
    setIsInsertingCta(true);

    try {
      const formData = new FormData();
      formData.append('pageName', pageName);
      formData.append('pageSlug', pageSlug);
      formData.append('purpose', purpose);
      formData.append('title', '');
      formData.append('description', '');
      formData.append('showCTA', 'true');
      await cmsContentSave(formData);
    } catch {
      // errors handled by api hook callbacks
    } finally {
      setIsInsertingCta(false);
      isCtaInsertingRef.current = false;
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '16px',
        p: 4,
        mb: 6,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Grid container rowSpacing={4} columnSpacing={3}>
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              pb: 1,
              mb: 2,
            }}
          >
            <GroupHeading>Add Content</GroupHeading>
          </Box>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
            Title
          </InputLabel>
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

        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
            Description*
          </InputLabel>
          <Controller
            control={form.control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <CKEditorRichText
                placeholder="Write your content here..."
                content={value}
                minHeight={300}
                onChange={onChange}
              />
            )}
          />

          {!!errors.description ? (
            <Typography variant="body1" className="error_msg">
              {errors?.description.message}
            </Typography>
          ) : null}
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
                dataValueGetter={handleFilesSelected}
                errorValueGetter={(errorMessage) => {
                  form.setError('images', { message: errorMessage });
                }}
              >
                <PlusIconUpload />
              </MultipleImgMainComp>
            </Box>

            {errors.images ? (
              <Typography variant="body1" className="error_msg" sx={{ mb: 1 }}>
                {errors?.images.message}
              </Typography>
            ) : null}
            {errors.imagesData ? (
              <Typography variant="body1" className="error_msg" sx={{ mb: 1 }}>
                {errors?.imagesData.message}
              </Typography>
            ) : null}

            {imagesData.length > 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 2 }}>
                {imagesData.map((item, index) => (
                  <SlidingImageItemRow
                    key={item.id || index}
                    item={item}
                    index={index}
                    onRemove={handleRemoveImage}
                    onTagChange={handleImageTagChange}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Grid>

        {/* Show CTA Section Switch */}
        {/* <Grid size={{ xs: 12 }}>
          <Controller
            control={form.control}
            name="showCTA"
            render={({ field: { onChange, value } }) => (
              <CustomSwitch
                checked={!!value}
                onChange={(e) => onChange(e.target.checked)}
                label="Show CTA Section ?"
              />
            )}
          />
        </Grid> */}

        <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              disableRipple
              disabled={cmsContentSaveLoading || isInsertingCta}
              loading={cmsContentSaveLoading && !isInsertingCta}
              onClick={form.handleSubmit(onSubmit)}
            >
              Add Content
            </CustomButtonPrimary>

            <CustomButtonPrimary
              variant="contained"
              color="primary"
              disableRipple
              disabled={cmsContentSaveLoading || isInsertingCta}
              loading={isInsertingCta}
              onClick={handleInsertCTA}
            >
              Insert CTA
            </CustomButtonPrimary>
          </Box>
        </Grid>
      </Grid>

      {/* Image Cropper Modal */}
      {currentCropImage && (
        <ImageCropperModal
          open={cropperOpen}
          image={currentCropImage}
          fileName={currentCropFileName}
          aspectRatio={IMAGE_ASPECT_RATIO_DEFINE.slidingImage}
          onClose={handleCropperClose}
          onCropComplete={handleCropComplete}
        />
      )}
    </Box>
  );
};

export default NewCmsContentAdd;
