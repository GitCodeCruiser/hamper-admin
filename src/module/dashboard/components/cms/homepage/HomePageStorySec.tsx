'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  InputLabel,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import zod from 'zod';

import { mediaUrl } from '@/api/endpoints';
import { useCmsContentGetAll } from '@/api/hooks/cms/content/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import { IMAGE_ACCEPT } from '@/constant';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

// ─── Types & Schema ──────────────────────────────────────────────────────────

const storySchema = () => {
  return zod.object({
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    description: zod.string().trim().min(1, { message: 'Description is required' }),
    image: zod
      .union([zod.string(), zod.instanceof(File)], {
        required_error: 'Image is required',
        invalid_type_error: 'Image is required',
      })
      .refine((value) => value !== null && value !== undefined && value !== '', {
        message: 'Image is required',
      })
      .refine(
        (value) => {
          if (typeof value === 'string') return true;
          if (value instanceof File) return IMAGE_ACCEPT.split(',').includes(value.type);
          return false;
        },
        { message: 'Invalid image format' },
      ),
  });
};

type TStorySchemaType = zod.infer<ReturnType<typeof storySchema>>;

type TStoryItem = TStorySchemaType & {
  id: string;
};

type THomePageStorySecProps = {
  slug: TSeoStaticSlug;
};

// ─── Component ──────────────────────────────────────────────────────────────

const HomePageStorySec = ({ slug }: THomePageStorySecProps) => {
  const [stories, setStories] = useState<TStoryItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | string | null>(null);

  const { data: cmsContentList, isLoading: cmsContentListLoading } = useCmsContentGetAll({
    page: 1,
    perPage: 3,
    search: '',
  });

  const form = useForm<TStorySchemaType>({
    resolver: zodResolver(storySchema()),
    defaultValues: {
      title: '',
      description: '',
      image: undefined,
    },
  });

  const onSubmit = (data: TStorySchemaType) => {
    if (editingId) {
      // Update existing story
      setStories((prev) =>
        prev.map((item) => (item.id === editingId ? { ...data, id: editingId } : item)),
      );
      setEditingId(null);
    } else {
      // Add new story
      const newStory: TStoryItem = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
      };
      setStories((prev) => [...prev, newStory]);
    }

    // Reset form
    form.reset({
      title: '',
      description: '',
      image: '',
    });
    setUploadedImage(null);
  };

  const handleEdit = (story: TStoryItem) => {
    setEditingId(story.id);
    form.reset({
      title: story.title,
      description: story.description,
      image: story.image,
    });
    setUploadedImage(story.image);
  };

  const handleDelete = (id: string) => {
    setStories((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
      form.reset();
      setUploadedImage(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    form.reset({
      title: '',
      description: '',
      image: '',
    });
    setUploadedImage(null);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // setPage(value);
  };

  return (
    <Box>
      {/* ─── Form Section ─────────────────────────────────────────────────── */}
      <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2 }}>
        {editingId ? 'Edit Story' : 'Add New Story'}
      </Typography>

      <Grid container spacing={3}>
        {/* Upload Image */}
        <Grid size={{ xs: 12 }}>
          <Box className="uploadImgWrapper">
            <InputLabel sx={{ color: '#FFFFFF', mb: 1 }}>Image*</InputLabel>
            <Box className="allImgUploadWrap">
              {!uploadedImage ? (
                <SingleImgMainComp
                  dataValueGetter={(value) => {
                    if (value) {
                      setUploadedImage(value as File);
                      form.setValue('image', value as File);
                      form.clearErrors('image');
                    }
                  }}
                  errorValueGetter={(errorMessage) => {
                    form.setError('image', { message: errorMessage });
                  }}
                >
                  <PlusIconUpload />
                </SingleImgMainComp>
              ) : (
                <ImgPreviewMainComp
                  sx={{
                    width: '120px !important',
                    height: '120px !important',
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}
                  src={
                    typeof uploadedImage === 'string'
                      ? uploadedImage.startsWith('http') || uploadedImage.startsWith('/')
                        ? uploadedImage
                        : mediaUrl(uploadedImage)
                      : URL.createObjectURL(uploadedImage)
                  }
                  isPreviewOnly={false}
                  onDeleteHandler={(shouldDelete) => {
                    if (shouldDelete) {
                      setUploadedImage(null);
                      form.setValue('image', '' as any);
                    }
                  }}
                />
              )}
            </Box>
            {form.formState.errors?.image && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {form.formState.errors?.image?.message}
              </Typography>
            )}
          </Box>
        </Grid>

        {/* Title */}
        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#FFFFFF', mb: 1 }}>Title*</InputLabel>
          <Controller
            control={form.control}
            name="title"
            render={({ field }) => (
              <InputFieldCommon
                {...field}
                placeholder="Enter story title"
                error={!!form.formState.errors?.title}
                helperText={form.formState.errors?.title?.message}
              />
            )}
          />
        </Grid>

        {/* Description */}
        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#FFFFFF', mb: 1 }}>Description*</InputLabel>
          <Controller
            control={form.control}
            name="description"
            render={({ field }) => (
              <InputFieldCommon
                {...field}
                placeholder="Enter story description"
                multiline
                rows={4}
                error={!!form.formState.errors?.description}
                helperText={form.formState.errors?.description?.message}
              />
            )}
          />
        </Grid>

        {/* Actions */}
        <Grid size={{ xs: 12 }}>
          <Stack direction="row" spacing={2}>
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              onClick={form.handleSubmit(onSubmit)}
            >
              {editingId ? 'Update Story' : 'Add Story'}
            </CustomButtonPrimary>
            {editingId && (
              <CustomButtonPrimary variant="outlined" color="secondary" onClick={handleCancelEdit}>
                Cancel
              </CustomButtonPrimary>
            )}
          </Stack>
        </Grid>
      </Grid>

      {/* ─── Listing Section ─────────────────────────────────────────────── */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 3 }}>
          Stories Listing ({stories.length})
        </Typography>

        {stories.length === 0 ? (
          <Box
            sx={{
              p: 4,
              textAlign: 'center',
              border: '1px dashed rgba(255,255,255,0.2)',
              borderRadius: '8px',
            }}
          >
            <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>No stories added yet.</Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
              {stories.map((story) => (
                <Grid size={{ xs: 12 }} key={story.id}>
                  <Card
                    sx={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      overflow: 'hidden',
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: { xs: '100%', sm: 140 },
                        height: { xs: 140, sm: 'auto' },
                        objectFit: 'cover',
                      }}
                      image={
                        typeof story.image === 'string'
                          ? story.image.startsWith('http') || story.image.startsWith('/')
                            ? story.image
                            : mediaUrl(story.image)
                          : URL.createObjectURL(story.image)
                      }
                      alt={story.title}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        p: 2,
                      }}
                    >
                      <CardContent sx={{ flex: '1 0 auto', p: '0 !important' }}>
                        <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                          {story.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'rgba(255,255,255,0.7)',
                            mt: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {story.description}
                        </Typography>
                      </CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 1,
                          mt: 2,
                        }}
                      >
                        <IconButton
                          onClick={() => handleEdit(story)}
                          sx={{
                            color: '#FFFFFF',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
                          }}
                          size="small"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(story.id)}
                          sx={{
                            color: '#F44336',
                            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                            '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.2)' },
                          }}
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/*  */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              className="pagination-stack"
              flexWrap="wrap"
            >
              <Typography variant="body2">Showing 10 of 10 of 564</Typography>
              <Pagination
                count={36}
                page={1}
                onChange={handleChange}
                hidePrevButton
                hideNextButton
                variant="text"
                shape="rounded"
                color="secondary"
              />
            </Stack>
          </>
        )}
      </Box>
    </Box>
  );
};

export default HomePageStorySec;

const HomePageStoryAdd = () => {
  return <Box>Test</Box>;
};
