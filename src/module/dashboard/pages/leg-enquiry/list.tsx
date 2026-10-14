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
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { MouseEvent, Suspense, useCallback, useState } from 'react';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import { CommonModalContentWrap } from '@/@core/components/images/ImgComp';
import PageLoader from '@/@core/components/others/PageLoader';
import { useLegEnquiryDelete, useLegEnquiryGetAll } from '@/api/hooks/leg-enquiry/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import { HeadingStack } from '@/components/SIngleComponent/SectionHeading';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { PAGE_ROUTE } from '@/routes/index.route';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachLegEnquiry } from '@/types/apps/leg-enquiry/index.type';
import { TStatusChangeType } from '@/types/common/common.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

const tableHeadData = [
  'Action',
  'Full Name',
  'Email',
  'Source-Destination	| Aircraft | Price',
  'Message',
  'Replied?',
];

const formatAirportText = (airport: any) => {
  if (!airport) return '-';
  if (typeof airport === 'string') return airport;
  return airport.title ? `${airport.title} (${airport.iata})` : airport.iata || '-';
};

const LegEnquiryMain = () => {
  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [legEnquiryStatusValue, setLegEnquiryStatusValue] = useState<TStatusChangeType | ''>('');
  const [legEnquirySearchRaw, setLegEnquirySearchRaw] = useState('');
  const legEnquirySearchValue = useDebounce(legEnquirySearchRaw, 500);

  const {
    data: legEnquiryListData,
    isLoading: legEnquiryListDataLoading,
    refetch: refetchTheLegEnquiryList,
  } = useLegEnquiryGetAll({
    page: currentPageValue,
    perPage: limitValue,
    search: legEnquirySearchValue,
    status: legEnquiryStatusValue,
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
          <Typography variant="h3">Leg Enquiry Form Response</Typography>
        </HeadingStack>

        <SearchMainComp
          className="home-srch-select"
          isStatusShow={false}
          isSearchShow
          searchValueGetter={(value) => {
            setLegEnquirySearchRaw(() => value);
          }}
          statusValueGetter={(value) => {
            setLegEnquiryStatusValue(() => value as TStatusChangeType);
          }}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              headArray={tableHeadData}
              columnWidths={[undefined, 300, 300, 400, 600, undefined]}
              data={
                (legEnquiryListData?.docs?.length ?? 0 > 0)
                  ? (legEnquiryListData?.docs as TEachLegEnquiry[])
                  : []
              }
              pageCount={legEnquiryListData?.meta?.totalPages ?? 0}
              paginationLabel={`${legEnquiryListData?.meta?.totalDocs ?? 0} Results | Page ${legEnquiryListData?.meta?.page ?? 1} of ${legEnquiryListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={legEnquiryListDataLoading}
              noDataPlaceholder="No Leg Enquiry Found!"
              onPageChange={(e, newValue) => {
                setCurrentPageValue(() => newValue);
              }}
              renderRow={(row) => (
                <>
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
                  <TableCell
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {`${formatAirportText(row?.travelOffer?.source)}-${formatAirportText(row?.travelOffer?.destination)}	| ${row?.travelOffer?.aircraft?.name} | ${row?.travelOffer?.price}`}
                  </TableCell>
                  <TableCell>
                    <Box className="clamp-text">{row?.message}</Box>
                  </TableCell>
                  <TableCell>{row?.isReplied ? 'Yes' : 'No'}</TableCell>
                </>
              )}
              renderActions={(row, index) => (
                <LegEnquiryActionComp
                  index={index}
                  row={row}
                  refetchList={() => {
                    refetchTheLegEnquiryList();
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

export default LegEnquiryMain;

const LegEnquiryActionComp = ({
  row,
  index,
  refetchList,
}: {
  row: TEachLegEnquiry;
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

  const { mutateAsync: deleteLegEnquiry, isPending: deleteLegEnquiryLoading } = useLegEnquiryDelete(
    {
      optionalCallback: () => {
        closeDeleteModal();
        refetchList();
      },
      errorCallback: () => {
        closeDeleteModal();
      },
    },
  );

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
              router.push(`${PAGE_ROUTE.dashboard.legEnquiry.list}/${row?._id}/reply`);
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
            Full Name:
          </InputLabel>
          <Typography>{row?.fullName}</Typography>
          <br />

          <InputLabel
            sx={{
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            Email:
          </InputLabel>
          <Typography>{row?.email}</Typography>
          <br />

          {row?.phone && (
            <>
              <InputLabel sx={{ fontSize: '14px', fontWeight: '600' }}>Phone:</InputLabel>
              <Typography>{row?.phone}</Typography>
              <br />
            </>
          )}

          {row?.travelOffer?.source && (
            <>
              <InputLabel sx={{ fontSize: '14px', fontWeight: '600' }}>Source:</InputLabel>
              <Typography>{formatAirportText(row?.travelOffer?.source)}</Typography>
              <br />
            </>
          )}

          {row?.travelOffer?.destination && (
            <>
              <InputLabel sx={{ fontSize: '14px', fontWeight: '600' }}>Destination:</InputLabel>
              <Typography>{formatAirportText(row?.travelOffer?.destination)}</Typography>
              <br />
            </>
          )}

          {row?.travelOffer?.postedDate && (
            <>
              <InputLabel sx={{ fontSize: '14px', fontWeight: '600' }}>Departure Date:</InputLabel>
              <Typography>
                {dayjs(row?.travelOffer?.postedDate).isValid()
                  ? dayjs(row?.travelOffer?.postedDate).format('Do MMMM YYYY')
                  : '-'}
              </Typography>
              <br />
            </>
          )}

          {row?.travelOffer?.price && (
            <>
              <InputLabel sx={{ fontSize: '14px', fontWeight: '600' }}>Price:</InputLabel>
              <Typography>{row?.travelOffer?.price}</Typography>
              <br />
            </>
          )}

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
          <Typography>{row?.legEnquireFormReplies?.[0]?.message ?? '-'}</Typography>

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
            Are you sure want to delete the leg enquiry?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={deleteLegEnquiryLoading}
              disabled={deleteLegEnquiryLoading}
              onClick={() => {
                deleteLegEnquiry(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={deleteLegEnquiryLoading}
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
