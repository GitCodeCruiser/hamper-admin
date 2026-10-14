'use client';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import {
  Box,
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
import { MouseEvent, Suspense, useCallback, useState } from 'react';


import ErrorBoundary from '@/@core/components/error/ErrorBoundary';
import { CommonModalContentWrap } from '@/@core/components/images/ImgComp';
import PageLoader from '@/@core/components/others/PageLoader';
import { useRouteGetAll, useRouteHardDelete, useRouteRestore } from '@/api/hooks/route/hooks';
import ReusableDataTable from '@/components/CustomComponents/ReusableDataTable';
import SearchMainComp from '@/components/CustomComponents/SearchMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { humanReadableDateTimeFormatForListing, PAGE_LIMIT_FOR_PAGINATION } from '@/constant';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import { TEachRoute } from '@/types/apps/route/index.type';
import { TStatusChangeType } from '@/types/common/common.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

const tableHeadData = [
  'Action',
  'Title',
  'Departure',
  'Arrival',
  'Status',
  'Featured',
  'Published Date',
  'Last Updated Date',
];

const RouteListDeletedMain = () => {
  const theme = useTheme();

  const [currentPageValue, setCurrentPageValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(PAGE_LIMIT_FOR_PAGINATION);
  const [routeStatusValue, setRouteStatusValue] = useState<TStatusChangeType | ''>('');
  const [routeSearchRaw, setRouteSearchRaw] = useState('');
  const routeSearchValue = useDebounce(routeSearchRaw, 500);

  const {
    data: routeListData,
    isLoading: routeListDataLoading,
    refetch: refetchTheRouteList,
  } = useRouteGetAll({
    page: currentPageValue,
    perPage: limitValue,
    search: routeSearchValue,
    status: routeStatusValue,
    isDeleted: true,
  });

  return (
    <DashboardHome>
      <CommonCardBox>
        <SectionHeading title="Deleted Route listing page" />

        <SearchMainComp
          className="home-srch-select"
          isStatusShow
          isSearchShow
          searchValueGetter={(value) => {
            setRouteSearchRaw(() => value);
          }}
          statusValueGetter={(value) => {
            setRouteStatusValue(() => value as TStatusChangeType);
          }}
        />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ReusableDataTable
              headArray={tableHeadData}
              columnWidths={[undefined, 450, 300, 300, undefined, undefined, 200, 200]}
              data={
                (routeListData?.docs?.length ?? 0 > 0) ? (routeListData?.docs as TEachRoute[]) : []
              }
              pageCount={routeListData?.meta?.totalPages ?? 0}
              paginationLabel={`${routeListData?.meta?.totalDocs ?? 0} Results | Page ${routeListData?.meta?.page ?? 1} of ${routeListData?.meta?.totalPages ?? 1}`}
              page={currentPageValue}
              limit={limitValue}
              onLimitChange={(newLimit) => {
                setLimitValue(() => newLimit);
                setCurrentPageValue(() => 1);
              }}
              dataLoading={routeListDataLoading}
              noDataPlaceholder="No Deleted Route Found!"
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
                    {row?.title}
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >{`${[row?.source.country?.name, row?.source.state?.name, row?.source.city?.name].filter(Boolean).join(', ') || 'N/A'}`}</TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >{`${[row?.destination.country?.name, row?.destination.state?.name, row?.destination.city?.name].filter(Boolean).join(', ') || 'N/A'}`}</TableCell>
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
                  <TableCell>{row?.isFeatured ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    {row?.createdAt
                      ? dayjs(row.createdAt).format(humanReadableDateTimeFormatForListing)
                      : '-'}
                  </TableCell>
                  <TableCell>
                    {row?.updatedAt
                      ? dayjs(row.updatedAt).format(humanReadableDateTimeFormatForListing)
                      : '-'}
                  </TableCell>
                </>
              )}
              renderActions={(row, index) => (
                <RouteDeletedActionComp
                  index={index}
                  row={row}
                  refetchRouteList={() => {
                    refetchTheRouteList();
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

export default RouteListDeletedMain;

const RouteDeletedActionComp = ({
  row,
  index,
  refetchRouteList,
}: {
  row: TEachRoute;
  index: number;
  refetchRouteList: () => void;
}) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [restoreModal, setRestoreModal] = useState(false);
  const [deletePermanentModal, setDeletePermanentModal] = useState(false);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, idx: number) => {
    setAnchorEl(event.currentTarget);
    setActiveRowIndex(idx);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveRowIndex(null);
  };

  const openRestoreModal = useCallback(() => {
    setRestoreModal(true);
    handleMenuClose();
  }, [setRestoreModal]);

  const closeRestoreModal = useCallback(() => {
    setRestoreModal(false);
  }, [setRestoreModal]);

  const openDeletePermanentModal = useCallback(() => {
    setDeletePermanentModal(true);
    handleMenuClose();
  }, [setDeletePermanentModal]);

  const closeDeletePermanentModal = useCallback(() => {
    setDeletePermanentModal(false);
  }, [setDeletePermanentModal]);

  const { mutateAsync: restoreRoute, isPending: restoreRouteLoading } = useRouteRestore({
    optionalCallback: () => {
      closeRestoreModal();
      refetchRouteList();
    },
    errorCallback: () => {
      closeRestoreModal();
    },
  });

  const { mutateAsync: deletePermanentRoute, isPending: deletePermanentRouteLoading } =
    useRouteHardDelete({
      optionalCallback: () => {
        closeDeletePermanentModal();
        refetchRouteList();
      },
      errorCallback: () => {
        closeDeletePermanentModal();
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
              minWidth: 160,
              borderRadius: 2,
              boxShadow: '0px 4px 20px rgba(0,0,0,0.12)',
              mt: 0.5,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            openRestoreModal();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <RestoreFromTrashIcon fontSize="small" sx={{ color: theme.palette.success.main }} />
          </ListItemIcon>
          <Typography variant="body2">Undo Delete</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            openDeletePermanentModal();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <DeleteForeverIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
          </ListItemIcon>
          <Typography variant="body2">Permanent Delete</Typography>
        </MenuItem>
      </Menu>

      {/* Restore Modal */}
      <MuiModalWrapper open={restoreModal} onClose={closeRestoreModal} isAutoClose={false}>
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
            Are you sure want to restore the route?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={restoreRouteLoading}
              disabled={restoreRouteLoading}
              onClick={() => {
                restoreRoute(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={restoreRouteLoading}
              onClick={closeRestoreModal}
            >
              No
            </CustomButtonPrimary>
          </Stack>
        </CommonModalContentWrap>
      </MuiModalWrapper>

      {/* Permanent Delete Modal */}
      <MuiModalWrapper
        open={deletePermanentModal}
        onClose={closeDeletePermanentModal}
        isAutoClose={false}
      >
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
            Are you sure want to permanently delete the route?
          </Typography>

          <Stack className="btnStack" direction="row" alignItems="center" justifyContent="center">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              loading={deletePermanentRouteLoading}
              disabled={deletePermanentRouteLoading}
              onClick={() => {
                deletePermanentRoute(row?._id);
              }}
            >
              Yes
            </CustomButtonPrimary>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              disabled={deletePermanentRouteLoading}
              onClick={closeDeletePermanentModal}
            >
              No
            </CustomButtonPrimary>
          </Stack>
        </CommonModalContentWrap>
      </MuiModalWrapper>
    </>
  );
};
