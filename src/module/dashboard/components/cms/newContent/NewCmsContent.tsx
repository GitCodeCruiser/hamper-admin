'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CampaignIcon from '@mui/icons-material/Campaign';
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

import NewCmsContentAdd from './NewCmsContentAdd';
import NewCmsContentEdit from './NewCmsContentEdit';

import { CommonModalContentWrap } from '@/@core/components/images/ImgComp';
import PageLoader from '@/@core/components/others/PageLoader';
import {
  useCmsContentDelete,
  useCmsContentGetAll,
  useCmsContentReorder,
} from '@/api/hooks/cms/content/hooks';
import { rawHtmlSanitize } from '@/lib/functions/sanitize';
import { GroupHeading } from '@/module/seo/components/SeoCompForm';
import { TEachCmsContent } from '@/types/apps/cms/content/index.type';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import SortableListWrapper from '@/ui/Sortable/SortableListWrapper';

type TNewCmsContentProps = {
  slug: TSeoStaticSlug;
  pageName: string;
  purpose: string;
  isDraggable?: boolean;
};

const NewCmsContent = ({ slug, pageName, purpose, isDraggable = true }: TNewCmsContentProps) => {
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
    purpose,
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
      purpose,
      ids: newItems.map((item) => item?._id),
    });
  };

  return (
    <Box>
      <NewCmsContentAdd
        pageName={pageName}
        pageSlug={slug}
        purpose={purpose}
        onSuccess={() => refetchTheList()}
      />

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
                <EachNewCmsContent
                  eachContent={eachContent}
                  key={eachContent._id}
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

        {cmsContentList && cmsContentList?.meta?.totalPages > 0 ? (
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

export default NewCmsContent;

const EachNewCmsContent = ({
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
      opacity: isDragging ? 0.6 : 1,
      zIndex: isDragging ? 999 : 'auto',
    }
    : {};

  const isCTA = Boolean(eachContent?.showCTA);
  const isFaq = Boolean(eachContent?.hasFaq);
  const shouldShowFaqTitle =
    isFaq && eachContent?.title?.trim().toLowerCase() !== 'frequently asked questions';
  const faqPlaceholderText =
    'The FAQ list for this page will render here on the website. This block only marks the FAQ section position in the content order.';

  return (
    <Grid
      size={{ xs: 12 }}
      key={eachContent?._id}
      {...(isDraggable ? { ref: setNodeRef, style } : {})}
    >
      <Card
        sx={{
          background: isDragging
            ? 'rgba(212, 175, 55, 0.15)'
            : isFaq
              ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(255, 255, 255, 0.035) 100%)'
              : isCTA
                ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)'
                : 'rgba(255, 255, 255, 0.03)',
          border: isDragging
            ? '1px solid rgba(212, 175, 55, 0.8)'
            : isFaq
              ? '1px solid rgba(212, 175, 55, 0.45)'
              : isCTA
                ? '1px dashed rgba(212, 175, 55, 0.5)'
                : '1px solid rgba(255, 255, 255, 0.08)',
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
            : isFaq
              ? '0 4px 20px 0 rgba(212, 175, 55, 0.06)'
              : isCTA
                ? '0 4px 20px 0 rgba(212, 175, 55, 0.05)'
                : 'none',
          '&:hover': {
            background: isFaq
              ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.14) 0%, rgba(255, 255, 255, 0.055) 100%)'
              : isCTA
                ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.16) 0%, rgba(255, 255, 255, 0.05) 100%)'
                : 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(212, 175, 55, 0.5)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 15px rgba(212, 175, 55, 0.15)',
            transform: 'translateY(-2px)',
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
              cursor: 'grab',
              color: isFaq || isCTA ? 'rgba(212, 175, 55, 0.6)' : 'rgba(255, 255, 255, 0.3)',
              borderRight:
                isFaq || isCTA
                  ? '1px solid rgba(212, 175, 55, 0.2)'
                  : '1px solid rgba(255, 255, 255, 0.05)',
              backgroundColor:
                isFaq || isCTA ? 'rgba(212, 175, 55, 0.03)' : 'rgba(255, 255, 255, 0.01)',
              transition: 'all 0.2s ease',
              '&:hover': {
                color: '#D4AF37',
                backgroundColor: 'rgba(212, 175, 55, 0.08)',
              },
              '&:active': {
                cursor: 'grabbing',
                color: '#D4AF37',
              },
            }}
          >
            <DragIndicatorIcon />
          </Box>
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
          {isFaq ? (
            <CardContent
              sx={{
                flex: '1 0 auto',
                p: '0 !important',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 44,
                  height: 44,
                  minWidth: 44,
                  borderRadius: '10px',
                  background: 'rgba(212, 175, 55, 0.14)',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  color: '#D4AF37',
                }}
              >
                <HelpOutlineIcon sx={{ fontSize: 24 }} />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1, flexWrap: 'wrap' }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#D4AF37',
                      fontWeight: 700,
                      fontSize: '1.05rem',
                    }}
                  >
                    Frequently Asked Questions
                  </Typography>
                  <Box
                    sx={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      px: 1,
                      py: 0.25,
                      borderRadius: '4px',
                      backgroundColor: 'rgba(212, 175, 55, 0.18)',
                      color: '#D4AF37',
                      border: '1px solid rgba(212, 175, 55, 0.35)',
                      textTransform: 'uppercase',
                    }}
                  >
                    FAQ
                  </Box>
                </Box>
                {shouldShowFaqTitle ? (
                  <Typography
                    variant="subtitle1"
                    sx={{ color: 'rgba(255, 255, 255, 0.86)', fontWeight: 700, mb: 1 }}
                  >
                    {eachContent.title}
                  </Typography>
                ) : null}
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                  }}
                >
                  {faqPlaceholderText}
                </Typography>
              </Box>
            </CardContent>
          ) : isCTA ? (
            <CardContent
              sx={{
                flex: '1 0 auto',
                p: '0 !important',
                pr: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 44,
                  height: 44,
                  minWidth: 44,
                  borderRadius: '10px',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  color: '#D4AF37',
                }}
              >
                <CampaignIcon sx={{ fontSize: 24 }} />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#D4AF37',
                      fontWeight: 600,
                      fontSize: '1.05rem',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Call To Action (CTA) Section
                  </Typography>
                  <Box
                    sx={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      px: 1,
                      py: 0.25,
                      borderRadius: '4px',
                      backgroundColor: 'rgba(212, 175, 55, 0.2)',
                      color: '#D4AF37',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    CTA
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.55)',
                    fontSize: '0.85rem',
                  }}
                >
                  CTA banner block will be dynamically displayed at this position on the page.
                </Typography>
              </Box>
            </CardContent>
          ) : (
            <CardContent sx={{ flex: '1 0 auto', p: '0 !important', pr: 8 }}>
              <Typography
                variant="h6"
                sx={{
                  color: '#D4AF37',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  letterSpacing: '0.5px',
                  mb: 0.5,
                }}
              >
                {eachContent?.title}
              </Typography>
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
            </CardContent>
          )}

          {/* --------- */}
          {!isFaq ? (
            <ENewCmsContentEditDelete
              key={`each_content_edit_delete_${eachContent?._id}`}
              eachContent={eachContent}
              refetchTheList={refetchTheList}
              isCTA={isCTA}
            />
          ) : null}
        </Box>
      </Card>
    </Grid>
  );
};

const ENewCmsContentEditDelete = ({
  eachContent,
  refetchTheList,
  isCTA = false,
}: {
  eachContent: TEachCmsContent;
  refetchTheList: () => void;
  isCTA?: boolean;
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
        {!isCTA && (
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
        )}
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
      {!isCTA && (
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

            <NewCmsContentEdit
              eachContent={eachContent}
              optionalCallback={() => {
                refetchTheList();
                closeEditModal();
              }}
            />
          </CommonModalContentWrap>
        </MuiModalWrapper>
      )}
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
            {isCTA
              ? 'Are you sure want to delete this CTA section?'
              : 'Are you sure want to delete this content?'}
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
