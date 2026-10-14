import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid, InputLabel, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { mediaUrl } from '@/api/endpoints';
import { useCmsContentUpdate } from '@/api/hooks/cms/content/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import {
  cmsContentEdit,
  TCmsContentEditType,
} from '@/module/dashboard/validation/cms/content/cmsContentSchema.zod';
import { TEachCmsContent } from '@/types/apps/cms/content/index.type';
import CKEditorRichText from '@/ui/CkEditor/Ckeditorrichtext';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

type CmsContentEditProps = {
  eachContent: TEachCmsContent;
  optionalCallback: () => void;
};

const CmsCharterContentEdit = ({ eachContent, optionalCallback }: CmsContentEditProps) => {
  const theme = useTheme();

  const [uploadImage, setUploadImage] = useState<File | string | null>(null);
  const [uploadImageSize, setUploadImageSize] = useState<number | null>(null);

  const form = useForm<TCmsContentEditType>({
    resolver: zodResolver(cmsContentEdit()),
    defaultValues: {
      title: '',
      description: '',
      url: '',
      imageTag: '',
    },
  });

  const errors = form.formState.errors;

  const { mutateAsync: cmsContentUpdate, isPending: cmsContentUpdateLoading } = useCmsContentUpdate(
    {
      optionalCallback: () => {
        optionalCallback();
      },
      errorCallback: () => { },
    },
  );

  const onSubmit = (data: TCmsContentEditType) => {
    // console.log(data, '@TEST');

    const formData = new FormData();
    formData.append('id', eachContent?._id);
    if (data?.title) {
      formData.append('title', data?.title);
    }
    formData.append('description', data?.description);
    formData.append('url', data?.url ?? '');
    formData.append('imageTag', data?.imageTag ?? '');

    if (typeof data?.image) {
      formData.append('image', data?.image);
    }

    cmsContentUpdate(formData);
  };

  useEffect(() => {
    form.reset({
      title: eachContent?.title ?? '',
      description: eachContent?.description ?? '',
      url: eachContent?.url ?? '',
      imageTag: eachContent?.imageTag ?? '',

      ...(eachContent?.image && eachContent?.image?.length > 0
        ? {
          image: eachContent?.image ?? '',
        }
        : {}),
    });

    setUploadImage(() =>
      eachContent?.image && eachContent?.image?.length > 0 ? eachContent?.image : null,
    );

    setUploadImageSize(() => eachContent?.imageSize ?? null);

    return () => { };
  }, [
    eachContent?.title,
    eachContent?.description,
    eachContent?.url,
    eachContent?.image,
    eachContent?.imageSize,
    eachContent?.imageTag,
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
        {/* <Controller
          control={form.control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Description"
              placeholder="Enter description"
              value={value ?? ''}
              onChange={onChange}
              multiline
              rows={3}
              error={!!errors?.description}
              helperText={errors?.description?.message}
            />
          )}
        /> */}

        <Controller
          control={form.control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <CKEditorRichText
              editorBackground="burgundy"
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

      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
          URL
        </InputLabel>
        <Controller
          control={form.control}
          name="url"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Url"
              placeholder="https://example.com/page"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.url}
              helperText={errors?.url?.message}
            />
          )}
        />
      </Grid>

      {/* Image Upload */}
      <Grid size={{ xs: 12 }}>
        <Box>
          <InputLabel
            sx={{
              color: '#D4AF37',
              fontSize: '0.9rem',
              fontWeight: 600,
              mb: 1,
            }}
          >
            Image
          </InputLabel>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            {uploadImage === null ? (
              <SingleImgMainComp
                dataValueGetter={(value) => {
                  // console.log(value, '@TEST');

                  if (value) {
                    setUploadImage(() => value);
                    setUploadImageSize(() => value.size);

                    form.setValue('image', value as File);
                    form.clearErrors('image');
                  }
                }}
                errorValueGetter={(errorMessage) => {
                  setUploadImageSize(() => null);
                  form.setError('image', { message: errorMessage });
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
                  typeof uploadImage === 'string'
                    ? mediaUrl(uploadImage)
                    : URL?.createObjectURL(uploadImage)
                }
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete) => {
                  if (shouldDelete) {
                    setUploadImage(() => null);
                    setUploadImageSize(() => null);
                    form.setValue('image', undefined as unknown as File);
                  }
                }}
                imageSize={uploadImageSize}
              />
            )}
          </Box>

          {errors.image ? (
            <Typography variant="body1" className="error_msg">
              {errors?.image.message}
            </Typography>
          ) : null}
        </Box>
      </Grid>

      {/* Image Alt Tag */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
          Image Alt Tag*
        </InputLabel>
        <Controller
          control={form.control}
          name="imageTag"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Image Alt Tag"
              placeholder="Enter image alt tag"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.imageTag}
              helperText={errors?.imageTag?.message}
            />
          )}
        />
      </Grid>

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
    </Grid>
  );
};

export default CmsCharterContentEdit;
