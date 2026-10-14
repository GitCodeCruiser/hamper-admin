import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid, InputLabel, Typography, useTheme } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { mediaUrl } from '@/api/endpoints';
import { useCmsContentUpdate } from '@/api/hooks/cms/content/hooks';
import ImageCropperModal from '@/components/Other/ImgMainComp/ImageCropperModal';
import MultipleImgMainComp from '@/components/Other/ImgMainComp/MultipleImgMainComp';
import { IMAGE_ASPECT_RATIO_DEFINE } from '@/constant';
import SlidingImageItemRow from '@/module/dashboard/components/aircraft/SlidingImageItemRow';
import {
  cmsNewContentEdit,
  TCmsNewContentEditType,
} from '@/module/dashboard/validation/cms/newContent/cmsContentSchema.zod';
import { TSlidingImageFormItem } from '@/types/apps/aircraft/index.type';
import { TEachCmsContent } from '@/types/apps/cms/content/index.type';
import CKEditorRichText from '@/ui/CkEditor/Ckeditorrichtext';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

type NewCmsContentEditProps = {
  eachContent: TEachCmsContent;
  optionalCallback: () => void;
};

const NewCmsContentEdit = ({ eachContent, optionalCallback }: NewCmsContentEditProps) => {
  const theme = useTheme();
  const [imagesData, setImagesData] = useState<TSlidingImageFormItem[]>([]);
  const imagesDataRef = useRef<TSlidingImageFormItem[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  // Cropper state
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropQueue, setCropQueue] = useState<File[]>([]);
  const cropQueueRef = useRef<File[]>([]);
  const [currentCropImage, setCurrentCropImage] = useState<string | null>(null);
  const [currentCropFileName, setCurrentCropFileName] = useState<string>('');
  const cropCompleteGuardRef = useRef(false);

  const form = useForm<TCmsNewContentEditType>({
    resolver: zodResolver(cmsNewContentEdit()),
    defaultValues: {
      title: '',
      description: '',
      images: [],
      imagesData: [],
      showCTA: false,
    },
  });

  const errors = form.formState.errors;

  const { mutateAsync: cmsContentUpdate, isPending: cmsContentUpdateLoading } = useCmsContentUpdate(
    {
      optionalCallback: () => {
        optionalCallback();
      },
      errorCallback: () => {},
    },
  );

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
      const deletedItem = imagesDataRef.current[index];
      if (deletedItem && typeof deletedItem.image === 'string') {
        setDeletedImages((prev) => [...prev, deletedItem.image as string]);
      }
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

  const onSubmit = (data: TCmsNewContentEditType) => {
    const formData = new FormData();
    formData.append('id', eachContent?._id);
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
    } else {
      formData.append('imagesData', JSON.stringify([]));
    }

    if (deletedImages && deletedImages.length > 0) {
      deletedImages.forEach((img) => {
        formData.append('deletedImages', img);
      });
    }

    cmsContentUpdate(formData);
  };

  useEffect(() => {
    form.reset({
      id: eachContent?._id,
      title: eachContent?.title ?? '',
      description: eachContent?.description ?? '',
      images: [],
      imagesData: [],
      showCTA: Boolean(eachContent?.showCTA),
    });

    if (eachContent?.imagesData && eachContent.imagesData.length > 0) {
      const initialData: TSlidingImageFormItem[] = eachContent.imagesData.map((item, idx) => ({
        id: item._id || `existing-${idx}`,
        image: item.image,
        size: item.size ?? 0,
        tag: item.tag ?? '',
        _id: item._id,
        previewUrl: mediaUrl(item.image),
      }));
      setImagesData(initialData);
      imagesDataRef.current = initialData;
      form.setValue('imagesData', initialData, { shouldValidate: false });
      form.setValue(
        'images',
        initialData.map((item) => item.image),
        { shouldValidate: false },
      );
    } else if (eachContent?.images && eachContent.images.length > 0) {
      const initialData: TSlidingImageFormItem[] = eachContent.images.map((img, index) => ({
        id: `existing-${index}`,
        image: img,
        size: eachContent.imagesSize?.[index] ?? 0,
        tag: '',
        previewUrl: mediaUrl(img),
      }));
      setImagesData(initialData);
      imagesDataRef.current = initialData;
      form.setValue('imagesData', initialData, { shouldValidate: false });
      form.setValue(
        'images',
        initialData.map((item) => item.image),
        { shouldValidate: false },
      );
    } else {
      setImagesData([]);
      imagesDataRef.current = [];
    }

    setDeletedImages([]);

    return () => {};
  }, [
    eachContent?._id,
    eachContent?.title,
    eachContent?.description,
    eachContent?.images,
    eachContent?.imagesSize,
    eachContent?.imagesData,
    eachContent?.showCTA,
    form,
  ]);

  return (
    <Grid
      container
      rowSpacing={4}
      columnSpacing={3}
      sx={{
        backgroundColor: theme.palette.customColors.textColor,
        p: 4,
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
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
        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={cmsContentUpdateLoading}
          loading={cmsContentUpdateLoading}
          onClick={form.handleSubmit(onSubmit)}
          sx={{
            px: 6,
            py: 1.5,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            boxShadow: '0 4px 14px 0 rgba(212, 175, 55, 0.39)',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(212, 175, 55, 0.23)',
            },
          }}
        >
          Update Content
        </CustomButtonPrimary>
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
    </Grid>
  );
};

export default NewCmsContentEdit;
