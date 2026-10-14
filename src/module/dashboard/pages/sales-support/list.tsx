'use client';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import ReplyIcon from '@mui/icons-material/Reply';
import {
  Box,
  Divider,
  IconButton,
  InputLabel,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  TableCell,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { MouseEvent, Suspense, useCallback, useState } from 'react';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import { CommonModalContentWrap } from '@/@core/components/images/ImgComp';
import PageLoader from '@/@core/components/others/PageLoader';
import { useSalesSupportDelete, useSalesSupportGetAll } from '@/api/hooks/sales-support/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import { HeadingStack } from '@/components/SIngleComponent/SectionHeading';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { PAGE_ROUTE } from '@/routes/index.route';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachSalesSupport } from '@/types/apps/sales-support/index.type';
import { TStatusChangeType } from '@/types/common/common.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

const tableHeadData = ['Action', 'Message', 'Full Name', 'Email', 'Replied?'];

const SalesSupportMain = () => {
  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [salesSupportStatusValue, setSalesSupportStatusValue] = useState<TStatusChangeType | ''>(
    '',
  );
  const [salesSupportSearchRaw, setSalesSupportSearchRaw] = useState('');
  const salesSupportSearchValue = useDebounce(salesSupportSearchRaw, 500);

  const {
    data: salesSupportListData,
    isLoading: salesSupportListDataLoading,
    refetch: refetchTheSalesSupportList,
  } = useSalesSupportGetAll({
    page: currentPageValue,
    perPage: limitValue,
    search: salesSupportSearchValue,
    status: salesSupportStatusValue,
  });

  return (
    <DashboardHome>
      <CommonCardBox>
        <HeadingStack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Typography variant="h3">Sales Support Form Response</Typography>
        </HeadingStack>

        <SearchMainComp
          className="home-srch-select"
          isStatusShow={false}
          isSearchShow
          searchValueGetter={(value) => {
            setSalesSupportSearchRaw(() => value);
          }}
          statusValueGetter={(value) => {
            setSalesSupportStatusValue(() => value as TStatusChangeType);
          }}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              headArray={tableHeadData}
              columnWidths={[undefined, 400, undefined, 300, undefined]}
              data={
                (salesSupportListData?.docs?.length ?? 0 > 0)
                  ? (salesSupportListData?.docs as TEachSalesSupport[])
                  : []
              }
              pageCount={salesSupportListData?.meta?.totalPages ?? 0}
              paginationLabel={`${salesSupportListData?.meta?.totalDocs ?? 0} Results | Page ${salesSupportListData?.meta?.page ?? 1} of ${salesSupportListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={salesSupportListDataLoading}
              noDataPlaceholder="No Sales Support Found!"
              onPageChange={(e, newValue) => {
                setCurrentPageValue(() => newValue);
              }}
              renderRow={(row) => (
                <>
                  <TableCell>
                    <Box className="clamp-text">{row?.message}</Box>
                  </TableCell>
                  <TableCell>{row?.fullName}</TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {row?.email}
                  </TableCell>
                  <TableCell>{row?.isReplied ? 'Yes' : 'No'}</TableCell>
                </>
              )}
              renderActions={(row, index) => (
                <SalesSupportActionComp
                  index={index}
                  row={row}
                  refetchList={() => {
                    refetchTheSalesSupportList();
                  }}
                />
              )}
            />
          </Suspense>
        </ErrorBoundary>
      </CommonCardBox>
    </DashboardHome>
  );
};

export default SalesSupportMain;

const SalesSupportActionComp = ({
  row,
  index,
  refetchList,
}: {
  row: TEachSalesSupport;
  index: number;
  refetchList: () => void;
}) => {
  const router = useRouter();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setActiveRowIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveRowIndex(null);
  };

  const openDeleteModal = useCallback(() => {
    setDeleteModal(true);
    handleMenuClose();
  }, [setDeleteModal]);

  const closeDeleteModal = useCallback(() => {
    setDeleteModal(false);
  }, [setDeleteModal]);

  const openReviewModal = useCallback(() => {
    setReviewModal(true);
    handleMenuClose();
  }, [setReviewModal]);

  const closeReviewModal = useCallback(() => {
    setReviewModal(false);
  }, [setReviewModal]);

  const { mutateAsync: deleteSalesSupport, isPending: deleteSalesSupportLoading } =
    useSalesSupportDelete({
      optionalCallback: () => {
        closeDeleteModal();
        refetchList();
      },
      errorCallback: () => {
        closeDeleteModal();
      },
    });

  return (
    <>
      <IconButton size="small" onClick={(e) => handleMenuOpen(e, index)}>
        <MoreVertIcon sx={{ fontSize: CustomSize(18), color: theme.palette.text.secondary }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={activeRowIndex === index}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 150,
              borderRadius: 2,
              boxShadow: '0px 4px 20px rgba(0,0,0,0.12)',
              mt: 0.5,
            },
          },
        }}
      >
        {row?.isReplied ? (
          <MenuItem
            onClick={() => {
              openReviewModal();
            }}
            sx={{ gap: 1, py: 1, px: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <QuickreplyIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
            </ListItemIcon>
            <Typography variant="body2">View Replied</Typography>
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              router.push(`${PAGE_ROUTE.dashboard.salesSupport.list}/${row?._id}/reply`);
              handleMenuClose();
            }}
            sx={{ gap: 1, py: 1, px: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <ReplyIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
            </ListItemIcon>
            <Typography variant="body2">Reply</Typography>
          </MenuItem>
        )}

        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={() => {
            openDeleteModal();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <DeleteOutlineIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
          </ListItemIcon>
          <Typography variant="body2">Delete</Typography>
        </MenuItem>
      </Menu>

      {/* Review Message */}
      <MuiModalWrapper
        open={reviewModal}
        onClose={closeReviewModal}
        isAutoClose={false}
        maxWidth="md"
        fullWidth
      >
        <CommonModalContentWrap>
          <Stack direction="row" alignItems="center" className="headStack">
            <Typography sx={{ fontSize: '32px !important' }}>Information!</Typography>
          </Stack>

          <InputLabel
            sx={{
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            Message:
          </InputLabel>
          <Typography>{row?.message}</Typography>
          <br />
          <InputLabel
            sx={{
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            Replied:
          </InputLabel>
          <Typography>{row?.supportReplies?.[0]?.message ?? '-'}</Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary variant="outlined" color="primary" onClick={closeReviewModal}>
              Close
            </CustomButtonPrimary>
          </Stack>
        </CommonModalContentWrap>
      </MuiModalWrapper>

      {/* Delete Modal */}
      <MuiModalWrapper open={deleteModal} onClose={closeDeleteModal} isAutoClose={false}>
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
            Are you sure want to delete this sales support ticket?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={deleteSalesSupportLoading}
              disabled={deleteSalesSupportLoading}
              onClick={() => {
                deleteSalesSupport(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={deleteSalesSupportLoading}
              onClick={closeDeleteModal}
            >
              No
            </CustomButtonPrimary>
          </Stack>
        </CommonModalContentWrap>
      </MuiModalWrapper>
    </>
  );
};
