import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid, InputLabel, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { mediaUrl } from '@/api/endpoints';
import { useCmsContentCreate } from '@/api/hooks/cms/content/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import {
  cmsContentAdd,
  TCmsContentAddType,
} from '@/module/dashboard/validation/cms/content/cmsContentSchema.zod';
import { GroupHeading } from '@/module/seo/components/SeoCompForm';
import CKEditorRichText from '@/ui/CkEditor/Ckeditorrichtext';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

type TCmsContentAddProps = {
  pageName: string;
  pageSlug: string;
  purpose: string;
  onSuccess?: () => void;
};

const CmsContentAdd = ({ pageName, pageSlug, purpose, onSuccess }: TCmsContentAddProps) => {
  const theme = useTheme();

  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [uploadImageSize, setUploadImageSize] = useState<number | null>(null);

  const form = useForm<TCmsContentAddType>({
    resolver: zodResolver(cmsContentAdd()),
    defaultValues: {
      title: '',
      description: '',
      url: '',
      imageTag: '',
    },
  });

  const errors = form.formState.errors;

  const { mutateAsync: cmsContentSave, isPending: cmsContentSaveLoading } = useCmsContentCreate({
    optionalCallback: () => {
      form.reset({
        title: '',
        description: '',
        url: '',
        image: undefined,
        imageTag: '',
      });
      setUploadImage(null);
      setUploadImageSize(null);
      if (onSuccess) onSuccess();
    },
    errorCallback: () => { },
  });

  const onSubmit = (data: TCmsContentAddType) => {
    // console.log(data, '@TEST');

    const formData = new FormData();
    formData.append('pageName', pageName);
    formData.append('pageSlug', pageSlug);
    formData.append('purpose', purpose);

    formData.append('title', data?.title ?? '');

    formData.append('description', data?.description);
    formData.append('url', data?.url ?? '');
    formData.append('imageTag', data?.imageTag ?? '');

    if (typeof data?.image) {
      formData.append('image', data?.image);
    }

    cmsContentSave(formData);
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
            disabled={cmsContentSaveLoading}
            loading={cmsContentSaveLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            Add Content
          </CustomButtonPrimary>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CmsContentAdd;
