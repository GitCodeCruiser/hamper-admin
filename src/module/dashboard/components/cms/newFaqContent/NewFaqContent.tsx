'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditIcon from '@mui/icons-material/Edit';
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

import NewFaqContentAdd from './NewFaqContentAdd';
import NewFaqContentEdit from './NewFaqContentEdit';

import { CommonModalContentWrap } from '@/@core/components/images/ImgComp';
import PageLoader from '@/@core/components/others/PageLoader';
import { useCmsFaqDelete, useCmsFaqGetAll, useCmsFaqReorder } from '@/api/hooks/cms/faq/hooks';
import { rawHtmlSanitize } from '@/lib/functions/sanitize';
import { GroupHeading } from '@/module/seo/components/SeoCompForm';
import { TEachCmsFaq } from '@/types/apps/cms/faq/index.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import SortableListWrapper from '@/ui/Sortable/SortableListWrapper';

type TNewFaqContentProps = {
  purpose: string;
  isDraggable?: boolean;
};

const NewFaqContent = ({ purpose, isDraggable = true }: TNewFaqContentProps) => {
  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [items, setItems] = useState<TEachCmsFaq[]>([]);

  const {
    data: faqContentList,
    isLoading: faqContentListLoading,
    refetch: refetchTheList,
  } = useCmsFaqGetAll({
    page: currentPageValue,
    perPage: 100,
    search: '',
    purpose,
  });

  const { mutate: reorderContent } = useCmsFaqReorder({
    optionalCallback: () => {
      refetchTheList();
    },
  });

  useEffect(() => {
    if (faqContentList?.docs) {
      setItems(faqContentList.docs);
    }
  }, [faqContentList?.docs]);

  const handleReorder = (newItems: TEachCmsFaq[]) => {
    setItems(newItems);
    reorderContent({
      purpose,
      ids: newItems.map((item) => item?._id),
    });
  };

  return (
    <Box>
      <NewFaqContentAdd purpose={purpose} onSuccess={() => refetchTheList()} />

      <Box sx={{ mt: 6 }}>
        <Box sx={{ mb: 2 }}>
          <GroupHeading>FAQ Listing</GroupHeading>
        </Box>

        {faqContentListLoading ? (
          <PageLoader wrapperCls="" />
        ) : items && items.length > 0 ? (
          <SortableListWrapper items={items} onReorder={handleReorder} enabled={isDraggable}>
            <Box>
              {items.map((eachContent) => (
                <EachFAQBlurb
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
              No FAQ added yet.
            </Typography>
          </Box>
        )}

        {faqContentList && faqContentList?.meta?.totalPages > 0 ? (
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
              Showing {faqContentList?.meta?.limit} of {faqContentList?.meta?.page} • Pages{' '}
              {faqContentList?.meta?.totalPages}
            </Typography>
            <Pagination
              count={faqContentList?.meta?.totalPages}
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

export default NewFaqContent;

export const EachFAQBlurb = ({
  eachContent,
  refetchTheList,
  isDraggable = true,
}: {
  eachContent: TEachCmsFaq;
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

  const question = eachContent?.question;
  const answer = eachContent?.answer;

  return (
    <Grid
      size={{ xs: 12 }}
      key={eachContent?._id}
      {...(isDraggable ? { ref: setNodeRef, style } : {})}
    >
      <Card
        sx={{
          background: isDragging ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
          border: isDragging
            ? '1px solid rgba(212, 175, 55, 0.6)'
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
            : 'none',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(212, 175, 55, 0.4)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 15px rgba(212, 175, 55, 0.1)',
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
              color: 'rgba(255, 255, 255, 0.3)',
              borderRight: '1px solid rgba(255, 255, 255, 0.05)',
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
              transition: 'all 0.2s ease',
              '&:hover': {
                color: '#D4AF37',
                backgroundColor: 'rgba(212, 175, 55, 0.05)',
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
              {question}
            </Typography>
            <div
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                marginTop: '8px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: 1.6,
                fontSize: '0.875rem',
              }}
              dangerouslySetInnerHTML={{
                __html: rawHtmlSanitize(answer ?? ''),
              }}
            />
          </CardContent>

          {/* --------- */}
          <EFaqContentEditDelete
            key={`each_faq_edit_delete_${eachContent?._id}`}
            eachContent={eachContent}
            refetchTheList={refetchTheList}
          />
        </Box>
      </Card>
    </Grid>
  );
};

const EFaqContentEditDelete = ({
  eachContent,
  refetchTheList,
}: {
  eachContent: TEachCmsFaq;
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

  const { mutateAsync: deleteTheContent, isPending: deleteTheContentLoading } = useCmsFaqDelete({
    optionalCallback: () => {
      closeDeleteModal();
      refetchTheList();
    },
    errorCallback: () => {
      closeDeleteModal();
    },
  });

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
              Update FAQ
            </Typography>
          </Stack>

          <NewFaqContentEdit
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
            Are you sure want to delete this FAQ?
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
