'use client';

import BlockIcon from '@mui/icons-material/Block';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  TableCell,
  Typography,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useRouter } from 'next/navigation';
import { MouseEvent, Suspense, useCallback, useState } from 'react';

import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import { CommonModalContentWrap } from '@/@core/components/images/ImgComp';
import PageLoader from '@/@core/components/others/PageLoader';
import {
  useTravelOfferDelete,
  useTravelOfferGetAll,
  useTravelOfferStatusChange,
} from '@/api/hooks/travel-offer/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { formatNumber, getAirportLabel } from '@/lib/functions/validation';
import { PAGE_ROUTE } from '@/routes/index.route';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachTravelOffer } from '@/types/apps/travel-offer/index.type';
import { TStatusChangeType } from '@/types/common/common.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

dayjs.extend(advancedFormat);

const tableHeadData = ['Action', 'Date', 'Source', 'Destination', 'Aircraft', 'Price', 'Status'];

const TravelOfferMain = () => {
  return (
    <DashboardHome>
      <CommonCardBox>
        <TravelOfferPageContent />
      </CommonCardBox>
    </DashboardHome>
  );
};

const TravelOfferPageContent = () => {
  const router = useRouter();
  const theme = useTheme();

  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [statusValue, setStatusValue] = useState<TStatusChangeType | ''>('');
  const [searchRaw, setSearchRaw] = useState('');
  const searchValue = useDebounce(searchRaw, 500);

  const {
    data: travelOfferListData,
    isLoading: travelOfferListDataLoading,
    refetch: refetchTheList,
  } = useTravelOfferGetAll({
    page: currentPageValue,
    limit: limitValue,
    search: searchValue,
    status: statusValue,
  });

  return (
    <>
      <SectionHeading title="Empty Leg Offer listing page">
        <CustomButtonPrimary
          variant="contained"
          color="secondary"
          onClick={() => {
            router.push(PAGE_ROUTE.dashboard.travelOffer.add);
          }}
        >
          Add New Empty Leg Offer +
        </CustomButtonPrimary>
      </SectionHeading>

      <SearchMainComp
        className="home-srch-select"
        isStatusShow
        isSearchShow
        searchValueGetter={(value) => {
          setSearchRaw(() => value);
        }}
        statusValueGetter={(value) => {
          setStatusValue(() => value as TStatusChangeType);
        }}
      />

      <ErrorBoundary>
        <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
          <ReusableDataTable
            columnWidths={[undefined, 200, 400, 400, 300, undefined, undefined]}
            headArray={tableHeadData}
            data={
              (travelOfferListData?.docs?.length ?? 0 > 0)
                ? (travelOfferListData?.docs as TEachTravelOffer[])
                : []
            }
            pageCount={travelOfferListData?.meta?.totalPages ?? 0}
            // eslint-disable-next-line max-len
            paginationLabel={`${travelOfferListData?.meta?.totalDocs ?? 0} Results | Page ${travelOfferListData?.meta?.page ?? 1} of ${travelOfferListData?.meta?.totalPages ?? 1}`}
            page={currentPageValue}
            limit={limitValue}
            onLimitChange={(newLimit) => {
              setLimitValue(() => newLimit);
              setCurrentPageValue(() => 1);
            }}
            dataLoading={travelOfferListDataLoading}
            noDataPlaceholder="No Travel Offer Found!"
            onPageChange={(e, newValue) => {
              setCurrentPageValue(() => newValue);
            }}
            renderRow={(row) => (
              <>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {dayjs(row?.postedDate).isValid()
                    ? dayjs(row?.postedDate).format('Do MMMM YYYY')
                    : '-'}
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    minWidth: 250,
                  }}
                >
                  {getAirportLabel(row?.source) || '-'}
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    minWidth: 250,
                  }}
                >
                  {getAirportLabel(row?.destination) || '-'}
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {row?.aircraft?.name ?? '-'}
                </TableCell>
                <TableCell>
                  {formatNumber(row?.price, {
                    showCurrency: true,
                    decimalPlaces: 0,
                  })}
                </TableCell>
                <TableCell>
                  <Box
                    className="status-chip"
                    sx={{
                      backgroundColor:
                        row.status === 'Active'
                          ? theme.palette.customColors?.colorD2F798
                          : theme.palette.customColors?.colorFFEFBD,
                    }}
                  >
                    {row?.status}
                  </Box>
                </TableCell>
              </>
            )}
            renderActions={(row, index) => (
              <TravelOfferActionComp
                index={index}
                row={row}
                refetchList={() => {
                  refetchTheList();
                }}
              />
            )}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default TravelOfferMain;

const TravelOfferActionComp = ({
  row,
  index,
  refetchList,
}: {
  row: TEachTravelOffer;
  index: number;
  refetchList: () => void;
}) => {
  const router = useRouter();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);

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

  const { mutateAsync: deleteOffer, isPending: deleteOfferLoading } = useTravelOfferDelete({
    optionalCallback: () => {
      closeDeleteModal();
      refetchList();
    },
    errorCallback: () => {
      closeDeleteModal();
    },
  });

  const { mutateAsync: statusChange } = useTravelOfferStatusChange({
    optionalCallback: () => {
      refetchList();
    },
    errorCallback: () => {},
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
        <MenuItem
          onClick={() => {
            router.push(`${PAGE_ROUTE.dashboard.travelOffer.list}/${row?._id}/edit`);
            handleMenuClose();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <EditOutlinedIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
          </ListItemIcon>
          <Typography variant="body2">Edit</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            statusChange({
              id: row?._id,
              status: row.status === 'Active' ? 'Inactive' : 'Active',
            });
            handleMenuClose();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            {row.status === 'Active' ? (
              <BlockIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
            ) : (
              <CheckCircleOutlineIcon
                fontSize="small"
                sx={{ color: theme.palette.text.secondary }}
              />
            )}
          </ListItemIcon>
          <Typography variant="body2">
            {row.status === 'Active' ? 'Deactivate' : 'Activate'}
          </Typography>
        </MenuItem>

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
            Are you sure want to delete the empty leg offer?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={deleteOfferLoading}
              disabled={deleteOfferLoading}
              onClick={() => {
                deleteOffer(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={deleteOfferLoading}
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
