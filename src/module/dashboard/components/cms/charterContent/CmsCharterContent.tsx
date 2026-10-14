'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditIcon from '@mui/icons-material/Edit';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Pagination,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import CmsCharterContentAdd from './CmsCharterContentAdd';
import CmsCharterContentEdit from './CmsCharterContentEdit';

import ImgComp, { CommonModalContentWrap } from '@/@core/components/images/ImgComp';
import PageLoader from '@/@core/components/others/PageLoader';
import { mediaUrl } from '@/api/endpoints';
import {
  useCmsContentDelete,
  useCmsContentGetAll,
  useCmsContentReorder,
} from '@/api/hooks/cms/content/hooks';
import { HIGH_QUALITY_IMAGE_DEFINE, PurposeTypeValue } from '@/constant';
import { rawHtmlSanitize } from '@/lib/functions/sanitize';
import { GroupHeading } from '@/module/seo/components/SeoCompForm';
import { TEachCmsContent } from '@/types/apps/cms/content/index.type';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import SortableListWrapper from '@/ui/Sortable/SortableListWrapper';

type TCmsContentProps = {
  slug: TSeoStaticSlug;
  isDraggable?: boolean;
};

const CmsCharterContent = ({ slug, isDraggable = true }: TCmsContentProps) => {
  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [items, setItems] = useState<TEachCmsContent[]>([]);

  const {
    data: cmsContentList,
    isLoading: cmsContentListLoading,
    refetch: refetchTheList,
  } = useCmsContentGetAll({
    pageSlug: slug,
    page: currentPageValue,
    perPage: 100,
    search: '',
    purpose: PurposeTypeValue.cms.homepage.homepageCharterContent,
  });

  const { mutate: reorderContent } = useCmsContentReorder({
    optionalCallback: () => {
      refetchTheList();
    },
  });

  useEffect(() => {
    if (cmsContentList?.docs) {
      setItems(cmsContentList.docs);
    }
  }, [cmsContentList?.docs]);

  const handleReorder = (newItems: TEachCmsContent[]) => {
    setItems(newItems);
    reorderContent({
      pageSlug: slug,
      purpose: PurposeTypeValue.cms.homepage.homepageCharterContent,
      ids: newItems.map((item) => item?._id),
    });
  };

  return (
    <Box>
      <CmsCharterContentAdd />

      <Box sx={{ mt: 6 }}>
        <Box sx={{ mb: 2 }}>
          <GroupHeading>Content Listing</GroupHeading>
        </Box>

        {cmsContentListLoading ? (
          <PageLoader wrapperCls="" />
        ) : items && items.length > 0 ? (
          <SortableListWrapper items={items} onReorder={handleReorder} enabled={isDraggable}>
            <Box>
              {items.map((eachContent) => (
                <EachCmsContent
                  eachContent={eachContent}
                  key={eachContent?._id}
                  isDraggable={isDraggable}
                  refetchTheList={() => {
                    refetchTheList();
                  }}
                />
              ))}
            </Box>
          </SortableListWrapper>
        ) : (
          <Box
            sx={{
              p: 6,
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px dashed rgba(212, 175, 55, 0.3)',
              borderRadius: '12px',
              backdropFilter: 'blur(4px)',
            }}
          >
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem' }}>
              No content added yet.
            </Typography>
          </Box>
        )}

        {cmsContentList && cmsContentList?.meta?.totalPages > 1 ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className="pagination-stack"
            flexWrap="wrap"
            sx={{
              mt: 4,
              p: 2,
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              Showing {cmsContentList?.meta?.limit} of {cmsContentList?.meta?.page} • Pages{' '}
              {cmsContentList?.meta?.totalPages}
            </Typography>
            <Pagination
              count={cmsContentList?.meta?.totalPages}
              page={currentPageValue}
              onChange={(_event, page) => {
                setCurrentPageValue(page);
              }}
              hidePrevButton
              hideNextButton
              variant="outlined"
              shape="rounded"
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#FFFFFF',
                  borderColor: 'rgba(212, 175, 55, 0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(212, 175, 55, 0.2)',
                    borderColor: '#D4AF37',
                    '&:hover': {
                      backgroundColor: 'rgba(212, 175, 55, 0.3)',
                    },
                  },
                },
              }}
            />
          </Stack>
        ) : null}
      </Box>
    </Box>
  );
};

export default CmsCharterContent;

const EachCmsContent = ({
  eachContent,
  refetchTheList,
  isDraggable = true,
}: {
  eachContent: TEachCmsContent;
  refetchTheList: () => void;
  isDraggable?: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: eachContent?._id,
    disabled: !isDraggable,
  });

  const style = isDraggable
    ? {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    }
    : undefined;
  const isFaq = Boolean(eachContent?.hasFaq);
  const cardBorder = isDragging
    ? '1px solid rgba(212, 175, 55, 0.6)'
    : isFaq
      ? '1px solid rgba(212, 175, 55, 0.45)'
      : '1px solid rgba(255, 255, 255, 0.08)';
  const shouldShowFaqTitle =
    isFaq && eachContent?.title?.trim().toLowerCase() !== 'frequently asked questions';
  const faqPlaceholderText =
    'The FAQ list for this page will render here on the website. This block only marks the FAQ section position in the content order.';

  return (
    <Grid ref={setNodeRef} style={style} size={{ xs: 12 }} key={eachContent?._id}>
      <Card
        sx={{
          background: isDragging ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
          border: cardBorder,
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          overflow: 'hidden',
          borderRadius: '12px',
          mb: 3,
          transition: 'all 0.3s ease-in-out',
          position: 'relative',
          boxShadow: isDragging
            ? '0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 15px rgba(212, 175, 55, 0.2)'
            : 'none',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(212, 175, 55, 0.4)',
            boxShadow: isDragging
              ? '0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 15px rgba(212, 175, 55, 0.2)'
              : '0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 15px rgba(212, 175, 55, 0.1)',
            transform: isDragging ? 'none' : 'translateY(-2px)',
          },
        }}
      >
        {isDraggable && (
          <Box
            {...attributes}
            {...listeners}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 1.5,
              cursor: isDragging ? 'grabbing' : 'grab',
              color: 'rgba(255, 255, 255, 0.3)',
              borderRight: '1px solid rgba(255, 255, 255, 0.05)',
              background: 'rgba(255, 255, 255, 0.01)',
              '&:hover': {
                color: '#D4AF37',
                background: 'rgba(212, 175, 55, 0.05)',
              },
            }}
          >
            <DragIndicatorIcon />
          </Box>
        )}

        {isFaq ? null : (
          <figure
            style={{
              width: '120px',
              height: '103px',
              position: 'relative',
              margin: '12px',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '2px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            }}
          >
            <ImgComp
              src={mediaUrl(eachContent?.image)}
              alt={mediaUrl(eachContent?.image)}
              width={HIGH_QUALITY_IMAGE_DEFINE?.width}
              height={HIGH_QUALITY_IMAGE_DEFINE?.height}
              isImagePreview={true}
            />
          </figure>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            p: 2,
            position: 'relative',
          }}
        >
          <CardContent sx={{ flex: '1 0 auto', p: '0 !important', pr: isFaq ? 0 : 8 }}>
            {isFaq ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <HelpOutlineIcon sx={{ color: '#D4AF37', fontSize: 22 }} />
                <Typography sx={{ color: '#D4AF37', fontWeight: 700, fontSize: '1.05rem' }}>
                  Frequently Asked Questions
                </Typography>
              </Box>
            ) : null}
            {isFaq && !shouldShowFaqTitle ? null : (
              <Typography
                variant="h6"
                sx={{
                  color: isFaq ? 'rgba(255,255,255,0.86)' : '#D4AF37',
                  fontWeight: isFaq ? 700 : 600,
                  fontSize: isFaq ? '1rem' : '1.1rem',
                  letterSpacing: '0.5px',
                  mb: 0.5,
                }}
              >
                {eachContent?.title}
              </Typography>
            )}
            {isFaq ? (
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', lineHeight: 1.6 }}
              >
                {faqPlaceholderText}
              </Typography>
            ) : (
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginTop: '8px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: 1.6,
                  fontSize: '0.875rem',
                }}
                dangerouslySetInnerHTML={{
                  __html: rawHtmlSanitize(eachContent.description ?? ''),
                }}
              />
            )}
          </CardContent>

          {/* --------- */}
          {!isFaq ? (
            <ECmsContentEditDelete
              key={`each_content_edit_delete_${eachContent?._id}`}
              eachContent={eachContent}
              refetchTheList={refetchTheList}
            />
          ) : null}
        </Box>
      </Card>
    </Grid>
  );
};

const ECmsContentEditDelete = ({
  eachContent,
  refetchTheList,
}: {
  eachContent: TEachCmsContent;
  refetchTheList: () => void;
}) => {
  const theme = useTheme();
  const [getEditModal, setEditModal] = useState(false);
  const [getDeleteModal, setDeleteModal] = useState(false);

  const openEditModal = useCallback(() => {
    setEditModal(true);
  }, [setEditModal]);

  const closeEditModal = useCallback(() => {
    setEditModal(false);
  }, [setEditModal]);

  const openDeleteModal = useCallback(() => {
    setDeleteModal(true);
  }, [setDeleteModal]);

  const closeDeleteModal = useCallback(() => {
    setDeleteModal(false);
  }, [setDeleteModal]);

  const { mutateAsync: deleteTheContent, isPending: deleteTheContentLoading } = useCmsContentDelete(
    {
      optionalCallback: () => {
        closeDeleteModal();
        refetchTheList();
      },
      errorCallback: () => {
        closeDeleteModal();
      },
    },
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1.5,
          position: 'absolute',
          top: 16,
          right: 16,
        }}
      >
        <IconButton
          onClick={openEditModal}
          sx={{
            color: '#D4AF37',
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(212, 175, 55, 0.2)',
              transform: 'scale(1.1)',
              borderColor: '#D4AF37',
            },
          }}
          size="small"
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={openDeleteModal}
          sx={{
            color: '#F44336',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            border: '1px solid rgba(244, 67, 54, 0.2)',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(244, 67, 54, 0.2)',
              transform: 'scale(1.1)',
              borderColor: '#F44336',
            },
          }}
          size="small"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Edit Modal */}
      <MuiModalWrapper
        open={getEditModal}
        onClose={closeEditModal}
        isAutoClose={false}
        maxWidth="lg"
        fullWidth
      >
        <CommonModalContentWrap>
          <Stack
            direction="row"
            alignItems="center"
            className="headStack"
            sx={{
              borderBottom: `1px solid ${theme.palette.customColors?.colorB2535F ?? '#ffffff1f'}`,
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: '32px !important',
              }}
            >
              Update Content
            </Typography>
          </Stack>

          <CmsCharterContentEdit
            eachContent={eachContent}
            optionalCallback={() => {
              refetchTheList();
              closeEditModal();
            }}
          />
        </CommonModalContentWrap>
      </MuiModalWrapper>
      {/*  */}

      {/* Delete Modal */}
      <MuiModalWrapper open={getDeleteModal} onClose={closeDeleteModal} isAutoClose={false}>
        <CommonModalContentWrap>
          <Stack direction="row" alignItems="center" className="headStack">
            <Typography sx={{ fontSize: '32px !important' }}>Alert!</Typography>
          </Stack>

          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '20px',
              fontWeight: '600',
            }}
          >
            Are you sure want to delete this content?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={deleteTheContentLoading}
              disabled={deleteTheContentLoading}
              onClick={() => {
                deleteTheContent(eachContent?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={deleteTheContentLoading}
              onClick={closeDeleteModal}
            >
              No
            </CustomButtonPrimary>
          </Stack>
        </CommonModalContentWrap>
      </MuiModalWrapper>
      {/*  */}
    </>
  );
};
